import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Sideber from './Sideber';

const RootLayouts = () => {
  return (
    <>
    {/* <Outlet/> */}

    <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sideber/>
        </Grid>
        <Grid item xs={10}>
            <Outlet/>
        </Grid>
      </Grid>
    </>
  )
}

export default RootLayouts