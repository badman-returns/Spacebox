import nodemailer, { SentMessageInfo } from 'nodemailer';
import { MailRequestModel } from '../interfaces';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = client.getAccessToken();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER_HOST,
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }
});

export class Mailer {

    constructor() {

    }
    public static async sendEmail(mailData: MailRequestModel): Promise<SentMessageInfo> {
        try {
            const email = {
                from: process.env.MAIL_USER,
                to: mailData.reciever.to,
                cc: mailData.reciever.cc,
                bcc: mailData.reciever.bcc,
                subject: mailData.subject,
                text: mailData.content,
                auth:{
                    user: process.env.MAIL_USER,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken,
                    expires: 1484314697598
                }
            };
            const response: SentMessageInfo = await transporter.sendMail(email);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }
}