import { Schema, models, model } from 'mongoose';

const userPlanSchema = new Schema(
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
		orderId: String,
		variantId: String,
		planName: String,
		planPrice: String,
		subscriptionId: String,
		subscriptionEndDate: Date,
		status: String,
		updateUrl: String,
		cancelUrl: String,
	},
	{ timestamps: true }
);

export const UserPlan = models.UserPlan || model('UserPlan', userPlanSchema);
