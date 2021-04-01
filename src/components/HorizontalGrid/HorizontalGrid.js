import './HorizontalGrid.css';
import { Image } from '../../components';
import { 
    ChevronLeft,
    ChevronRight,
} from 'react-bootstrap-icons';

/** Horizontal (scrollable) grid of images to showcase objects in a collection or gallery */
function HorizontalGrid(props) {
    const {
        title, // Specify the title to placed on top of the image grid
        href, // URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Array of image data to be rendered in a horizontal grid
    } = props;

    return (
        <section className="HorizontalGrid" label={title}>
            <div className="HorizontalGrid__top">
                <div className="title-and-description">
                    <a href={href ? href : "#"} className="title">{title}</a>
                    {description ? <p className="description">{description}</p> : ""}
                </div>
                <div className="previous-next-chevrons">
                    <ChevronLeft className="chevron-left" />
                    <ChevronRight />
                </div>
            </div>
            <div className="HorizontalGrid__images">
                {images.map(image => <Image key={image.id} src={image.url} liked={image.liked} />)}
            </div>
        </section>
    );
}

export default HorizontalGrid;