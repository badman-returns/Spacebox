import { User } from "./user.model";

interface Recruiter extends User{
    company: string,
};

export {
    Recruiter,
};