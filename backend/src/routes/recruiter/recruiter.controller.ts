import { Encryption, Mailer } from '../../utility';
import { Response } from "express";
import { ExtendedRequest, ResponseObject, TokenObject, MailRequestModel, Recruiter } from "../../interfaces";
import { Recruiters, Token } from "../../models";

class RecruiterController {
    constructor() {

    }

    public static registerRecruiter = async (req: ExtendedRequest, res: Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const company = req.body.company;
        const password = Encryption.encryptPassword(req.body.password);

        let response: ResponseObject<any>;
        try {
            const recruiter = await Recruiters.create({
                name,
                email,
                company,
                password,
            });

            let token = await Token.findOne({ recruiterId: recruiter._id });
            if (!token) {
                token = new Token({
                    recruiterId: recruiter._id,
                    token: await Encryption.createToken({ recruiterId: recruiter._id })
                }).save();
            }
            token = await Token.find({ recruiterId: recruiter._id }, { token: 1 });
            const verificationLink = `${process.env.BASE_URL}/verify-email/${recruiter._id}/${token[0]._doc.token}`;
            const mailData: MailRequestModel = {
                reciever: {
                    to: email,
                    cc: [],
                    bcc: []
                },
                subject: `Easy Recruiter Account Email Verification`,
                content: `Please click on the link to verify your email address within one hour of recieving it:\n` +
                    `Activate your account by clicking on the link above\n\n` +
                    `${verificationLink}\n\n` +
                    `Regards\n` +
                    `Support Team` +
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
        const recruiterId = req.params.recruiterId;
        const activationToken = req.params.token;
        let response: ResponseObject<any>;
        try {
            const user: Recruiter = await Recruiters.findOne({ _id: recruiterId });
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
                let recruiter = user.toJSON();

                let validToken: TokenObject = await Token.findOne({
                    recruiterId: recruiterId,
                    token: activationToken
                });

                if (!validToken) {
                    return res.status(400).send('Invalid Token or Expired');
                }
                else {
                    await Recruiters.updateOne({ _id: recruiter._id }, {
                        $set: {
                            active: true
                        }
                    });
                    await Token.deleteOne({ recruiterId: recruiter._id });
                }
                response = {
                    ResponseData: null,
                    ResponseMessage: `User with  id ${recruiterId} is activated`
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

            const user: Recruiter = await Recruiters.findOne({ email: email });
            let recruiter: any = user;
            if (recruiter) {
                recruiter = user.toJSON();
            }
            if (!recruiter) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            } else if (recruiter && !Encryption.decryptPassword(password, recruiter.password)) {
                res.status(401).send({
                    Message: `Incorrect password!`,
                    Data: null,
                });
            } else if (recruiter && !recruiter.active) {
                res.status(401).send({
                    Message: `User account not activated yet`,
                    Data: null,
                });
            }
            else {
                delete recruiter.password;
                delete recruiter.createdOn;
                let token: any;
                try {
                    token = await Encryption.createToken(recruiter);
                } catch (err) {
                    console.log(err);
                    return res.status(500).end();
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', token);
                res.send(recruiter);
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
            const user: Recruiter = await Recruiters.findOne({ email: email });
            let recruiter = user.toJSON();
            if (!recruiter) {
                res.status(403).send({
                    Message: `You don't have account with us`,
                    Data: null,
                });
            }

            let token = await Token.findOne({ recruiterId: recruiter._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: await Encryption.createToken({ recruiterId: recruiter._id }),
                }).save();
            }
            token = await Token.find({ recruiterId: recruiter._id }, { token: 1 })
            const verificationLink = `${process.env.BASE_URL}/password-reset/${recruiter._id}/${token[0]._doc.token}`;
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
        const recruiterId = req.params.recruiterId;
        try {
            let token = await Token.findOne({
                recruiterId: recruiterId,
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
        const recruiterId = req.body.recruiterId;
        const password = await Encryption.encryptPassword(req.body.password);
        try {
            const recruiter: Recruiter = await Recruiters.findById(recruiterId);
            if (!recruiter) {
                return res.status(400).send("Not a valid user");
            }

            let validToken = await Token.findOne({ recruiterId: recruiterId });
            if (!validToken) {
                return res.status(400).send('Token expired');
            }
            else {
                await Recruiters.updateOne({ _id: recruiterId }, {
                    $set: {
                        password: password
                    }
                });
                await Token.deleteOne({
                    recruiterId: recruiter._id,
                });

                return res.send('password reset successfully');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }
}

const RegisterRecruiter = RecruiterController.registerRecruiter;
const VerifyEmailAndActivateAccount = RecruiterController.verifyEmailAndActivateAccount;
const LoginByEmailAndPassword = RecruiterController.loginByEmailAndPassword;
const ForgetPassword = RecruiterController.forgetPassword;
const VerifyResetToken = RecruiterController.verifyResetToken;
const ResetPassword = RecruiterController.resetPassword;

export {
    RegisterRecruiter,
    VerifyEmailAndActivateAccount,
    LoginByEmailAndPassword,
    ForgetPassword,
    VerifyResetToken,
    ResetPassword
}