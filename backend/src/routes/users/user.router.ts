import * as express from "express";
import { LoadAuthorization, ValidateBearerToken, ValidateBasicAuth, LoadAuthorizedUser } from "../../middleware/common.middleware";
import { ForgetPassword, LoginByEmailAndPassword, Register, ResetPassword, VerifyEmailAndActivateAccount } from "./user.controller";

class UserRouting {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Registration Routes
        this.router.post('/register', Register);
        this.router.post('/verify-email/:id/:token', VerifyEmailAndActivateAccount);

        // Login Routes
        this.router.get('/authentication', [...ValidateBasicAuth, ...LoadAuthorization], LoginByEmailAndPassword)

        // Forget Password
        this.router.post('/forget-password', ForgetPassword);
        this.router.post('/verify-reset-token/:id/:token', VerifyEmailAndActivateAccount);
        this.router.post('/reset-password', ResetPassword);
    }
}

const UserRouter = new UserRouting().router;
export {
    UserRouter,
}