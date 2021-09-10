import * as express from "express";
import multer from "multer";
import { GetStorage } from "../../utility/uploader";
import { LoadAuthorization, ValidateBearerToken, ValidateBasicAuth, LoadAuthorizedUser } from "../../middleware/common.middleware";
import { ForgetPassword, LoginByEmailAndPassword, Register, ResetPassword, VerifyEmailAndActivateAccount } from "./common.controller";
import { AddProfilePicture } from "./user.controller";
import { CreatePost, DeletePostById, GetPost, GetPostByUserId } from "./user.post.controller";

class UserRouting {
    public router: express.Router;
    public upload = multer({ storage: GetStorage() });
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    public configRoutes() {

        // Registration Routes
        this.router.post('/register', Register);
        this.router.post('/verify-email/:id/:token', VerifyEmailAndActivateAccount);

        // Login Routes
        this.router.get('/authentication', [...ValidateBasicAuth, ...LoadAuthorization], LoginByEmailAndPassword);

        // Forget Password
        this.router.post('/forget-password', ForgetPassword);
        this.router.post('/verify-reset-token/:id/:token', VerifyEmailAndActivateAccount);
        this.router.post('/reset-password', ResetPassword);

        // User Routes
        this.router.post('/add/profile-photo/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, this.upload.single('profile')], AddProfilePicture);

        // Post Routes
        this.router.post('/add/post', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, this.upload.single('post')], CreatePost);
        this.router.get('/post', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetPost);
        this.router.get('/post/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], GetPostByUserId);
        this.router.delete('/post/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], DeletePostById);
    }
}

const UserRouter = new UserRouting().router;
export {
    UserRouter,
}