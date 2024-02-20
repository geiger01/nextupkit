import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	
	const routes = ['/pricing', '/terms', '/privacy'].map((route) => ({
		url: `${process.env.NEXT_PUBLIC_APP_URL}${route}`,
		lastModified: new Date().toISOString(),
	}));

	return routes;
}
