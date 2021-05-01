import PropTypes from "prop-types";
import { modelType as imagePresenterModelType } from "../../presenters/ImagePresenter";
import { imageType } from "../../types";
import { ProfileViewMain, StyledTabs } from "./style";
import User from "./User";
import Galleries from "./Galleries";
import AccountSettings from "./AccountSettings";
import { Tab } from "react-bootstrap";

/**
 * Profile view to update a user's account and view all galleries
 * @param {Object} props - Properties passed to the view
 * @param {Object} props.user - Information about the currently logged in user
 * @param {string} props.user.displayName - Username of the currently logged in user
 * @param {string} props.user.creationTime - Creation date for the image
 * @param {Gallery[]} props.galleries - Array holding information about the user's galleries
 * @param {Object} props.model - The model holding the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 * @param {Function} props.onClickDeleteAccount - Function to be called when a user clicks on the button to delete his account
 * @param {Function | Object} props.usernameSetting - Slot for components and elements to display and update the current user's display name
 * @param {Function | Object} props.emailSetting - Slot for components and elements to display and update the current user's email
 * @param {Function | Object} props.passwordSetting - Slot for components and elements to display and update the current user's password
 */
function ProfileView(props) {
    const {
        user,
        galleries,
        model,
        usernameSetting,
        emailSetting,
        passwordSetting,
        onClickDeleteAccount,
    } = props;

    return (
        <ProfileViewMain className="ProfileView">
            <User name={user.displayName} creationTime={user.creationTime} />
            <StyledTabs
                defaultActiveKey="profileGalleries"
                id="profileTabs"
                variant="pills"
            >
                <Tab eventKey="profileGalleries" title="My Galleries">
                    <Galleries galleries={galleries} model={model} />
                </Tab>
                <Tab eventKey="profileSettings" title="Account Settings">
                    <AccountSettings
                        usernameSetting={usernameSetting}
                        emailSetting={emailSetting}
                        passwordSetting={passwordSetting}
                        onClickDeleteAccount={onClickDeleteAccount}
                    />
                </Tab>
            </StyledTabs>
        </ProfileViewMain>
    );
}

export const galleryType = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(imageType),
});

ProfileView.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
    }).isRequired,
    galleries: PropTypes.arrayOf(galleryType),
    onClickDeleteAccount: PropTypes.func.isRequired,
    model: imagePresenterModelType,
    usernameSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    emailSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    passwordSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
};

/**
 * @typedef Gallery
 * @property {string} title - Name or title for the recommendation basis (e.g. medium, period, designer)
 * @property {Image[]} images - Array of objects or images that are being recommended
 * @property {string} id - Identifier of the gallery
 */

export default ProfileView;
