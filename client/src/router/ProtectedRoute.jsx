import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LocalStorage } from '../models/LocalStorage';
import { ROOT_GLOBAL } from '../globals/root';

export default function ProtectedRoute() {

  if (!LocalStorage.getUserToken()) {
    return <Navigate to={ROOT_GLOBAL.LOGIN} />;
  }

  return <Outlet />
}
