import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import outline from "../data/brazil-outline.json";
const OrbitCanvas = lazy(() => import("./orbit-canvas"));
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function OrbitScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!motion.matches);
    update();
    motion.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (!entry.isIntersecting) setReady(false);
      },
      { rootMargin: "100px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`orbit-scene ${enabled ? "map-active" : ""} ${ready ? "map-ready" : ""} ${failed ? "map-failed" : ""}`}
      aria-hidden="true"
    >
      <svg className="map-fallback" viewBox="0 0 600 500" aria-hidden="true">
        <defs>
          <linearGradient id="map-copper" x2=".5" y2="1">
            <stop stopColor="#cc8b5b" />
            <stop offset="1" stopColor="#AD6438" />
          </linearGradient>
        </defs>
        <g transform="translate(300 245) rotate(-8) scale(1 .72)">
          <path
            transform="translate(0 14)"
            d={
              outline
                .map(
                  ([lon, lat], i) =>
                    `${i ? "L" : "M"}${(lon + 54) * 10},${-(lat + 14) * 10}`,
                )
                .join(" ") + "Z"
            }
            fill="#633c29"
          />
          <path
            d={
              outline
                .map(
                  ([lon, lat], i) =>
                    `${i ? "L" : "M"}${(lon + 54) * 10},${-(lat + 14) * 10}`,
                )
                .join(" ") + "Z"
            }
            fill="url(#map-copper)"
            stroke="#e7b18a"
          />
          <g fill="none" stroke="#f8f3ed" strokeWidth="2" strokeDasharray="5 6">
            <path d="M74 95Q-170-230-230-155" />
            <path d="M61 18Q100-230 230-140" />
            <path d="M190-60Q270-100 270 85" />
          </g>
          <g fill="#f8f3ed">
            <circle cx="74" cy="95" r="5" />
            <circle cx="61" cy="18" r="5" />
            <circle cx="190" cy="-60" r="5" />
          </g>
        </g>
      </svg>
      {active && enabled && (
        <SceneBoundary onFailure={() => setFailed(true)}>
          <Suspense fallback={null}>
            <OrbitCanvas onReady={() => setReady(true)} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
