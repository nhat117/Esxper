const Loader = ({ show }) => {
    return show ? (
        <div className="flex justify-center">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    ) : null;
};

export default Loader;
