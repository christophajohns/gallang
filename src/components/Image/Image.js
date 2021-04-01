import './Image.css';
import { Button } from 'react-bootstrap';
import {
    Download,
    GripVertical,
    Heart,
    HeartFill,
} from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

/** Single object (image) showcase including like and download buttons */
function Image(props) {
    const {
        id, // Specify the title to placed on top of the image grid
        src, // Array of image data to be rendered in a horizontal grid
        liked, // Boolean specifying whether the current user has already liked that image
    } = props;

    return (
        <div className="Image">
            <img id={id} src={src} alt={id} />
            <Button variant="link" className="grip-button"><GripVertical /></Button>
            <div className="Image__buttons">
                <Button variant="link" className="like-button">{liked ? <HeartFill /> : <Heart />}</Button>
                <Button variant="link" className="download-button"><Download /></Button>
            </div>
        </div>
    );
}

Image.propTypes = {
    /** Unique identifier of the object and thereby image */
    id: PropTypes.string.isRequired,
    /** Image url for the object image */
    src: PropTypes.string.isRequired,
    /** Flag whether the user has liked this image */
    liked: PropTypes.bool.isRequired,
}

export default Image;