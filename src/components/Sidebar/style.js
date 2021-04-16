import { Button } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../IconButton";

export const SidebarAside = styled.aside`
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.expanded ? "stretch" : "center")};

    padding: 8px;

    ${(props) => props.expanded && "width: clamp(256px, 25vw, 512px);"}

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

export const ExpandedSidebarDiv = styled.div`
    padding-left: 16px;
`;

export const StyledIconButton = styled(IconButton)`
    align-self: ${(props) => (props.expanded ? "flex-start" : "center")};
`;
