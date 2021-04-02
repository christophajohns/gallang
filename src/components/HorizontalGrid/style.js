import styled from "styled-components";
import { ChevronLeft } from "react-bootstrap-icons";

export const StyledHorizontalGrid = styled.section`
    margin-bottom: 64px;
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

export const StyledChevronLeft = styled(ChevronLeft)`
    margin-right: 16px;
`;

export const StyledImages = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
`;
