import { Response } from "express";
import { ExtendedRequest, ResponseObject } from "../../../interfaces";
import cloudinary from 'cloudinary';
import { Post, Users } from '../../../models';
class UserPostController {
    constructor() {

    }

    public static createPost = async (req: ExtendedRequest, res: Response) => {
        const content = req.body.content || null;
        const file = req.file;
        const userId = req.body.id;

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
            const post = await Post.find().sort({ createdOn: -1 }).populate('userId');

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

    public static editPost = async (req: ExtendedRequest, res: Response) => {
        const userId = req.body.userId;
        const postId = req.params.id;
        const content = req.body.content;
        const fileId = req.body.imageId;
        const file = req.file;

        let response: ResponseObject<any>;

        if (req.user._id !== userId) {
            res.status(401).send({
                msg: 'Unauthorized attempt'
            });
        } else {
            try {
                if (!file && !fileId) {
                    await Post.updateOne({ _id: postId }, {
                        $set: {
                            content,
                        }
                    });
                } else if (!fileId) {
                    const { public_id, url } = await cloudinary.v2.uploader.upload(file.path);
                    const imageId = public_id;
                    const imageURL = url;
                    await Post.updateOne({ _id: postId }, {
                        $set: {
                            content,
                            imageId,
                            imageURL
                        }
                    });
                    response = {
                        ResponseData: null,
                        ResponseMessage: 'Post successfully edited',
                    }
                }
                else {
                    await cloudinary.v2.uploader.destroy(fileId);
                    const { public_id, url } = await cloudinary.v2.uploader.upload(file.path);
                    const imageId = public_id;
                    const imageURL = url;
                    await Post.updateOne({ _id: postId }, {
                        $set: {
                            content,
                            imageId,
                            imageURL
                        }
                    });
                }
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Post successfully edited',
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
        }
    }

    public static getPostsByUserId = async (req: ExtendedRequest, res: Response) => {
        const userId = req.params.id;

        try {
            let response: ResponseObject<any>;
            const post = await Post.find({ userId: userId }).sort({ createdOn: -1 }).populate('userId');

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
const EditPost = UserPostController.editPost

export {
    CreatePost,
    GetPost,
    GetPostByUserId,
    DeletePostById,
    EditPost
}