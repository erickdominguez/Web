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
import { SnackbarProvider } from 'notistack';
import LinearProgress from './UI/atoms/LinearProgress';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const ProtectedRouteArtist = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo?.role !== 'ASSOCIATE') {
    return <Navigate to='/' replace />;
  }

  return children;
};
const ProtectedRouteUser = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);
  if (!userToken) {
    return <Navigate to='/' replace />;
  }

  return children;
};
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
        element: (
          <ProtectedRouteUser>
            <LikedSongs />
          </ProtectedRouteUser>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRouteUser>
            <Profile />
          </ProtectedRouteUser>
        ),
      },
      {
        path: 'newAlbum',
        element: (
          <ProtectedRouteArtist>
            <CreateAlbums />
          </ProtectedRouteArtist>
        ),
      },
      {
        path: 'uploadSong',
        element: (
          <ProtectedRouteArtist>
            <UploadSong />
          </ProtectedRouteArtist>
        ),
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

    <Provider store={store}>
      <SnackbarProvider
        Components={{
          progress: LinearProgress,
        }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
