import Image from "next/image";
import React from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const GeneralInfo = ({ name, age, email, gender }) => {
    const GenderIcon = () => {
        if (gender == "F") return <FemaleIcon className="mb-1 text-error-400" />;
        if (gender == "M") return <MaleIcon className="mb-1 text-secondary-500" />;
    };

    return (
        <div>
            <div className="w-full mx-auto bg-gray-900 bg-opacity-50 backdrop-blur-2xl max-h-fit py-5 text-white">
                <div className="flex justify-center mb-5">
                    <Image src="/user.png" alt="user" width={200} height={200} className="rounded-full" />
                </div>
                <div>
                    <h4 className="text-2xl text-center">
                        {name}, {age}
                    </h4>
                    <p className="text-center text-gray-300">{email}</p>
                    <p className="text-center">
                        <GenderIcon />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GeneralInfo;
