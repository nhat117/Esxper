import React from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import Link from "next/link";
import Loader from "../components/Loader";
import { useRouter } from "next/router";

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();
    const { signup, loading } = useRegister();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>EXSPER - Home to the movie experts</title>
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
                        <p className="text-gray-600 pt-2">Register for a new account.</p>
                    </section>

                    <section className="mt-10">
                        <form className="flex flex-col" onSubmit={handleSubmit(signup)}>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-sm mb-2 ml-3" htmlFor="name">
                                    <span className="text-gray-700">Name</span>{" "}
                                    <span className="text-error-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", { required: true })}
                                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-500 transition duration-500 px-3 pb-3"
                                    required
                                />
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm mb-2 ml-3" htmlFor="email">
                                    <span className="text-gray-700">Email</span>{" "}
                                    <span className="text-error-500">*</span>
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
                                    <span className="text-gray-700">Password</span>{" "}
                                    <span className="text-error-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true, min: 8 })}
                                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-500 transition duration-500 px-3 pb-3"
                                    required
                                />
                            </div>
                            {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm mb-2 ml-3" htmlFor="passwordConfirm"><span className="text-gray-700">Confirm Password</span> <span className="text-error-500">*</span></label>
                                <input type="passwordConfirm" id="passwordConfirm" 
                                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-500 transition duration-500 px-3 pb-3" required/>
                            </div> */}
                            <button
                                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                                type="submit"
                            >
                                Sign Up
                            </button>
                            <Loader show={loading}></Loader>
                        </form>
                    </section>
                </div>

                <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                    <p className="text-white">
                        Already had an account?{" "}
                        <Link href="/login">
                            <a className="font-bold hover:text-primary-100">Login here</a>
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

export default RegisterPage;
