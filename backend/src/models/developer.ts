import mongoose, { Model } from 'mongoose';
import { Developer } from '../interfaces/developer.model';
const { Schema } = mongoose;

const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    github: {
        type: String,
        required: true,
    },
    techStack: {
        type: Array,
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

const Developer: Model<Developer | any> = mongoose.model('developer', DeveloperSchema);

export {
    Developer
};