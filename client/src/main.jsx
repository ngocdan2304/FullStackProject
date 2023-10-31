import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../src/globals/default.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);