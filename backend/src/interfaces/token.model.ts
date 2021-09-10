import { Document } from 'mongoose';

interface TokenObject extends Document {
    userId: string,
    token: string,
    createdOn: Date,
}

export {
    TokenObject,
}