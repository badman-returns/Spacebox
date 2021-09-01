import mongoose, { Model } from 'mongoose';
import { TokenObject } from '../interfaces';
const { Schema } = mongoose;

const TokenSchema = new Schema({
    developerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'developer',
    },
    recruiterId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'recruiter',
    },
    token: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
})

const Token: Model<TokenObject | any> = mongoose.model('token', TokenSchema);

export { Token };
