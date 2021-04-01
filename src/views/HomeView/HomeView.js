import './HomeView.css';
import PropTypes from 'prop-types';
import {
    HorizontalGrid,
} from '../../components';

/** View component for the Home/Browse page content. */
function HomeView(props) {
    const {
        collections, // Array holding all information about collections to be rendered in a HorizontalGrid
        recentlyViewedImages, // Array of image data to be rendered in a HorizontalGrid
        quote, // String representing a quote
        recommendations, // Array of recommended images and the recommendation basis (e.g. medium, period, designer)
    } = props;

    return (
        <div className="HomeView">
            <div>This would be a carousel.</div>
            <main>
                {collections ? collections.map(collection => (
                    <HorizontalGrid
                        key={collection.title}
                        title={collection.title}
                        images={collection.images}
                    />))
                : ""}
                {recentlyViewedImages ? <HorizontalGrid title="Recently viewed" images={recentlyViewedImages} /> : ""}
                {quote ? <Quote quoteText={quote} /> : ""}
                {recommendations ? recommendations.map(recommendation => (
                    <HorizontalGrid
                        key={recommendation.title}
                        title={recommendation.title}
                        description="Recommended for you."
                        images={recommendation.images}
                    />))
                : ""}
            </main>
        </div>
    );
}

HomeView.propTypes = {
    /** Array holding all information about collections to be rendered in a HorizontalGrid */
    collections: PropTypes.arrayOf(PropTypes.shape({
        /** Name or title of the collection */
        title: PropTypes.string.isRequired,
        /** Array of objects or images within the collection */
        images: PropTypes.arrayOf(PropTypes.shape({
            /** Unique identifier of the object and thereby image */
            id: PropTypes.string.isRequired,
            /** Image url for the object */
            url: PropTypes.string.isRequired,
            /** Flag whether the user has liked this image */
            liked: PropTypes.bool.isRequired,
        }).isRequired)
    })),
    /** Array of image data to be rendered in a HorizontalGrid */
    recentlyViewedImages: PropTypes.arrayOf(PropTypes.shape({
        /** Unique identifier of the object and thereby image */
        id: PropTypes.string.isRequired,
        /** Image url for the object */
        url: PropTypes.string.isRequired,
        /** Flag whether the user has liked this image */
        liked: PropTypes.bool.isRequired,
    }).isRequired),
    /** String representing a quote */
    quote: PropTypes.string,
    /** Array of recommended images and the recommendation basis (e.g. medium, period, designer) */
    recommendations: PropTypes.arrayOf(PropTypes.shape({
        /** Name or title for the recommendation basis (e.g. medium, period, designer) */
        title: PropTypes.string.isRequired,
        /** Array of objects or images within the collection */
        images: PropTypes.arrayOf(PropTypes.shape({
            /** Unique identifier of the object and thereby image */
            id: PropTypes.string.isRequired,
            /** Image url for the object */
            url: PropTypes.string.isRequired,
            /** Flag whether the user has liked this image */
            liked: PropTypes.bool.isRequired,
        }).isRequired)
    })),
}

/** Component to render a quote. */
function Quote(props) {
    const {
        quoteText, // The quote text or content.
    } = props;
    return (
        <div className="Quote">
            <p className="Quote__text">{quoteText}</p>
            <p className="Quote__author">Micah Walter</p>
        </div>
    )
}

Quote.propTypes = {
    /** The quote text or content. */
    quoteText: PropTypes.string.isRequired,
}

export default HomeView;