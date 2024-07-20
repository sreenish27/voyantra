import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './pages/App.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import './index.css';
import MultiStepSignUp from './pages/MultiStepSignUp.jsx';

//creating my client side routing
const router = createBrowserRouter([
  {
    path: `/`,
    element: <App/>,
  },
  {
    path: '/signup',
    element: <SignUp/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: 'signup/multistep',
    element: <MultiStepSignUp/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
