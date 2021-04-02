import PropTypes from "prop-types";
import { StyledQuote, StyledQuoteText, StyledQuoteAuthor } from "./style";

/**
 * Component to render a quote.
 * @param {Object} props - Properties to be passed to the component
 * @param {string} props.quoteText - The quote text or content.
 */
function Quote(props) {
    const {
        quoteText, // The quote text or content.
    } = props;
    return (
        <StyledQuote>
            <StyledQuoteText>{quoteText}</StyledQuoteText>
            <StyledQuoteAuthor>Micah Walter</StyledQuoteAuthor>
        </StyledQuote>
    );
}

Quote.propTypes = {
    /** The quote text or content. */
    quoteText: PropTypes.string.isRequired,
};

export default Quote;
