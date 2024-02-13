import Github from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb';
import { User } from '../models/user.model';
import { connectDB } from './connect-db';
import { Resend } from 'resend';
import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		{
			id: 'email',
			type: 'email',
			sendVerificationRequest(params) {
				let { identifier: email, url } = params;
				let resend = new Resend(process.env.RESEND_API_KEY);

				resend.emails.send({
					from: process.env.FROM_EMAIL as string,
					to: email,
					subject: 'Login Link to your Account',
					html: `<p>Click the link below to sign in to your account:</p>\
				     <p><a href="${url}"><b>Sign in</b></a></p>`,
				});
			},
		},
	] as Provider[],
	callbacks: {
		async session({ token, session }) {
			if (session.user) {
				if (token.sub) {
					session.user.id = token.sub;
				}

				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.image = token.image as string;
				session.user.role = (token.role || 'user') as string;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			await connectDB();
			const existingUser = await User.findById(token.sub);

			if (!existingUser) return token;

			token.name = existingUser.name || '';
			token.email = existingUser.email;
			token.image = existingUser.image || '';
			token.role = existingUser.role || 'user';

			return token;
		},
	},
	session: {
		strategy: 'jwt',
	},
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
		error: '/login/error',
	},
});
