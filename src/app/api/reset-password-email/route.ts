import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connect-db';
import { User } from '@/models/user.model';
import { generatePasswordResetToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json({ message: 'Missing email' }, { status: 400 });
		}

		await connectDB();

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return NextResponse.json(
				{ message: 'Email does not exist' },
				{ status: 400 }
			);
		}

		const passwordResetToken = await generatePasswordResetToken(email);
		await sendPasswordResetEmail(
			passwordResetToken.email,
			passwordResetToken.token
		);
		return NextResponse.json({ message: 'Email sent.' }, { status: 201 });
	} catch (e) {
		return NextResponse.json(
			{ message: 'An error occurred while trying to verify email.' },
			{ status: 500 }
		);
	}
}
