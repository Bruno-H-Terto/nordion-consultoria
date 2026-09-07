import {
  useEffect,
  useRef,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import { CountryFlag } from "./country-flag";
import type { Copy } from "../locales";

const bodies = [
  "pt-BR",
  "en",
  "es",
  "fr",
  "jp",
  "ar",
  "cn",
  "planet",
  "planet",
  "star",
  "star",
];
export function BrandUniverse({ t }: { t: Copy }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>(".universe-body"),
    );
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      elapsed = 0,
      previous = 0,
      visible = true;
    function draw() {
      nodes.forEach((node, i) => {
        const angle =
          (elapsed / (i < 7 ? 46000 : 62000)) * Math.PI * 2 +
          (i < 7 ? (i * Math.PI * 2) / 7 : ((i - 7) * Math.PI * 2) / 4 + 0.2);
        const radius = i < 7 ? 39 : 27;
        const x = Math.cos(angle) * radius,
          y = Math.sin(angle) * radius * 0.48;
        const tilt = -0.27;
        node.style.left = `${50 + x * Math.cos(tilt) - y * Math.sin(tilt)}%`;
        node.style.top = `${52 + x * Math.sin(tilt) + y * Math.cos(tilt)}%`;
        node.style.transform = `translate(-50%,-50%) scale(${0.87 + Math.sin(angle) * 0.13})`;
        node.style.zIndex = Math.sin(angle) > 0 ? "4" : "1";
      });
    }
    function tick(now: number) {
      elapsed += previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    function update() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !media.matches && !document.hidden)
        frame = requestAnimationFrame(tick);
      else draw();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = ref.current!.getBoundingClientRect();
    const x = Math.max(
      -1,
      Math.min(
        1,
        (event.clientX - box.left - box.width / 2) / (box.width * 0.22),
      ),
    );
    const y = Math.max(
      -1,
      Math.min(
        1,
        (event.clientY - box.top - box.height / 2) / (box.height * 0.22),
      ),
    );
    event.currentTarget.style.setProperty("--logo-x", `${x * 12}px`);
    event.currentTarget.style.setProperty("--logo-y", `${y * 10}px`);
    event.currentTarget.style.setProperty("--logo-ry", `${x * 12}deg`);
    event.currentTarget.style.setProperty("--logo-rx", `${-y * 10}deg`);
  }
  function reset(node: HTMLButtonElement) {
    ["--logo-x", "--logo-y", "--logo-ry", "--logo-rx"].forEach((key) =>
      node.style.removeProperty(key),
    );
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Escape"].includes(
        event.key,
      )
    )
      return;
    event.preventDefault();
    reset(event.currentTarget);
    if (event.key !== "Escape")
      event.currentTarget.style.setProperty(
        event.key.includes("Left") || event.key.includes("Right")
          ? "--logo-ry"
          : "--logo-rx",
        `${event.key === "ArrowLeft" || event.key === "ArrowDown" ? -10 : 10}deg`,
      );
  }
  return (
    <div className="brand-universe" ref={ref}>
      <div className="universe-halo" aria-hidden="true" />
      <svg
        className="orion-signature"
        viewBox="0 0 100 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M18 28 50 20 82 12" />
        <circle cx="18" cy="28" r="2.5" />
        <circle cx="50" cy="20" r="3" />
        <circle cx="82" cy="12" r="2.5" />
      </svg>
      <div className="universe-rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {bodies.map((body, i) => (
        <span
          key={i}
          className={`universe-body universe-${body}`}
          aria-hidden="true"
        >
          {body === "pt-BR" || body === "en" || body === "es" ? (
            <CountryFlag language={body} />
          ) : body === "fr" ? (
            <svg viewBox="0 0 30 20">
              <path fill="#fff" d="M0 0h30v20H0z" />
              <path fill="#203c8c" d="M0 0h10v20H0z" />
              <path fill="#d44343" d="M20 0h10v20H20z" />
            </svg>
          ) : body === "ar" ? (
            <svg viewBox="0 0 30 20">
              <path fill="#74acdf" d="M0 0h30v20H0z" />
              <path fill="#fff" d="M0 6.67h30v6.66H0z" />
              <circle cx="15" cy="10" r="2" fill="#f6b40e" />
            </svg>
          ) : body === "cn" ? (
            <svg viewBox="0 0 30 20">
              <path fill="#de2910" d="M0 0h30v20H0z" />
              <path
                fill="#ffde00"
                d="m6 3 1 3h3L7.5 8l1 3L6 9l-2.5 2 1-3L2 6h3z"
              />
              {[
                [12, 3],
                [15, 5],
                [15, 9],
                [12, 12],
              ].map(([x, y]) => (
                <path
                  key={y}
                  fill="#ffde00"
                  d={`M${x} ${y - 1.3}l.4 1h1.1l-.9.7.4 1.1-1-.7-1 .7.4-1.1-.9-.7h1.1z`}
                />
              ))}
            </svg>
          ) : body === "jp" ? (
            <svg viewBox="0 0 30 20">
              <path fill="#fff" d="M0 0h30v20H0z" />
              <circle cx="15" cy="10" r="6" fill="#b52a43" />
            </svg>
          ) : null}
        </span>
      ))}
      <div className="universe-logo-float">
        <button
          className="universe-logo"
          type="button"
          aria-label={t.brandInteraction}
          onPointerMove={move}
          onPointerDown={(event) =>
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            reset(event.currentTarget);
          }}
          onPointerLeave={(event) => reset(event.currentTarget)}
          onPointerCancel={(event) => reset(event.currentTarget)}
          onBlur={(event) => reset(event.currentTarget)}
          onKeyDown={keyboard}
        >
          <span className="universe-logo-crop">
            <img src="/brand/nordion-symbol.png" alt="" draggable={false} />
          </span>
        </button>
      </div>
    </div>
  );
}
