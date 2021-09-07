
import { Grid } from '@material-ui/core';
import RegisterLogin from '../../components/registerLogin/RegisterLogin';
import { makeStyles } from '@material-ui/core/styles';

export default function RegisterLoginPage() {
  const classes = useStyles();
  return (
    <div>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6} >
          <RegisterLogin />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={12}>
              <img className={classes.developerImg} src={process.env.PUBLIC_URL + 'dev.svg'} alt='Developer' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <h1 >Platform for developers and recruiters</h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  developerImg: {
    padding: '90px 10px',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto Slab',

  }
});