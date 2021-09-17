import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Copyright from '../copyright/Copyright';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { RegistrationService } from '../../services/register.service';
import BaseService from '../../services/base.service';
import { useDispatch } from "react-redux";
import { setUserInfo } from '../../store/actions/userActions';
import { useHistory } from 'react-router';

const RegisterLogin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [githubId, setGithubId] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationState, setValidationState] = useState(false);
    const [isMatchPassword, setIsMatchPassword] = useState(true);


    const [registrationSuccess, setRegistrationSuccess] = useState('');

    const isValidEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email !== '' && re.test(String(email).toLowerCase());
    };

    const handleRoleChange = (event) => {
        event.preventDefault();
        setRole(event.target.value);
    }

    const setState = () => {
        if (signIn) {
            setSignIn(false);
            setSignUp(true);
        }
        else if (signUp) {
            setSignUp(false);
            setSignIn(true);
        }
    }


    const handleRegisterAndLogin = (event) => {
        event.preventDefault();
        if (signUp && !signIn) {
            setIsMatchPassword(password === confirmPassword)
            setValidationState(true);
            if (name !== '' && isValidEmail() && password !== '' && confirmPassword !== '' && (githubId !== '' || company !== '')) {
                if (password === confirmPassword) {
                    sendRegistrationData();
                }
            }
        }
        else if (signIn && !signUp) {
            setValidationState(true);
            if (email !== '' && password !== '') {
                sendLoginData();
            }
        }

    }

    const sendRegistrationData = async () => {
        const registrationData = {
            name: name,
            email: email,
            password: password,
        }

        if (role === 'developer') {
            Object.assign(registrationData, { githubId: githubId });
            try {
                const response = await RegistrationService(registrationData);
                if (response.status === 200){
                    setRegistrationSuccess(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        else if (role === 'recruiter') {
            Object.assign(registrationData, { company: company });
            try {
                const response = await RegistrationService(registrationData);
                if (response.status === 200){
                    setRegistrationSuccess(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const sendLoginData = async () => {
        if (email !== '' && password !== '') {
            try {
                let response = await BaseService.login(email, password);
                dispatch(setUserInfo(response));
                history.push('/in/feed');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Container component="main" maxWidth={registrationSuccess ? 'lg' : 'xs'}>
            <CssBaseline />
            <div className={classes.paper}>
                <img  className={classes.logo} src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' />
                <img className={classes.navlogo} src={process.env.PUBLIC_URL + 'navlogo.png'} alt='logo' />
                {!registrationSuccess && (<form className={classes.form} onSubmit={handleRegisterAndLogin}>
                    <Grid container spacing={2}>
                        {signUp && (
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        autoComplete="name"
                                        name="Name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="Name"
                                        label="Full Name"
                                        autoFocus
                                        error={validationState && name === ''}
                                        onInput={(event) => setName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                        <Select
                                            labelId="Role"
                                            id="Role"
                                            label="Role"
                                            value={role}
                                            required='true'
                                            onChange={handleRoleChange}
                                            error={validationState && role === ''}
                                        >
                                            <MenuItem value={'developer'}>Developer</MenuItem>
                                            <MenuItem value={'recruiter'}>Recruiter</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                        )}
                        {signUp && role === 'developer' && (
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="github"
                                    label="Github Id"
                                    name="github"
                                    autoComplete="lname"
                                    error={validationState && githubId === ''}
                                    onInput={(event) => setGithubId(event.target.value)}
                                />
                            </Grid>
                        )}
                        {signUp && role === 'recruiter' && (
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="company"
                                    label="Company"
                                    name="company"
                                    autoComplete="lname"
                                    error={validationState && company === ''}
                                    onInput={(event) => setCompany(event.target.value)}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={validationState && email === ''}
                                onInput={(event) => setEmail(event.target.value)}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={validationState && (password === '' || !isMatchPassword)}
                                value={password}
                                onInput={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        {signUp && (
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    error={validationState && (confirmPassword === '' || !isMatchPassword)}
                                    value={confirmPassword}
                                    onInput={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        )}
                    </Grid>
                    {signIn && (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    )}
                    {signUp && (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    )}
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                {signIn && <Link href="#" variant="body2" onClick={setState}>
                                    Don't have an account? Sign Up
                                </Link>}
                                {signUp && <Link href="#" variant="body2" onClick={setState}>
                                    Have an account? Sign In
                                </Link>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                {signIn && <Link href="/#/forget-password" variant="body2">
                                    Forget Password
                                </Link>}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>)}
                {registrationSuccess && (
                    <Typography variant='h6'>{registrationSuccess}</Typography>
                )}
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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

export default RegisterLogin;