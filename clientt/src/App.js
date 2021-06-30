import './App.css';
import './style.css'
import React , { useState, useRef }from 'react'

function App () {
  const lyrics = [
    "Look up in the mirror, oh my God, it's me",
    "So much Prada on me, I'm a Pradagy",
    "I'ma do my thing, no apologies",
    "Coconut and rose in my skin regime",
    "Mirror, mirror on the wall, tell me what you see",
    "It's that, oh my God, it's lookin' heavenly (ooh)",
  ]
  const [image, setImage] = useState();
  const inputFile = useRef();
  const [result, setResult] = useState("Result");
  const [idx, setIdx] = useState(0); 
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
      <button onClick={BtnOnClick} className="App__upload" >
      Upload
      </button>
      <img alt="" src={image} className="App__image" />

      <button
        onClick={() => {
          setIdx(() => (idx + 1) % lyrics.length);
          setResult(lyrics[idx]);
        }}
      >
        Test buton
      </button>
      <div className="App__result">
        <p className="App__result__text">{result}</p>
      </div>
    </div>
  );
}


export default App;