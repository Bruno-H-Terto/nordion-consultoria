import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  Building07,
  Scale01,
  Coins01,
  Users01,
  Globe02,
  LayersThree01,
} from "@untitledui/icons";
import { ServiceCard } from "./ui";
import type { Copy } from "../locales";
const icons = [Building07, Scale01, Coins01, Users01, Globe02, LayersThree01];
export function ServicesCarousel({ t }: { t: Copy }) {
  const [ref, api] = useEmblaCarousel({ align: "start", loop: false });
  const [position, setPosition] = useState({
    selected: 0,
    count: 1,
    previous: false,
    next: false,
  });
  const update = useCallback(() => {
    if (api)
      setPosition({
        selected: api.selectedScrollSnap(),
        count: api.scrollSnapList().length,
        previous: api.canScrollPrev(),
        next: api.canScrollNext(),
      });
  }, [api]);
  useEffect(() => {
    if (!api) return;
    const frame = requestAnimationFrame(update);
    api.on("select", update).on("reInit", update);
    return () => {
      cancelAnimationFrame(frame);
      api.off("select", update).off("reInit", update);
    };
  }, [api, update]);
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div
      className="services-carousel"
      role="region"
      aria-roledescription={t.carousel}
      aria-label={t.nav[2]}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          if (e.key === "ArrowRight") api?.scrollNext(reduced());
          else api?.scrollPrev(reduced());
        }
      }}
    >
      <div className="carousel-viewport" ref={ref} tabIndex={0}>
        <div className="carousel-track">
          {t.services.map(([title, text], i) => {
            const Icon = icons[i];
            return (
              <div
                className="carousel-slide"
                key={title}
                role="group"
                aria-label={`${i + 1} / ${t.services.length}`}
              >
                <ServiceCard
                  icon={<Icon size={30} />}
                  title={title}
                  text={text}
                  number={i + 1}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <span aria-live="polite">
          {String(position.selected + 1).padStart(2, "0")}{" "}
          <span>/ {String(position.count).padStart(2, "0")}</span>
        </span>
        <div className="carousel-track-progress" aria-hidden="true">
          <span
            style={{
              width: `${((position.selected + 1) / position.count) * 100}%`,
            }}
          />
        </div>
        <div className="carousel-arrows">
          <button
            aria-label={t.previous}
            disabled={!position.previous}
            onClick={() => api?.scrollPrev(reduced())}
          >
            <ArrowLeft />
          </button>
          <button
            aria-label={t.next}
            disabled={!position.next}
            onClick={() => api?.scrollNext(reduced())}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
