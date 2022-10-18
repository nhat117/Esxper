import "../styles/globals.css";
import "../styles/MovieCarousel.css";
import "../styles/MovieDetails.css";
import "../styles/HomeMovieLists.css";
import "../styles/Search.css";
import "../styles/UserDashboard.css";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Amplify, Auth, Analytics, AWSKinesisProvider } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import { UserContext } from "../lib/context";
import { useUserData } from "../hooks/useUserData";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

Amplify.configure({ ...awsconfig, ssr: true });
Analytics.addPluggable(new AWSKinesisProvider());
Analytics.configure({
    AWSKinesis: {
        region: awsconfig.aws_project_region,
    },
});

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const { user } = useUserData();

    return (
        <UserContext.Provider value={user}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Component key={router.asPath} {...pageProps} />
        </UserContext.Provider>
    );
}

export default MyApp;
