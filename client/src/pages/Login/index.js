import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material"
import { LoginPageStyle } from "./styles";
import { useNavigate } from "react-router-dom";
import { ROOT_GLOBAL } from "../../global/root";
import { FireBase } from "../../utils/firebase";
import { LocalStorage } from "../../models/LocalStorage";
import { registerUser } from "../../utils/authApi";

function LoginPage() {
  const navigate = useNavigate();
  const token = LocalStorage.getUserToken();

  useEffect(() => {
    if (token) {
      navigate(ROOT_GLOBAL.HOME);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  function handleOnClick() {
    FireBase.signInWithPopup((data) => {
      const { user: { uid, displayName } } = data;
      registerUser({
        uid,
        name: displayName
      });
      navigate(ROOT_GLOBAL.HOME);
    });
  }

  if (token) {
    return;
  }

  return (
    <LoginPageStyle>
      <Typography sx={{ mb: "24px" }}>My App</Typography>
      <Button variant="outlined" onClick={handleOnClick}>Login with Google</Button>
    </LoginPageStyle>
  );
}

export default LoginPage;