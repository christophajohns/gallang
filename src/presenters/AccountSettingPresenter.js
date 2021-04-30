import React from "react";
import PropTypes from "prop-types";
import { AccountSetting } from "../components";

/**
 * Presenter for the account setting component.
 * @param {Object} props - Properties passed to the component
 * @param {string} props.label - Label for the user data to edit
 * @param {string} props.initialValue - Initial value of the user data (used in the input field)
 * @param {Function} props.updateSetting - Function to be called when a user wants to save the edited changes
 */
function AccountSettingPresenter(props) {
    const { updateSetting, label, initialValue } = props;

    const [value, setValue] = React.useState(initialValue);
    const [isEditing, setIsEditing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    /**
     * Function to update the provided setting using the function passed through the component's
     * properties and set the state variables for isEditing and isLoading
     */
    async function updateSettingAndState() {
        setIsEditing(false);
        setIsLoading(true);
        await updateSetting(value);
        setIsLoading(false);
    }

    return (
        <AccountSetting
            isEditing={isEditing}
            isLoading={isLoading}
            onClickEdit={(e) => setIsEditing(true)}
            onClickSave={(e) => updateSettingAndState()}
            onClickCancel={(e) => setIsEditing(false)}
            label={label}
            value={value}
            onChangeInput={(e) => setValue(e.target.value)}
        />
    );
}

AccountSettingPresenter.propTypes = {
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    updateSetting: PropTypes.func.isRequired,
};

export default AccountSettingPresenter;
