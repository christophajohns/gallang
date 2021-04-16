import { InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { FormControl, InputGroupText } from "./style";
import { refType } from "../../types";

/**
 * Component to render a text input field for the authentication pages
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.icon - Icon component to prepend to the input field
 * @param {string} props.placeholder - Placeholder for the input field
 * @param {string} props.name - Name for the input field
 * @param {string} [props.type = "text"] - Type of the input field (e.g. text or password)
 * @param {React.MutableRefObject} props.ref - Reference for the input field
 */
function AuthInputField(props) {
    const { icon: Icon, placeholder, name, type = "text", authRef } = props;

    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroupText>
                    <Icon />
                </InputGroupText>
            </InputGroup.Prepend>
            <FormControl
                type={type}
                required
                placeholder={placeholder}
                name={name}
                ref={authRef}
            />
        </InputGroup>
    );
}

AuthInputField.propTypes = {
    icon: PropTypes.node.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    authRef: refType.isRequired,
};

export default AuthInputField;
