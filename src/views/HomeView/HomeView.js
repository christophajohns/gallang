import PropTypes from "prop-types";
import CollectionCarousel from "./CollectionCarousel";
import Quote from "./Quote";
import "../../types";
import { imageType } from "../../types";

/**
 * View component for the Home/Browse page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {Function} props.collections - Component(s) to display featured collections
 * @param {Collection[]} props.collectionsData - Array holding all information about collections to be rendered in a carousel
 * @param {Function} [props.recentlyViewedImages] - Component(s) to display recently viewed images
 * @param {string} props.quote - String representing a quote
 * @param {Function} props.recommendations - Component(s) to display recommended categories
 */
function HomeView(props) {
    const {
        collections, // Component(s) to display featured collections
        collectionsData, // Array holding all information about collections to be rendered in a carousel
        recentlyViewedImages, // Component(s) to display recently viewed images
        quote, // String representing a quote
        recommendations, // Component(s) to display recommended categories
    } = props;

    return (
        <div className="HomeView">
            <CollectionCarousel collections={collectionsData.slice(0, 4)} />

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
    /** Array holding all information about collections to be rendered in a carousel */
    collectionsData: PropTypes.arrayOf(
        PropTypes.shape({
            /** Name or title of the collection */
            title: PropTypes.string.isRequired,
            /** Array of objects or images within the collection */
            images: PropTypes.arrayOf(imageType).isRequired,
        })
    ),
    /** Component(s) to display featured collections */
    collections: PropTypes.node,
    /** Component(s) to display recently viewed images */
    recentlyViewedImages: PropTypes.node,
    /** String representing a quote */
    quote: PropTypes.string,
    /** Component(s) to display recommended categories */
    recommendations: PropTypes.node.isRequired,
};

export default HomeView;
