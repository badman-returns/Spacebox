import { Encryption, Mailer } from '../../utility';
import { Response } from "express";
import { ExtendedRequest, ResponseObject, TokenObject, MailRequestModel, Developer } from "../../interfaces";
import { Developers} from "../../models/developer";
import { Token } from "../../models";

class DeveloperController {
    constructor() {

    }

    public static registerDeveloper = async (req: ExtendedRequest, res: Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const github = req.body.github;
        const techStack = req.body.techStack;
        const password = Encryption.encryptPassword(req.body.password);

        let response: ResponseObject<any>;
        try {
            const developer = await Developers.create({
                name,
                email,
                github,
                techStack,
                password,
            });

            let token = await Token.findOne({ developerId: developer._id });
            if (!token) {
                token = new Token({
                    developerId: developer._id,
                    token: await Encryption.createToken({ developerId: developer._id })
                }).save();
            }
            token = await Token.find({ developerId: developer._id }, { token: 1 });
            const verificationLink = `${process.env.BASE_URL}/verify-email/${developer._id}/${token[0]._doc.token}`;
            const mailData: MailRequestModel = {
                reciever: {
                    to: email,
                    cc: [],
                    bcc: []
                },
                subject: `Easy Developer Account Email Verification`,
                content: `Please click on the link to verify your email address within one hour of recieving it:\n` +
                    `Activate your account by clicking on the link above\n\n` +
                    `${verificationLink}\n\n` +
                    `Regards\n` +
                    `Team Support` +
                    `Easy`
            }
            await Mailer.sendEmail(mailData);
            response = {
                ResponseData: null,
                ResponseMessage: `Email verification link sent to ${email} address. Activate account by verifying email.`,
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static verifyEmailAndActivateAccount = async (req: ExtendedRequest, res: Response) => {
        const developerId = req.params.developerId;
        const activationToken = req.params.token;
        let response: ResponseObject<any>;
        try {
            const user: Developer = await Developers.findOne({ _id: developerId });
            if (!user) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                });
            }
            else if (user && user.active === true) {
                res.status(403).send({
                    Message: `Your account is already activated`,
                    Data: null,
                });
            }
            else {
                let developer = user.toJSON();

                let validToken: TokenObject = await Token.findOne({
                    developerId: developerId,
                    token: activationToken
                });
    
                if (!validToken) {
                    return res.status(400).send('Invalid Token or Expired');
                }
                else {
                    await Developers.updateOne({ _id: developer._id }, {
                        $set: {
                            active: true
                        }
                    });
                    await Token.deleteOne({ developerId: developer._id });
                }
                response = {
                    ResponseData: null,
                    ResponseMessage: `User with  id ${developerId} is activated`
                }
            }
            return res.send(response);

        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static loginByEmailAndPassword = async (req: ExtendedRequest, res: Response) => {
        try {
            const buff = Buffer.from(req.token, 'base64');
            const credential = buff.toString().split(':');
            if (credential.length !== 2) {
                return res.status(400).send();
            }
            const email = credential[0];
            const password = credential[1];
            if (!email || !password) {
                return res.status(400).send();
            }

            const user: Developer = await Developers.findOne({ email: email });
            let developer: any = user;
            if (developer) {
                developer = user.toJSON();
            }
            if (!developer) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            } else if (developer && !Encryption.decryptPassword(password, developer.password)) {
                res.status(401).send({
                    Message: `Incorrect password!`,
                    Data: null,
                });
            } else if (developer && !developer.active) {
                res.status(401).send({
                    Message: `User account not activated yet`,
                    Data: null,
                });
            }
            else {
                delete developer.password;
                delete developer.createdOn;
                let token: any;
                try {
                    token = await Encryption.createToken(developer);
                } catch (err) {
                    console.log(err);
                    return res.status(500).end();
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', token);
                res.send(developer);
            }
        } catch (error) {
            console.log(error)
            return res.status(500).end();
        }
    }

    public static forgetPassword = async (req: ExtendedRequest, res: Response) => {
        const email = req.body.email;
        let response: ResponseObject<any>;
        try {
            const user: Developer = await Developers.findOne({ email: email });
            let developer = user.toJSON();
            if (!developer) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            }

            let token = await Token.findOne({ developerId: developer._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: await Encryption.createToken({ developerId: developer._id }),
                }).save();
            }
            token = await Token.find({ developerId: developer._id }, { token: 1 })
            const verificationLink = `${process.env.BASE_URL}/password-reset/${developer._id}/${token[0]._doc.token}`;
            const mailData: MailRequestModel = {
                reciever: {
                    to: email,
                    cc: [],
                    bcc: []
                },
                subject: `Easy Developer Account Password Reset`,
                content: `You are receiving this mail because you (or someone else) have requested the reset of the password for your account.\n\n` +
                    `Please click on the link within one hour of recieving it:\n\n ` +
                    `${verificationLink}\n\n` +
                    `If you did not request this, please ignore this email and your password will remail unchanged.\n` +
                    `Regards\n` +
                    `Wincorna Team`
            }
            await Mailer.sendEmail(mailData);
            response = {
                ResponseData: null,
                ResponseMessage: `Password reset link successfully sent to ${email}. Please verify by clicking on the given link`,
            }
            return res.send(response);

        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static verifyResetToken = async (req: ExtendedRequest, res: Response) => {
        const resetToken = req.params.token;
        const developerId = req.params.developerId;
        try {
            let token = await Token.findOne({
                developerId: developerId,
                token: resetToken,
            })
            if (!token) {
                return res.status(400).send('Invalid Token or Expired');
            }
            return res.status(200).send({ msg: 'Token valid' });
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static resetPassword = async (req: ExtendedRequest, res: Response) => {
        const developerId = req.body.developerId;
        const password = await Encryption.encryptPassword(req.body.password);
        try {
            const developer: Developer = await Developers.findById(developerId);
            if (!developer) {
                return res.status(400).send("Not a valid user");
            }

            let validToken = await Token.findOne({ developerId: developerId });
            if (!validToken) {
                return res.status(400).send('Token expired');
            }
            else {
                await Developers.updateOne({ _id: developerId }, {
                    $set: {
                        password: password
                    }
                });
                await Token.deleteOne({
                    developerId: developer._id,
                });

                return res.send('password reset successfully');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }
}

const RegisterDeveloper = DeveloperController.registerDeveloper;
const VerifyEmailAndActivateAccount = DeveloperController.verifyEmailAndActivateAccount;
const LoginByEmailAndPassword = DeveloperController.loginByEmailAndPassword;
const ForgetPassword = DeveloperController.forgetPassword;
const VerifyResetToken = DeveloperController.verifyResetToken;
const ResetPassword = DeveloperController.resetPassword;

export {
    RegisterDeveloper,
    VerifyEmailAndActivateAccount,
    LoginByEmailAndPassword,
    ForgetPassword,
    VerifyResetToken,
    ResetPassword
}