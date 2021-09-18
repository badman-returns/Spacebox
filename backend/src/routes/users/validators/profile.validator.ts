import axios from "axios";
import { checkSchema } from "express-validator";
import { ValidationResponder } from "../../../middleware/validation.response";

class UserProfileValidator {
    constructor() {

    }

    public static getProfileValidator() {
        return [
            ...checkSchema({
                id: {
                    in: ['params'],
                    errorMessage: `Id is missing`,
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }

    public static editProfileValidator() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    errorMessage: 'Name is missing',
                },
                bio: {
                    in: ['body'],
                    isString: true,
                    errorMessage: 'Bio is missing',
                },
                email: {
                    in: ['body'],
                    isString: true,
                    errorMessage: 'Email is missing',
                },
                githubId: {
                    in: ['body'],
                    isString: true,
                    custom: {
                        options: (value: string) => {
                            if (value)
                                return new Promise(async (resolve, reject) => {
                                    try {
                                        const response = await axios.get(`${process.env.GITHUB_API}/users/${value}`);
                                        if (response.status === 200) {
                                            resolve(true);
                                        }
                                    } catch (error) {
                                        reject(false);
                                    }
                                })
                        },
                        errorMessage: 'Github user not found',
                    },
                    errorMessage: 'Github id is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ]
    }
}
const GetProfileValidator = UserProfileValidator.getProfileValidator();
const EditProfileValidator = UserProfileValidator.editProfileValidator();

export {
    GetProfileValidator,
    EditProfileValidator
}