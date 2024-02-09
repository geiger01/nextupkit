import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/connect-db';
import { User } from '@/lib/models/user.model';

export async function POST(req: Request) {
	try {
		await connectDB();
		const { name, email, password } = await req.json();

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return new NextResponse('Email is already in use', { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ name, email, password: hashedPassword });

		return NextResponse.json({ message: 'User registered.' }, { status: 201 });
	} catch (error) {
		console.log(error, 'error');
		return NextResponse.json(
			{ message: 'An error occurred while registering the user.' },
			{ status: 500 }
		);
	}
}
