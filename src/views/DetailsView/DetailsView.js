/**
 * Placeholder details view to test routing (would be used to render the full page version of an image and its info)
 * @param {Object} props - Properties passed to the view
 * @param {string} props.imageID - Unique identifier of the image or object displayed
 */


function DetailsView(props) {

    // const { imageID } = props;
    const {
        id,
        images,
        title,
        description
    } = props;

    const image = images[0];
    return(
        <div>
            <div>
                This would be the details view for image ID: {id}.
                <h2>Title: {title}</h2>
                <p>Description: {description}.</p>
            </div>
            <img src={image.b.url}></img>
        </div>
    );
}

export default DetailsView;