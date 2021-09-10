import { Encryption, Mailer } from '../../utility';
import { Response } from "express";
import { ExtendedRequest, ResponseObject, TokenObject, MailRequestModel, User } from "../../interfaces";
import { Users, Token } from "../../models";

class CommonController {
    constructor() {

    }

    public static register = async (req: ExtendedRequest, res: Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const githubId = req.body.githubId || null;
        const techStack = req.body.techStack || null;
        const company = req.body.company || null;
        const password = Encryption.encryptPassword(req.body.password);
    
        let role;
        if (githubId == null && techStack == null) {
            role = 'recruiter';
        } else {
            role = 'developer';
        }

        let response: ResponseObject<any>;

        try {
            const user = await Users.create({
                name,
                email,
                role,
                githubId,
                techStack,
                company,
                password,
            });

            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: await Encryption.createToken({ userId: user._id }),
                }).save();
            }
            token = await Token.find({ userId: user._id }, { token: 1 })
            const verificationLink = `${process.env.BASE_URL}/verify-email/${user._id}/${token[0]._doc.token}`;
            const mailData: MailRequestModel = {
                reciever: {
                    to: email,
                    cc: [],
                    bcc: []
                },
                subject: `Easy Account Email Verification`,
                content: `Please click on the link to verify your email address within one hour of recieving it:\n` +
                    `Activate your account by clicking on the link above\n\n` +
                    `${verificationLink}\n\n` +
                    `Regards\n` +
                    `Support Team\n` +
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
        const userId = req.params.id;
        const activationToken = req.params.token;
        let response: ResponseObject<any>;
        try {
            const confirmUser: User = await Users.findOne({ _id: userId });
            if (!confirmUser) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                });
            }
            else if (confirmUser && confirmUser.active === true) {
                res.status(403).send({
                    Message: `Your account is already activated`,
                    Data: null,
                });
            }
            else {
                let user = confirmUser.toJSON();

                let validToken: TokenObject = await Token.findOne({
                    userId: userId,
                    token: activationToken
                });
    
                if (!validToken) {
                    return res.status(400).send('Invalid Token or Expired');
                }
                else {
                    await Users.updateOne({ _id: user._id }, {
                        $set: {
                            active: true
                        }
                    });
                    await Token.deleteOne({ userId: user._id });
                }
                response = {
                    ResponseData: null,
                    ResponseMessage: `User with  id ${userId} is activated`
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
            const confirmUser: User = await Users.findOne({ email: email });
            let user;
            if (confirmUser) {
                user = confirmUser.toJSON();
            }
            if (!user) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            } else if (user && !Encryption.decryptPassword(password, user.password)) {
                res.status(401).send({
                    Message: `Incorrect password!`,
                    Data: null,
                });
            } else if (user && !user.active) {
                res.status(401).send({
                    Message: `User account not activated yet`,
                    Data: null,
                });
            }
            else {
                delete user.password;
                delete user.createdOn;
                let token: any;
                try {
                    token = await Encryption.createToken(user);
                } catch (err) {
                    console.log(err);
                    return res.status(500).end();
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', token);
                res.send(user);
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
            const confirmUser: User = await Users.findOne({ email: email });
            let users = confirmUser.toJSON();
            if (!users) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            }

            let token = await Token.findOne({ userId: users._id });
            if (!token) {
                token = await new Token({
                    userId: users._id,
                    token: await Encryption.createToken({ userId: users._id }),
                }).save();
            }
            token = await Token.find({ userId: users._id }, { token: 1 })
            const verificationLink = `${process.env.BASE_URL}/password-reset/${users._id}/${token[0]._doc.token}`;
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
                    `Support Team` +
                    `Easy`
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
        const userId = req.params.userId;
        try {
            let token = await Token.findOne({
                userId: userId,
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
        const userId = req.body.userId;
        const password = await Encryption.encryptPassword(req.body.password);
        try {
            const user: User = await Users.findById(userId);
            if (!user) {
                return res.status(400).send("Not a valid user");
            }

            let validToken = await Token.findOne({ userId: userId });
            if (!validToken) {
                return res.status(400).send('Token expired');
            }
            else {
                await Users.updateOne({ _id: userId }, {
                    $set: {
                        password: password
                    }
                });
                await Token.deleteOne({
                    userId: user._id,
                });

                return res.send('password reset successfully');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }
}

const Register = CommonController.register;
const VerifyEmailAndActivateAccount = CommonController.verifyEmailAndActivateAccount;
const LoginByEmailAndPassword = CommonController.loginByEmailAndPassword;
const ForgetPassword = CommonController.forgetPassword;
const VerifyResetToken = CommonController.verifyResetToken;
const ResetPassword = CommonController.resetPassword;

export {
    Register,
    VerifyEmailAndActivateAccount,
    LoginByEmailAndPassword,
    ForgetPassword,
    VerifyResetToken,
    ResetPassword
}