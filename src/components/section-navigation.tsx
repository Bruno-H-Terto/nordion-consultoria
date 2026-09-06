import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Home01 } from "@untitledui/icons";
import type { Copy } from "../locales";
export function SectionNavigation({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const ids = [
    "inicio",
    "brasil",
    "abordagem",
    "como-funciona",
    "servicos",
    "sobre",
    "quem-somos",
    "equipe",
    "organograma",
    "contato",
    "faq",
  ];
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[id]"),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const index = sections.findIndex((section) => {
        const box = section.getBoundingClientRect();
        return box.top <= innerHeight / 2 && box.bottom > innerHeight / 2;
      });
      setActive(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  if (active <= 0) return null;
  return (
    <nav className="section-navigation" aria-label={t.sectionNavigation}>
      <a href="#inicio" aria-label={t.nav[0]} title={t.nav[0]}>
        <Home01 size={20} />
      </a>
      <a
        href={`#${ids[active - 1]}`}
        aria-label={t.previousSection}
        title={t.previousSection}
      >
        <ArrowUp size={20} />
      </a>
      {active < ids.length - 1 && (
        <a
          href={`#${ids[active + 1]}`}
          aria-label={t.nextSection}
          title={t.nextSection}
        >
          <ArrowDown size={20} />
        </a>
      )}
    </nav>
  );
}
