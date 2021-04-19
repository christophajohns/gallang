import { Button } from "react-bootstrap";
import styled from "styled-components";

export const ProfileViewMain = styled.main`
    h3 {
        font-size: 1rem;
        opacity: 0.7;
    }

    .bold {
        font-weight: bold;
    }

    .grey {
        color: grey;
    }
`;

export const AccountSettingsDiv = styled.div`
    margin-top: 32px;
    margin-bottom: 64px;
`;

export const UserDataDiv = styled.div`
    display: grid;
    justify-content: start;
    align-items: center;
    grid-template-columns: repeat(auto, 3);
    grid-column-gap: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const UserDataLabelDiv = styled.div`
    grid-column: 1 / 2;
`;

export const UserDataValueDiv = styled.div`
    grid-column: 2 / 3;
`;

export const UserDataEditButton = styled(Button)`
    grid-column: 3 / 4;
`;

export const UserDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
`;

export const Account = styled.div`
    background-color: whitesmoke;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    margin-right: 16px;
`;

export const CreationTimeDiv = styled.div`
    font-size: 0.8rem;
`;

export const DeleteAccountButton = styled(Button)`
    padding-left: 0px;
    padding-right: 0px;
`;
