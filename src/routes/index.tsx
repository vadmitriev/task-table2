import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import { MainPage } from '@/pages';
import { ChartPage } from '@/pages';
import { NotFoundPage } from '@/pages';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Navigate to="/data" /> },
        { path: 'data', element: <MainPage /> },
        { path: 'charts', element: <ChartPage /> },
        { path: '*', element: <NotFoundPage text="Страница не найдена" /> }
      ]
    }
  ]);
};

export default Router;
