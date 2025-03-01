import { ISubscriptionPlan, IUserPlan } from '@/types/types';

// Replace plan IDs with your variant IDs

export const freePlan: ISubscriptionPlan = {
	name: 'Free',
	type: 'free',
	monthlyPlanId: '',
	yearlyPlanId: '',
};

export const basicPlan: ISubscriptionPlan = {
	name: 'Basic',
	type: 'basic',
	// Replace
	monthlyPlanId: '269320',
	yearlyPlanId: '269320',
};

export const proPlan: ISubscriptionPlan = {
	name: 'Pro',
	type: 'pro',
	// Replace
	monthlyPlanId: '269320',
	yearlyPlanId: '269320',
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
		return (
			subscription.monthlyPlanId === userPlan.variantId ||
			subscription.yearlyPlanId === userPlan.variantId
		);
	});

	return plan || freePlan;
}

export const subscriptions = [freePlan, basicPlan, proPlan];
