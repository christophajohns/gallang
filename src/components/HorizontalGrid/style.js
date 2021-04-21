import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHorizontalGrid = styled.section`
    margin-bottom: ${(props) => (props.small ? "32px" : "64px")};
    scroll-behavior: smooth;
`;

export const StyledGridSection = styled.div`
    overflow-x: scroll;
    flex: 1;
    display: flex;
`;

export const StyledGridTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`;

export const StyledTitleAndDescription = styled.div`
    align-self: center;
`;

export const StyledTitle = styled(Link)`
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
    min-width: 84px;
`;

export const StyledImages = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

export const StyledLabel = styled.div`
    font-weight: bold;
    color: grey;
    font-size: 0.8rem;
    line-height: 0.8rem;
`;

export const ImagePlaceholderDiv = styled.div`
    height: ${(props) => (props.small ? "200px" : "400px")};
    width: ${(props) => (props.small ? "200px" : "400px")};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8px;
    border: 1px dashed black;
    margin-right: 32px;

    @media (max-width: 820px) {
        height: 200px;
        width: 200px;
    }
`;
