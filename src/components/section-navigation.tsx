import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Home01 } from "@untitledui/icons";
import type { Copy } from "../locales";
export function SectionNavigation({ t }: { t: Copy }) {
  const [active, setActive] = useState(0);
  const [awake, setAwake] = useState(false);
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
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const reveal = () => {
      setAwake(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setAwake(false), 3000);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab") reveal();
    };
    window.addEventListener("pointermove", reveal, { passive: true });
    window.addEventListener("pointerdown", reveal, { passive: true });
    window.addEventListener("keydown", keyboard);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("pointermove", reveal);
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", keyboard);
    };
  }, []);
  if (active <= 0) return null;
  return (
    <nav
      className={`section-navigation fixed right-[var(--control-right)] top-1/2 z-35 flex w-[var(--control-size)] -translate-y-1/2 flex-col items-center gap-1.5 rounded-[30px] border border-[#cdc5bd55] bg-[#252d35ee] p-1.5 shadow-lg transition-opacity duration-200 focus-within:pointer-events-auto focus-within:opacity-100 motion-reduce:transition-none ${awake ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-label={t.sectionNavigation}
    >
      <a
        className="grid size-10 shrink-0 place-items-center rounded-full text-[#f8f3ed]! hover:bg-[#ad6438] focus-visible:bg-[#ad6438]"
        href="#inicio"
        aria-label={t.nav[0]}
        title={t.nav[0]}
      >
        <Home01 size={20} />
      </a>
      <a
        className="grid size-10 shrink-0 place-items-center rounded-full text-[#f8f3ed]! hover:bg-[#ad6438] focus-visible:bg-[#ad6438]"
        href={`#${ids[active - 1]}`}
        aria-label={t.previousSection}
        title={t.previousSection}
      >
        <ArrowUp size={20} />
      </a>
      {active < ids.length - 1 && (
        <a
          className="grid size-10 shrink-0 place-items-center rounded-full text-[#f8f3ed]! hover:bg-[#ad6438] focus-visible:bg-[#ad6438]"
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
