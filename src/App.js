import React, { useState } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './App.css';

function App() {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Build/flower.loader.js",
    dataUrl: "Build/flower.data",
    frameworkUrl: "Build/flower.framework.js",
    codeUrl: "Build/flower.wasm",
  });

  const [petalCount, setPetalCount] = useState(5);
  const [petalSize, setPetalSize] = useState(1);

  const handlePetalCountChange = (event) => {
    const value = event.target.value;
    setPetalCount(value);
    sendMessage("FlowerManager", "SetPetalCount", value);
  };

  const handlePetalSizeChange = (event) => {
    const value = event.target.value;
    setPetalSize(value);
    sendMessage("FlowerManager", "SetPetalSize", value);
  };

  return (
    <div className="App">
      <h1>Generative Flower Demo</h1>
      <div className="unity-container">
        <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
      </div>
      <div className="controls">
        <label>
          Petal Count:
          <input type="range" min="3" max="20" value={petalCount} onChange={handlePetalCountChange} />
          {petalCount}
        </label>
        <label>
          Petal Size:
          <input type="range" min="0.5" max="2" step="0.1" value={petalSize} onChange={handlePetalSizeChange} />
          {petalSize}
        </label>
      </div>
    </div>
  );
}

export default App;