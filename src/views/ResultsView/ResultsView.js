import PropTypes from "prop-types";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {"collection" | "search results" | "gallery" | "liked content"} [props.contentType] - Type of results to display
 * @param {string} props.title - Title or name for the results
 * @param {number} props.numberOfObjects - Total number of results returned and displayed
 */
function ResultsView(props) {
    const { contentType, title, numberOfObjects } = props;
    return (
        <main className="ResultsView">
            <div>
                {contentType && contentType !== "liked content" ? (
                    <div>{contentType.toUpperCase()}</div>
                ) : (
                    ""
                )}
                <h3>
                    {contentType === "search results" ? `"${title}"` : title}
                </h3>
                <div>{numberOfObjects} Objects</div>
            </div>
            <div>Here should be a results view.</div>
        </main>
    );
}

ResultsView.propTypes = {
    contentType: PropTypes.string,
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
};

export default ResultsView;
