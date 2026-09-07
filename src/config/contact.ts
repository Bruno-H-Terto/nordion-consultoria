export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}
export const whatsappNumber = normalizePhone(
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "",
);
export const hasWhatsApp = /^[1-9]\d{7,14}$/.test(whatsappNumber);
export function whatsappUrl(message: string): string | null {
  return hasWhatsApp
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
}
