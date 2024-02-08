// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

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

export default clientPromise;
