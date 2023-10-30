import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';
import { ROOT_GLOBAL } from '../globals/root';
import NoteList from '../components/NoteList';
import Note from '../components/Note';
import { foldersLoader } from '../utils/folderApi';
import { addNewNote, noteLoader, notesLoader, updateNote } from '../utils/noteApi';
import Header from '../components/Header';
import { Container } from '@mui/material';

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