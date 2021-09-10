import { Response } from "express";
import { ExtendedRequest, ResponseObject } from "../../interfaces";
import cloudinary from 'cloudinary';
import { Post } from '../../models';
class UserPostController {
    constructor() {

    }

    public static createPost = async (req: ExtendedRequest, res: Response) => {
        const content = req.body.content;
        const file = req.file;
        const userId = req.body.id;
        const name = req.user.name;
        const username = 'tsgoswami';
        const avatarURL = req.user.picURL;

        if (req.user._id !== userId) {
            res.status(401).send({
                msg: 'Unauthorized attempt'
            });
        }
        else {
            try {
                let response: ResponseObject<any>;
                let imageId;
                let imageURL;
                if (file) {
                    const { public_id, url } = await cloudinary.v2.uploader.upload(file.path);
                    imageId = public_id;
                    imageURL = url;
                }

                const post = await Post.create({
                    userId,
                    name,
                    username,
                    avatarURL,
                    content,
                    imageId,
                    imageURL
                });
                response = {
                    ResponseData: post,
                    ResponseMessage: 'Image successfully uploaded',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).end()
            }
        }
    }

    public static getPosts = async (req: ExtendedRequest, res: Response) => {
        try {
            let response: ResponseObject<any>;
            const post = await Post.find().sort({ createdOn: -1 });

            response = {
                ResponseData: post,
                ResponseMessage: 'Posts fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }

    }

    public static getPostsByUserId = async (req: ExtendedRequest, res: Response) => {
        const userId = req.params.id;

        try {
            let response: ResponseObject<any>;
            const post = await Post.find({ userId: userId }).sort({ createdOn: -1 });

            response = {
                ResponseData: post,
                ResponseMessage: 'Posts fetched',
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static deletePostById = async (req: ExtendedRequest, res: Response) => {
        const postId = req.params.id;
        const imageId = req.body.imageId;
        const userId = req.body.userId;

        if (req.user._id !== userId) {
            res.status(401).send({
                msg: 'Unauthorized attempt'
            });
        }
        else {
            try {
                let response: ResponseObject<any>;
                if (imageId && imageId !== null) {
                    await cloudinary.v2.uploader.destroy(imageId);
                }
                await Post.deleteOne({ _id: postId });

                response = {
                    ResponseData: null,
                    ResponseMessage: 'Post successfully deleted',
                }
                return res.send(response);

            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
        }
    }
}


const CreatePost = UserPostController.createPost;
const GetPost = UserPostController.getPosts;
const GetPostByUserId = UserPostController.getPostsByUserId;
const DeletePostById = UserPostController.deletePostById;

export {
    CreatePost,
    GetPost,
    GetPostByUserId,
    DeletePostById
}