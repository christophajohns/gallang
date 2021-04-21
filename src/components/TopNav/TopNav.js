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
 * @param {boolean} props.isLoggedIn - Flag whether the user is currently logged in
 * @param {string} [props.username = "Anonymous Designer"] - The username of the currently logged in user (null if user is not logged in)
 * @param {Function} [props.onAccountWrapperMouseEnter] - Function to be executed when a user's mouse enters the user icon
 * @param {Function} [props.onAccountOptionsMouseLeave] - Function to be executed when a user's mouse leaves the user account options
 * @param {React.MutableRefObject} props.accountOptionsRef - Reference to be used on the account options element (e.g. logout)
 * @param {Function} props.onSearchInput - Function to call when the text inside the search input field changes
 * @param {Function} props.onSearch - Function to call when the user hits enter inside the search input field
 * @param {Function} props.onLogoutRequest - Function to call when a user requests a logout (clicks the logout button)
 */
function TopNav(props) {
    const {
        isLoggedIn,
        onAccountWrapperMouseEnter,
        onAccountOptionsMouseLeave,
        accountOptionsRef,
        onSearchInput,
        onSearch,
        onLogoutRequest,
    } = props;

    const username = props.username ? props.username : "Anonymous Designer";

    const userInitial =
        isLoggedIn && username && username.charAt(0).toUpperCase();

    return (
        <NavBar sticky={false}>
            <Logo to="/">Gallang</Logo>
            {isLoggedIn && (
                <ControlsDiv>
                    <NavSearch
                        placeholder="Search"
                        onInput={onSearchInput}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") onSearch();
                        }}
                    />
                    <AccountWrapper onMouseEnter={onAccountWrapperMouseEnter}>
                        <Account>{userInitial}</Account>
                        <AccountOptions
                            className="hidden"
                            onMouseLeave={onAccountOptionsMouseLeave}
                            ref={accountOptionsRef}
                        >
                            <UserName>{username}</UserName>
                            <Link to="/profile">
                                <AccountOption>My account</AccountOption>
                            </Link>
                            <Link to="/login">
                                <AccountOption onClick={onLogoutRequest}>
                                    Logout
                                </AccountOption>
                            </Link>
                        </AccountOptions>
                    </AccountWrapper>
                </ControlsDiv>
            )}
        </NavBar>
    );
}

TopNav.propTypes = {
    username: PropTypes.string,
    onAccountWrapperMouseEnter: PropTypes.func,
    onAccountOptionsMouseLeave: PropTypes.func,
    accountOptionsRef: PropTypes.oneOfType([
        // Either a function
        PropTypes.func,
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
    onSearchInput: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default TopNav;
