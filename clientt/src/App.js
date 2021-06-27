import './App.css';
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import ReactPlayer from 'react-player'
const videoConstraints = {
  width:1200,
  height:1500,
  facingMode:'user'
};

class App extends Component {
  enableWebcam = () => this.setState({ webcamEnabled: true });

  constructor(props) {
    super(props);
    this.state = { webcamEnabled: false };
  }

  render() {
    return (
      <div>
        <div>
        {this.state.webcamEnabled ? (
          
          <Webcam videoConstraints = { videoConstraints } />
        ) : (
          <button type="button" onClick={this.enableWebcam}>
            Enable webcam
          </button>
        )}
        </div>

        <div>
          <ReactPlayer url="https://www.youtube.com/watch?v=FKoNfgSpJvo"/>
        </div>

      </div>
      
    );
  }

}

export default App;