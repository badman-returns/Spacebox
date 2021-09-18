import { checkSchema } from 'express-validator';
import { User } from '../../interfaces';
import { Users } from '../../models';
import { ValidationResponder } from '../../middleware/validation.response';

class UserValidator {

    constructor() {

    }

    public static validateRegistrationData() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    exists: true,
                    isString: true,
                    errorMessage: 'Name is missing',
                },
                email: {
                    in: ['body'],
                    exists: true,
                    isEmail: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user: User = await Users.findOne({ email: value });
                                    if (user != null) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                });
                        },
                        errorMessage: 'Email already exist',
                    },
                    errorMessage: 'Email is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

    public static validateForgetPasswordData() {
        return [
            ...checkSchema({
                email: {
                    in: ['body'],
                    exists: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user = await Users.findOne({ email: value });
                                    if (!user) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                })
                        },
                        errorMessage: 'User does not exist',
                    },
                    errorMessage: 'Email Id is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

    public static validateUser() {
        return [
            ...checkSchema({
                userId: {
                    in: ['params'],
                    exists: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    const user = await Users.findOne({ _id: value });
                                    if (!user) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                })
                        },
                        errorMessage: 'User does not exist',
                    },
                    errorMessage: 'User Id is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }

    public static validateResetPassword() {
        return [
            ...checkSchema({
                userId: {
                    in: ['body'],
                    exists: true,
                    isString: true,
                    errorMessage: 'userId missing',
                },
                password: {
                    in: ['body'],
                    exists: true,
                    isString: true,
                    errorMessage: 'password missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
}

const ValidateRegistration = UserValidator.validateRegistrationData();
const ValidateForgetPassword = UserValidator.validateForgetPasswordData();
const ValidateUser = UserValidator.validateUser();
const ValidateResetPassword = UserValidator.validateResetPassword();

export {
    ValidateRegistration,
    ValidateForgetPassword,
    ValidateUser,
    ValidateResetPassword
}