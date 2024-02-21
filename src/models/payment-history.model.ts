import { Schema, models, model } from 'mongoose';

const paymentHistorySchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		planId: {
			type: String,
			required: true,
		},
		productId: {
			type: String,
			required: true,
		},
		subscriptionId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: 'success',
			enum: ['success', 'error', 'refunded'],
		},
		currency: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
		receiptUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const PaymentHistory =
	models.PaymentHistory || model('PaymentHistory', paymentHistorySchema);
