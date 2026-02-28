import type _mongoose from 'mongoose';
import { connect } from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	global.mongoose = { conn: null, promise: null };
	cached = { conn: null, promise: null };
}

export async function connectDB() {
	const MONGODB_URI = process.env.MONGODB_URI;

	if (!MONGODB_URI) {
		throw new Error(
			'Please define the MONGODB_URI environment variable inside .env.local'
		);
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}
