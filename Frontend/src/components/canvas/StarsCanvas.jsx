import { Box, CircularProgress } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Stars from "./Stars";

const StarsCanvas = () => {
  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ antialias: true }} // Enable antialiasing for smoother rendering
      >
        <Suspense fallback={<CircularProgress color="secondary" />}>
          <Stars />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default StarsCanvas;