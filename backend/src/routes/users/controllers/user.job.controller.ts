import { Response } from "express";
import { ExtendedRequest, Job, ResponseObject } from "../../../interfaces";
import { Jobs } from '../../../models';

class UserJobController {
    constructor() {

    }

    public static createJob = async (req: ExtendedRequest, res: Response) => {
        const title = req.body.title;
        const description = req.body.description;
        const company = req.body.company;
        const location = req.body.location;
        const createdBy = req.body.userId;

        console.log(req.user.role);

        if (req.user._id !== createdBy || req.user.role !== 'recruiter') {
            res.status(401).send({
                msg: 'Unauthorized attempt'
            });
        }
        else {
            let response: ResponseObject<any>;
            try {
                await Jobs.create({
                    title,
                    description,
                    company,
                    location,
                    createdBy,
                });
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Job posted successfully',
                }
                return res.send(response);
            } catch (error) {
                return res.status(500).end();
            }
        }
    }

    public static getJobs = async (req: ExtendedRequest, res: Response) => {

        let response: ResponseObject<any>;
        try {
            const jobs = await Jobs.find().sort({ createdOn: -1 }).populate('createdBy');
            response = {
                ResponseData: jobs,
                ResponseMessage: 'Job fetched successfully',
            }
            return res.send(response);
        } catch (error) {
            return res.status(500).end();
        }
    }

    public static getJobsById = async (req: ExtendedRequest, res: Response) => {
        const userId = req.params.userId;
        let response: ResponseObject<any>;
        try {
            const jobs = await Jobs.find({ userId: userId }).sort({ createdOn: -1 }).populate('createdBy');
            response = {
                ResponseData: jobs,
                ResponseMessage: 'Job fetched successfully',
            }
            return res.send(response);
        } catch (error) {
            return res.status(500).end();
        }
    }

    public static editJobs = async (req: ExtendedRequest, res: Response) => {
        const userId = req.body.userId;
        const jobId = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const company = req.body.company;
        const location = req.body.location;
        let response: ResponseObject<any>;


        if (req.user._id !== userId || req.user.role !== 'recruiter') {
            res.status(401).send({
                msg: 'Unauthorized attempt'
            });
        } else {
            try {
                await Jobs.updateOne({ _id: jobId }, {
                    $set: {
                        title,
                        description,
                        company,
                        location,
                    }
                })
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Job edited succesfully'
                }
                return res.send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
        }
    }

    public static deleteJobs = async (req: ExtendedRequest, res: Response) => {
        const userId = req.params.userId;
        const jobId = req.params.jobId;
        let response: ResponseObject<any>;

        if (req.user._id !== userId || req.user.role !== 'recruiter') {
            res.status(401).send({
                msg: 'Unauthorized attempt'
            });
        } else {
            try {
                const job: (Job | any) = await Jobs.findById(jobId).populate('createdBy');
                if (job.createdBy.id !== userId) {
                    res.status(401).send({
                        msg: 'Unauthorized attempt'
                    });
                } else {
                    await Jobs.deleteOne({ _id: jobId });
                    response = {
                        ResponseData: null,
                        ResponseMessage: 'Job Deleted',
                    }
                    return res.send(response);
                }
            } catch (error) {
                console.log(error);
                return res.status(500).end()
            }
        }
    }
}

const CreateJob = UserJobController.createJob;
const GetJobs = UserJobController.getJobs;
const GetJobsById = UserJobController.getJobsById;
const DeleteJob = UserJobController.deleteJobs;
const EditJob = UserJobController.editJobs;
export {
    CreateJob,
    GetJobs,
    GetJobsById,
    DeleteJob,
    EditJob
}