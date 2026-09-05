import { useState, type ReactNode } from "react";
export function JourneyIcon({
  children,
  label,
  description,
  id,
}: {
  children: ReactNode;
  label: string;
  description: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="journey-tooltip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="journey-icon-trigger"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {children}
      </button>
      {open && (
        <span className="journey-tooltip" id={id} role="tooltip">
          {description}
        </span>
      )}
    </span>
  );
}
