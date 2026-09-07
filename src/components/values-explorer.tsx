import { useEffect, useMemo, useState } from "react";

import type { Copy } from "../locales";

const photos = [
  "boardroom",
  "collaboration",
  "portrait",
  "founder",
  "team",
  "skyline",
];

const AUTO_ADVANCE_MS = 15_000;

export function ValuesExplorer({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);

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
    if (reducedMotion || count <= 1) return;

    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      AUTO_ADVANCE_MS,
    );

    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, count]);

  if (!count) return null;

  const previous = () =>
    setActive((current) => (current - 1 + count) % count);

  const next = () =>
    setActive((current) => (current + 1) % count);

  return (
    <section
      className="values-carousel"
      aria-label={t.valuesLabel}
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
      <h2 className="values-section-label">
        {t.valuesLabel}
      </h2>

      <div
        className="values-carousel-stage"
        aria-live={reducedMotion ? "polite" : "off"}
      >
        {slides.map((slide, index) => (
          <article
            className={`value-slide ${
              index === active ? "is-active" : ""
            }`}
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
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div
          className="value-autoplay-track"
          aria-hidden="true"
        >
          <span
            key={`${active}-${reducedMotion}`}
            className={reducedMotion ? "is-paused" : ""}
            style={{
              animationDuration: `${AUTO_ADVANCE_MS}ms`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
