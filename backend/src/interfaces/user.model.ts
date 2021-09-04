import { Document } from 'mongoose';

interface User extends Document{
    id: number,
    name: string,
    email: string,
    password: string,
    active: boolean,
    githubId?: string,
    company?: string,
    techStack?: string,  
    createdOn: Date,
}

export {
    User,
}