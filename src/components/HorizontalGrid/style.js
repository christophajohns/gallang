import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledHorizontalGrid = styled.section`
    margin-bottom: 64px;
    scroll-behavior: smooth;
`;
export const StyledGridSection = styled.div`
    display: block;
    overflow: hidden;
`;

export const StyledTitleAndDescription = styled.div`
    display: inline-block;
    display: inline-block;
`;

export const StyledTitle = styled.a`
    color: black;
    font-weight: bold;
`;

export const StyledDescription = styled.p`
    margin-bottom: 0px;
    font-size: 0.9rem;
    color: grey;
    margin-bottom: 8px;
`;

export const StyledPreviousNextChevrons = styled.div`
    float: right;
    display: block;
    clear: both;
    bottom: 0px;
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
