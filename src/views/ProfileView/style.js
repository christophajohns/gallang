import { Button, Tabs, } from "react-bootstrap";
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

export const AccountSettingsSection = styled.section`
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

export const UserSection = styled.section`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    text-transform: capitalize;
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

export const StyledTabs = styled(Tabs)`
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: bold;
    &.nav-pills .nav-link{
        background-color:white;
        color: black;
        border-radius:0px;
        padding: 10px 0px 10px 0px;
        margin-right:20px;
        &:hover{
            border-bottom: 2px solid lightgray;
        }
    }
    &.nav-pills .nav-link.active{
        border-bottom: 2px solid black;
    }
`;
