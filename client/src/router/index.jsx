import React from "react";
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ROOT_GLOBAL } from '../globals/root';
import { foldersLoader } from '../utils/folderApi';
import { addNewNote, noteLoader, notesLoader, updateNote } from '../utils/noteApi';
import { Container } from '@mui/material';
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage/index";
import ErrorPage from "../pages/ErrorPage/index";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import ErrorPage1 from "../pages/ErrorPage1";

// const AuthProvider = React.lazy(() => import('../context/AuthProvider'));
// const ProtectedRoute = React.lazy(() => import('./ProtectedRoute'));
// const HomePage = React.lazy(() => import('../pages/Home/index'));
// const LoginPage = React.lazy(() => import('../pages/Login'));
// const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));
// const Note = React.lazy(() => import('../components/Note'));
// const NoteList = React.lazy(() => import('../components/NoteList'));
// const Header = React.lazy(() => import('../components/Header'));

function AuthLayout() {
  return (
    <AuthProvider>
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
    // errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginPage />,
        path: ROOT_GLOBAL.LOGIN,
      },
      {
        element: <ErrorPage />,
        path: "error",
      },
      {
        element: <ErrorPage1 />,
        path: "error1",
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