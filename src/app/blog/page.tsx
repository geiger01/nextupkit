import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog",
	description: "Read our latest articles and updates.",
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<div>
			<div className="mb-10">
				<h1 className="text-4xl font-bold tracking-tight">Blog</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Latest articles and updates.
				</p>
			</div>

			{posts.length === 0 ? (
				<p className="text-muted-foreground">No posts yet. Check back soon!</p>
			) : (
				<div className="grid gap-8">
					{posts.map((post) => (
						<article
							key={post.slug}
							className="group rounded-lg border p-6 transition-colors hover:bg-muted/50"
						>
							<Link href={`/blog/${post.slug}`} className="block">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
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
									<h2 className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
										{post.title}
									</h2>
									{post.description && (
										<p className="text-muted-foreground line-clamp-2">
											{post.description}
										</p>
									)}
									{post.tags && post.tags.length > 0 && (
										<div className="flex gap-2 mt-1">
											{post.tags.map((tag) => (
												<span
													key={tag}
													className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
							</Link>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
