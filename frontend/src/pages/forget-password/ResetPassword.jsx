import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { verifyResetToken, resetPassword } from '../../services/forgetpassword.service';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const { pathname } = useLocation();
    const token = pathname.split('/').reverse()[0];
    const userId = pathname.split('/').reverse()[1];

    const [loading, setLoading] = useState(true);
    const [resetPasswordDone, setResetPasswordDone] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatchPassword, setIsMatchPassword] = useState(true);
    const [validationState, setValidationState] = useState(false)
    const history = useHistory();



    const data = {
        userId: userId,
        password: password,
    }
    const updatePassword = async (e) => {
        e.preventDefault();
        setIsMatchPassword(password === confirmPassword);
        setValidationState(true);
        if (password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                resetPassword(data).then((res) => {
                    if (res.status === 200) {
                        toast.success('Password changed');
                        history.push('/login');
                    }
                });
            } else {
                toast.error('Password and Retyped password did not match', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    }

    useEffect(() => {
        const data = {
            userId: userId,
            token: token,
        }
        verifyResetToken(data)
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setResetPasswordDone(true);
                }
                else if (response.status === 400) {
                    setLoading(false);
                    setInvalid(true);
                }
            }).catch((err) => {
                console.log(err);
            });
    }, [userId, token]);
    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img className={classes.logo} src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' />
                    <img className={classes.navlogo} src={process.env.PUBLIC_URL + 'navlogo.png'} alt='logo' />
                    {
                        loading && !invalid && (
                            <>
                                <Grid container justifyContent='center' alignItems='center'>
                                    <CircularProgress />
                                </Grid>
                            </>
                        )
                    }
                    {
                        resetPasswordDone && !invalid && !loading && (
                            <>

                                <form className={classes.form} onSubmit={updatePassword}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        error={validationState && (password === '' || !isMatchPassword)}
                                        value={password}
                                        onInput={(e) => setPassword(e.target.value)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="re type assword"
                                        label="Retype Password"
                                        type="password"
                                        id="retype-password"
                                        error={validationState && (confirmPassword === '' || !isMatchPassword)}
                                        value={confirmPassword}
                                        onInput={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </>
                        )
                    }
                </div>
            </Container>
        </>
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