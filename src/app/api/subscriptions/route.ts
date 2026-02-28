import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { lemonsqueezyClient } from '@/lib/lemonsqueezy';
import { UserPlan } from '@/models/user-plan.model';
import { IUserPlan } from '@/types/types';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
	try {
		const session = await getSession();

		if (!session) {
			return NextResponse.json(
				{ success: false, message: 'Not logged in.' },
				{ status: 401 }
			);
		}
		
		const userSubscription: IUserPlan | null = await UserPlan.findOne({
			userId: session.user.id,
		});

		const { data: subscription } = await lemonsqueezyClient.get(
			`/subscriptions/${userSubscription?.subscriptionId}`
		);

		return NextResponse.json({
			success: true,
			data: subscription.data,
		});
	} catch (e) {
		return NextResponse.json(
			{
				success: false,
				message: (e as Error).message || 'Could not get subscription.',
			},
			{ status: 400 }
		);
	}
}
