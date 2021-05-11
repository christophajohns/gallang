import styled from "styled-components";
import { Button } from "react-bootstrap";

export const TitleAndDescriptionDiv = styled.div`
    display: inline-block;
    color: grey;
`;

export const TitleH3 = styled.h3`
    color: black;
    font-weight: bold;
`;

export const ContentTypeDiv = styled.div`
    font-weight: bold;
`;

export const StyledButton = styled(Button)`
    & > svg {
        margin-right: 8px;
    }
`;

export const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
`;

export const BottomRightFixed = styled.div`
    position: fixed;
    bottom: 32px;
    right: 8px;
`;

export const StyledIconButton = styled(Button)`
    color: grey;

    &:hover,
    .active {
        color: black;
    }
`;

export const DeleteButton = styled(StyledButton)`
    margin-right: 16px;
`;

export const ButtonsDiv = styled.div`
    display: flex;
    align-content: center;
`;
