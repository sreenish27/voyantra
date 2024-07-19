import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import SignUpOrLogin from 'SignUpOrLogin.jsx';
import './index.css';

//creating my client side routing
const router = createBrowserRouter([
  {
    path: `/`,
    element: <App/>,
  },
  {
    path: `/signuporlogin`,
    element: <SignUpOrLogin/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
