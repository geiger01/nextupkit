import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

	const staticRoutes = ['/', '/pricing', '/terms', '/privacy', '/blog'].map(
		(route) => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date().toISOString(),
		})
	);

	const blogPosts = getAllPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.date).toISOString(),
	}));

	return [...staticRoutes, ...blogPosts];
}
