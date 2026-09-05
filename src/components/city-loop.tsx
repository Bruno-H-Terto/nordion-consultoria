import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { towers } from "../data/city";
const loadCity = () => import("./city-canvas");
const CityCanvas = lazy(loadCity);
class CityBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
const project = (x: number, y: number, z: number) =>
  `${300 + (x - z) * 24},${205 + (x + z) * 12 - y * 29}`;
function CityFallback() {
  return (
    <svg className="district-fallback" viewBox="0 0 600 430" aria-hidden="true">
      <polygon
        points={[
          [-5.4, -5.4],
          [5.4, -5.4],
          [5.4, 5.4],
          [-5.4, 5.4],
        ]
          .map(([x, z]) => project(x, 0, z))
          .join(" ")}
        fill="#56625e"
        stroke="#a5a9a0"
      />
      {[-1.7, 1.7].map((n) => (
        <g key={n} stroke="#252d35" strokeWidth="17">
          <polyline points={`${project(n, 0, -5.2)} ${project(n, 0, 5.2)}`} />
          <polyline points={`${project(-5.2, 0, n)} ${project(5.2, 0, n)}`} />
        </g>
      ))}
      {[...towers]
        .sort((a, b) => a.x + a.z - b.x - b.z)
        .map(({ x, z, w, d, h }, i) => {
          const a = project(x - w / 2, h, z - d / 2),
            b = project(x + w / 2, h, z - d / 2),
            c = project(x + w / 2, h, z + d / 2),
            e = project(x - w / 2, h, z + d / 2);
          return (
            <g key={i}>
              <polygon
                points={`${b} ${c} ${project(x + w / 2, 0, z + d / 2)} ${project(x + w / 2, 0, z - d / 2)}`}
                fill="#74828c"
              />
              <polygon
                points={`${e} ${c} ${project(x + w / 2, 0, z + d / 2)} ${project(x - w / 2, 0, z + d / 2)}`}
                fill="#b5bdb9"
              />
              <polygon points={`${a} ${b} ${c} ${e}`} fill="#e3d9ca" />
            </g>
          );
        })}
    </svg>
  );
}
export function CityLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    if (!motion) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      loadCity()
        .then(() => {
          if (!cancelled) setPrepared(true);
        })
        .catch(() => {});
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [motion]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "240px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className="district-scene" aria-hidden="true">
      <CityFallback />
      {(prepared || visible) && motion && (
        <CityBoundary>
          <Suspense fallback={null}>
            <CityCanvas animate={visible} />
          </Suspense>
        </CityBoundary>
      )}
    </div>
  );
}
