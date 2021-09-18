import { checkSchema } from "express-validator";
import { ValidationResponder } from "../../../middleware/validation.response";

class UserJobValidator {
    constructor(){

    }

    public static jobValidator(){
        return[
            ...checkSchema({
                userId: {
                    in: ['body'],
                    errorMessage: 'Id is missing',
                },
                title: {
                    in:['body'],
                    isString: true,
                    errorMessage: `Title is missing`,
                },
                description: {
                    in: ['body'],
                    isString: true,
                    errorMessage: 'Description is missing',
                },
                company: {
                    in: ['body'],
                    isString: true,
                    errorMessage: 'Company is missing',
                },
                location: {
                    in: ['body'],
                    isString: true,
                    errorMessage: 'Location is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }
    
    
}
const JobValidator = UserJobValidator.jobValidator();

export {
    JobValidator,
}