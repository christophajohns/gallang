import './Image.css';

// Single object (image) showcase including like and download buttons
function Image(props) {
    const {
        id, // Specify the title to placed on top of the image grid
        src, // Array of image data to be rendered in a horizontal grid
        liked, // Boolean specifying whether the current user has already liked that image
    } = props;

    return (
        <div className="Image">
            <img id={id} src={src} alt={id} />
            <div className="Image__buttons">
                <button className="like-button">{liked ? "Liked" : "Like"}</button>
                <button className="download-button">Download</button>
            </div>
        </div>
    );
}

export default Image;