import { Schema, models, model } from 'mongoose';

const templateSchema = new Schema({
	title: String,
	description: String,
});

export const Template = models.Template || model('Template', templateSchema);
