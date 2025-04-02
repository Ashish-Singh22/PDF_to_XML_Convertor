import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import History from "../pages/History";
import About from "../pages/About";
import Faq from "../pages/Faq";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "sign-up",
                element: <SignUp/>,
            },
            {
                path : "history/:id",
                element: <History/>
            },
            {
                path : "about",
                element: <About/>
            },
            {
                path : "faq",
                element: <Faq/>
            }
        ],
    },
]);

export default router;
