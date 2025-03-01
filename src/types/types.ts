export interface IUserPlan {
	_id: string;
	userId: string;
	subscriptionId: string;
	productId: string;
	variantId: string;
	status: 'active' | 'on_trial' | 'expired' | 'paused' | 'cancelled';
	productName?: string;
	renewsAt?: string;
	endsAt?: string;
	updateUrl?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISubscriptionPlan {
	name: string;
	type: 'free' | 'basic' | 'pro';
	// add features as needed, e.g: maxItems
	monthlyPlanId: string;
	yearlyPlanId: string;
}

export interface IUser {
	_id?: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	image: string;
}
