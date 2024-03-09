import { ISubscriptionPlan, IUserPlan } from '@/types/types';

export const freePlan: ISubscriptionPlan = {
	name: '',
	type: 'free',
	planId: '',
};

export const proPlan: ISubscriptionPlan = {
	name: '',
	type: 'basic',
	planId: '',
};

export const basicPlan: ISubscriptionPlan = {
	name: '',
	type: 'pro',
	planId: '',
};

export function getUserSubscriptionPlan(
	userPlan: IUserPlan | null
): ISubscriptionPlan {
	if (!userPlan) {
		return freePlan;
	}

	if (
		userPlan.status === 'expired' ||
		userPlan.status === 'paused' ||
		userPlan.status === 'cancelled'
	) {
		const currentDate = new Date();
		const dueDate = new Date(userPlan.renewsAt || '');

		if (currentDate > dueDate) {
			return freePlan;
		}
	}

	const plan = subscriptions.find((subscription) => {
		return (subscription.planId || '') === userPlan.variantId;
	});

	return plan || freePlan;
}

export const subscriptions = [freePlan, basicPlan, proPlan];
