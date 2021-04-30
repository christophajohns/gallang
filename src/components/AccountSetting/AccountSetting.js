import PropTypes from "prop-types";
import { ButtonGroup } from "react-bootstrap";
import { Label, Input, Button } from "./style";

/**
 * Row to view and update one individual user property
 * @param {Object} props - Properties passed to the component
 * @param {string} props.label - Label for the user data to edit
 * @param {string} props.value - Value of the user data
 * @param {boolean} props.isEditing - Flag whether the user is currently editing the user property
 * @param {boolean} props.isLoading - Flag whether the change of the user property is currently being processed
 * @param {Function} props.onClickEdit - Function to be called when a user clicks on the edit button
 * @param {Function} props.onClickCancel - Function to be called when a user clicks on the cancel button
 * @param {Function} props.onClickSave - Function to be called when a user clicks on the save button
 * @param {Function} props.onChangeInput - Function to be called when the value in the input field changes
 */
function AccountSetting(props) {
    const {
        label,
        value,
        isEditing,
        isLoading,
        onClickEdit,
        onClickCancel,
        onClickSave,
        onChangeInput,
    } = props;

    return (
        <>
            <Label htmlFor={label} className="bold grey">
                {label.toUpperCase()}
            </Label>
            <Input
                type="text"
                name={label}
                id={label}
                readOnly={!isEditing || isLoading}
                value={value}
                onChange={onChangeInput}
            />
            {isEditing ? (
                <ButtonGroup>
                    <Button
                        variant="link"
                        disabled={isLoading}
                        onClick={onClickCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="link"
                        disabled={isLoading}
                        onClick={onClickSave}
                    >
                        Save
                    </Button>
                </ButtonGroup>
            ) : (
                <Button
                    variant="link"
                    disabled={isLoading}
                    onClick={onClickEdit}
                >
                    {isLoading ? "Saving…" : "Edit"}
                </Button>
            )}
        </>
    );
}

AccountSetting.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    onClickCancel: PropTypes.func.isRequired,
    onClickSave: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
};

export default AccountSetting;
