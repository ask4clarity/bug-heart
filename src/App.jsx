import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

function App() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Heart position={[0, 0.2, 0]} scale={[0.125, 0.125, 0.07]} />
    </Canvas>
  );
}

export default App;

function Heart(props) {
  const texture = useLoader(TextureLoader, "/bug-large.png");
  texture.repeat.set(0.1, 0.1);
  texture.flipY = false;
  texture.center.set(0.0, 0.1);
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.y += delta; // Rotate around the y-axis
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props} ref={ref} rotation-x={Math.PI}>
      <extrudeGeometry args={[HeartShape(0, -5), extrudeSettings]} />
      <meshStandardMaterial color={"hotpink"} map={texture} />
    </mesh>
  );
}

function HeartShape(x, y) {
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  return heartShape;
}

const extrudeSettings = {
  steps: 2,
  depth: 16,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 2,
  bevelOffset: 0,
  bevelSegments: 10,
};
