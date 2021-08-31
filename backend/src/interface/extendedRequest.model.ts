import { User } from "./user.model";
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    token: string,
    user: User,
}

export { AuthenticatedRequest }