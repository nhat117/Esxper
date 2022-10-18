import React from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../lib/context";
import { useState, useContext } from "react";
import Loader from "./Loader";
import { useUserData } from "../hooks/useUserData";
import SearchMovies from "./Search/SearchMovies";

const Header = () => {
    const router = useRouter();
    // const { user } = useContext(UserContext);
    const { logout } = useAuth();
    const { user, loading } = useUserData();

    return (
        <>
            <header>
                <nav
                    aria-label="menu nav"
                    className="pt-2 md:pt-1 pb-4 px-1 h-auto fixed w-full z-20 top-0 bg-opacity-75 bg-gray-900"
                >
                    <div className="flex flex-wrap items-center">
                        <div className="ml-2 flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                            <img
                                src="/logo_text.png"
                                width="50%"
                                height="50%"
                                onClick={() => router.push("/")}
                                style={{ cursor: "pointer" }}
                            />
                        </div>

                        <SearchMovies />

                        <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                            {user ? (
                                <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                                    <button
                                        className="rounded-xl bg-primary-400 hover:bg-primary-500
                                    w-fit flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium text-white md:py-3 md:px-6 mx-3 transition-colors"
                                        type="button"
                                        onClick={() => router.push("/user/dashboard")}
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        className="rounded-xl bg-white hover:bg-error-500
                                    w-fit flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium text-error-500 hover:text-white md:py-3 md:px-6 mx-3 transition-colors"
                                        type="button"
                                        onClick={() => logout()}
                                    >
                                        Sign Out
                                    </button>
                                </ul>
                            ) : loading ? (
                                <div></div>
                            ) : (
                                <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                                    <button
                                        className="rounded-xl bg-primary-400 hover:bg-primary-500
                                w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium text-white md:py-3 md:px-6 mx-3 transition-colors"
                                        type="button"
                                        onClick={() => router.push("/login")}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="rounded-xl bg-gray-700 hover:bg-gray-800
                                w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium text-white md:py-3 md:px-6 mx-3 transition-colors"
                                        type="button"
                                        onClick={() => router.push("/register")}
                                    >
                                        Register
                                    </button>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
