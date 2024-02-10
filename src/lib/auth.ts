import { NextAuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongodb';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { connectDB } from './connect-db';

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
export const authOptions: NextAuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		Credentials({
			name: 'credentials',
			credentials: {
				email: {
					type: 'text',
				},
				password: {
					type: 'password',
				},
			},
			async authorize(credentials) {
				await connectDB();
				const user = await User.findOne({ email: credentials?.email });
				const passwordsMatch = await bcrypt.compare(
					credentials?.password as string,
					user.password
				);

				if (!user || !user.emailVerified || !passwordsMatch) {
					return null;
				}

				return user;
			},
		}),
	],
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

			token.name = existingUser.name;
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
		signIn: '/sign-in',
		error: '/sign-in/error',
	},
};
