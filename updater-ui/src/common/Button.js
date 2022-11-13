import './Button.css';

export default function Button (props) {
    return <div {...props} className={`def-button ${props.className}`}>{props.children}</div>
}