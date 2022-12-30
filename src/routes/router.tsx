import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Main />, children: [], errorElement: <NotFound /> },
]);

export default router;
