import mongoose, { Model } from 'mongoose';
import { Post } from '../interfaces';
const { Schema } = mongoose;

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    content: {
        type: String,
        required: true,
    },
    imageId:{
        type: String,
    },
    imageURL: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const Post: Model<Post | any> = mongoose.model('post', PostSchema);

export { Post };
