import './HomeView.css';
import PropTypes from 'prop-types';
import {
    HorizontalGrid,
} from '../../components';

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

HomeView.propTypes = {
    collections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            liked: PropTypes.bool.isRequired,
        }).isRequired)
    })),
    recentlyViewedImages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        liked: PropTypes.bool.isRequired,
    }).isRequired),
    quote: PropTypes.string,
    recommendations: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            liked: PropTypes.bool.isRequired,
        }).isRequired)
    })),
}

export default HomeView;