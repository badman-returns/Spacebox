import { User } from "./user.model";

interface Developer extends User{
    github: string,
    techStack: Array<string>,
}

export {
    Developer,
}