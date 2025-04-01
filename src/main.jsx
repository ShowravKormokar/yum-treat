// import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import './index.css'
import App from "./App.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "./components/Root.jsx";
import Header from "./components/Header.jsx";

const root = document.getElementById("root");


let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
]);

ReactDOM.createRoot(root).render(

  <RouterProvider router={router} />

);






// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
