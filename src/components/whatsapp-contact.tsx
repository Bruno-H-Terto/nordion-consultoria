import { whatsappNumber, hasWhatsApp } from "../config/contact";
import type { Copy } from "../locales";

export function WhatsAppContact({ t }: { t: Copy }) {
  // Render only when a real international contact number has been configured.
  if (!hasWhatsApp) return null;
  return (
    <a
      className="whatsapp-contact"
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappContact}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 3a12 12 0 0 0-10.4 18L4 28l7.1-1.6A12 12 0 1 0 16 3Zm0 22a10 10 0 0 1-4.7-1.2l-.4-.2-4.1.9.9-4-.2-.4A10 10 0 1 1 16 25Z" />
        <path d="M12 9c-.5 0-1 .2-1.4.7-1.2 1.4-.8 3.3.2 5 1.8 3 4.1 5 7.5 5.9 1.6.4 3.2-.7 3.6-1.7.2-.5.2-1 .1-1.2-.2-.2-2.6-1.4-3-1.5-.4-.1-.6 0-.8.3l-1 1.2c-.2.2-.4.3-.8.1-1.6-.7-2.8-1.8-3.7-3.2-.2-.3-.1-.5.1-.7l.7-.9c.2-.2.2-.5.1-.8l-1-2.7c-.2-.4-.4-.5-.6-.5Z" />
      </svg>
    </a>
  );
}
