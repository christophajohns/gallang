import { NavBar, Brand, ControlsDiv } from "./style";

/** Navigation bar for the whole application */
function TopNav() {
    return (
        <NavBar sticky={false}>
            <Brand href="/">Gallang</Brand>
            <ControlsDiv>
                <div>Search bar</div>
                <div>User</div>
            </ControlsDiv>
        </NavBar>
    );
}

export default TopNav;
