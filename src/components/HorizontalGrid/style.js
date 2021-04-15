import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledHorizontalGrid = styled.section`
    margin-bottom: 64px;
    scroll-behavior: smooth;
`;

export const StyledGridSection = styled.div`
    overflow: hidden;
`;

export const StyledGridTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`;

export const StyledTitleAndDescription = styled.div`
    align-self: center;
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
    align-self: flex-start;
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
