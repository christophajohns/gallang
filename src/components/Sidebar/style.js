import { Button } from "react-bootstrap";
import styled from "styled-components";

export const SidebarAside = styled.aside`
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;

    & > * {
        margin-bottom: 16px;
    }
`;

export const StyledSidebarButton = styled(Button)`
    width: 32px;
    height: 32px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;

    &:hover {
        background-color: gainsboro;
    }
`;
