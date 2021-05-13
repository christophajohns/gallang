import PropTypes from "prop-types";
import User from "./User";
import Galleries from "./Galleries";
import LikedContent from "./LikedContent";
import AccountSettings from "./AccountSettings";
import AddGalleryModal from "../../components/AddGalleryModal";
import { refType } from "../../types";
import { ProfileViewMain, StyledTabs, StyledButton } from "./style";
import { Tab } from "react-bootstrap";

/**
 * Profile view to update a user's account and view all galleries
 * @param {Object} props - Properties passed to the view
 * @param {Object} props.user - Information about the currently logged in user
 * @param {string} props.user.displayName - Username of the currently logged in user
 * @param {string} props.user.creationTime - Creation date for the image
 * @param {Function | Object} props.galleries - Components to display the galleries
 * @param {Function} props.onClickDeleteAccount - Function to be called when a user clicks on the button to delete his account
 * @param {Function | Object} props.usernameSetting - Slot for components and elements to display and update the current user's display name
 * @param {Function | Object} props.emailSetting - Slot for components and elements to display and update the current user's email
 * @param {Function | Object} props.passwordSetting - Slot for components and elements to display and update the current user's password
 */
function ProfileView(props) {
    const {
        user,
        galleries,
        likedContent,
        usernameSetting,
        emailSetting,
        passwordSetting,
        onClickDeleteAccount,
        onClickAddGalleryButton,
        onRequestCloseModal,
        onRequestCreateGallery,
        showModal,
        galleryNameRef,
    } = props;

    return (
        <ProfileViewMain className="ProfileView">
            <User name={user.displayName} creationTime={user.creationTime} />
            <StyledTabs
                defaultActiveKey="profileGalleries"
                id="profileTabs"
                variant="pills"
            >
                <Tab eventKey="profileGalleries" title="My Galleries">
                    <StyledButton variant="outline-dark" onClick={onClickAddGalleryButton}>Add gallery</StyledButton>
                    <LikedContent likedContent={likedContent} />
                    <Galleries galleries={galleries} />
                </Tab>
                <Tab eventKey="profileSettings" title="Account Settings">
                    <AccountSettings
                        usernameSetting={usernameSetting}
                        emailSetting={emailSetting}
                        passwordSetting={passwordSetting}
                        onClickDeleteAccount={onClickDeleteAccount}
                    />
                </Tab>
            </StyledTabs>
            <AddGalleryModal
                showModal={showModal}
                onRequestCloseModal={onRequestCloseModal}
                onRequestCreateGallery={onRequestCreateGallery}
                galleryNameRef={galleryNameRef}
            />
        </ProfileViewMain>
    );
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
    }).isRequired,
    galleries: Galleries.propTypes.galleries,
    onClickDeleteAccount: PropTypes.func.isRequired,
    usernameSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    emailSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    passwordSetting: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        .isRequired,
    onClickAddGalleryButton: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    onRequestCloseModal: PropTypes.func,
    onRequestCreateGallery: PropTypes.func,
    galleryNameRef: refType.isRequired,
};

export default ProfileView;
