import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import type { Copy } from "../locales";

const photos = [
  "boardroom",
  "collaboration",
  "portrait",
  "founder",
  "team",
  "skyline",
];
const AUTO_ADVANCE_MS = 10_000;

export function ValuesExplorer({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = t.values.length;

  const slides = useMemo(
    () =>
      t.values.map((value, index) => ({
        value,
        detail: t.valueDetails[index],
        image: photos[index % photos.length],
      })),
    [t.values, t.valueDetails],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion, count]);

  if (!count) return null;

  const previous = () => setActive((current) => (current - 1 + count) % count);
  const next = () => setActive((current) => (current + 1) % count);

  return (
    <section
      className={`values-carousel ${paused ? "is-paused" : ""}`}
      aria-label={t.valuesLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
    >
      <h2 className="values-section-label">{t.valuesLabel}</h2>
      <div
        className="values-carousel-stage"
        aria-live={paused || reducedMotion ? "polite" : "off"}
      >
        {slides.map((slide, index) => (
          <article
            className={`value-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
            key={slide.value}
          >
            <img
              className="value-slide-image"
              src={`/images/${slide.image}-1920.webp`}
              alt=""
              loading="lazy"
            />
            <div className="value-slide-copy">
              <span className="value-slide-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{slide.value}</h3>
              <p>{slide.detail}</p>
            </div>
          </article>
        ))}

        <button
          type="button"
          className="value-carousel-arrow value-carousel-prev"
          aria-label={t.valuesPrevious}
          onClick={previous}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          className="value-carousel-arrow value-carousel-next"
          aria-label={t.valuesNext}
          onClick={next}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="values-carousel-footer">
        <div
          className="values-carousel-dots"
          role="group"
          aria-label={t.valuesLabel}
        >
          {slides.map((slide, index) => (
            <button
              type="button"
              aria-pressed={index === active}
              aria-label={slide.value}
              key={slide.value}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="value-autoplay-track" aria-hidden="true">
          <span
            key={`${active}-${paused}-${reducedMotion}`}
            className={paused || reducedMotion ? "is-paused" : ""}
            style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
          />
        </div>
      </div>
    </section>
  );
}
