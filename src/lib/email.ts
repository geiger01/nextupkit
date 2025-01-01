import { Resend } from 'resend';
import { FROM_EMAIL } from './consts';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
	to: string | string[],
	subject: string,
	html: string,
	from?: string
) => {
	await resend.emails.send({
		from: from || (FROM_EMAIL),
		to,
		subject,
		html,
	});
};
