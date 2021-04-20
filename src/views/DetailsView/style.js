import { Button } from "react-bootstrap";
import styled from "styled-components";

export const TopFixed = styled.div`
    position: fixed;
    width: 100%;
    top: 64px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const BottomRightFixed = styled.div`
    position: fixed;
    bottom: 32px;
    right: 16px;
`;

export const DetailsViewDiv = styled.div`
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 16px;
    line-height: 24px;
`;

export const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 128px;
`;

export const StyledTitleWrapper = styled.div`
    margin-top: 12px;
    text-align: right;
    align-self: flex-end;
`;

export const StyledImage = styled.img`
    width: 100%;
    height: calc(100% - 60px); // Full height minus height of title and subtitle
    object-fit: contain;
`;

export const InfoContainer = styled.div`
    max-width: 640px;
`;

export const StyledOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledIconButton = styled(Button)`
    color: grey;

    &:hover,
    .active {
        color: black;
    }
`;

export const StyledTitle = styled.h3`
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    margin-bottom: 4px;
`;

export const StyledSubTitle = styled.div`
    font-style: italic;
`;

export const StyledDescription = styled.p`
    margin-top: 16px;
`;
