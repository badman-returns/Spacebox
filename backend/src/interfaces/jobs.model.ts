import { Document } from 'mongoose';
import { User } from '.';

interface Job extends Document {
    id: string,
    title: string,
    description: string,
    createdBy: User,
    createdOn: Date,
}

export {
    Job
}