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
    UserDataLabel,
    UserDataValueInput,
    UserDataEditButton,
} from "./style";

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
 * @param {Object} props.model - The model holding the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function ProfileView(props) {
    const {
        user,
        galleries,
        onClickEditUserDisplayName,
        onClickEditUserEmail,
        onClickEditUserPassword,
        onClickDeleteAccount,
        model,
    } = props;

    return (
        <ProfileViewMain className="ProfileView">
            <User name={user.displayName} creationTime={user.creationTime} />
            <AccountSettings
                user={user}
                onClickEditUserDisplayName={onClickEditUserDisplayName}
                onClickEditUserEmail={onClickEditUserEmail}
                onClickEditUserPassword={onClickEditUserPassword}
                onClickDeleteAccount={onClickDeleteAccount}
            />
            <Galleries galleries={galleries} model={model} />
        </ProfileViewMain>
    );
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
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
    onClickEditUserDisplayName: PropTypes.func.isRequired,
    onClickEditUserEmail: PropTypes.func.isRequired,
    onClickEditUserPassword: PropTypes.func.isRequired,
    onClickDeleteAccount: PropTypes.func.isRequired,
    model: imagePresenterModelType,
};

/**
 * Section to view and update account settings
 * @param {Object} props - Properties passed to the component
 * @param {Object} props.user - Information about the currently logged in user
 * @param {string} props.user.email - Email address of the currently logged in user
 * @param {string} props.user.displayName - Username of the currently logged in user
 * @param {string} props.user.creationTime - Creation date for the image
 * @param {Function} props.onClickEditUserDisplayName - Function to be called when a user clicks on the button to edit his user display name
 * @param {Function} props.onClickEditUserEmail - Function to be called when a user clicks on the button to edit his email
 * @param {Function} props.onClickEditUserPassword - Function to be called when a user clicks on the button to edit his password
 * @param {Function} props.onClickDeleteAccount - Function to be called when a user clicks on the button to delete his account
 */
function AccountSettings(props) {
    const {
        user,
        onClickEditUserDisplayName,
        onClickEditUserEmail,
        onClickEditUserPassword,
        onClickDeleteAccount,
    } = props;

    return (
        <AccountSettingsSection>
            <h3 className="bold grey">Account settings</h3>
            <UserData
                user={user}
                onClickEditUserDisplayName={onClickEditUserDisplayName}
                onClickEditUserEmail={onClickEditUserEmail}
                onClickEditUserPassword={onClickEditUserPassword}
            />
            <DeleteAccountButton variant="link" onClick={onClickDeleteAccount}>
                Delete account
            </DeleteAccountButton>
        </AccountSettingsSection>
    );
}

AccountSettings.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
    }).isRequired,
    onClickEditUserDisplayName: PropTypes.func.isRequired,
    onClickEditUserEmail: PropTypes.func.isRequired,
    onClickEditUserPassword: PropTypes.func.isRequired,
    onClickDeleteAccount: PropTypes.func.isRequired,
};

/**
 * Row to view and update one individual user property
 * @param {Object} props - Properties passed to the component
 * @param {Object} props.label - Label for the user data to edit
 * @param {string} props.value - Value of the user data
 * @param {Function} props.editFunction - Function to be called when a user clicks on the button to edit his data
 * @param {boolean} [props.readonly = "true"] - Flag whether the input field should be readonly
 */
function UserDataRow(props) {
    const { label, value, editFunction, readonly = true } = props;

    return (
        <>
            <UserDataLabel htmlFor={label} className="bold grey">
                {label.toUpperCase()}
            </UserDataLabel>
            <UserDataValueInput
                type="text"
                name={label}
                id={label}
                readOnly={readonly}
                value={value}
            />
            <UserDataEditButton variant="link" onClick={editFunction}>
                Edit
            </UserDataEditButton>
        </>
    );
}

UserData.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    editFunction: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};

/**
 * Component displaying current user properties and options to update them
 * @param {Object} props - Properties passed to the component
 * @param {Object} props.user - Information about the currently logged in user
 * @param {string} props.user.email - Email address of the currently logged in user
 * @param {string} props.user.displayName - Username of the currently logged in user
 * @param {string} props.user.creationTime - Creation date for the image
 * @param {Function} props.onClickEditUserDisplayName - Function to be called when a user clicks on the button to edit his user display name
 * @param {Function} props.onClickEditUserEmail - Function to be called when a user clicks on the button to edit his email
 * @param {Function} props.onClickEditUserPassword - Function to be called when a user clicks on the button to edit his password
 * @param {Function} props.onClickDeleteAccount - Function to be called when a user clicks on the button to delete his account
 */
function UserData(props) {
    const {
        user,
        onClickEditUserDisplayName,
        onClickEditUserEmail,
        onClickEditUserPassword,
    } = props;

    return (
        <UserDataDiv>
            <UserDataRow
                label="username"
                value={user.displayName}
                editFunction={onClickEditUserDisplayName}
            />
            <UserDataRow
                label="email"
                value={user.email}
                editFunction={onClickEditUserEmail}
            />
            <UserDataRow
                label="password"
                value="********"
                editFunction={onClickEditUserPassword}
            />
        </UserDataDiv>
    );
}

UserData.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onClickEditUserDisplayName: PropTypes.func.isRequired,
    onClickEditUserEmail: PropTypes.func.isRequired,
    onClickEditUserPassword: PropTypes.func.isRequired,
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
