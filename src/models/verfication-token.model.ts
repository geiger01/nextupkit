import { Schema, models, model } from 'mongoose';

const verficationTokenSchema = new Schema(
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

export const VerficationToken =
	models.VerficationToken || model('VerficationToken', verficationTokenSchema);
