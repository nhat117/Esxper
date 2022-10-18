import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

export function useUserData() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();

                if (userInfo) {
                    setUser(userInfo.attributes);
                }
            } catch (error) {
                //console.log(error)
                setUser(null);
            }
            setLoading(false);
        };

        getProfile();
    }, [user]);

    return { user, loading };
}
