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

    & > div {
        display: inline-block;

        &:first-of-type {
            margin-right: 16px;
        }
    }
`;
