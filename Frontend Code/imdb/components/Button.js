const Button = ({ additionalStyle, route, text }) => {
    const style =
        additionalStyle +
        " rounded-xl w-fit flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium text-white md:py-3 md:px-6 mx-3 transition-colors";
    return (
        <button className={style} type="button" onClick={route}>
            {text}
        </button>
    );
};

export default Button;
