import { v4 } from 'uuid';
import { connectDB } from './connect-db';
import { VerficationToken } from '@/models/verfication-token.model';
import { PasswordResetToken } from '@/models/password-reset-token.model';

export async function generatePasswordResetToken(email: string) {
	const token = v4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await PasswordResetToken.findOne({
		email,
	});

	if (existingToken) {
		await PasswordResetToken.findByIdAndDelete(existingToken._id);
	}

	const passwordResetToken = await PasswordResetToken.create({
		email,
		token,
		expires,
	});

	return passwordResetToken;
}

export async function generateVerificationToken(email: string) {
	await connectDB();
	const token = v4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await VerficationToken.findOne({
		email,
	});

	if (existingToken) {
		await VerficationToken.findByIdAndDelete(existingToken._id);
	}

	const verficationToken = await VerficationToken.create({
		email,
		token,
		expires,
	});

	return verficationToken;
}
