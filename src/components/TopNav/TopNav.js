import { NavBar, Logo, ControlsDiv } from "./style";

/** Navigation bar for the whole application */
function TopNav() {
    return (
        <NavBar sticky={false}>
            <Logo href="/">Gallang</Logo>
            <ControlsDiv>
                <div>Search bar</div>
                <div>User</div>
            </ControlsDiv>
        </NavBar>
    );
}

export default TopNav;
