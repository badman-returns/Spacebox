import React from 'react'
import { Grid, Avatar, CardContent, Typography, Divider, Card } from '@material-ui/core'
import { useSelector } from "react-redux";

const Profile = () => {
    let userGitInfo = useSelector((state => state.userGitInfo));
    let { avatar_url } = userGitInfo.user;


    return (
        <div>
            <div>
                <Card >
                    <CardContent>
                        <Grid container>
                            
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile
