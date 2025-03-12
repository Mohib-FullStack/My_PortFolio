import { Box, Button, CircularProgress, Typography } from '@mui/material'; // Import MUI components
import { PointMaterial, Points, Preload } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as random from 'maath/random/dist/maath-random.esm';
import React, { Suspense, useRef, useState } from 'react';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}> {/* Adjusted camera position */}
        <Suspense fallback={<CircularProgress color="secondary" />}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>

      {/* Example MUI components overlaid on the 3D canvas */}
      <Box sx={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <Typography variant="h4" color="white">
          Welcome to the Stars
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
          Explore
        </Button>
      </Box>
    </Box>
  );
};

export default StarsCanvas;

