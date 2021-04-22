import { ProfileView } from "../views";
import { useCurrentUser, useModelProperty } from "./customHooks";

/**
 * Presenter for the profile page.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function ProfilePresenter(props) {
    const { model } = props;

    const galleries = useModelProperty(model, "galleries");
    const currentUser = useCurrentUser();

    return (
        <ProfileView
            model={model}
            user={{
                ...currentUser,
                creationTime: currentUser.metadata.creationTime,
            }}
            galleries={galleries.map((gallery) => ({
                ...gallery,
                images: gallery.imageIDs.map((imageID) => ({ id: imageID })),
            }))}
            onClickEditUserDisplayName={(e) =>
                console.log("edit user display name requested")
            }
            onClickEditUserEmail={(e) =>
                console.log("edit user email requested")
            }
            onClickEditUserPassword={(e) =>
                console.log("edit user password requested")
            }
            onClickDeleteAccount={(e) =>
                console.log("delete user account requested")
            }
        />
    );
}

export default ProfilePresenter;
