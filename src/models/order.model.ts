import { Schema, models, model } from 'mongoose';

const orderPlanSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		orderId: {
			type: String,
			required: true,
		},
		productId: {
			type: String,
			required: true,
		},
		variantId: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			default: 'success',
			enum: ['success', 'error', 'refunded'],
		},
		receiptUrl: {
			type: String,
			required: true,
		},
		planName: String,
		variantName: String,
	},
	{ timestamps: true }
);

export const Order = models.Order || model('Order', orderPlanSchema);
