import styled from "styled-components";
import { Form, Button, InputGroup } from "react-bootstrap";

export const CenterContentDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;

    a {
        color: black;

        :hover {
            color: black;
        }
    }
`;

export const StyledForm = styled(Form)`
    width: 50%;
    max-width: 384px;

    // apply to all direct children
    & > * {
        margin-bottom: 16px;
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

export const AuthButton = styled(Button)`
    background-color: gainsboro;
    color: black;
    border: none;
    width: 100%;

    &:hover {
        background-color: lightgrey;
        color: black;
    }
`;
