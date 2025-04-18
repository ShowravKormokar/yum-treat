import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root/Root.jsx";
import Home from './Pages/Home/Home.jsx';
import Menu from './Pages/Menus/Menu.jsx';
import Event from './Pages/Events/Event.jsx';
import Blogs from './Pages/Blogs/Blogs.jsx';
import About from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignUp from "./Pages/Signup/SignUp.jsx";
import Account from "./Pages/Account/Account.jsx";
import Product from "./Pages/Product/Product.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import SignOut from "./Pages/SignOut/SignOut.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menus',
        element: <Menu />
      },
      {
        path: '/events',
        element: <Event />
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/about_us',
        element: <About />
      },
      {
        path: '/contact_us',
        element: <Contact />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/product',
        element: <Product />
      }
    ]

  },
  {
    path: '/sign_in',
    element: <SignIn />
  },
  {
    path: '/sign_up',
    element: <SignUp />
  },
  {
    path: '/sign_out',
    element: <SignOut />
  }
]);

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <AuthProvider> {/* Wrap app inside AuthProvider */}
    <RouterProvider router={router} />
  </AuthProvider>
);