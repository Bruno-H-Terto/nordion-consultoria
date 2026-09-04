import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
function Orbits() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += Math.min(delta, 0.05) * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.18;
  });
  return (
    <group ref={group} rotation={[0.25, 0.2, 0.3]}>
      <mesh>
        <sphereGeometry args={[1.12, 32, 20]} />
        <meshStandardMaterial
          color="#252D35"
          roughness={0.55}
          metalness={0.5}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial
          color="#CDC5BD"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[i * 0.9, i * 0.7, i * 0.5]}>
          <mesh>
            <torusGeometry args={[1.6 + i * 0.15, 0.012, 8, 100]} />
            <meshStandardMaterial
              color="#AD6438"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[1.6 + i * 0.15, 0, 0]}>
            <sphereGeometry args={[0.065, 16, 12]} />
            <meshBasicMaterial color="#e5ad85" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export default function OrbitCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<span />}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 3]} intensity={4} color="#f8dfc8" />
      <Orbits />
    </Canvas>
  );
}
