import { ProfileViewMain } from "./style";

/**
 * Profile view to update a user's account and view all galleries
 * @param {Object} props - Properties passed to the view
 * @param {Object} props.user - Information about the currently logged in user
 * @param {string} props.user.email - Email address of the currently logged in user
 * @param {string} props.user.displayName - Username of the currently logged in user
 * @param {string} props.user.creationTime - Creation date for the image
 * @param {Gallery[]} props.galleries - Array holding information about the user's galleries
 * @param {Function} props.onClickEditUserDisplayName - Function to be called when a user clicks on the button to edit his user display name
 * @param {Function} props.onClickEditUserEmail - Function to be called when a user clicks on the button to edit his email
 * @param {Function} props.onClickEditUserPassword - Function to be called when a user clicks on the button to edit his password
 * @param {Function} props.onClickDeleteAccount - Function to be called when a user clicks on the button to delete his account
 */
function ProfileView(props) {
    const {
        user,
        galleries,
        onClickEditUserDisplayName,
        onClickEditUserEmail,
        onClickEditUserPassword,
        onClickDeleteAccount,
    } = props;

    return (
        <ProfileViewMain className="ProfileView">
            This would be the profile view.
        </ProfileViewMain>
    );
}

export default ProfileView;
