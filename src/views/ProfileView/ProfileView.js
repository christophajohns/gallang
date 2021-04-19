import { HorizontalGridPresenter } from "../../presenters";
import {
    AccountSettingsDiv,
    UserDiv,
    Account,
    ProfileViewMain,
    CreationTimeDiv,
    DeleteAccountButton,
    UserDataDiv,
    UserDataLabelDiv,
    UserDataValueDiv,
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
 * @param {GallangModel} props.model - Model keeping the application state
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

    const userInitial = user.displayName.charAt(0).toUpperCase();

    return (
        <ProfileViewMain className="ProfileView">
            <User
                initial={userInitial}
                name={user.displayName}
                creationTime={user.creationTime}
            />
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

function AccountSettings(props) {
    const {
        user,
        onClickEditUserDisplayName,
        onClickEditUserEmail,
        onClickEditUserPassword,
        onClickDeleteAccount,
    } = props;

    return (
        <AccountSettingsDiv>
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
        </AccountSettingsDiv>
    );
}

function UserDataRow(props) {
    const { label, value, editFunction } = props;

    return (
        <>
            <UserDataLabelDiv className="bold grey">
                {label.toUpperCase()}
            </UserDataLabelDiv>
            <UserDataValueDiv>{value}</UserDataValueDiv>
            <UserDataEditButton variant="link" onClick={editFunction}>
                Edit
            </UserDataEditButton>
        </>
    );
}

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

function User(props) {
    const { initial, name, creationTime } = props;

    return (
        <UserDiv>
            <Account>{initial}</Account>
            <div>
                <div className="bold">{name}</div>
                <CreationTimeDiv className="grey">
                    Since {creationTime}
                </CreationTimeDiv>
            </div>
        </UserDiv>
    );
}

function Galleries(props) {
    const { galleries, model } = props;

    return (
        <div>
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
        </div>
    );
}

export default ProfileView;
