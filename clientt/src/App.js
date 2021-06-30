import './App.css';
import './style.css'
import React , { useState, useRef }from 'react'

function App () {

  const [image, setImage] = useState();
  const inputFile = useRef();

  const handleFileUpload = (e) => {
    const filename = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(filename);
  };

  const BtnOnClick = () => {
    inputFile.current.click();
  };
  return (
    <div className="App">
      <input ref={inputFile} onChange={handleFileUpload} type="file" hidden />
      <button onClick={BtnOnClick} className="App__upload">
      upload
      </button>
      <img alt="" src={image} className="App__image" />

      
    </div>
  );
}


export default App;