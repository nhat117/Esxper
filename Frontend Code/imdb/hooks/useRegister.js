import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useRegister() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const signup = async (values) => {
        setLoading(true);
        try {
            const { user } = await Auth.signUp({
                username: values.email,
                password: values.password,
                attributes: {
                    "custom:full_name": values.name,
                    // 'custom:USER_ID': "1"
                },
            });
            toast.success("🦄 Signed up successfully! Please login", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/login");
            console.log(user);
        } catch (error) {
            const e = "" + error;
            toast.error(e, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log("error signing up:", error);
        }
        setLoading(false);
    };

    // const confirm = (values, { setSubmitting }) => {
    // 	fetch('/api/confirm', {
    // 		method: 'POST',
    // 		headers: {
    // 			'Content-Type': 'application/json'
    // 		},
    // 		body: JSON.stringify(values)
    // 	}).then(res => {
    // 		if (!res.ok) throw res
    // 		router.push({
    // 			pathname: '/login',
    // 			query: { confirmed: true }
    // 		},
    // 			"/login")
    // 	}).catch(err => {
    // 		console.error(err)
    // 	}).finally(() => {
    // 		setSubmitting(false)
    // 	})
    // }

    return {
        signup,
        loading,
    };
}
