"use client";

import { Avatar, DarkThemeToggle, Dropdown, Navbar, Tooltip } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FiBox, FiUsers, FiTrendingUp, FiUser, FiShoppingCart, FiClipboard } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import Search from "../Search/Search";
import "./Navbar.scss";
import useCart from "../../hooks/useCart";



const Nav = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="#">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Rivki Ozeri</span>
            </Navbar.Brand>

            <div className="flex md:order-2 items-center">
                <div className="mr-8">
                    <Search />
                </div>

                <Link to="/cart" className="mr-4">
                    <Tooltip
                        content="View Cart"
                        placement="top"
                        className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                    >
                        <div className="relative">
                            <FiShoppingCart size={24} className={cart && cart.totalQuantity > 0 ? "text-red-500" : "text-gray-300"} />
                            {cart && cart.totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                                    {cart.totalQuantity}
                                </span>
                            )}
                        </div>
                    </Tooltip>
                </Link>

                {isLoggedIn && user && (
                    <Link to="/orders" className="mr-4">
                        <Tooltip
                            content="View Orders"
                            placement="top"
                            className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                        >
                            <FiClipboard size={24} className="text-gray hover:text-gray-300" />
                        </Tooltip>
                    </Link>
                )}

                {isLoggedIn && user?.isAdmin && (
                    <>
                        <Link to="/admin/products" className="mr-4 hidden md:block">
                        <Tooltip
                            content="Manage Products"
                            placement="top"
                            className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                        >
                            <FiBox size={24} className="text-gray hover:text-gray-300" />
                        </Tooltip>
                    </Link>
                        <Link to="/admin/users" className="mr-4 hidden md:block">
                            <Tooltip
                                content="Manage Users"
                                placement="top"
                                className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                            >
                                <FiUsers size={24} className="text-gray hover:text-gray-300" />
                            </Tooltip>
                        </Link>
                        <Link to="/admin/analytics" className="mr-8 hidden md:block">
                            <Tooltip
                                content="Analytics"
                                placement="top"
                                className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                            >
                                <FiTrendingUp size={24} className="text-gray hover:text-gray-300" />
                            </Tooltip>
                        </Link>
                    </>
                )}


                {isLoggedIn && user && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="../../../img/rivki2.jpg" rounded />
                            // https://flowbite.com/docs/images/people/profile-picture-5.jpg
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name.first} {user.name.last}</span>
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => navigate(`/users/${user._id}`)}>Update Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/orders")}>My Orders</Dropdown.Item>
                        <Dropdown.Item onClick={() => { logout(); navigate("/"); }}> Sign out </Dropdown.Item>
                        {user.isAdmin && (
                            <>
                                <Dropdown.Divider className="block md:hidden" />
                                <Dropdown.Item onClick={() => navigate("/admin/products")} className="block md:hidden">
                                    <FiBox size={20} className="mr-2" /> Manage Products
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate("/admin/users")} className="block md:hidden">
                                    <FiUsers size={20} className="mr-2" /> Manage Users
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate("/admin/analytics")} className="block md:hidden">
                                    <FiTrendingUp size={20} className="mr-2" /> Analytics
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown>

                )}


                {!isLoggedIn && (
                    <Tooltip content="Login" placement="bottom" className="text-xs bg-gray-800 text-white rounded px-1 py-1">
                        <Link to="/login" className="mr-4 flex items-center">
                            <FiUser size={24} className="text-gray hover:text-gray-300" />
                        </Link>
                    </Tooltip>
                )}


                <Navbar.Toggle />
                <DarkThemeToggle className="ml-2" />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;