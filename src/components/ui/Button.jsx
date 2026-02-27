import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    className = '',
    icon,
    fullWidth = false,
    ...props
}) => {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {icon && <span className="btn__icon">{icon}</span>}
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick} {...props}>
            {icon && <span className="btn__icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
