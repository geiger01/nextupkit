import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/verification?token=${token}`;

	await resend.emails.send({
		// TODO replace
		from: `LectureKit <noreply@lecturekit.io>`,
		to: email,
		subject: 'Confirm your email',
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${domain}/new-password?token=${token}`;

	await resend.emails.send({
		// TODO replace
		from: `LectureKit <noreply@lecturekit.io>`,
		to: email,
		subject: 'Reset your password',
		html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
	});
};
