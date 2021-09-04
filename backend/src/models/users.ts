import mongoose, { Model } from 'mongoose';
import { User } from '../interfaces';
const { Schema } = mongoose;

const Userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    githubId: {
        type: String,
        default: null,
    },
    techStack: {
        type: Array,
        default: null,
    },
    company: {
        type: String,
        default: null,
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

const Users: Model<User | any> = mongoose.model('users', Userschema);

export {
    Users
};