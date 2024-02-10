import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/connect-db';
import { User } from '@/models/user.model';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ message: 'Invalid Fields' }, { status: 400 });
		}

		await connectDB();

		const existingUser = await User.findOne({ email });

		if (!existingUser || !existingUser.email || !existingUser.password) {
			return NextResponse.json(
				{ message: 'Email does not exist' },
				{ status: 400 }
			);
		}

		const passwordsMatch = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!passwordsMatch) {
			return NextResponse.json(
				{ message: 'Wrong email or password' },
				{ status: 400 }
			);
		}

		if (!existingUser.emailVerified) {
			const verificationToken = await generateVerificationToken(
				existingUser.email
			);

			await sendVerificationEmail(
				verificationToken.email,
				verificationToken.token
			);

			return NextResponse.json({ message: 'Email sent.' }, { status: 403 });
		}

		return NextResponse.json({ message: 'User registered.' }, { status: 201 });
	} catch (e) {
		return NextResponse.json(
			{ message: 'An error occurred while trying to login.' },
			{ status: 500 }
		);
	}
}
