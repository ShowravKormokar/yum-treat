import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "./Root/Root.jsx";
import Home from './Pages/Home/Home.jsx';
import Menu from './Pages/Menus/Menu.jsx';
import Event from './Pages/Events/Event.jsx';
import Blogs from './Pages/Blogs/Blogs.jsx';
import About from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignUp from "./Pages/Signup/SignUp.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/home',
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
        path: '/contact',
        element: <Contact />
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
  }
]);

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);