import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EditMovie from './components/EditMovie';
import ErrorPage from './components/ErrorPage';
import Genres from './components/Genres';
import GraphQL from './components/GraphQL';
import Home from './components/Home';
import Login from './components/Login';
import ManageCatalogue from './components/ManageCatalogue';
import Movies from './components/Movies';
import Movie from './components/Movie';
import OneGenre from './components/OneGenre';

const router = createBrowserRouter([
  {
    path: "/natheneflix/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home /> },
      {
        path: "/natheneflix/movies",
        element: <Movies />,
      },
      {
        path: "/natheneflix/movies/:id",
        element: <Movie />,
      },
      {
        path: "/natheneflix/genres",
        element: <Genres />,
      },
      {
        path: "/natheneflix/genres/:id",
        element: <OneGenre />,
      },
      {
        path: "/natheneflix/admin/movie/0",
        element: <EditMovie />,
      },
      {
        path: "/natheneflix/admin/movies/:id",
        element: <EditMovie />,
      },
      {
        path: "/natheneflix/manage-catalogue",
        element: <ManageCatalogue />,
      },
      {
        path: "/natheneflix/graphql",
        element: <GraphQL />,
      },
      {
        path: "/natheneflix/login",
        element: <Login />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <RouterProvider router={router} basename="/natheneflix/" />
  //</React.StrictMode>
);
