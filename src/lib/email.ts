import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
	to: string | string[],
	subject: string,
	html: string,
	from?: string
) => {
	await resend.emails.send({
		from: from || (process.env.FROM_EMAIL as string),
		to,
		subject,
		html,
	});
};
