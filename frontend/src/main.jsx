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
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { CategoryProvider } from "./Context/CategoryContext.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import FoodAddForm from "./dashboard/Dash-components/FoodAddForm.jsx";
import DashboardHome from "./dashboard/DashboardHome.jsx";
import FoodsProvider from "./Context/FoodsContext.jsx";
import EditFoods from "./dashboard/Dash-components/EditFoods.jsx";
import EditFood from "./dashboard/Dash-pages/EditFood.jsx";

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
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        )
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
  },
  {
    path: '/admin-dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <DashboardHome /> // This would render the InfoCards and OrderCards
      },
      {
        path: 'add-foods',
        element: <FoodAddForm />
      },
      {
        path: 'edit-foods',
        element: <EditFoods />
      },
      {
        path: 'add-foods',
        element: <FoodAddForm />
      },
      {
        path: 'add-foods',
        element: <FoodAddForm />
      },
      {
        path: 'edit-food/:id',
        element: <EditFood />
      }
    ]
  }

]);

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <AuthProvider>
    <CategoryProvider>
      <FoodsProvider>
        <RouterProvider router={router} />
      </FoodsProvider>
    </CategoryProvider>
  </AuthProvider>
);