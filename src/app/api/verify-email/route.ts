import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connect-db';
import { User } from '@/models/user.model';
import { VerficationToken } from '@/models/verfication-token.model';

export async function POST(req: Request) {
	try {
		const { token } = await req.json();

		if (!token) {
			return NextResponse.json({ message: 'Missing token' }, { status: 400 });
		}

		await connectDB();

		const existingToken = await VerficationToken.findOne({ token });

		if (!existingToken) {
			return NextResponse.json(
				{ message: 'Token does not exist' },
				{ status: 400 }
			);
		}

		const hasExpired = new Date(existingToken.expires) < new Date();

		if (hasExpired) {
			return NextResponse.json(
				{ message: 'Token has expired' },
				{ status: 400 }
			);
		}

		const existingUser = await User.findOne({ email: existingToken.email });

		if (!existingUser) {
			return NextResponse.json(
				{ message: 'Email does not exist' },
				{ status: 400 }
			);
		}

		await User.findByIdAndUpdate(existingUser._id, {
			emailVerified: new Date(),
		});
		await VerficationToken.findByIdAndDelete(existingToken._id);

		return NextResponse.json({ message: 'Email verified.' }, { status: 201 });
	} catch (e) {
		return NextResponse.json(
			{ message: 'An error occurred while trying to verify email.' },
			{ status: 500 }
		);
	}
}
