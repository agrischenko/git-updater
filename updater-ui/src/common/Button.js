import './Button.css';

export default function Button ({enabled, className, children, onClick}) {
    return <div data-enabled={enabled} onClick={onClick}
                className={`def-button ${className}`}>
        {children}
    </div>
}