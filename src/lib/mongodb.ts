// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (MONGODB_URI) {
	if (process.env.NODE_ENV === 'development') {
		// In development mode, use a global variable so that the value
		// is preserved across module reloads caused by HMR (Hot Module Replacement).

		let globalWithMongoClientPromise = global as typeof globalThis & {
			_mongoClientPromise: Promise<MongoClient>;
		};

		if (!globalWithMongoClientPromise._mongoClientPromise) {
			client = new MongoClient(MONGODB_URI);
			globalWithMongoClientPromise._mongoClientPromise = client.connect();
		}
		clientPromise = globalWithMongoClientPromise._mongoClientPromise;
	} else {
		// In production mode, it's best to not use a global variable.
		client = new MongoClient(MONGODB_URI);
		clientPromise = client.connect();
	}
} else {
	// During build time, MONGODB_URI may not be available
	clientPromise = new Promise(() => {}) as Promise<MongoClient>;
}

export default clientPromise;
