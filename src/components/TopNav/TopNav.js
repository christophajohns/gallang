import PropTypes from "prop-types";
import { NavBar, Logo, ControlsDiv, Account, NavSearch } from "./style";

/**
 * Navigation bar for the whole application
 * @param {Object} props - Properties passed to component
 * @param {boolean} [props.isLoggedIn=false] - Flag whether the user is currently logged in
 * @param {string} props.userInitial - The first letter of the username to be displayed in the top right
 */
function TopNav(props) {
    const { isLoggedIn = false, userInitial } = props;

    return (
        <NavBar sticky={false}>
            <Logo href="/">Gallang</Logo>
            {isLoggedIn && (
                <ControlsDiv>
                    <NavSearch />
                    <Account>{userInitial.toUpperCase()}</Account>
                </ControlsDiv>
            )}
        </NavBar>
    );
}

TopNav.propTypes = {
    userInitial: PropTypes.string.isRequired,
};

export default TopNav;
