import styled from "styled-components";

export const Inputs = styled.div`
    // apply to all direct children
    & > * {
        margin-bottom: 8px;
    }
`;

export const AuthLinks = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    a {
        color: black;

        :hover {
            color: black;
        }
    }
`;
