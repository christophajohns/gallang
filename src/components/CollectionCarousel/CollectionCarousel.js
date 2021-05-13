import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import "../../types";
import {
    StyledCollectionCarousel,
    StyledCarouselItem,
    StyledCarouselItemContent,
    StyledCarouselItemImages,
    StyledGridItem,
    StyledCarouselItemCaption,
    StyledCollectionLabel,
    StyledCollectionTitle,
} from "./style";

/**
 * Component to render a carousel of "featured" collections
 * @param {Object} props - Properties to be passed to the component
 * @param {Collection[]} props.collections - Array of collection objects to be displayed in the carousel
 */
function CollectionCarousel(props) {
    const {
        collections, //collections to render in the carousel
        onClickCarouselItem, //function that fires when user clicks on a slide in the carousel
    } = props;

    return (
        <StyledCollectionCarousel
            nextIcon={<ChevronRight className="next-button" />}
            prevIcon={<ChevronLeft className="previous-button" />}
        >
            {collections.map((collection, index) => (
                <StyledCarouselItem
                    key={collection.title}
                    position={index}
                    onClick={() => onClickCarouselItem(index)}
                >
                    <StyledCarouselItemContent>
                        <StyledCarouselItemImages>
                            {collection.images.slice(0, 4).map((image) => (
                                <StyledGridItem key={image.id}>
                                    <img src={image.url} alt={image.id} />
                                </StyledGridItem>
                            ))}
                        </StyledCarouselItemImages>
                        <StyledCarouselItemCaption>
                            <StyledCollectionLabel>
                                COLLECTION
                            </StyledCollectionLabel>
                            <StyledCollectionTitle>
                                {collection.title}
                            </StyledCollectionTitle>
                            <div>{collection.numberOfImages} Objects</div>
                        </StyledCarouselItemCaption>
                    </StyledCarouselItemContent>
                </StyledCarouselItem>
            ))}
        </StyledCollectionCarousel>
    );
}

CollectionCarousel.propTypes = {
    /** Array holding all information about collections to be rendered in the carousel */
    collections: PropTypes.arrayOf(
        PropTypes.shape({
            /** Name or title of the collection */
            title: PropTypes.string.isRequired,
            /** The number of images or objects inside the collection or exhibition */
            numberOfImages: PropTypes.number.isRequired,
            /** Array of objects or images within the collection */
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    /** Unique identifier of the object and thereby image */
                    id: PropTypes.string.isRequired,
                    /** Image url for the object */
                    url: PropTypes.string.isRequired,
                }).isRequired
            ),
        })
    ),
};

export default CollectionCarousel;
