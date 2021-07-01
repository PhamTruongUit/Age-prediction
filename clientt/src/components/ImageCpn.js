import "./Image.css"
import React, { useState } from "react";
import MagicDropZone from "react-magic-dropzone";

export default function ImageCpn() {
  const [result] = useState("Ket qua");
  const [image, setImage] = useState(null);

  function onDrop(accepted, rejected, links) {
    setImage(accepted[0].preview || links[0]);
  }

  
  return (
    <div className='App_image'>
      <MagicDropZone
        accept="image/jpeg, image/png, .jpg, .jpeg, .png"
        onDrop={onDrop}
        multiple={false}
        className="App__image"
      >
        <img
          alt=""
          src={image}
          className="Image_place"
        />
      </MagicDropZone>

      <div className="alert alert-primary">{result}</div>
    </div>
  );
}