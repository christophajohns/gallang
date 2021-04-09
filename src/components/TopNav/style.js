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
        color: black;
    }
`;

export const ControlsDiv = styled.div`
    grid-area: right;
    justify-self: end;
    display: flex;
    align-items: center;

    & > div {
        display: inline-block;
    }
`;

export const Account = styled.div`
    background-color: whitesmoke;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    line-height: 32px;
    font-weight: bold;
`;

export const NavSearch = styled.input.attrs({
    placeholder: "Search",
})`
    height: 32px;
    padding: 0 32px 0 16px;
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
        transition: width 0.1s ease-in-out;
    }
    &:not(:focus) {
        width: 128px;
        transition: width 0.1s ease-in-out;
    }
`;
