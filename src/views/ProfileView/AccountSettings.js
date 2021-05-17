import PropTypes from "prop-types";
import {
    AccountSettingsSection,
    UserDataDiv,
} from "./style";

/**
 * Section to view and update account settings
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onClickDeleteAccount - Function to be called when a user clicks on the button to delete his account
 * @param {Function | Object} props.usernameSetting - Slot for components and elements to display and update the current user's display name
 * @param {Function | Object} props.emailSetting - Slot for components and elements to display and update the current user's email
 * @param {Function | Object} props.passwordSetting - Slot for components and elements to display and update the current user's password
 */
function AccountSettings(props) {
    const {
        onClickDeleteAccount,
        usernameSetting,
        emailSetting,
        passwordSetting,
    } = props;

    return (
        <AccountSettingsSection>
            <UserDataDiv>
                {usernameSetting}
                {emailSetting}
                {passwordSetting}
            </UserDataDiv>
        </AccountSettingsSection>
    );
}

AccountSettings.propTypes = {
    onClickDeleteAccount: PropTypes.func.isRequired,
    usernameSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    emailSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    passwordSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
};

export default AccountSettings;
