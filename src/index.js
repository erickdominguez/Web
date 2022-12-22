import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './components/pages/Root';
import ErrorPage from './components/pages/ErrorPage';
import Sidebar from './UI/organisms/Sidebar';
import Navigation from './UI/organisms/Navigation';
import Player from './UI/organisms/Player';
import SongList from './UI/organisms/SongList';
import Playlists from './UI/organisms/Playlists'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
