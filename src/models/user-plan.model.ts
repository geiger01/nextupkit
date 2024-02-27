import { Schema, models, model } from 'mongoose';

const userPlanSchema = new Schema(
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
			index: true,
		},
		variantId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: 'active',
			enum: ['active', 'on_trial', 'expired', 'paused', 'cancelled'],
		},
		productName: String,
		renewsAt: String,
		endsAt: String,
		updateUrl: String,
	},
	{ timestamps: true }
);

export const UserPlan = models.UserPlan || model('UserPlan', userPlanSchema);
