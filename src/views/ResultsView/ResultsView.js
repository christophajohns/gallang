import PropTypes from "prop-types";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {"collection" | "search results" | "gallery" | "liked content"} contentType - Type of results to display (e.g. collection)
 */
function ResultsView(props) {
    const { contentType } = props;
    return (
        <main className="ResultsView">
            <div>
                {contentType && contentType !== "liked content" ? (
                    <div>{contentType.toUpperCase()}</div>
                ) : (
                    ""
                )}
            </div>
            <div>Here should be a results view.</div>
        </main>
    );
}

ResultsView.propTypes = {
    contentType: PropTypes.string,
};

export default ResultsView;
