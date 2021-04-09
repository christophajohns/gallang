import PropTypes from "prop-types";
import { NavBar, Logo, ControlsDiv, Account } from "./style";

/**
 * Navigation bar for the whole application
 * @param {Object} props - Properties passed to component
 * @param {string} props.userInitial - The first letter of the username to be displayed in the top right
 */
function TopNav(props) {
    const { userInitial } = props;

    return (
        <NavBar sticky={false}>
            <Logo href="/">Gallang</Logo>
            <ControlsDiv>
                <div>Search bar</div>
                <Account>{userInitial.toUpperCase()}</Account>
            </ControlsDiv>
        </NavBar>
    );
}

TopNav.propTypes = {
    userInitial: PropTypes.string.isRequired,
};

export default TopNav;
