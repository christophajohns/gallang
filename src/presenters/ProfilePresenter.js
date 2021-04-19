import { ProfileView } from "../views";

/**
 * Presenter for the profile page.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function ProfilePresenter(props) {
    const { model } = props;

    const exampleUser = {
        email: "exampleuser@gallang.com",
        displayName: "Example User",
        creationTime: "2021-04-01",
    };
    const exampleGalleries = [
        {
            title: "Dark and Moody",
            id: "12345",
            imageIDs: ["18645651"],
        },
        {
            title: "Happy and Cheerful",
            id: "12346",
            imageIDs: ["2318797273", "18644717"],
        },
    ];

    return (
        <ProfileView
            model={model}
            user={exampleUser}
            galleries={exampleGalleries.map((gallery) => ({
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
