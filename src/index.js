import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./page/Home";
import Menu from "./page/Menu";
import Login from "./page/Login";
import Register from "./page/Register";
import Cart from "./components/Cart";
import Order from "./page/Order";
import Invoice from "./page/Invoice";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/Menu',
        element: <Menu />
    },
    {
        path: '/Login',
        element:<Login/>
    },
    {
        path: '/Register',
        element: <Register />
    }
    ,
    {
        path:'/Cart',
        element: <Cart/>
    }
    ,{
        path:'/Order',
        element:<Order/>
    }
    ,
    {
        path:'/Invoice',
        element:<Invoice/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
