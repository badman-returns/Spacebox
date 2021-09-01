interface MailRequestModel {
    reciever: {
        to: string,
        cc: Array<string>,
        bcc: Array<string>
    },
    subject: string,
    content: string,
}

export {
    MailRequestModel,
}