import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
	to: string | string[],
	subject: string,
	html: string,
	from?: string
) => {
	await resend.emails.send({
		// TODO replace
		from: from || `LectureKit <noreply@lecturekit.io>`,
		to,
		subject,
		html,
	});
};
