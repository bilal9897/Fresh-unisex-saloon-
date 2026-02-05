export const DEFAULT_WHATSAPP_PHONE = '918197925360';

export function buildWhatsAppUrl(params: {
  phone?: string;
  text?: string;
}) {
  const phone = params.phone ?? DEFAULT_WHATSAPP_PHONE;
  const text = params.text ?? '';
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Opens WhatsApp in the most reliable way across browsers/PWA.
 * Must be called directly from a user gesture (click/submit) to avoid popup blockers.
 */
export function openWhatsApp(params: { phone?: string; text: string }) {
  const url = buildWhatsAppUrl(params);

  // Try new tab first (desktop-friendly). If blocked, fall back to same-tab navigation.
  // Some environments (iframes/PWA/iOS) will block popups.
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.assign(url);
    }
  } catch {
    window.location.assign(url);
  }

  return url;
}
