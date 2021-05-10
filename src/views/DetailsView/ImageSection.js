import PropTypes from "prop-types";
import {
    StyledSection,
    StyledImage,
    StyledTitleWrapper,
    StyledSubTitle,
} from "./style";

/**
 * Section of the page displaying the large image
 * @param {Object} props - Properties passed to the component
 * @param {string} props.title - Name or title of the image (object)
 * @param {string} props.date - Creation date for the image
 * @param {string} props.objectType - Type of object that is represented in the image (e.g. Poster or Album Cover)
 * @param {string} props.url - URL of the image source
 */
function ImageSection(props) {
    const { url, title, objectType, date } = props;

    return (
        <StyledSection id="image">
            <StyledImage src={url} alt={title} />
            <StyledTitleWrapper>
                <div>{title.toUpperCase()}</div>
                <StyledSubTitle>
                    {objectType}, {date}.
                </StyledSubTitle>
            </StyledTitleWrapper>
        </StyledSection>
    );
}

ImageSection.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    objectType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default ImageSection;
