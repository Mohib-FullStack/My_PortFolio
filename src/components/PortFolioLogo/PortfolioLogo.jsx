import { Float, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>There was an error rendering the 3D logo.</h1>;
    }
    return this.props.children;
  }
}

const PortfolioLogo = () => {
  const logoRef = useRef();

  // Rotate the logo dynamically
  useFrame(({ mouse }) => {
    logoRef.current.rotation.y = mouse.x * Math.PI;
    logoRef.current.rotation.x = mouse.y * Math.PI * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={logoRef}>
        <torusGeometry args={[1.2, 0.4, 16, 100]} />
        <meshStandardMaterial color={"#ff5722"} emissive={"#ff8a50"} emissiveIntensity={0.5} />
        {/* Try a built-in font instead of a custom one */}
        <Text3D font="https://fonts.gstatic.com/s/roboto/v26/KFOkCnqEu92Fr1Mu51xIIzI1vNgygZA6jp5X1Yq_56weQfmHTfEZaQ2SOcl9U1XbTj5B8xso4se6cRU0vA-VtLwky1oKQXt2sP0JxMBeg4qFAqFeUpRtqccDhHmn57aUkqUlBoFoD4-1dBOgrb3PfVfnkpIAAo7FhA2P6kCGJtk_-qMzuytT14GQQ5iXtrryTgxen1GnDbQmScicZcLw9i3FmhgzUkg4Tx4wQYa2svOsdzIQ2X_hvgW2AqEoWxxgpaRJ1cOZ50D31MoxpmOjkYP8wrwbQXcgbw5bP_-Bhq5Nf6GboGBjTiQibN92hGQckDOe6lj6VvcSdf11NUh6T0lb7YrT0u6sDgquA7jrJqde27YtmcTmMO0uZ0mSfjqxOtxq90Fhpx5g-7H9dQrsHm2wGV3QLUl5rBmeC5DdAf9Jnpjp7hMYH96Vhzsu0jOk-X7_SFVh5rfwR2A5V87Nntf3yWtw7R9gxbHYdOX2q7FqRmtBywQ0RmGbD-HpBjc00GSFHAvPIt6E__v1c_5QEu3DeLxa3zRkhjm8dxPzzHjD4dPAfEwYwvcQF0g==" position={[-0.9, 0, 0.5]}>
          RM
          <meshStandardMaterial color={"#ffffff"} emissive={"#ffcc80"} />
        </Text3D>
      </mesh>
    </Float>
  );
};

const ThreeDLogoCanvas = () => {
  return (
    <ErrorBoundary>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <PortfolioLogo />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </ErrorBoundary>
  );
};

export default PortfolioLogo;
