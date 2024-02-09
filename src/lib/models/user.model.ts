import { Schema, models, model } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			min: 2,
			max: 100,
			required: true,
		},
		email: {
			type: String,
			match: /.+\@.+\..+/,
			unique: true,
			min: 2,
			max: 100,
		},
		emailVerified: Date,
		password: String,
		provider: String,
		image: String,
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
	},
	{ timestamps: true }
);

export const User = models.User || model('User', userSchema);
