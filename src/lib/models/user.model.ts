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
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		emailVerified: Date,
		password: String,
		image: String,
	},
	{ timestamps: true }
);

export const User = models.User || model('User', userSchema);
