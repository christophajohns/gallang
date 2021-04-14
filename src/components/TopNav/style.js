import styled from "styled-components";

export const NavBar = styled.nav`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "left center right";
    align-items: center;
    padding: 8px 16px;
    // Prepare for sticky top nav if wanted (set sticky prop to true)
    ${(props) =>
        props.sticky &&
        `
        position: sticky;
        top: 0px;
        background-color: white;
        z-index: 99;
    `}
`;

export const Logo = styled.a`
    grid-area: center;
    justify-self: center;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: bold;
    font-size: 1.3rem;
    color: black;
    &:hover {
        text-decoration: none;
        color: slategray;
        transition: 0.3s ease-in-out;
    }
`;

export const ControlsDiv = styled.div`
    grid-area: right;
    justify-self: end;
    display: flex;
    align-items: center;
`;

export const NavSearch = styled.input`
    height: 32px;
    padding: 0 16px 0 16px;
    margin-right: 16px;
    border: none;
    outline: none;
    border-radius: 20px;
    background: whitesmoke;
    font-size: 12px;
    &::placeholder {
        color: grey;
    }
    &:focus {
        width: 256px;
        transition: width 0.5s ease-in-out;
    }
    &:not(:focus) {
        width: 128px;
        transition: width 0.1s ease-in-out;
    }
    &:hover {
        width: 256px;
        transition: width 0.5s ease-in-out;
    }
`;

export const AccountWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas: "top" "bottom";
    justify-content: end;
`;

export const AccountOptions = styled.ul`
    position: absolute;
    grid-area: bottom;
    z-index: 99;
    right: 0;
    top: 40px;
    font-size: 12px;
    font-weight: bold;
    padding-top: 8px;
`;

export const Account = styled.div`
    background-color: whitesmoke;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    grid-area: top;
    cursor: pointer;
    ${AccountWrapper}:hover & {
        background-color: lightgrey;
        transition: 0.3s ease-in-out;
    }
`;

export const AccountOption = styled.li`
    text-align: right;
    list-style-type: none;
    padding: 0;
    margin: 0;
    line-height: 64px;
    padding: 0 32px 0 64px;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
        transition: 0.1s ease-in-out;
    }
`;

export const UserName = styled(AccountOption)`
    color: grey;
    text-transform: uppercase;
    line-height: 32px;
    cursor: default;
    &:hover {
        background-color: white;
    }
`;
