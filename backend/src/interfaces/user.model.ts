import { Document } from 'mongoose';

interface User extends Document{
    id: number,
    name: string,
    email: string,
    password: string,
    active: boolean,
    createdOn: Date,
}

export {
    User,
}