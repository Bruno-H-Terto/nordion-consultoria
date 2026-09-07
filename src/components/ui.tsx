import type { ReactNode } from "react";
import { ArrowUpRight } from "@untitledui/icons";
import { TextField, Label, Input, TextArea } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Logo({
  light = false,
  animated = false,
}: {
  light?: boolean;
  animated?: boolean;
}) {
  return (
    <a
      className={twMerge(
        "logo",
        light && "logo-light",
        animated && "logo-animated",
      )}
      href="#inicio"
      aria-label="Nordion"
    >
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M5 29V7h7l12 16V7h7v22h-7L12 13v16H5Z" fill="currentColor" />
        <path d="m24 7 7-5v5h-7Z" fill="#AD6438" />
      </svg>
      <span className={animated ? "logo-word" : undefined} aria-hidden="true">
        {animated ? "ordion" : "nordion"}
        <span className="logo-dot">.</span>
      </span>
    </a>
  );
}
export function Button({
  children,
  href,
  onClick,
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  secondary?: boolean;
  className?: string;
}) {
  const classes = twMerge("button", secondary && "button-secondary", className);
  return href ? (
    <a className={classes} href={href}>
      {children}
      <ArrowUpRight aria-hidden="true" size={18} />
    </a>
  ) : (
    <button className={classes} onClick={onClick}>
      {children}
      <ArrowUpRight aria-hidden="true" size={18} />
    </button>
  );
}
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="badge">
      <span />
      {children}
    </span>
  );
}
export function Heading({
  label,
  title,
  text,
  centered = false,
}: {
  label: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={twMerge("section-heading", centered && "centered")}>
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <article className={twMerge("card", className)}>{children}</article>;
}
export function ServiceCard({
  icon,
  title,
  text,
  number,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  number: number;
}) {
  return (
    <Card className="service-card">
      <div className="card-top">
        <span className="icon-box">{icon}</span>
        <span className="card-number">0{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </Card>
  );
}
export function TimelineStep({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <li className="timeline-step">
      <span className="step-number">0{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
}
export function FormField({
  label,
  name,
  multiline = false,
  type = "text",
}: {
  label: string;
  name: string;
  multiline?: boolean;
  type?: "text" | "email";
}) {
  return (
    <TextField
      name={name}
      type={type}
      isRequired
      className="mt-[17px] flex flex-col gap-1.5"
    >
      <Label className="text-sm">{label}</Label>
      {multiline ? (
        <TextArea
          className="w-full resize-y rounded-[3px] border border-[#cdc5bd] bg-white p-3 text-base"
          rows={4}
        />
      ) : (
        <Input className="w-full rounded-[3px] border border-[#cdc5bd] bg-white p-3 text-base" />
      )}
    </TextField>
  );
}
