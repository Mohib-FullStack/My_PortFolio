import { Box } from "@mui/material";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import CanvasLoader from "../Loader/Loader";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={2}>
      {/* Improved Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} color={"#ffffff"} />
      <pointLight position={[-2, -2, -2]} intensity={1.5} color={"#ff00ff"} />
      <pointLight position={[2, -2, 2]} intensity={1.5} color={"#00ffff"} />
      
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />

        {/* More vibrant & colorful material */}
        <meshStandardMaterial
          color={"#ff6f61"} // Soft coral base color
          roughness={0.3}
          metalness={0.7}
          emissive={"#ff9ff3"} // Soft glowing effect
          emissiveIntensity={0.6}
          envMapIntensity={0.5}
        />

        {/* Multiple decals to ensure icon visibility */}
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1} map={decal} flatShading />
        <Decal position={[0, 0, -1]} rotation={[Math.PI, 0, 0]} scale={1} map={decal} flatShading />
        <Decal position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1} map={decal} flatShading />
        <Decal position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1} map={decal} flatShading />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Box sx={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Canvas frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </Box>
  );
};

export default BallCanvas;




//! with pink color
// import { Box } from "@mui/material";
// import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import React, { Suspense } from "react";
// import CanvasLoader from "../Loader/Loader";

// const Ball = ({ imgUrl }) => {
//   const [decal] = useTexture([imgUrl]);

//   return (
//     <Float speed={4} rotationIntensity={5} floatIntensity={4}>
//       {/* Improved Lighting */}
//       <ambientLight intensity={0.7} />
//       <directionalLight position={[2, 2, 2]} intensity={1.5} color={"#ffffff"} />
//       <pointLight position={[-2, -2, -2]} intensity={1.2} color={"#ff00ff"} />
//       <pointLight position={[2, -2, 2]} intensity={1.2} color={"#00ffff"} />

//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />

//         {/* More vibrant & colorful material */}
//         <meshStandardMaterial
//           color={"#ff6f61"} // A soft coral base color
//           roughness={0.3}
//           metalness={0.7}
//           emissive={"#ff9ff3"} // Adds a soft glow effect
//           emissiveIntensity={0.4}
//         />

//         {/* Multiple decals to ensure icon visibility */}
//         <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1} map={decal} flatShading />
//         <Decal position={[0, 0, -1]} rotation={[Math.PI, 0, 0]} scale={1} map={decal} flatShading />
//         <Decal position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1} map={decal} flatShading />
//         <Decal position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1} map={decal} flatShading />
//       </mesh>
//     </Float>
//   );
// };

// const BallCanvas = ({ icon }) => {
//   return (
//     <Box sx={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <Canvas frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
//         <Suspense fallback={<CanvasLoader />}>
//           <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
//           <Ball imgUrl={icon} />
//         </Suspense>
//         <Preload all />
//       </Canvas>
//     </Box>
//   );
// };

// export default BallCanvas;


//! last
// import { Box } from "@mui/material";
// import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import React, { Suspense } from "react";
// import CanvasLoader from "../Loader/Loader";

// const Ball = ({ imgUrl }) => {
//   const [decal] = useTexture([imgUrl]);

//   return (
//     <Float speed={4} rotationIntensity={5} floatIntensity={4}>
//       <ambientLight intensity={0.4} />
//       <directionalLight position={[2, 2, 2]} intensity={1} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
        
//         {/* Multiple decals to ensure visibility */}
//         <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1} map={decal} flatShading />
//         <Decal position={[0, 0, -1]} rotation={[Math.PI, 0, 0]} scale={1} map={decal} flatShading />
//         <Decal position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1} map={decal} flatShading />
//         <Decal position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1} map={decal} flatShading />
//       </mesh>
//     </Float>
//   );
// };

// const BallCanvas = ({ icon }) => {
//   return (
//     <Box sx={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <Canvas frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
//         <Suspense fallback={<CanvasLoader />}>
//           <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
//           <Ball imgUrl={icon} />
//         </Suspense>
//         <Preload all />
//       </Canvas>
//     </Box>
//   );
// };

// export default BallCanvas;
