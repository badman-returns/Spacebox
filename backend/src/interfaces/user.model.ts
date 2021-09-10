import { Document } from 'mongoose';

interface User extends Document{
    id: string,
    name: string,
    username: string,
    picId: string,
    picURL: string,
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