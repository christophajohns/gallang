import PropTypes from "prop-types";
import { Trash } from "react-bootstrap-icons";
import { VerticalGrid } from "../../components";
import {
    TitleAndDescriptionDiv,
    TitleH3,
    ContentTypeDiv,
    TopDiv,
    BottomRightFixed,
    DeleteButton,
    ButtonsDiv,
} from "./style";
import DownloadAllButton from "./DownloadAllButton";
import LoadMoreButton from "./LoadMoreButton";
import ScrollToTopButton from "./ScrollToTopButton";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {string} [props.contentType] - Type of results to display
 * @param {string} props.title - Title or name for the results
 * @param {number} props.numberOfObjects - Total number of objects to be displayed
 * @param {Object | Function} props.images - Slot to display images
 * @param {boolean} props.allowDownloadAll - Flag whether to have a "Download all" button on the page
 * @param {Function} [props.onClickDownloadAll] - Function to be called when the button is clicked (default: empty function)
 * @param {Function} props.onClickLoadMore - Function to be called when a user clicks on the load more button
 * @param {number} props.numberOfVisibleObjects - Number of objects (images) to display
 * @param {boolean} props.allowDelete - Flag whether to show a delete button next to the grid title
 * @param {boolean} [props.allowDelete] - Function to be called when a user clicks the delete button
 */
function ResultsView(props) {
    const {
        contentType,
        title,
        numberOfObjects,
        images,
        allowDownloadAll,
        onClickDownloadAll,
        onClickLoadMore,
        numberOfVisibleObjects,
        allowDelete,
        onClickDeleteButton,
    } = props;
    return (
        <main className="ResultsView">
            <TopDiv>
                <TitleAndDescriptionDiv id="info">
                    {contentType ? (
                        <ContentTypeDiv>
                            {contentType.toUpperCase()}
                        </ContentTypeDiv>
                    ) : (
                        ""
                    )}
                    <div>
                        <TitleH3>{title}</TitleH3>
                    </div>
                    <div>{numberOfObjects} Objects</div>
                </TitleAndDescriptionDiv>
                <ButtonsDiv>
                    {allowDelete && (
                        <DeleteButton
                            onClick={onClickDeleteButton}
                            variant="outline-danger"
                        >
                            <Trash /> Delete
                        </DeleteButton>
                    )}
                    {allowDownloadAll && (
                        <DownloadAllButton
                            onClickDownloadAll={onClickDownloadAll}
                        />
                    )}
                </ButtonsDiv>
            </TopDiv>
            <VerticalGrid images={images} />
            {numberOfVisibleObjects < numberOfObjects ? (
                <LoadMoreButton onClickLoadMore={onClickLoadMore} />
            ) : (
                <div>This is the end. You have seen it all!</div>
            )}
            <BottomRightFixed>
                <ScrollToTopButton />
            </BottomRightFixed>
        </main>
    );
}

ResultsView.propTypes = {
    contentType: PropTypes.string,
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.node,
    allowDownloadAll: PropTypes.bool.isRequired,
    onClickDownloadAll: PropTypes.func,
    onClickLoadMore: PropTypes.func.isRequired,
    numberOfVisibleObjects: PropTypes.number.isRequired,
    allowDelete: PropTypes.bool.isRequired,
    onClickDeleteButton: PropTypes.func,
};

export default ResultsView;
