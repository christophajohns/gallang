/**
 * Placeholder details view to test routing (would be used to render the full page version of an image and its info)
 * @param {Object} props - Properties passed to the view
 * @param {string} props.imageID - Unique identifier of the image or object displayed
 */
function DetailsView(props) {
    const { imageID } = props;

    return <div>This would be the details view for image ID: {imageID}.</div>;
}

export default DetailsView;
