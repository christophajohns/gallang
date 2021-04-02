import "./HorizontalGrid.css";
import { Image } from "../../components";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import PropTypes from "prop-types";

/**
 * Horizontal (scrollable) grid of images to showcase objects in a collection or gallery
 * @param {Object} props - Properties passed to component
 * @param {string} props.title - Title or name for the images displayed in the grid
 * @param {string} props.href - (optional) URL to link to on click on the title
 * @param {string} props.description - (optional) Further description for the grid
 * @param {Image[]} props.images - Array of images to render in the grid
 * @returns
 */
function HorizontalGrid(props) {
    const {
        title, // Specify the title to placed on top of the image grid
        href, // (optional) URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Array of image data to be rendered in a horizontal grid
    } = props;

    return (
        <section className="HorizontalGrid" label={title}>
            <div className="HorizontalGrid__top">
                <div className="title-and-description">
                    <a href={href ? href : "#"} className="title">
                        {title}
                    </a>
                    {description ? (
                        <p className="description">{description}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="previous-next-chevrons">
                    <ChevronLeft className="chevron-left" />
                    <ChevronRight />
                </div>
            </div>
            <div className="HorizontalGrid__images">
                {images.map((image) => (
                    <Image
                        key={image.id}
                        id={image.id}
                        src={image.url}
                        liked={image.liked}
                    />
                ))}
            </div>
        </section>
    );
}

HorizontalGrid.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            liked: PropTypes.bool.isRequired,
        })
    ),
};

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} url - Image url for the object
 * @property {bool} liked - Flag whether the user has liked this image
 */

export default HorizontalGrid;
