import { ArrowDown } from "@untitledui/icons";
import { useEffect, useRef, useState, type ReactNode } from "react";
export function PhotoSection({
  id,
  className = "",
  image,
  children,
  priority = false,
  nextId,
  nextLabel,
  continueLabel,
}: {
  id?: string;
  className?: string;
  image?: string;
  children: ReactNode;
  priority?: boolean;
  nextId?: string;
  nextLabel?: string;
  continueLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      tabIndex={-1}
      className={`photo-section ${className} ${visible ? "is-visible" : ""}`}
    >
      {image && (
        <picture className="section-photo" aria-hidden="true">
          <source
            media="(max-width: 600px)"
            srcSet={`/images/${image}-960.webp`}
          />
          <img
            src={`/images/${image}-1920.webp`}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      )}
      <div className="photo-shade" />
      <svg
        className="section-monogram"
        viewBox="0 0 360 360"
        fill="none"
        aria-hidden="true"
      >
        <path d="M50 290V70h70l120 160V70h70v220h-70L120 130v160H50Z" />
        <path d="m240 70 70-50v50h-70Z" />
      </svg>
      <div className="section-linework" aria-hidden="true">
        <span />
        <span />
        <svg viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="260" />
          <circle cx="300" cy="300" r="220" />
          <path d="M0 300h600M300 0v600" />
        </svg>
      </div>
      {children}
      {nextId && (
        <div className="container chapter-continuation">
          <a href={`#${nextId}`}>
            <span>{continueLabel}</span>
            {nextLabel}
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      )}
    </section>
  );
}
