import { connectDB } from '@/lib/connect-db';
import { Order } from '@/models/order.model';
import { PaymentHistory } from '@/models/payment-history.model';
import { UserPlan } from '@/models/user-plan.model';
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
						productName: payload.data.attributes.first_order_item.product_name,
						receiptUrl: payload.data.attributes.urls.receipt,
						status: 'success',
					});
					break;
				case 'order_refunded':
					await Order.findOneAndUpdate({ userId }, { status: 'refunded' });
					break;
			}
		}

		if (eventName.startsWith('subscription_')) {
			switch (eventName) {
				case 'subscription_created':
				case 'subscription_updated':
					await UserPlan.findOneAndUpdate(
						{ userId },
						{
							subscriptionId: `${payload.data.attributes.first_subscription_item.subscription_id}`,
							productId: `${payload.data.attributes.product_id}`,
							variantId: `${payload.data.attributes.variant_id}`,
							status: payload.data.attributes.status,
							productName: payload.data.attributes.product_name || '',
							renewsAt: payload.data.attributes.renews_at,
							endsAt: payload.data.attributes.ends_at,
							updateUrl:
								payload.data.attributes.urls.update_payment_method || '',
						},
						// Upsert - if no existing document, it creates one.
						{ upsert: true, new: true }
					);
					break;
				case 'subscription_cancelled':
					await UserPlan.findOneAndUpdate(
						{ userId },
						{
							status: payload.data.attributes.status,
							endsAt: payload.data.attributes.ends_at,
						}
					);
					break;
				case 'subscription_payment_success':
				case 'subscription_payment_failed':
				case 'subscription_payment_refunded':
					if (eventName === 'subscription_payment_success') {
						await UserPlan.findOneAndUpdate(
							{ userId },
							{
								status: payload.data.attributes.status,
								renewsAt: payload.data.attributes.renews_at,
								endsAt: payload.data.attributes.ends_at,
							}
						);
					}

					let paymentHistoryStatus = 'success';
					if (eventName === 'subscription_payment_failed') {
						paymentHistoryStatus = 'failed';
					} else if (eventName === 'subscription_payment_refunded') {
						paymentHistoryStatus = 'refunded';
					}

					await PaymentHistory.create({
						userId,
						subscriptionId: `${payload.data.attributes.first_subscription_item.subscription_id}`,
						productId: `${payload.data.attributes.product_id}`,
						variantId: `${payload.data.attributes.variant_id}`,
						status: paymentHistoryStatus,
						productName: payload.data.attributes.product_name || '',
					});
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
