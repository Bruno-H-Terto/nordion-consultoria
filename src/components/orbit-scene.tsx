import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
const OrbitCanvas = lazy(() => import("./orbit-canvas"));
class SceneBoundary extends Component<
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
export function OrbitScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!motion.matches);
    update();
    motion.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
    };
  }, []);
  return (
    <div ref={ref} className="orbit-scene" aria-hidden="true">
      <div className="orbit-fallback">
        <i />
        <i />
        <i />
        <span>N</span>
      </div>
      {active && enabled && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <OrbitCanvas />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
