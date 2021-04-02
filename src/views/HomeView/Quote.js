import PropTypes from "prop-types";

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
        <div className="Quote">
            <p className="Quote__text">{quoteText}</p>
            <p className="Quote__author">Micah Walter</p>
        </div>
    );
}

Quote.propTypes = {
    /** The quote text or content. */
    quoteText: PropTypes.string.isRequired,
};

export default Quote;
