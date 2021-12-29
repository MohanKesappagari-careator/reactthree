import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.scss";

const Spinneer = ({ position, args, color }: any) => {
  const mesh = useRef<any>(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [-5, 2, 10],
          fov: 60,
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <Spinneer position={[0, 1, 0]} args={[3, 2, 1]} color="lightblue" />
          <Spinneer position={[-2, 1, -5]} color="pink" />
          <Spinneer position={[5, 1, -2]} color="pink" />
        </group>
      </Canvas>
    </>
  );
}

export default App;
