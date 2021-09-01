import { User } from "./user.model";

interface Developer extends User{
    github: String,
    techStack: Array<String>,
}

export {
    Developer,
}