import axios from "axios"

class Github {
    constructor() {

    }

    public static verifyGithubAccount = async(githubId: string) => {
        try {
            const response = await axios.get(`${process.env.GITHUB_API}/users/${githubId}`);
            if (response.status === 200) {
                return true;
            }
            else{
                return false;
            }
        } catch (error) {
            return false;
        }
    }

}


export {
    Github,
}