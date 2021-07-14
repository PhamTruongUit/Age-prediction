import numpy as np
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import cv2
from PIL import Image
import base64
from flask_ngrok import run_with_ngrok
from deepface import DeepFace
import matplotlib.pyplot as plt
app = Flask(__name__)
run_with_ngrok(app) # ngrok colab

model = load_model('MobileNetV3Large.h5')
print(model.summary())
groups_names= ['Children', 'Teenage', 'Youth', 'Middle', 'Old']


def predict_class(age):
  if age <= 10: return groups_names[0] #Children 0 - 10
  if age <= 18: return groups_names[1] #Teenage 10 - 18
  if age <= 34: return groups_names[2] #Youth   19 - 34
  if age <= 60: return groups_names[3] #Middle  35 - 60
  return groups_names[4]               #Old     61+


def ConvBase64toImage(img_base64):
  try:
    image = np.fromstring(base64.b64decode(img_base64), dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_ANYCOLOR)
    return image
  except:
    return None


def preprocess_image(data):
    image = Image.fromarray(data, 'RGB')
    image = image.resize((224,224))
    image = np.array(image)
    image = np.expand_dims(image, axis = 0)
    return image


def detect_face(img_path):
    backends = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface']
    detected_face = DeepFace.detectFace( img_path , detector_backend='dlib')
    return detected_face


def predict_age(image):
    input = preprocess_image(image)
    result = model.predict(input)
    return int(result)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/image', methods=['POST'])
@cross_origin(origin='*')
def process():
    img_arg_base64 = request.form.get('img')
    img1 = ConvBase64toImage(img_arg_base64)
    img2 = detect_face(img1)
    age = predict_age(img2)
    cl_age = predict_class(age)
    result = {
        'age': age,
        'cl_age': cl_age
        }
    return result
    
@app.route('/', methods=['GET'])
@cross_origin(origin='*')
def index():
  return "Hello day la sever from colab"
if __name__ == '__main__':
  app.run()