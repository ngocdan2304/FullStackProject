import { createContext, useEffect, useState } from 'react';
import { LocalStorage } from '../models/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { ROOT_GLOBAL } from '../globals/root';
import { FireBase } from '../utils/firebase';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = FireBase.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubcribed = FireBase.onIdTokenChanged((user) => {
      if (!user?.uid) {
        setUser({});
        LocalStorage.setLoginInfo();
        setIsLoading(false);
        navigate(ROOT_GLOBAL.LOGIN);
        return;
      }
      setUser(user);
      const { accessToken, uid } = user;
      LocalStorage.setLoginInfo({ token: accessToken, userId: uid });

      let token = LocalStorage.getUserToken();
      if (token && accessToken !== token) {
        window.location.reload();
      }
      setIsLoading(false);
    })

    return () => {
      unsubcribed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress sx={{ display: "flex", m: "50px auto" }} /> : children}
    </AuthContext.Provider>
  )
}