import React from 'react'
import { Grid, CardContent, Typography, Card, Button } from '@material-ui/core'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const Profile = () => {
    let userGitInfo = useSelector((state => state.userGitInfo));
    let { avatar_url, name, bio } = userGitInfo.user;

    const useStyles = makeStyles((theme) => ({
        profilePic: {
            width: '20%',
            borderRadius: '50%',
        },
        editPicButton: {
            margin: '10px 0px',
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <div>
                <Card >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container justifyContent='center'>
                                    <Grid item xs={8}>
                                        <Grid container justifyContent='center'>
                                            <img src={avatar_url} className={classes.profilePic} alt='profile' />
                                        </Grid>
                                        <Grid container justifyContent='center'>
                                            <Button className={classes.editPicButton} variant='contained' color="primary" style={{ margin: 8 }}>Edit</Button>
                                        </Grid>
                                        <Grid container justifyContent='center'>
                                            <Typography variant='h4'>{name}</Typography>
                                        </Grid>
                                        <Grid container justifyContent='center'>
                                            <Typography variant='body2'>{bio}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile
