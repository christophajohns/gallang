import { ProfileView } from "../views";

/**
 * Presenter for the profile page.
 */
function ProfilePresenter() {
    const exampleUser = {
        email: "exampleuser@gallang.com",
        displayName: "Example User",
        creationTime: "2021-04-01",
    };
    const exampleGalleries = [
        {
            title: "Dark and Moody",
            id: "12345",
            imageIDs: [],
        },
        {
            title: "Happy and Cheerful",
            id: "12346",
            imageIDs: [],
        },
    ];

    return (
        <ProfileView
            user={exampleUser}
            galleries={exampleGalleries}
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
