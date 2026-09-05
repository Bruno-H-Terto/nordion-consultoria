import { useEffect, useState } from "react";

export function Typewriter({ phrases }: { phrases: string[] }) {
  const [step, setStep] = useState({ phrase: 0, length: 0, deleting: false });
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (reduced) return;
    const full = Array.from(phrases[step.phrase]).length;
    const delay = step.deleting
      ? 30
      : step.length === full
        ? 5500
        : step.length === 0
          ? 450
          : 80;
    const timer = window.setTimeout(() => {
      setStep((current) => {
        if (current.deleting)
          return current.length > 0
            ? { ...current, length: current.length - 1 }
            : {
                phrase: (current.phrase + 1) % phrases.length,
                length: 0,
                deleting: false,
              };
        return current.length === full
          ? { ...current, deleting: true }
          : { ...current, length: current.length + 1 };
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [step, phrases, reduced]);
  return (
    <span className="typewriter" data-reduced={reduced}>
      <span className="sr-only">{phrases[0]}</span>
      {phrases.map((phrase) => (
        <span className="typewriter-reserve" aria-hidden="true" key={phrase}>
          {phrase}
        </span>
      ))}
      <span className="typewriter-text" aria-hidden="true">
        {reduced
          ? phrases[0]
          : Array.from(phrases[step.phrase]).slice(0, step.length).join("")}
        <span className="typing-cursor" />
      </span>
    </span>
  );
}
