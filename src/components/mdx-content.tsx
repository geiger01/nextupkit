import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';

interface MdxContentProps {
	source: string;
}

export async function MdxContent({ source }: MdxContentProps) {
	const code = String(
		await compile(source, {
			outputFormat: 'function-body',
			remarkPlugins: [remarkGfm],
		})
	);

	const { default: MDXContent } = await run(code, {
		...(runtime as any),
		baseUrl: import.meta.url,
	});

	return <MDXContent />;
}
