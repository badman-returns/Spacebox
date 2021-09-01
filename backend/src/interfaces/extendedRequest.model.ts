import { User } from "./user.model";
import { Request } from 'express';

interface ExtendedRequest extends Request {
    token: string,
    user: User,
}

export { ExtendedRequest }