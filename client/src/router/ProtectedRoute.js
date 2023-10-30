import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LocalStorage } from '../models/LocalStorage';
import { ROOT_GLOBAL } from '../global/root';

export default function ProtectedRoute() {
  const navigate = useNavigate();

  if (!LocalStorage.getUserToken()) {
    navigate(ROOT_GLOBAL.LOGIN);
    return;
  }

  return <Outlet />
}
