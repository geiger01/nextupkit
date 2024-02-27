import { Schema, models, model } from 'mongoose';

const paymentHistorySchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		subscriptionId: {
			type: String,
			required: true,
			index: true,
		},
		productId: {
			type: String,
			required: true,
		},
		variantId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: 'success',
			enum: ['success', 'failed', 'refunded'],
		},
		productName: String,
	},
	{ timestamps: true }
);

export const PaymentHistory =
	models.PaymentHistory || model('PaymentHistory', paymentHistorySchema);
