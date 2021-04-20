import PropTypes from "prop-types";
import { HorizontalGridPresenter } from "../../presenters";
import CollectionCarousel from "./CollectionCarousel";
import Quote from "./Quote";
import "../../types";
import { imageType } from "../../types";

/**
 * View component for the Home/Browse page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {Collection[]} props.collections - Array holding all information about collections to be rendered in a HorizontalGrid
 * @param {Image[]} props.recentlyViewedImages - Array of image data to be rendered in a HorizontalGrid
 * @param {string} props.quote - String representing a quote
 * @param {Recommendation[]} props.recommendations - Array of recommended images and the recommendation basis (e.g. medium, period, designer)
 * @param {GallangModel} props.model - The model holding the application state
 */
function HomeView(props) {
    const {
        collections, // Array holding all information about collections to be rendered in a HorizontalGrid
        recentlyViewedImages, // Array of image data to be rendered in a HorizontalGrid
        quote, // String representing a quote
        recommendations, // Array of recommended images and the recommendation basis (e.g. medium, period, designer)
        model, // The model holding the application state
    } = props;

    const firstFourCollections = collections.slice(0, 4);
    const collectionsAfterFour = collections.slice(4, 10);

    return (
        <div className="HomeView">
            <CollectionCarousel collections={firstFourCollections} />
            <main>
                {recentlyViewedImages?.length ? ( // Only show if at least one recently viewed image
                    <HorizontalGridPresenter
                        title="Recently viewed"
                        images={recentlyViewedImages}
                        model={model}
                    />
                ) : (
                    ""
                )}
                {collections
                    ? collectionsAfterFour.map((collection) => (
                          <HorizontalGridPresenter
                              key={collection.title}
                              title={collection.title}
                              images={collection.images}
                              model={model}
                          />
                      ))
                    : ""}
                {quote ? <Quote quoteText={quote} /> : ""}
                {recommendations
                    ? recommendations.map((recommendation) => (
                          <HorizontalGridPresenter
                              key={recommendation.title}
                              title={recommendation.title}
                              description="Recommended for you."
                              images={recommendation.images}
                              model={model}
                          />
                      ))
                    : ""}
            </main>
        </div>
    );
}

HomeView.propTypes = {
    /** Array holding all information about collections to be rendered in a HorizontalGrid */
    collections: PropTypes.arrayOf(
        PropTypes.shape({
            /** Name or title of the collection */
            title: PropTypes.string.isRequired,
            /** Array of objects or images within the collection */
            images: PropTypes.arrayOf(imageType).isRequired,
        })
    ),
    /** Array of image data to be rendered in a HorizontalGrid */
    recentlyViewedImages: PropTypes.arrayOf(imageType.isRequired),
    /** String representing a quote */
    quote: PropTypes.string,
    /** Array of recommended images and the recommendation basis (e.g. medium, period, designer) */
    recommendations: PropTypes.arrayOf(
        PropTypes.shape({
            /** Name or title for the recommendation basis (e.g. medium, period, designer) */
            title: PropTypes.string.isRequired,
            /** Array of objects or images that are being recommended */
            images: PropTypes.arrayOf(imageType.isRequired),
        })
    ),
    /** The model holding the application state */
    model: PropTypes.shape({
        likedImageIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
        likeImage: PropTypes.func.isRequired,
        unlikeImage: PropTypes.func.isRequired,
    }),
};

export default HomeView;
