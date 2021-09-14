
import React from 'react';
import { Grid } from '@material-ui/core';
import RegisterLogin from '../../components/registerLogin/RegisterLogin';

const RegisterLoginPage = () => {

  return (
    <div>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <RegisterLogin />
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisterLoginPage;