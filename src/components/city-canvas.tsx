import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CatmullRomCurve3, Group, OrthographicCamera, Vector3 } from "three";
import { towers, trees } from "../data/city";

function Box({
  position,
  size,
  color,
  metal = false,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  metal?: boolean;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={metal ? 0.3 : 0.8}
        metalness={metal ? 0.35 : 0.05}
      />
    </mesh>
  );
}
function Viewport() {
  const { get, size } = useThree();
  useEffect(() => {
    const cam = get().camera as OrthographicCamera;
    cam.zoom = Math.min(size.width / 17, size.height / 14);
    cam.lookAt(0, 0.6, 0);
    cam.updateProjectionMatrix();
  }, [get, size]);
  return null;
}
function Traffic() {
  const group = useRef<Group>(null);
  const route = useMemo(
    () =>
      new CatmullRomCurve3(
        [
          new Vector3(-1.7, 0.16, -1.35),
          new Vector3(-1.35, 0.16, -1.7),
          new Vector3(1.35, 0.16, -1.7),
          new Vector3(1.7, 0.16, -1.35),
          new Vector3(1.7, 0.16, 1.35),
          new Vector3(1.35, 0.16, 1.7),
          new Vector3(-1.35, 0.16, 1.7),
          new Vector3(-1.7, 0.16, 1.35),
        ],
        true,
        "centripetal",
      ),
    [],
  );
  useFrame(({ clock }) => {
    group.current?.children.forEach((car, i) => {
      const t = (clock.elapsedTime / 32 + i / 4) % 1;
      car.position.copy(route.getPointAt(t));
      const direction = route.getTangentAt(t);
      car.rotation.y = Math.atan2(direction.x, direction.z);
    });
  });
  return (
    <group ref={group}>
      {["#e0ab7b", "#f8f3ed", "#AD6438", "#8fa8a3"].map((color) => (
        <group key={color}>
          <Box position={[0, 0, 0]} size={[0.19, 0.12, 0.38]} color={color} />
          <Box
            position={[0, 0.09, -0.015]}
            size={[0.16, 0.08, 0.2]}
            color="#394952"
            metal
          />
        </group>
      ))}
    </group>
  );
}
function District() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#fff1db", "#25343b", 1.5]} />
      <directionalLight
        position={[-5, 12, 7]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-normalBias={0.04}
      />
      <Box position={[0, -0.3, 0]} size={[10.8, 0.5, 10.8]} color="#39464b" />
      <Box
        position={[0, -0.035, 0]}
        size={[10.5, 0.05, 10.5]}
        color="#748078"
      />
      {[-1.7, 1.7].map((n) => (
        <group key={n}>
          <Box
            position={[n, 0.01, 0]}
            size={[0.75, 0.04, 10.5]}
            color="#252d35"
          />
          <Box
            position={[0, 0.015, n]}
            size={[10.5, 0.04, 0.75]}
            color="#252d35"
          />
          {[-4.5, -3.7, -2.9, 0, 2.9, 3.7, 4.5].map((p) => (
            <group key={p}>
              <Box
                position={[n, 0.04, p]}
                size={[0.025, 0.01, 0.28]}
                color="#cdc5bd"
              />
              <Box
                position={[p, 0.045, n]}
                size={[0.28, 0.01, 0.025]}
                color="#cdc5bd"
              />
            </group>
          ))}
        </group>
      ))}
      {towers.map(({ x, z, w, d, h }, i) => (
        <group key={i} position={[x, 0, z]}>
          <Box
            position={[0, 0.06, 0]}
            size={[2.4, 0.12, 2.4]}
            color="#CDC5BD"
          />
          <Box
            position={[0, h / 2 + 0.12, 0]}
            size={[w, h, d]}
            color={i === 1 ? "#ad6438" : "#b9c4c2"}
            metal
          />
          <Box
            position={[0, h + 0.16, 0]}
            size={[w + 0.08, 0.08, d + 0.08]}
            color="#e4ded5"
          />
          <Box
            position={[0.1, h + 0.28, 0]}
            size={[w * 0.45, 0.2, d * 0.45]}
            color="#74828c"
          />
          {Array.from({ length: Math.floor(h / 0.35) }, (_, j) => (
            <group key={j}>
              <Box
                position={[0, 0.35 + j * 0.35, d / 2 + 0.008]}
                size={[w * 0.88, 0.16, 0.016]}
                color="#465a64"
                metal
              />
              <Box
                position={[w / 2 + 0.008, 0.35 + j * 0.35, 0]}
                size={[0.016, 0.16, d * 0.88]}
                color="#3e535e"
                metal
              />
            </group>
          ))}
        </group>
      ))}
      <Box position={[0, 0.07, 0]} size={[2.3, 0.15, 2.3]} color="#526f60" />
      <Box position={[0, 0.16, 0]} size={[0.25, 0.025, 2.3]} color="#cdc5bd" />
      {trees.map(([x, z], i) => (
        <group key={i} position={[x, 0.13, z]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.05, 0.5, 6]} />
            <meshStandardMaterial color="#84644b" />
          </mesh>
          <mesh position={[0, 0.58, 0]} castShadow>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial
              color={i % 2 ? "#587b66" : "#74917b"}
              roughness={1}
            />
          </mesh>
        </group>
      ))}
      <Traffic />
    </>
  );
}
export default function CityCanvas({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas
      frameloop={animate ? "always" : "demand"}
      orthographic
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [12, 11, 14], near: 0.1, far: 100, zoom: 35 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Viewport />
      <District />
    </Canvas>
  );
}
