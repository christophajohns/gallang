import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledHorizontalGrid = styled.section`
    margin-bottom: 64px;
    scroll-behavior: smooth;
`;

export const StyledTitleAndDescription = styled.div`
    display: inline-block;
    margin-bottom: 8px;
`;

export const StyledTitle = styled.a`
    color: black;
    font-weight: bold;
`;

export const StyledDescription = styled.p`
    margin-bottom: 0px;
    font-size: 0.9rem;
    color: grey;
`;

export const StyledPreviousNextChevrons = styled.div`
    float: right;
`;

export const StyledImages = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
`;

export const StyledIconButton = styled(Button)`
    color: black;

    &:hover {
        color: grey;
    }
`;
