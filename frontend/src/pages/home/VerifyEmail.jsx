import React, { useState, useEffect } from 'react';
import { useLocation, Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { VerifyEmailandActivateUser } from '../../services/register.service';

export default function VerifyEmail() {

    const { pathname } = useLocation();
    const token = pathname.split('/').reverse()[0];
    const userId = pathname.split('/').reverse()[1];

    const [loading, setLoading] = useState(true);
    const [activated, setActivated] = useState(false);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        const data = {
            userId: userId,
            token: token,
        }
        VerifyEmailandActivateUser(data)
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setActivated(true);
                }
                else {
                    setLoading(false);
                    setInvalid(true);
                }
            }).catch((err) => {
                console.log(err);
            });
    });
    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' />

                    {
                        loading && (
                            <>
                                <Grid container justify='center' alignItems='center'>
                                    <CircularProgress />
                                </Grid>
                            </>
                        )
                    }
                    {
                        activated && !loading && (
                            <>
                                <Grid container justify='center' alignItems='center'>
                                    <Typography component="h1" variant="h5">
                                        Your account is activated. You may login now.
                                    </Typography>
                                    <Typography component="h1" variant="h5">
                                        <Link to='/'>Sign In</Link>
                                    </Typography>
                                </Grid>
                            </>
                        )
                    }
                    {
                        invalid && !loading && (
                            <Grid container justify='center' alignItems='center'>
                                <Typography component="h1" variant="h5">
                                    Your account is activated or does not exist or Token is expired.
                                </Typography>
                            </Grid>
                        )
                    }

                </div>
            </Container>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: '#3f51b5',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
}));