import React from "react";
import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import { ROOT_GLOBAL } from '../globals/root';
import { foldersLoader } from '../utils/folderApi';
import { addNewNote, noteLoader, notesLoader, updateNote } from '../utils/noteApi';
import { Container } from '@mui/material';

const HomePage = React.lazy(() => import('../pages/Home'));
const LoginPage = React.lazy(() => import('../pages/Login'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));
const Note = React.lazy(() => import('../components/Note'));
const NoteList = React.lazy(() => import('../components/NoteList'));
const Header = React.lazy(() => import('../components/Header'));

function AuthLayout() {
  return (
    <AuthProvider >
      <Header />
      <Container style={{ textAlign: "center" }}>
        <Outlet />
      </Container>
    </AuthProvider >
  )
}

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginPage />,
        path: ROOT_GLOBAL.LOGIN,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <HomePage />,
            path: ROOT_GLOBAL.HOME,
            loader: foldersLoader,
            children: [
              {
                element: <NoteList />,
                path: ROOT_GLOBAL.FOLDER_ID,
                loader: notesLoader,
                action: addNewNote,
                children: [
                  {
                    element: <Note />,
                    path: ROOT_GLOBAL.NOTE_ID,
                    loader: noteLoader,
                    action: updateNote,
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
])