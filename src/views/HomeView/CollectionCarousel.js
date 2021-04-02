import { Carousel } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import "../../types";

/**
 * Component to render a carousel of "featured" collections
 * @param {Object} props - Properties to be passed to the component
 * @param {Collection[]} props.collections - Array of collection objects to be displayed in the carousel
 */
function CollectionCarousel(props) {
    const { collections } = props;

    return (
        <Carousel
            className="CollectionCarousel"
            nextIcon={<ChevronRight className="next-button" />}
            prevIcon={<ChevronLeft className="previous-button" />}
        >
            {collections.map((collection) => (
                <Carousel.Item
                    className="CollectionCarousel__item"
                    key={collection.title}
                >
                    <div className="CollectionCarousel__item__content">
                        <div className="CollectionCarousel__images">
                            {collection.images.slice(0, 4).map((image) => (
                                <div className="grid-item" key={image.id}>
                                    <img src={image.url} alt={image.id} />
                                </div>
                            ))}
                        </div>
                        <div className="CollectionCarousel__caption">
                            <span className="collection-label">COLLECTION</span>
                            <h3>{collection.title}</h3>
                            <p className="collection-label">
                                {collection.numberOfImages} Objects
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
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
