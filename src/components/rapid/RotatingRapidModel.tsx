"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, useGLTF, Center } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function SatelliteModel() {
  const { scene } = useGLTF("/top_level_assembly.glb");
  const meshRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const targetRotationZ = scrollY * 0.002;
    const targetRotationY = scrollY * 0.0005;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotationZ, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.08);

    const targetZ = scrollY * 0.01;
    const targetX = -scrollY * 0.0125;
    const targetY = scrollY * 0.02;
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={45} />
    </group>
  );
}

useGLTF.preload("/top_level_assembly.glb");

export default function RotatingRapidModel() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={45} />

        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#2471ed" />

        <Center position={[5, 0, 0]}>
            <SatelliteModel />
        </Center>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}