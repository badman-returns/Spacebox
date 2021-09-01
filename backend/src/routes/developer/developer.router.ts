import * as express from "express";
import { LoadAuthorization, ValidateBearerToken, ValidateBasicAuth, LoadAuthorizedUser } from "../../middleware/common.middleware";
import { ForgetPassword, RegisterDeveloper, ResetPassword, VerifyEmailAndActivateAccount } from "./developer.controller";

class DeveloperRouting {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Registration Routes
        this.router.post('/developer/register', RegisterDeveloper);
        this.router.post('/developer/verify-email/:id/:token', VerifyEmailAndActivateAccount);

        // Login Routes
        this.router.get('/developer/authentication', [...ValidateBasicAuth, ...LoadAuthorization], )

        // Forget Password
        this.router.post('/developer/forget-password', ForgetPassword);
        this.router.post('/developer/verify-reset-token/:id/:token', VerifyEmailAndActivateAccount);
        this.router.post('/developer/reset-password', ResetPassword);
    }
}

const DeveloperRouter = new DeveloperRouting().router;
export {
    DeveloperRouter,
}