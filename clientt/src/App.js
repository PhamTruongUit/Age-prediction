import './App.css';
import './style.css'
import React from 'react'
import Imagecpn from './components/imagecpn.js'
import Resultcpn from './components/resultcpn.js'
import Buttoncpn from './components/buttoncpn';
const App = () => {
  return (
    <div className="body">

    <Buttoncpn />
    <Imagecpn />
    <Resultcpn />
    </div>
    )
}


export default App;