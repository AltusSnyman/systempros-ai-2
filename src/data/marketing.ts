// Shared data for the /marketing/ hub and its four service pages.
// Single source so the hub's cards and each service page's cross-links
// stay in sync without duplicating copy across five files.

export interface MarketingService {
	ref: string;
	name: string;
	href: string;
	tag: string;
	blurb: string;
	/** 'ads' groups under the "Paid ads" heading on the hub; 'core' is everything else. */
	group?: 'core' | 'ads';
}

export const MARKETING_HUB_HREF = '/marketing/';

export const MARKETING_SERVICES: MarketingService[] = [
	{
		ref: 'MKT-01',
		name: 'Google Business Profile Management',
		href: '/marketing/google-business-profile/',
		tag: 'GBP MANAGEMENT',
		blurb: 'Your profile built out, corrected and kept current, with a posting schedule that runs on its own.',
		group: 'core',
	},
	{
		ref: 'MKT-02',
		name: 'Review & Reputation Management',
		href: '/marketing/reviews-reputation/',
		tag: 'REVIEWS',
		blurb: 'Customers asked for a review after the job, automatically, and every review answered.',
		group: 'core',
	},
	{
		ref: 'MKT-03',
		name: 'Social Media Management & Automation',
		href: '/marketing/social-media-management/',
		tag: 'SOCIAL',
		blurb: 'Google and Meta posted to on a schedule, without you opening a content calendar.',
		group: 'core',
	},
	{
		ref: 'MKT-04',
		name: 'Facebook & Instagram Ads Agency',
		href: '/marketing/facebook-instagram-ads/',
		tag: 'META ADS',
		blurb: 'Meta ads built, run and optimised, handed straight to the Lead Reactor for follow-up.',
		group: 'ads',
	},
	{
		ref: 'MKT-05',
		name: 'Google Ads Agency',
		href: '/marketing/google-ads/',
		tag: 'GOOGLE ADS',
		blurb: 'Google Ads campaigns built, run and optimised in your own account, handed straight to the Lead Reactor for follow-up.',
		group: 'ads',
	},
];

export const MARKETING_INDUSTRY_LINKS = [
	{ name: 'Marketing for hair salons', href: '/marketing-for-hair-salons/' },
	{ name: 'Marketing for landscaping', href: '/marketing-for-landscaping/' },
	{ name: 'Marketing for plumbing', href: '/marketing-for-plumbing/' },
];
