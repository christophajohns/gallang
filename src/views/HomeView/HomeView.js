import PropTypes from "prop-types";
import Quote from "./Quote";
import "../../types";

/**
 * View component for the Home/Browse page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {Function} props.collections - Component or components that render an image grid for collections
 * @param {Function} props.carousel - Carousel component to highlight featured collections
 * @param {Collection[]} props.collectionsData - Array holding all information about collections to be rendered in a carousel
 * @param {Function} [props.recentlyViewedImages] - Component(s) to display recently viewed images
 * @param {string} props.quote - String representing a quote
 * @param {Function} props.recommendations - Component(s) to display recommended categories
 */
function HomeView(props) {
    const {
        quote, // String representing a quote
        collections, // Component or components that render an image grid for collections
        carousel, // Carousel component to highlight featured collections
        recentlyViewedImages, // Component(s) to display recently viewed images
        recommendations, // Component(s) to display recommended categories
    } = props;

    return (
        <div className="HomeView">
            {carousel}
            <main>
                {recentlyViewedImages}
                {collections}
                {quote ? <Quote quoteText={quote} /> : ""}
                {recommendations}
            </main>
        </div>
    );
}

HomeView.propTypes = {
    // ------- current
    /** Carousel component to highlight featured collections */
    carousel: PropTypes.node.isRequired,
    // ------- development
    /** Component(s) to display featured collections */
    collections: PropTypes.node,
    /** Component(s) to display recently viewed images */
    recentlyViewedImages: PropTypes.node,
    // ------ end
    /** String representing a quote */
    quote: PropTypes.string,


    /** Component(s) to display recommended categories */
    recommendations: PropTypes.node,
};

export default HomeView;
