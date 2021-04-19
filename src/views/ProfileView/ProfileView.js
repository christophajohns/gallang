import { Button } from "react-bootstrap";
import { HorizontalGridPresenter } from "../../presenters";
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
        <div>
            <div>Account settings</div>
            <UserData
                user={user}
                onClickEditUserDisplayName={onClickEditUserDisplayName}
                onClickEditUserEmail={onClickEditUserEmail}
                onClickEditUserPassword={onClickEditUserPassword}
            />
            <Button variant="link" onClick={onClickDeleteAccount}>
                Delete account
            </Button>
        </div>
    );
}

function UserDataRow(props) {
    const { label, value, editFunction } = props;

    return (
        <div>
            <div>{label.toUpperCase()}</div>
            <div>{value}</div>
            <Button variant="link" onClick={editFunction}>
                Edit
            </Button>
        </div>
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
        <div>
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
        </div>
    );
}

function User(props) {
    const { initial, name, creationTime } = props;

    return (
        <div>
            <div>{initial}</div>
            <div>
                <div>{name}</div>
                <div>Since {creationTime}</div>
            </div>
        </div>
    );
}

function Galleries(props) {
    const { galleries, model } = props;

    return (
        <div>
            <div>My Galleries</div>
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
