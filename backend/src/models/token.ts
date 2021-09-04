import mongoose, { Model } from 'mongoose';
import { TokenObject } from '../interfaces';
const { Schema } = mongoose;

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
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
