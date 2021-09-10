import { Document } from 'mongoose';

interface Post extends Document {
    id: string,
    userId: string,
    name: string,
    username: string,
    avatarURL: string,
    content: string,
    imageId: string,
    imageURL: string,
}

export {
    Post
}