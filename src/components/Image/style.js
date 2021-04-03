import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledImage = styled.div`
    position: relative;
    flex: 0 0 auto;
    margin-right: 32px;
    background-color: black;

    img {
        height: 400px;
        width: 400px;
        object-fit: cover;
        position: static;
        z-index: 0;
        transition: opacity 0.5s ease;
    }

    &:hover img {
        opacity: 0.7;
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

export const StyledGripButton = styled(StyledIconButton)`
    z-index: 1;
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: grab !important;
`;
