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

export default function Register() {
    const classes = useStyles();

    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);
    const [role, setRole] = useState('');

    function handleRoleChange(event) {
        event.preventDefault();
        setRole(event.target.value);
    }

    function setState() {
        if (signIn) {
            setSignIn(false);
            setSignUp(true);
        }
        else if (signUp) {
            setSignUp(false);
            setSignIn(true);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
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
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            {signIn && <Link href="#" variant="body2" onClick={setState}>
                                Don't have an account? Sign Up
                            </Link>}
                            {signUp && <Link href="#" variant="body2" onClick={setState}>
                                Have an account? Sign In
                            </Link>}
                        </Grid>
                    </Grid>
                </form>
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
}));