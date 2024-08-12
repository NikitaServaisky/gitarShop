import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorElement from './Pagas/ErrorElement';
import Root from './Pagas/Root';
import Home from './Pagas/Home';
import About from './Pagas/About';
import Account from './Pagas/Account';
import Contacts from './Pagas/Contats';
import Products from './Pagas/Products';
import Cart from './Pagas/Cart';
import RegisterForm from './controllers/RegisterForm/RegisterForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/account',
        element: <Account />,
        children: [
          {path: 'register',
          element: <RegisterForm />,}
        ]
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/contact',
        element: <Contacts />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },

  {
    path: '*',
    element: <ErrorElement />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
