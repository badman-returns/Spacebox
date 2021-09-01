import mongoose, { Model } from 'mongoose';
import { Recruiter } from '../interfaces/recruiter.model';
const { Schema } = mongoose;

const RecruiterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

const Recruiters: Model<Recruiter | any> = mongoose.model('recruiter', RecruiterSchema);

export {
    Recruiters
};