import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Group,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  QuadraticBezierCurve3,
  Shape,
  Vector3,
} from "three";
import outline from "../data/brazil-outline.json";

// Natural Earth public-domain outline. North maps toward negative Z.
const project = (lon: number, lat: number) =>
  new Vector3((lon + 54) * 0.125, 0.21, -(lat + 14) * 0.125);
const cities = [
  project(-46.63, -23.55),
  project(-47.88, -15.79),
  project(-60.02, -3.12),
  project(-34.88, -8.05),
];
const destinations = [
  new Vector3(-3, 0.8, -2.5),
  new Vector3(3, 1, -2),
  new Vector3(3.1, 0.65, 1.1),
];
const routes = [
  new QuadraticBezierCurve3(
    cities[0],
    new Vector3(-1.5, 2.8, -0.5),
    destinations[0],
  ),
  new QuadraticBezierCurve3(
    cities[1],
    new Vector3(1.4, 2.7, -1.8),
    destinations[1],
  ),
  new QuadraticBezierCurve3(
    cities[3],
    new Vector3(2.5, 1.9, -0.5),
    destinations[2],
  ),
  new QuadraticBezierCurve3(cities[2], new Vector3(-0.6, 0.9, 0.3), cities[0]),
];
const forward = new Vector3(0, 0, -1);

function Route({ curve }: { curve: QuadraticBezierCurve3 }) {
  const line = useMemo(() => {
    const geometry = new BufferGeometry().setFromPoints(curve.getPoints(90));
    const material = new LineDashedMaterial({
      color: "#e9b28e",
      dashSize: 0.075,
      gapSize: 0.055,
      transparent: true,
      opacity: 0.8,
    });
    return new Line(geometry, material).computeLineDistances();
  }, [curve]);
  useEffect(
    () => () => {
      line.geometry.dispose();
      line.material.dispose();
    },
    [line],
  );
  return <primitive object={line} />;
}
function Airplane({
  curve,
  offset,
}: {
  curve: QuadraticBezierCurve3;
  offset: number;
}) {
  const ref = useRef<Group>(null);
  const shape = useMemo(() => {
    const s = new Shape();
    [
      [0, 0.27],
      [0.035, 0.19],
      [0.04, 0.025],
      [0.25, -0.09],
      [0.25, -0.14],
      [0.04, -0.065],
      [0.025, -0.2],
      [0.105, -0.25],
      [0.105, -0.28],
      [0, -0.25],
      [-0.105, -0.28],
      [-0.105, -0.25],
      [-0.025, -0.2],
      [-0.04, -0.065],
      [-0.25, -0.14],
      [-0.25, -0.09],
      [-0.04, 0.025],
      [-0.035, 0.19],
    ].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
    s.closePath();
    return s;
  }, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.035 + offset) % 1;
    ref.current.position.copy(curve.getPoint(t));
    ref.current.quaternion.setFromUnitVectors(
      forward,
      curve.getTangent(t).normalize(),
    );
  });
  return (
    <group ref={ref} name="route-airplane">
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry
          args={[shape, { depth: 0.035, bevelEnabled: false }]}
        />
        <meshStandardMaterial
          color="#F8F3ED"
          metalness={0.25}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.038, -0.13]} scale={[0.018, 0.018, 0.07]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial color="#5D6266" />
      </mesh>
    </group>
  );
}
function SoftClouds() {
  const ref = useRef<Group>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, "rgba(248,243,237,.9)");
    gradient.addColorStop(0.4, "rgba(248,243,237,.48)");
    gradient.addColorStop(1, "rgba(248,243,237,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.position.x = Math.sin(clock.elapsedTime * 0.075) * 0.3;
  });
  return (
    <group ref={ref} name="soft-clouds">
      {[
        [-2.1, 1.25, -1.6],
        [1.8, 1.4, 1.5],
        [-1.5, 0.9, 2.1],
        [1.4, 1.6, -2.4],
      ].map((position, i) => (
        <group key={i} position={position as [number, number, number]}>
          {[-0.45, 0, 0.42].map((x, j) => (
            <sprite
              key={j}
              position={[x, j === 1 ? 0.1 : 0, 0]}
              scale={[1.35, 0.72, 1]}
            >
              <spriteMaterial
                map={texture}
                transparent
                opacity={0.32}
                depthWrite={false}
              />
            </sprite>
          ))}
        </group>
      ))}
    </group>
  );
}
function BrazilTerrain() {
  const shape = useMemo(() => {
    const s = new Shape();
    outline.forEach(([lon, lat], i) => {
      const x = (lon + 54) * 0.125,
        y = (lat + 14) * 0.125;
      if (i) s.lineTo(x, y);
      else s.moveTo(x, y);
    });
    s.closePath();
    return s;
  }, []);
  const border = useMemo(
    () =>
      new Line(
        new BufferGeometry().setFromPoints(
          outline.map(([lon, lat]) => project(lon, lat)),
        ),
        new LineBasicMaterial({
          color: "#e7b18a",
          transparent: true,
          opacity: 0.8,
        }),
      ),
    [],
  );
  useEffect(
    () => () => {
      border.geometry.dispose();
      border.material.dispose();
    },
    [border],
  );
  return (
    <group name="brazil-terrain">
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.18,
              bevelEnabled: true,
              bevelThickness: 0.025,
              bevelSize: 0.025,
              bevelSegments: 2,
              steps: 1,
            },
          ]}
        />
        <meshStandardMaterial
          attach="material-0"
          color="#AD6438"
          roughness={0.75}
          metalness={0.15}
        />
        <meshStandardMaterial
          attach="material-1"
          color="#633c29"
          roughness={0.9}
        />
      </mesh>
      <primitive object={border} />
      {cities.map((p, i) => (
        <group key={i} position={p}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.085, 0.1, 32]} />
            <meshBasicMaterial color="#f8f3ed" side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0.025, 0]}>
            <sphereGeometry args={[0.045, 16, 10]} />
            <meshBasicMaterial color="#f8f3ed" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
function InitialFrame({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    if (++frames.current === 2) onReady();
  });
  return null;
}
export default function OrbitCanvas({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0.4, 6.3, 7.2], fov: 43 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<span />}
    >
      <InitialFrame onReady={onReady} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[-3, 7, 4]} intensity={2.5} color="#fff1dc" />
      <group position={[0, -0.25, 0]} rotation={[0, -0.12, 0]}>
        <BrazilTerrain />
        {routes.map((curve, i) => (
          <Route key={i} curve={curve} />
        ))}
        <Airplane curve={routes[0]} offset={0.12} />
        <Airplane curve={routes[1]} offset={0.56} />
        <Airplane curve={routes[2]} offset={0.8} />
        <SoftClouds />
      </group>
    </Canvas>
  );
}
