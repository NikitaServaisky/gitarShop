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
import RegisterForm from './Pagas/RegisterForm/RegisterForm';
import LoginForm from './Pagas/LoginComponent/Login';
import { AuthProvider } from './controllers/AuthContext';
import ProtectedRoute from './controllers/ProtectedRoute';
import ForgotPassword from './Pagas/ForgotPassword';
import ResetPassword from './Pagas/ResetPasswordComponent/ResetComponent';

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
        path: 'about',
        element: <About />,
      },
      {
        path: 'account',
        element: <Account />,
        children: [
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'register',
            element: <RegisterForm />,
          },

          {
            path: '',
            element: (
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'contact',
        element: <Contacts />,
      },
      {
        path: 'cart',
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
