import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";

export const StyledImage = styled.div`
    position: relative;
    flex: 0 0 auto;
    margin-right: 32px;
    background-color: black;

    img {
        height: ${(props) => (props.small ? "200px" : "400px")};
        width: ${(props) => (props.small ? "200px" : "400px")};
        object-fit: cover;
        position: static;
        z-index: 0;
        transition: opacity 0.5s ease;
        cursor: pointer;
    }

    &:hover img {
        opacity: 0.7;
    }
    @media (max-width: 820px) {
        img {
            height: 200px;
            width: 200px;
        }
    }
`;

export const StyledImageButtons = styled.div`
    z-index: 2;
    position: absolute;
    bottom: 0px;
    right: 0px;
`;

export const StyledIconButton = styled(Button)`
    color: white;

    &:hover {
        color: lightgrey;
    }
`;

export const StyledTopRightButton = styled(StyledIconButton)`
    z-index: 1;
    position: absolute;
    top: 0px;
    right: 0px;
`;

export const StyledGripButton = styled(StyledTopRightButton)`
    cursor: grab !important;
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
