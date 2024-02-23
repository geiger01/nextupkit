import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { lemonsqueezyClient } from '@/lib/lemonsqueezy';

export async function POST(req: Request) {
	const session = await getSession();

	if (!session) {
		return NextResponse.json(
			{ success: false, message: 'Not logged in.' },
			{ status: 401 }
		);
	}

	const body = await req.json();

	if (!body.variantId) {
		return NextResponse.json(
			{ success: false, message: 'No variant ID was provided.' },
			{ status: 400 }
		);
	}

	try {
		const { data: checkout } = await lemonsqueezyClient.post('/checkouts', {
			data: {
				type: 'checkouts',
				attributes: {
					checkout_data: {
						email: session.user.email,
						custom: {
							user_id: session.user.id,
						},
					},
				},
				relationships: {
					store: {
						data: {
							type: 'stores',
							id: process.env.LEMONSQUEEZY_STORE_ID as string,
						},
					},
					variant: {
						data: {
							type: 'variants',
							id: body.variantId,
						},
					},
				},
			},
		});

		if (!checkout.data?.attributes?.url) {
			throw new Error();
		}

		return NextResponse.json({
			success: true,
			data: {
				url: checkout.data.attributes.url,
			},
		});
	} catch (e) {
		return NextResponse.json(
			{
				success: false,
				message: (e as Error).message || 'Could not create checkout link',
			},
			{ status: 400 }
		);
	}
}
