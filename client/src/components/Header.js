import React from 'react';
import UserMenu from './UserMenu';
import Notification from './Notification';
import { Box, Container, Grid } from '@mui/material';

const Logo = require("../assets/icons/myLogo.png");

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
