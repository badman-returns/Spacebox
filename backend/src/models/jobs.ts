import mongoose, { Model } from 'mongoose';
import { Job } from '../interfaces';
const { Schema } = mongoose;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const Jobs: Model<Job | any> = mongoose.model('jobs', JobSchema);

export { Jobs };
