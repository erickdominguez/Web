import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './components/pages/Root';
import ErrorPage from './components/pages/ErrorPage';
import SongList from './UI/organisms/SongList';
import Playlists from './UI/organisms/Playlists'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme, Experimental_CssVarsProvider as CssVarsProvider,} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Playlists/>,
      },
      {
        path: "songList/:playlistId",
        element: <SongList/>,
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
