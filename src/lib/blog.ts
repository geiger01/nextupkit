import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author?: string;
	image?: string;
	tags?: string[];
	content: string;
}

export interface BlogPostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	author?: string;
	image?: string;
	tags?: string[];
}

function parseFrontmatter(
	slug: string,
	fileContent: string
): BlogPost {
	const { data, content } = matter(fileContent);

	return {
		slug,
		title: data.title || slug,
		description: data.description || '',
		date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
		author: data.author,
		image: data.image,
		tags: data.tags,
		content,
	};
}

export function getAllPosts(): BlogPostMeta[] {
	if (!fs.existsSync(BLOG_DIR)) {
		return [];
	}

	const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

	const posts = files
		.map((file) => {
			const slug = file.replace(/\.mdx$/, '');
			const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
			const { content: _, ...meta } = parseFrontmatter(slug, raw);
			return meta;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
	const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const raw = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(slug, raw);
}

export function getAllPostSlugs(): string[] {
	if (!fs.existsSync(BLOG_DIR)) {
		return [];
	}

	return fs
		.readdirSync(BLOG_DIR)
		.filter((f) => f.endsWith('.mdx'))
		.map((f) => f.replace(/\.mdx$/, ''));
}
