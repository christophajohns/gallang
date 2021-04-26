import { ProfileView } from "../views";
import { AccountSettingPresenter } from "../presenters";
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
     * Wrapper function around the authentication model's updateProfile method for easier use
     * @param {string} newUsername - The new username (display name) for the user
     */
    async function updateUsername(newUsername) {
        await currentUser.updateProfile({
            displayName: newUsername,
        });
    }

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const usernameSetting = (
        <AccountSettingPresenter
            updateSetting={(newUsername) => updateUsername(newUsername)}
            label="username"
            initialValue={currentUser.displayName}
        />
    );
    const emailSetting = (
        <AccountSettingPresenter
            updateSetting={(newEmail) => currentUser.updateEmail(newEmail)}
            label="email"
            initialValue={currentUser.email}
        />
    );
    const passwordSetting = (
        <AccountSettingPresenter
            updateSetting={(newPassword) =>
                currentUser.updatePassword(newPassword)
            }
            label="password"
            initialValue="********"
        />
    );

    return (
        <ProfileView
            model={model}
            user={{
                ...currentUser,
                creationTime: formatDate(currentUser.metadata.creationTime),
            }}
            galleries={galleries.map((gallery) => ({
                ...gallery,
                images: gallery.imageIDs.map((imageID) => ({ id: imageID })),
            }))}
            usernameSetting={usernameSetting}
            emailSetting={emailSetting}
            passwordSetting={passwordSetting}
            onClickDeleteAccount={(e) => currentUser.delete()}
        />
    );
}

export default ProfilePresenter;
