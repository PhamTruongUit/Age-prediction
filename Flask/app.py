from contextlib import nullcontext
import os
import uuid
import flask
import urllib
from PIL import Image
from tensorflow.keras.models import load_model
from flask import Flask , render_template  , request , send_file
from tensorflow.keras.preprocessing.image import load_img , img_to_array

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = load_model(os.path.join(BASE_DIR , 'model.h5'))


ALLOWED_EXT = set(['jpg' , 'jpeg' , 'png'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXT


dic = {0 : 'Cat', 1 : 'Dog'}
def predict(filename , model):
	img = load_img(filename , target_size = (128 , 128))
	img = img_to_array(img)
	img = img.reshape(1 , 128 ,128 ,3) 
	img = img.astype('float32')
	img = img/255.0
	p = model.predict(img)
	if p[0][0] > p[0][1]:
		res = 0
	else: res = 1
	return dic[res]


@app.route('/')
def home():
        return render_template("index.html")

@app.route('/' , methods = ['GET' , 'POST'])
def success():
	target_img = os.path.join(os.getcwd() , 'static')
	real_path =''
	if request.method == 'POST':
		if(request.form):
			pass
		elif (request.files):
			file = request.files['file']
			if file and allowed_file(file.filename):
				file.save(os.path.join(target_img , file.filename))
				img_path = os.path.join(target_img , file.filename)
				img = file.filename
				p = predict(img_path , model)

		return render_template('index.html', prediction = p, img_path = 'static/' + str(img))
	else: return render_template('index.html')

if __name__ == "__main__":
    app.run(debug = True)