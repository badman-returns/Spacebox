import { Document } from 'mongoose';

interface User extends Document{
    id: string,
    name: string,
    picId: string,
    picURL: string,
    email: string,
    role: string,
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