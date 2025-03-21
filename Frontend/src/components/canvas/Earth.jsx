import { Box, CircularProgress } from "@mui/material";
import { Html, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf"); // ✅ Ensure the correct path
  return <primitive object={earth.scene} scale={2} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "90%", md: "100%" }, // Responsive width
        height: { xs: "250px", sm: "350px", md: "450px" }, // Reduce height on small screens
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        <Suspense
          fallback={
            <Html center>
              <CircularProgress color="secondary" />
            </Html>
          }
        >
          <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default EarthCanvas;