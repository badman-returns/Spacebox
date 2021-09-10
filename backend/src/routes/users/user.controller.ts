import { Response } from "express";
import { ExtendedRequest, ResponseObject } from "../../interfaces";
import cloudinary from 'cloudinary';
import { Users } from "../../models";

class UserController {
    constructor() {

    }

    public static addProfilePicture = async (req: ExtendedRequest, res: Response) => {
        const userId = req.params.id;
        const path = req.file;
        const loggedInUser = req.user;


        if (loggedInUser._id !== userId) {
            res.status(401).send({ msg: 'Unauthorized attempt' });
        }
        else {
            try {
                let response: ResponseObject<any>;

                const { public_id, url } = await cloudinary.v2.uploader.upload(path.path);
                const picId = public_id;
                const picURL = url;
                
                const user = await Users.updateMany({
                    userId,
                    picId,
                    picURL
                });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Image successfully uploaded',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).end()
            }
        }
    }
}
    
const AddProfilePicture = UserController.addProfilePicture;

export {
    AddProfilePicture,
}