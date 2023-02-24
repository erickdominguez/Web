import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './components/pages/Root';
import ErrorPage from './components/pages/ErrorPage';
import SongList from './UI/atoms/ElementList';
import Home from './UI/organisms/outlets/Home';
import Profile from './UI/organisms/outlets/Profile';
import reportWebVitals from './reportWebVitals';
import Albums from './UI/organisms/outlets/Albums';
import CreateAlbums from './UI/organisms/outlets/artist/CreateAlbums';
import UploadSong from './UI/organisms/outlets/artist/UploadSong';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LikedSongs from './UI/organisms/outlets/LikedSongs';
import { Provider } from 'react-redux';
import store from './app/store';
import AlbumsList from './UI/atoms/AlbumsList';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'songList/:playlistId',
        element: <SongList />,
      },
      {
        path: 'liked',
        element: <LikedSongs />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'newAlbum',
        element: <CreateAlbums />,
      },
      {
        path: 'uploadSong',
        element: <UploadSong />,
      },
      {
        path: 'albums',
        element: <Albums />,
        children: [
          {
            index: true,
            element: <AlbumsList />,
          },
          {
            path: ':id',
            element: <SongList />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
