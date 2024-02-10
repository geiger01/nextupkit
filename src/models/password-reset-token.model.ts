import { Schema, models, model } from 'mongoose';

const passwordResetTokenSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
		},
		token: {
			type: String,
			unique: true,
		},
		expires: {
			type: Date,
		},
	},
	{ timestamps: true }
);

export const PasswordResetToken =
	models.PasswordResetToken || model('PasswordResetToken', passwordResetTokenSchema);
