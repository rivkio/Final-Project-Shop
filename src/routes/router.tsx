import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Register from "./Register";
import Products from "./products";
import Login from "./Login";
import { CarouselComponent } from "../components/Carousel ";
import Profile from "./Profile";
import Product from "./product";
import ProtectedRouteUser from "./ProtectedRouteUser";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import CreateProduct from "./CreateProduct";
import UpdateUser from "./UpdateUser";
import Users from "./Users";
import AdminProducts from "./AdminProducts";
import UpdeteProduct from "./UpdateProduct";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";




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
            {
                path: "/profile", element:
                    <ProtectedRouteUser>
                        <Profile />
                    </ProtectedRouteUser>
            },
            { path: "/products/:id", element: <Product />},
            {
                path: "/admin/create-product", element:
                    <ProtectedRouteAdmin>
                        <CreateProduct />
                    </ProtectedRouteAdmin>
            },
             {
                path: "/admin/products/:id", element:
                    <ProtectedRouteAdmin>
                        <UpdeteProduct />
                    </ProtectedRouteAdmin>
            },
            {
                path: "/admin/products", element:
                    <ProtectedRouteAdmin>
                        <AdminProducts />
                    </ProtectedRouteAdmin>
            },
            { path: "/admin/users", element: <Users /> },
            {
                path: "/users/:id", element:
                    <ProtectedRouteUser>
                        <UpdateUser />
                    </ProtectedRouteUser>
            },
            {
                path: "/cart", element: <Cart />,
            },
            {
                path: "/order-confirmation", element: < OrderConfirmation />
            },

        ],
    },
]);