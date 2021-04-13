import styled from "styled-components";
import { Form, Button, InputGroup } from "react-bootstrap";

export const LoginViewDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
`;

export const StyledForm = styled(Form)`
    width: 50%;
    max-width: 256px;

    // apply to all direct children
    & > * {
        margin-bottom: 16px;
    }
`;

export const Inputs = styled.div`
    // apply to all direct children
    & > * {
        margin-bottom: 8px;
    }
`;

export const LoginButton = styled(Button)`
    background-color: gainsboro;
    color: black;
    border: none;
    width: 100%;

    &:hover {
        background-color: lightgrey;
        color: black;
    }
`;

export const FormControl = styled(Form.Control)`
    background-color: whitesmoke;
    border: none;
`;

export const InputGroupText = styled(InputGroup.Text)`
    background-color: whitesmoke;
    color: black;
    border: none;
`;
