import './HomeView.css';
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
            {collections ? collections.map(collection => (
                <HorizontalGrid
                    key={collection.title}
                    title={collection.title}
                    images={collection.images}
                />))
            : ""}
            {recentlyViewedImages ? <HorizontalGrid title="Recently viewed" images={recentlyViewedImages} /> : ""}
            {quote ? <p className="quote">{quote}</p> : ""}
            {recommendations ? recommendations.map(recommendation => (
                <HorizontalGrid
                    key={recommendation.title}
                    title={recommendation.title}
                    description="Recommended for you."
                    images={recommendation.images}
                />))
            : ""}

        </div>
    );
}

export default HomeView;