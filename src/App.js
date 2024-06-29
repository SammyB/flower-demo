import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './App.css';

function App() {
  const [dimensions, setDimensions] = useState({ width: '100%', height: '100vh' });

  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
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
    // console.log("Sending SetPetalElongation with value:", value);
    setPetalElongation(value);
    sendMessage("FlowerManager", "SetPetalElongation", value);
  };
  
  const handlePetalCompressionChange = (event) => {
    const value = parseFloat(event.target.value);
    // console.log("Sending SetPetalCompression with value:", value);
    setPetalCompression(value);
    sendMessage("FlowerManager", "SetPetalCompression", value);
  };
  
  const handlePetalTwistChange = (event) => {
    const value = parseFloat(event.target.value);
    // console.log("Sending SetPetalTwist with value:", value);
    setPetalTwist(value);
    sendMessage("FlowerManager", "SetPetalTwist", value);
  };

  const handlePetalSizeChange = (event) => {
    const value = parseFloat(event.target.value);
    setPetalSize(value);
    sendMessage("FlowerManager", "SetPetalSize", value);
  };

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: '100%',
        height: `${window.innerHeight}px`,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {!isLoaded && (
        <div className="loading-overlay">
          <p>Loading... {Math.round(loadingProgression * 100)}%</p>
        </div>
      )}
      <Unity 
        unityProvider={unityProvider} 
        style={{ 
          width: dimensions.width, 
          height: dimensions.height, 
          visibility: isLoaded ? "visible" : "hidden" 
        }} 
      />
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