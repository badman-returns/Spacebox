import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CssBaseline, CardContent, Typography, Avatar, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    contentImage: {
        width: '100%',
    },
    contentText: {
        fontSize: '15px',
        fontFamily: 'sans-serif',
        paddingTop: '10px 0px',
        letterSpacing: '1px',
    },
}));

const Post = ({ name, avatarURL, content, imageURL }) => {

    const classes = useStyles();
    return (
        <div>
            <Card>
                <CssBaseline />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
                                <Grid item>
                                    <Avatar src={avatarURL} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="h4">
                                        {name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="center" alignItems="center">
                                <Grid item xs={12}>
                                    <p className={classes.contentText}>
                                        {content}
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        imageURL && (<img className={classes.contentImage} src={imageURL} alt='postimage' />)
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Post;
