import './Button.css';

function Button(props) {
    const {
        children, // Specify the content of your Button
    } = props;

    return (
        <button className="Button">{children}</button>
    );
}

export default Button;