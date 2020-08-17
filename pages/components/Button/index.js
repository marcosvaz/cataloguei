const Button = ({ children, outline, onClick }) => {
    return (
        <button className={`button ${outline ? 'outline' : ''}`} onClick={() => onClick()}>
          {children}
        </button>
    );
}

export default Button;