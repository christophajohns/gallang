/**
 * Placeholder results view to test routing (would be used to render search results, collection, gallery, liked content)
 * @param {Object} props - Properties passed to the view
 * @param {"search results" | "gallery" | "collection" | "liked content"} contentType - Type of results to display
 */
function ResultsView(props) {
    const { contentType } = props;

    return <div>This would be the results view for {contentType}</div>;
}

export default ResultsView;
