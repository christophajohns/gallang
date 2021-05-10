import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../IconButton";

export const SidebarAside = styled.aside`
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    overflow-y: scroll;
    align-items: ${(props) => (props.expanded ? "stretch" : "center")};

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
    height: calc(100vh - 128px);
    overflow-y: scroll;
`;

export const StyledIconButton = styled(IconButton)`
    align-self: ${(props) => (props.expanded ? "flex-start" : "center")};
`;

export const InputGroupText = styled(InputGroup.Text)`
    background-color: whitesmoke;
    color: black;
    border: none;
`;

export const FormControl = styled(Form.Control)`
    background-color: whitesmoke;
    border: none;
`;

export const ModalHeader = styled(Modal.Header)`
    border-bottom: none;
`;

export const ModalFooter = styled(Modal.Footer)`
    border-top: none;
`;

export const ModalTitle = styled(Modal.Title)`
    font-size: 1rem;
`;
