import { useEffect, useRef, useState, type ReactNode } from "react";
export function PhotoSection({
  id,
  className = "",
  image,
  children,
  priority = false,
}: {
  id?: string;
  className?: string;
  image: string;
  children: ReactNode;
  priority?: boolean;
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
      className={`photo-section ${className} ${visible ? "is-visible" : ""}`}
    >
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
      <div className="photo-shade" />
      {children}
    </section>
  );
}
