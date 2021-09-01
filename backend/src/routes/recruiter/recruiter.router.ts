import * as express from "express";
import { LoadAuthorization, ValidateBearerToken, ValidateBasicAuth, LoadAuthorizedUser } from "../../middleware/common.middleware";
import { ForgetPassword, RegisterRecruiter, ResetPassword, VerifyEmailAndActivateAccount } from "./recruiter.controller";

class RecruiterRouting {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Registration Routes
        this.router.post('/register', RegisterRecruiter);
        this.router.post('/verify-email/:id/:token', VerifyEmailAndActivateAccount);

        // Login Routes
        this.router.get('/authentication', [...ValidateBasicAuth, ...LoadAuthorization], )

        // Forget Password
        this.router.post('/forget-password', ForgetPassword);
        this.router.post('/verify-reset-token/:id/:token', VerifyEmailAndActivateAccount);
        this.router.post('/reset-password', ResetPassword);
    }
}

const RecruiterRouter = new RecruiterRouting().router;
export {
    RecruiterRouter,
}