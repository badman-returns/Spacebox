import React, { useState } from 'react'
import { Container, Grid, TextField, CssBaseline, makeStyles, Button, Typography, CircularProgress } from '@material-ui/core';
import {forgetPassword} from '../../services/forgetpassword.service';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [linkSent, setlinkSent] = useState(false);
    const [validationState, setValidationState] = useState(false);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const submitEmail = (e) => {
        e.preventDefault();
        setValidationState(true)
        if (email !== '') {
            setLoading(true);
            forgetPassword(email).then(
                (res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        setlinkSent(true);
                        setLoading(false);
                    }
                }
            ).catch((err) => {
                console.log(err);
            })
        }

    }

    return (
        <div>
            <Container component="main" maxWidth={ 'xs'}>
                <CssBaseline />
                <div className={classes.paper}>
                    <img className={classes.logo} src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' />
                    <img className={classes.navlogo} src={process.env.PUBLIC_URL + 'navlogo.png'} alt='logo' />
                    <form className={classes.form} onSubmit={submitEmail}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    error={validationState && email === ''}
                                    onInput={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={linkSent ? "true" : ""}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </div>
                {
                    loading && !linkSent && (
                        <>
                            <Grid container justify='center' alignItems='center'>
                                <CircularProgress />
                            </Grid>
                        </>
                    )
                }
                 {linkSent && (
                    <>
                        <Typography component="h1" variant="h5">
                            Password reset mail has been sent to your email. Please click on the link to reset your password.
                        </Typography>
                    </>
                )}
            </Container>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: '60px'
    },
    logo: {
        '@media (max-width: 1280px)': {
            display: 'none',
        }
    },
    navlogo: {
        '@media (min-width: 1280px)': {
            display: 'none'
        }
    }
}));

export default ForgetPassword
