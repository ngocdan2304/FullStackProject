import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Avatar, Box, Grid, Menu, MenuItem, Typography, } from '@mui/material';
import { FireBase } from '../utils/firebase';
import { LocalStorage } from '../models/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { ROOT_GLOBAL } from '../global/root';


export default function UserMenu() {
  const { user: { displayName, photoURL } } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOnLogout = (e) => {
    FireBase.signOut();
    setAnchorEl(null);
  }

  const handleOnClose = () => {
    setAnchorEl(null);
  }

  const handleOnClick = (e) => {
    if (LocalStorage.getUserToken()) {
      setAnchorEl(e.currentTarget);
    } else {
      FireBase.signInWithPopup(() => navigate(ROOT_GLOBAL.HOME));
    }
  }

  return (
    <Grid container sx={{ justifyContent: "right" }}>
      <Box onClick={handleOnClick} sx={{ display: "flex" }}>
        <Typography>{displayName}</Typography>
        <Avatar src={photoURL} sx={{ width: 24, height: 24, marginLeft: "8px" }}></Avatar>
      </Box>
      {displayName &&
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleOnClose}
          keepMounted
        >
          <MenuItem onClick={handleOnLogout}>Logout</MenuItem>
        </Menu>
      }
    </Grid>
  )
}
