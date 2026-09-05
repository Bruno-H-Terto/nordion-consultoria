export const whatsappNumber = (
  import.meta.env.VITE_WHATSAPP_NUMBER ?? ""
).replace(/\D/g, "");
export const hasWhatsApp = /^[1-9]\d{7,14}$/.test(whatsappNumber);
