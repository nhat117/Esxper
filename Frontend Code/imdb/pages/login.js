import React, { useContext } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import Loader from "../components/Loader";
import { useRouter } from "next/router";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();
    const { login, loading } = useAuth();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>EXSPER - Login</title>
                <meta name="description" content="Home to the movie experts" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
                <div className="max-w-lg mx-auto">
                    <img
                        src="./logo_text.png"
                        width="50%"
                        height="50%"
                        onClick={() => router.push("/")}
                        style={{ cursor: "pointer" }}
                    />
                </div>

                <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-2xl">Welcome</h3>
                        <p className="text-gray-600 pt-2">Sign in to your account.</p>
                    </section>

                    <section className="mt-10">
                        <form className="flex flex-col" onSubmit={handleSubmit(login)}>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm mb-2 ml-3" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-500 transition duration-500 px-3 pb-3"
                                    required
                                />
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm mb-2 ml-3" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true, min: 8 })}
                                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-500 transition duration-500 px-3 pb-3"
                                    required
                                />
                            </div>
                            <button
                                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                                type="submit"
                            >
                                Log In
                            </button>
                            <div>
                                <Loader show={loading}></Loader>
                            </div>
                        </form>
                    </section>
                </div>

                <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                    <p className="text-white">
                        Don't have an account?{" "}
                        <Link href="/register">
                            <a className="font-bold hover:text-primary-100">Register here</a>
                        </Link>
                        .
                    </p>
                </div>

                <div className="max-w-lg mx-auto flex justify-center text-white">
                    <a href="#" className="hover:text-primary-100">
                        Contact
                    </a>
                    <span className="mx-3">•</span>
                    <a href="#" className="hover:text-primary-100">
                        Privacy
                    </a>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
