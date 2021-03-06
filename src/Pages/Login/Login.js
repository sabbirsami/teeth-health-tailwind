import React, { useEffect } from "react";
import {
    useSignInWithGoogle,
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
const Login = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
        console.log(data);
    };

    const [signInWithGoogle, googleUser, googleLoading, googleError] =
        useSignInWithGoogle(auth);

    const [token] = useToken(googleUser || user);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    if (googleLoading || loading) {
        return <Loading></Loading>;
    }
    let signInError;
    if (googleError || error) {
        signInError = (
            <p className=" text-red-500">
                <small>{error?.message || googleError?.message}</small>
            </p>
        );
    }
    return (
        <div>
            <div className="flex h-screen justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">
                            Login
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is Required",
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: "Provide a valid Email",
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === "required" && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.email.message}
                                        </span>
                                    )}
                                    {errors.email?.type === "pattern" && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is Required",
                                        },
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Must be 6 characters or longer",
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === "required" && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.password.message}
                                        </span>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </label>
                            </div>
                            {signInError}
                            <input
                                className="btn  w-full max-w-xs"
                                type="submit"
                                value={"Login"}
                            />
                        </form>
                        <p>
                            <small>
                                Don't have account?{" "}
                                <Link className="text-primary" to="/signup">
                                    Create account
                                </Link>
                            </small>
                        </p>
                        <div className="divider">OR</div>
                        <button
                            className="btn btn-outline"
                            onClick={() => signInWithGoogle()}
                        >
                            Continue with google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
