import { connectDB } from '@/lib/connect-db';
import { User } from '@/lib/models/user.model';

export async function GET(req: Request) {
	await connectDB();
	const users = await User.find({});

	return Response.json({
		data: users,
		success: true,
		message: ``,
	});
}
