import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Avatar, Divider } from '@material-ui/core';

const useStyles = makeStyles({

});


const Post = () => {
    const classes = useStyles();

    return (
        <div>
            <Card >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
                                <Grid item>
                                    <Avatar />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="h4">
                                        T S Goswami
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
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
