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
  const [ref, api] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);
  const update = useCallback(() => {
    if (api) setSelected(api.selectedScrollSnap());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update).on("reInit", update);
    return () => {
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
          0{selected + 1} <span>/ 06</span>
        </span>
        <div className="carousel-dots">
          {t.services.map(([title], i) => (
            <button
              key={title}
              aria-label={title}
              aria-current={selected === i ? "true" : undefined}
              onClick={() => api?.scrollTo(i, reduced())}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button
            aria-label={t.previous}
            onClick={() => api?.scrollPrev(reduced())}
          >
            <ArrowLeft />
          </button>
          <button
            aria-label={t.next}
            onClick={() => api?.scrollNext(reduced())}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
