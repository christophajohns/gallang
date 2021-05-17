import { Button as BootstrapButton } from "react-bootstrap";
import styled, { css } from "styled-components";

export const Label = styled.label`
    grid-column: 1 / 2;
    margin-bottom: 0px;
`;

export const Input = styled.input`
    grid-column: 2 / 3;
    ${(props) =>
        props.readOnly &&
        css`
            outline: none;
            border: none;
            box-shadow: none;
        `}
`;

export const Button = styled(BootstrapButton)`
    grid-column: 3 / 4;
    justify-self: start;
`;
