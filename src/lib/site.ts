// Single source of truth for brand identity, contacts and measurement.
// Change values here; Layout, Navbar, Footer, schema and pages read from this file.

/** GA4 measurement ID. Replace the placeholder with the real ID (G-XXXXXXXXXX).
 *  While it is the placeholder, events queue in window.dataLayer but gtag.js is not loaded. */
export const GA4_ID = 'G-PLACEHOLDER';

export const SITE_URL = 'https://systempros.ai';
export const ORG_ID = `${SITE_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BRAND = {
	name: 'System Pros AI',
	alternateName: 'SystemPros.ai',
	legalName: 'Ai and Automation Agency Ltd',
	email: 'hello@systempros.ai',
	logo: `${SITE_URL}/logo.png`,
	socialImage: `${SITE_URL}/social-preview.png`,
	/** Google Business Profile ("Ai and Automation Agency"), rating shown on site. */
	googleReviewsUrl: 'https://share.google/6QFPl0OCjQGM1R5EW',
	googleRating: '5.0',
	googleReviewCount: 17,
	/** Knowledge-graph URL for the Google listing (used in schema sameAs). */
	googleKgUrl: 'https://www.google.com/search?kgmid=/g/11l30pgtcl',
	bookingUrl: `${SITE_URL}/contact/`,
} as const;

export const PHONES = {
	NZ: { country: 'New Zealand', code: 'NZ', display: '021 255 0493', intl: '+64 21 255 0493', e164: '+64212550493', tel: 'tel:+64212550493' },
	AU: { country: 'Australia', code: 'AU', display: '+61 2 5563 2110', intl: '+61 2 5563 2110', e164: '+61255632110', tel: 'tel:+61255632110' },
	US: { country: 'United States', code: 'US', display: '+1 844 697 9038', intl: '+1 844 697 9038', e164: '+18446979038', tel: 'tel:+18446979038' },
} as const;

export type PhoneKey = keyof typeof PHONES;
