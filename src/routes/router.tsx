import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import Main from '../layouts/Main';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Main />, children: [], errorElement: <NotFound /> },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [],
    errorElement: <NotFound />,
  },
]);

export default router;
