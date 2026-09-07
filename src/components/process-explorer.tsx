import { useState, useRef, type KeyboardEvent } from "react";
import {
  Compass03,
  Map01,
  LayersThree01,
  ShieldTick,
  ArrowRight,
  Check,
} from "@untitledui/icons";
import type { Copy } from "../locales";
const icons = [Compass03, Map01, LayersThree01, ShieldTick];
export function ProcessExplorer({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const navigate = (event: KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 4;
    else if (event.key === "ArrowLeft") next = (index + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };
  const Icon = icons[active];
  return (
    <div className="process-explorer">
      <div className="process-tabs" role="tablist" aria-label={t.processTitle}>
        {t.steps.map(([title], i) => (
          <button
            key={title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`process-tab-${i}`}
            aria-controls={`process-panel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => navigate(e, i)}
          >
            <span>0{i + 1}</span>
            <strong>{title}</strong>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
      {t.steps.map(([title, text], i) => (
        <div
          className="process-panel"
          key={title}
          id={`process-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`process-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
        >
          <div className="process-illustration" aria-hidden="true">
            <div className="process-rings" />
            <span className="process-main-icon">
              <Icon size={54} />
            </span>
            <span className="process-check">
              <Check size={20} />
            </span>
            <span className="process-watermark">0{i + 1}</span>
          </div>
          <div>
            <span className="eyebrow">{t.processFocus}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="process-deliverable">
              <Check size={18} aria-hidden="true" />
              <span>{t.deliverables[i]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}