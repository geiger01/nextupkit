import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/connect-db';
import { User } from '@/models/user.model';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req: Request) {
	try {
		await connectDB();
		const { name, email, password } = await req.json();

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ message: 'Email is already in use' },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ name, email, password: hashedPassword });

		const verificationToken = await generateVerificationToken(
			email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return NextResponse.json({ message: 'User registered.' }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred while registering the user.' },
			{ status: 500 }
		);
	}
}
