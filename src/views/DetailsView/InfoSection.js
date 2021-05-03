import PropTypes from "prop-types";
import {
    StyledSection,
    InfoContainer,
    StyledTitle,
    StyledSubTitle,
    StyledDescription,
} from "./style";

/**
 * Section of the page displaying the information details about the image (object)
 * @param {Object} props - Properties passed to the component
 * @param {string} props.title - Name or title of the image (object)
 * @param {string} props.date - Creation date for the image
 * @param {string} props.objectType - Type of object that is represented in the image (e.g. Poster or Album Cover)
 * @param {string} props.description - Long-form description of the image
 */
function InfoSection(props) {
    const { title, description, objectType, date } = props;

    return (
        <StyledSection id="info">
            <InfoContainer>
                <StyledTitle>{title}</StyledTitle>
                <StyledSubTitle>
                    {objectType}, {date}.
                </StyledSubTitle>
                <StyledDescription>{description}</StyledDescription>
            </InfoContainer>
        </StyledSection>
    );
}

InfoSection.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    objectType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default InfoSection;
