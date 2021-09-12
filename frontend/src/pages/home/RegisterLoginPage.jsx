
import React from 'react';
import { Grid } from '@material-ui/core';
import RegisterLogin from '../../components/registerLogin/RegisterLogin';

export default function RegisterLoginPage() {

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
