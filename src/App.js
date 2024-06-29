import React, { useState } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './App.css';

function App() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "/flower-demo/Build/public.loader.js",
    dataUrl: "/flower-demo/Build/public.data",
    frameworkUrl: "/flower-demo/Build/public.framework.js",
    codeUrl: "/flower-demo/Build/public.wasm",
  });

  const [petalSize, setPetalSize] = useState(2); // Increased initial size
  const [petalElongation, setPetalElongation] = useState(1);
  const [petalCompression, setPetalCompression] = useState(1);
  const [petalTwist, setPetalTwist] = useState(0);

  const handlePetalElongationChange = (event) => {
    const value = parseFloat(event.target.value);
    console.log("Sending SetPetalElongation with value:", value);
    setPetalElongation(value);
    sendMessage("FlowerManager", "SetPetalElongation", value);
  };
  
  const handlePetalCompressionChange = (event) => {
    const value = parseFloat(event.target.value);
    console.log("Sending SetPetalCompression with value:", value);
    setPetalCompression(value);
    sendMessage("FlowerManager", "SetPetalCompression", value);
  };
  
  const handlePetalTwistChange = (event) => {
    const value = parseFloat(event.target.value);
    console.log("Sending SetPetalTwist with value:", value);
    setPetalTwist(value);
    sendMessage("FlowerManager", "SetPetalTwist", value);
  };

  const handlePetalSizeChange = (event) => {
    const value = parseFloat(event.target.value);
    setPetalSize(value);
    sendMessage("FlowerManager", "SetPetalSize", value);
  };

  React.useEffect(() => {
    const handleUnityMessage = (message) => {
      console.log("Message from Unity:", message);
    };
    
    addEventListener("message", handleUnityMessage);
    return () => removeEventListener("message", handleUnityMessage);
  }, [addEventListener, removeEventListener]);

  return (
    <div className="App">
      <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
      {/* ... (keep existing sliders for petal count and size) */}
      <div>
        <label>
          Petal Size:
          <input type="range" min="0.5" max="5" step="0.1" value={petalSize} onChange={handlePetalSizeChange} />
          {petalSize.toFixed(1)}
        </label>
        <label>
          Petal Elongation:
          <input type="range" min="0.5" max="2" step="0.1" value={petalElongation} onChange={handlePetalElongationChange} />
          {petalElongation.toFixed(1)}
        </label>
      </div>
      <div>
        <label>
          Petal Compression:
          <input type="range" min="0.5" max="1.5" step="0.1" value={petalCompression} onChange={handlePetalCompressionChange} />
          {petalCompression.toFixed(1)}
        </label>
      </div>
      <div>
        <label>
          Petal Twist:
          <input type="range" min="-1" max="1" step="0.1" value={petalTwist} onChange={handlePetalTwistChange} />
          {petalTwist.toFixed(1)}
        </label>
      </div>
    </div>
  );
}

export default App;