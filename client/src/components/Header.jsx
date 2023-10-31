import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Logo from '/src/assets/icons/myLogo.png';
import Notification from './Notification';
import UserMenu from './UserMenu';

// const UserMenu = React.lazy(() => import('./UserMenu'));
// const Notification = React.lazy(() => import('./Notification'));

export default function Header() {
  return (
    <Box sx={{ bgcolor: "white", boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}>
      <Container>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={3} >
            <img
              alt="logo"
              loading="lazy"
              src={Logo}
              height={60}
            />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <UserMenu />
            <Notification />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
