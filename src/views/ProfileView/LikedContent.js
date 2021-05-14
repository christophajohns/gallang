import PropTypes from "prop-types";

/**
 * Section to display the currently logged in user's liked content
 * @param {Object} props - Properties passed to the component
 * @param {Function | Object} props.galleries - Components to represent the user's liked content
 */
function LikedContent(props) {
    const { likedContent } = props;

    return (
        <section>
            <div>{likedContent}</div>
        </section>
    );
}

LikedContent.propTypes = {
    likedContent: PropTypes.node,
};

export default LikedContent;
