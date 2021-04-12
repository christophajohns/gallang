import styled from "styled-components";

export const VerticalGridDiv = styled.div`
    display: flex;
    flex-wrap: wrap;

    // Consistent gap between images even on wrap
    & > div {
        margin-right: 32px;
        margin-bottom: 32px;
    }
`;
