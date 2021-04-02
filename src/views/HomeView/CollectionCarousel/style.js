import styled from "styled-components";
import { Carousel } from "react-bootstrap";

export const StyledCollectionCarousel = styled(Carousel)`
    background-color: #eee;
`;

const backgroundColors = [
    "#780000",
    "#c1121f",
    "#ff6d00",
    "#003049",
    "#669bbc",
];

export const StyledCarouselItem = styled(Carousel.Item)`
    // Choose background color from array
    background-color: ${(props) =>
        props.hasOwnProperty("position")
            ? backgroundColors[props.position]
            : "#eeeeee"};
`;

export const StyledCarouselItemContent = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 32px;
    padding: 32px 32px 64px 32px;
    align-items: center;
`;

export const StyledCarouselItemImages = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 256px);
    grid-template-rows: repeat(2, 256px);
    justify-content: right;
    gap: 16px;
    @media (max-width: 820px) {
        grid-template-columns: repeat(2, 128px);
        grid-template-rows: repeat(2, 128px);
    }
`;

export const StyledGridItem = styled.div`
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`;

export const StyledCarouselItemCaption = styled.div`
    color: white;
`;

export const StyledCollectionLabel = styled.div`
    font-weight: bold;
    opacity: 0.7;
`;

export const StyledCollectionTitle = styled.h3`
    margin-bottom: 16px;
`;
