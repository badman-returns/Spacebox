import { NextFunction, Response, Request } from "express";
import { header } from "express-validator";
import { ValidationResponder } from "./validation.response";
import { AuthenticatedRequest } from "../interfaces";
import { Encryption } from "../utility";

class CommonValidator {
    constructor() {

    }

    public static validateBearerToken() {
        return [
            header('authorization', 'Authorization Header Missing')
                .exists()
                .custom(value => {
                    return value.toString().toLowerCase().startsWith('bearer ');
                }).withMessage('Must provide bearer token'),
            ValidationResponder.unauthorizedValidationResponder(),
        ];
    }

    public static validateBasicAuth() {
        return [
            header('authorization', 'Authorization Header Missing')
                .exists()
                .custom((value: string) => {
                    return value.toLowerCase().startsWith('basic ');
                }).withMessage('Must use basic authorization'),
            ValidationResponder.unauthorizedValidationResponder(),
        ];
    }

    public static loadAuthorization() {
        return [
            (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
                let authorization = req.headers['authorization'];
                let authParts = authorization.split(' ');
                req.token = authParts[1];
                return next();
            }
        ]
    }

    public static validateAndLoadAuthorization() {
        return [
            (req: AuthenticatedRequest, res: Response, next: NextFunction) => {  
                const user: any = Encryption.validateToken(req.token);
                if (!user) {
                    return res.status(401).send();
                }                
                req.user = user;
                return next();
            }
        ]
    }
}

const ValidateBearerToken = CommonValidator.validateBearerToken();
const ValidateBasicAuth = CommonValidator.validateBasicAuth();
const LoadAuthorization = CommonValidator.loadAuthorization();
const LoadAuthorizedUser = CommonValidator.validateAndLoadAuthorization();

export {
    ValidateBearerToken,
    ValidateBasicAuth,
    LoadAuthorization,
    LoadAuthorizedUser,
};