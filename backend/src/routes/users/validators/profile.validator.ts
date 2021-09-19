import { checkSchema } from "express-validator";
import { Github } from "../../../utility/github";
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