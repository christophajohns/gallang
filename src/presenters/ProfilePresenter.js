import { ProfileView } from "../views";
import {
    AccountSettingPresenter,
    HorizontalGridPresenter,
} from "../presenters";
import { useModelProperty } from "./customHooks";
import { useHistory } from "react-router-dom";

/**
 * Presenter for the profile page.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function ProfilePresenter(props) {
    const { model } = props;

    const galleries = useModelProperty(model, "galleries");
    const currentUser = useModelProperty(model, "currentUser");
    const browserHistory = useHistory();

    /**
     * Wrapper function around the authentication model's methods to update an account
     * @param {"username" | "email" | "password"} property - The property of the account (user) to update
     * @param {string} newValue - The new value for the user
     */
    async function updateAccount(property, newValue) {
        if (property === "username") {
            await model.updateUserName(newValue);
        } else if (property === "email") {
            await model.updateEmail(newValue);
        } else if (property === "password") {
            await model.updatePassword(newValue);
        }
    }

    /** Function to reformat a stringified date */
    function formatDate(string) {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
    }

    /** Function to delete the current user and redirect to login */
    async function deleteUserAndRedirectToLogin() {
        browserHistory.push("/login");
        await currentUser.delete();
    }

    const usernameSetting = (
        <AccountSettingPresenter
            updateSetting={(newUsername) =>
                updateAccount("username", newUsername)
            }
            label="username"
            initialValue={currentUser.displayName}
        />
    );
    const emailSetting = (
        <AccountSettingPresenter
            updateSetting={(newEmail) => updateAccount("email", newEmail)}
            label="email"
            initialValue={currentUser.email}
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
                ...currentUser,
                creationTime: formatDate(currentUser.metadata.creationTime),
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
            onClickDeleteAccount={(e) => deleteUserAndRedirectToLogin()}
        />
    );
}

export default ProfilePresenter;
