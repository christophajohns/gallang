import PropTypes from "prop-types";
import {
    NavBar,
    Logo,
    ControlsDiv,
    AccountWrapper,
    Account,
    AccountOptions,
    AccountOption,
    NavSearch,
    UserName,
} from "./style";

/**
 * Navigation bar for the whole application
 * @param {Object} props - Properties passed to component
 * @param {boolean} [props.isLoggedIn=false] - Flag whether the user is currently logged in
 * @param {string} props.username - The username of the currently logged in user
 * @param {Function} [props.onAccountWrapperMouseEnter] - Function to be executed when a user's mouse enters the user icon
 * @param {Function} [props.onAccountOptionsMouseLeave] - Function to be executed when a user's mouse leaves the user account options
 * @param {React.MutableRefObject} props.accountOptionsRef - Reference to be used on the account options element (e.g. logout)
 */
function TopNav(props) {
    const {
        isLoggedIn = false,
        username,
        onAccountWrapperMouseEnter,
        onAccountOptionsMouseLeave,
        accountOptionsRef,
    } = props;

    const userInitial =
        isLoggedIn && username && username.charAt(0).toUpperCase();

    return (
        <NavBar sticky={false}>
            <Logo href="/">Gallang</Logo>
            {isLoggedIn && (
                <ControlsDiv>
                    <NavSearch />
                    <AccountWrapper onMouseEnter={onAccountWrapperMouseEnter}>
                        <Account>{userInitial}</Account>
                        <AccountOptions
                            className="hidden"
                            onMouseLeave={onAccountOptionsMouseLeave}
                            ref={accountOptionsRef}
                        >
                            <UserName>{username}</UserName>
                            <AccountOption>My account</AccountOption>
                            <AccountOption>Logout</AccountOption>
                        </AccountOptions>
                    </AccountWrapper>
                </ControlsDiv>
            )}
        </NavBar>
    );
}

TopNav.propTypes = {
    username: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool,
    onAccountWrapperMouseEnter: PropTypes.func,
    onAccountOptionsMouseLeave: PropTypes.func,
    accountOptionsRef: PropTypes.oneOfType([
        // Either a function
        PropTypes.func,
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
};

export default TopNav;