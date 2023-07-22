// 1. Install Dependencies
// 2. Import Dependencies
// 3. Setup Webcam and Canvas
// 4. Load Facemesh
// 5. Detect Funciton

import { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection"

const styling = {
  position:"absolute",
  margin: "auto",
  left:0,
  right:0,
  textAlign: "center"
}

const param = {
  width: "500px",
  height: "600px",  
}


function App() {

  // 3. Setting up the reference for Webcam and Canvas
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // 4. Load Face Mesh 
  const handleVideoNode = async (video)=>{
    // const net = await faceLandmarksDetection.load({
    //   inputResolution : {...param},
    //   scale: 0.8 
    //   // Scaling Down to increase the performance
    // })

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs'
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    }
    
    const detector = await faceLandmarksDetection.createDetector(model,   detectorConfig);
    // console.log("detector", detector);

          // iv.Make Detection and Eastimate Faces

          const detect = async(net)=>{
            const estimationConfig = { flipHorizontal: false };
            // console.log("net", video.target);
          const faces = await net.estimateFaces(video.target, estimationConfig);
          console.log(faces);

          }

        setInterval(() => {
          
          detect(detector)
        }, 100);
          
  }

  // 5. Detect Function
  async function detect (net){

    if(webcamRef.current && webcamRef.current?.video.readyState === 4 && net){ 
      // i. Get Video Width
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.videoWidth;
      const videoHeight  = webcamRef.current.videoHeight;

      // ii. Set Video Width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // iii. Set Canvas Width
      canvasRef.current.width = videoHeight;
      canvasRef.current.height = videoHeight
      

      

  }

}
  // loadFaceMesh();
  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style ={styling}
        onLoadedData={handleVideoNode}
      />
      <canvas 
        ref={canvasRef}
        style={styling}
      ></canvas>
    </div>
  )
}

export default App
