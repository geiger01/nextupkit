import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { MdxContent } from "@/components/mdx-content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return { title: "Post Not Found" };
	}

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<article>
			<Link
				href="/blog"
				className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
			>
				<ChevronLeft className="h-4 w-4" />
				Back to blog
			</Link>

			<header className="mb-8">
				<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
					<time dateTime={post.date}>
						{new Date(post.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					{post.author && (
						<>
							<span>&middot;</span>
							<span>{post.author}</span>
						</>
					)}
				</div>
				<h1 className="text-4xl font-bold tracking-tight">
					{post.title}
				</h1>
				{post.description && (
					<p className="mt-3 text-lg text-muted-foreground">
						{post.description}
					</p>
				)}
				{post.tags && post.tags.length > 0 && (
					<div className="flex gap-2 mt-4">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</header>

			<div className="prose dark:prose-invert lg:prose-lg max-w-none">
				<MdxContent source={post.content} />
			</div>
		</article>
	);
}
