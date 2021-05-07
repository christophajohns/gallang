import PropTypes from "prop-types";

/**
 * Section to display the currently logged in user's galleries
 * @param {Object} props - Properties passed to the component
 * @param {Function | Object} props.galleries - Components to represent the user galleries
 */
function Galleries(props) {
    const { galleries } = props;

    return (
        <section>
            <div>{galleries}</div>
        </section>
    );
}

Galleries.propTypes = {
    galleries: PropTypes.node.isRequired,
};

export default Galleries;
