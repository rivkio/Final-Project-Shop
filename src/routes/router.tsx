import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Register from "./Register";
import Products from "./products";
import Login from "./Login";
import { CarouselComponent } from "../components/Carousel ";
import Profile from "./Profile";
import Product from "./product";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        /*     errorElement: <Error />, */
        children: [
            { index: true, element: <><CarouselComponent /><Products /></> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/carousel", element: <CarouselComponent /> },
            { path: "/profile", element: <Profile /> },
            { path: "/products/:id", element: <Product />},

        ],
    },
]);