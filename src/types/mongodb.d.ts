import _mongoose, { connect } from 'mongoose';

declare global {
	var _mongoClientPromise: Promise<MongoClient>;
	var mongoose: {
		promise: ReturnType<typeof connect> | null;
		conn: typeof _mongoose | null;
	};
}
