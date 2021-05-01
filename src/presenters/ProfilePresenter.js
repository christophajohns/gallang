import { ProfileView } from "../views";
import {
    AccountSettingPresenter,
    HorizontalGridPresenter,
} from "../presenters";
import { useCurrentUser, useModelProperty } from "./customHooks";

/**
 * Presenter for the profile page.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function ProfilePresenter(props) {
    const { model } = props;

    const galleries = useModelProperty(model, "galleries");
    const currentUser = useCurrentUser();

    /**
     * Wrapper function around the authentication model's methods to update an account
     * @param {"username" | "email" | "password"} property - The property of the account (user) to update
     * @param {string} newValue - The new value for the user
     */
    async function updateAccount(property, newValue) {
        if (property === "username") {
            await currentUser.auth.updateProfile({
                displayName: newValue,
            });
        } else if (property === "email") {
            await currentUser.auth.updateEmail(newValue);
        } else if (property === "password") {
            await currentUser.auth.updatePassword(newValue);
        }
        await refreshCurrentUserJSON(); // force refresh of currentUserJSON
    }

    /** Helper function to refresh user ID token to trigger state change for currentUserJSON and thereby re-render */
    async function refreshCurrentUserJSON() {
        await currentUser.auth.getIdToken(true); // force refresh of ID token to trigger state change in currentUserJSON
    }

    /** Function to reformat a stringified date */
    function formatDate(string) {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
    }

    const usernameSetting = (
        <AccountSettingPresenter
            updateSetting={(newUsername) =>
                updateAccount("username", newUsername)
            }
            label="username"
            initialValue={currentUser.auth.displayName}
        />
    );
    const emailSetting = (
        <AccountSettingPresenter
            updateSetting={(newEmail) => updateAccount("email", newEmail)}
            label="email"
            initialValue={currentUser.auth.email}
        />
    );
    const passwordSetting = (
        <AccountSettingPresenter
            updateSetting={(newPassword) =>
                updateAccount("password", newPassword)
            }
            label="password"
            initialValue="********"
        />
    );

    return (
        <ProfileView
            user={{
                ...currentUser.auth,
                creationTime: formatDate(
                    currentUser.auth.metadata.creationTime
                ),
            }}
            galleries={galleries.map((gallery) => (
                <HorizontalGridPresenter
                    key={gallery.id}
                    title={gallery.title}
                    href={`/gallery/${gallery.id}`}
                    images={gallery.imageIDs.map((imageID) => ({
                        id: imageID,
                    }))}
                    model={model}
                />
            ))}
            usernameSetting={usernameSetting}
            emailSetting={emailSetting}
            passwordSetting={passwordSetting}
            onClickDeleteAccount={(e) => currentUser.delete()}
        />
    );
}

export default ProfilePresenter;
