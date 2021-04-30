import PropTypes from "prop-types";
import { HorizontalGridPresenter } from "../../presenters";
import { modelType as imagePresenterModelType } from "../../presenters/ImagePresenter";
import { imageType } from "../../types";
import {
    AccountSettingsSection,
    UserSection,
    Account,
    ProfileViewMain,
    CreationTimeDiv,
    DeleteAccountButton,
    UserDataDiv,
} from "./style";

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
            <AccountSettings
                usernameSetting={usernameSetting}
                emailSetting={emailSetting}
                passwordSetting={passwordSetting}
                onClickDeleteAccount={onClickDeleteAccount}
            />
            <Galleries galleries={galleries} model={model} />
        </ProfileViewMain>
    );
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
    }).isRequired,
    galleries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            images: PropTypes.arrayOf(imageType),
        })
    ),
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
            <h3 className="bold grey">Account settings</h3>
            <UserDataDiv>
                {usernameSetting}
                {emailSetting}
                {passwordSetting}
            </UserDataDiv>
            <DeleteAccountButton variant="link" onClick={onClickDeleteAccount}>
                Delete account
            </DeleteAccountButton>
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

/**
 * Component to display summary information about the currently logged in user
 * @param {Object} props - Properties passed to the component
 * @param {string} props.name - Username of the currently logged in user
 * @param {string} props.creationTime - Creation date for the image
 */
function User(props) {
    const { name, creationTime } = props;

    const initial = name.charAt(0).toUpperCase();

    return (
        <UserSection>
            <Account>{initial}</Account>
            <div>
                <div className="bold">{name}</div>
                <CreationTimeDiv className="grey">
                    Since {creationTime}
                </CreationTimeDiv>
            </div>
        </UserSection>
    );
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    creationTime: PropTypes.string.isRequired,
};

/**
 * Section to display the currently logged in user's galleries
 * @param {Object} props - Properties passed to the component
 * @param {Gallery[]} props.galleries - Array holding information about the user's galleries
 * @param {Object} props.model - The model holding the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function Galleries(props) {
    const { galleries, model } = props;

    return (
        <section>
            <h3 className="bold grey">My Galleries</h3>
            <div>
                {galleries.map((gallery) => (
                    <HorizontalGridPresenter
                        key={gallery.id}
                        title={gallery.title}
                        href={"/gallery/" + gallery.id}
                        images={gallery.images}
                        model={model}
                    />
                ))}
            </div>
        </section>
    );
}

Galleries.propTypes = {
    galleries: ProfileView.propTypes.galleries.isRequired,
    model: ProfileView.propTypes.model.isRequired,
};

/**
 * @typedef Gallery
 * @property {string} title - Name or title for the recommendation basis (e.g. medium, period, designer)
 * @property {Image[]} images - Array of objects or images that are being recommended
 * @property {string} id - Identifier of the gallery
 */

export default ProfileView;
