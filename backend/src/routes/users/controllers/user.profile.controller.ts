import { Response } from "express";
import { ExtendedRequest, ResponseObject } from "../../../interfaces";
import cloudinary from 'cloudinary';
import { Users } from "../../../models";

class UserController {
    constructor() {

    }

    public static getProfileById = async (req: ExtendedRequest, res: Response) => {
        const userId = req.params.id;
        let response: ResponseObject<any>;

        try {
            const user = await Users.findById(userId);
            response = {
                ResponseData: user,
                ResponseMessage: 'Profile successfully fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static editProfile = async (req: ExtendedRequest, res: Response) => {
        const userId = req.user._id;
        const file = req.file;
        const name = req.body.name;
        const bio = req.body.bio;
        const email = req.body.email;
        const githubId = req.body.githubId;
        const techStack = req.body.techStack !== "" ? (req.body.techStack).split(',') : null;
        let response: ResponseObject<any>;
        try {
            if (!file) {
                await Users.updateOne({ _id: userId }, {
                    $set: {
                        name,
                        bio,
                        techStack,
                        email,
                        githubId,
                    }
                });
            } else {

                const { public_id, url } = await cloudinary.v2.uploader.upload(file.path, { width: 460, height: 460, gravity: "faces", crop: "fill" });
                const picId = public_id;
                const picURL = url;

                await Users.updateOne({ _id: userId }, {
                    $set: {
                        name,
                        bio,
                        email,
                        githubId,
                        picId,
                        picURL,
                        techStack
                    }
                });
            }

            response = {
                ResponseData: null,
                ResponseMessage: 'Profile edited successfully',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).end()
        }
    }
}

const EditProfile = UserController.editProfile;
const GetProfile = UserController.getProfileById;

export {
    EditProfile,
    GetProfile,
}