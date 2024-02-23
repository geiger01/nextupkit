import { connectDB } from '@/lib/connect-db';
import { Order } from '@/models/order.model';
import { NextResponse } from 'next/server';

type TEvent =
	| 'order_created'
	| 'order_refunded'
	| 'subscription_created'
	| 'subscription_updated'
	| 'subscription_cancelled'
	| 'subscription_payment_failed'
	| 'subscription_payment_success'
	| 'subscription_payment_refunded';

export async function POST(req: Request) {
	try {
		// Make sure request is from Lemon Squeezy
		const crypto = require('crypto');
		const rawBody = await req.text();
		const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');

		if (!crypto.timingSafeEqual(digest, signature)) {
			return NextResponse.json(
				{ message: 'Invalid signature' },
				{ status: 401 }
			);
		}

		const payload = JSON.parse(rawBody);
		const eventName: TEvent = payload.meta.event_name;

		const userId = payload.meta.custom_data.user_id;
		await connectDB();

		if (eventName.startsWith('order_')) {
			// One time payments
			switch (eventName) {
				case 'order_created':
					await Order.create({
						userId,
						orderId: `${payload.data.attributes.first_order_item.order_id}`,
						productId: `${payload.data.attributes.first_order_item.product_id}`,
						variantId: `${payload.data.attributes.first_order_item.variant_id}`,
						variantName: payload.data.attributes.first_order_item.variant_name,
						planName: payload.data.attributes.first_order_item.product_name,
						price: payload.data.attributes.total || 0,
						receiptUrl: payload.data.attributes.urls.receipt,
						status: 'success',
					});
					break;
				case 'order_refunded':
					const order = await Order.findOne({ userId });
					if (order) {
						await Order.findOneAndUpdate({ userId }, { status: 'refunded' });
					}
					break;
			}
		}

		// TODO handle UserPlan actions, and PaymentHistory actions
		if (eventName.startsWith('subscription_')) {
			switch (eventName) {
				case 'subscription_created':
					break;
				case 'subscription_updated':
					break;
				case 'subscription_cancelled':
					break;
				case 'subscription_payment_success':
					break;
				case 'subscription_payment_failed':
					break;
				case 'subscription_payment_refunded':
					break;
			}
		}

		return NextResponse.json({ message: '' }, { status: 200 });
	} catch (e) {
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 }
		);
	}
}
