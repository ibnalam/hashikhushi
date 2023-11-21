import React from 'react'
import Grid from '@mui/material/Grid';
import GroupList from './GroupList';
import Frindrequest from './Frindrequest';
import Friends from './Friends';
import Mygroup from './Mygroup'
import Userlist from './Userlist';
import BlockedUser from './BlockedUser';

const Homee = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <GroupList/>
      <Frindrequest/>
    </Grid>
    <Grid item xs={4}>
      <Friends/>
      <Mygroup/>
    </Grid>
    <Grid item xs={4}>
      <Userlist/>
      <BlockedUser/>
    </Grid>
    
  </Grid>
  )
}

export default Homee