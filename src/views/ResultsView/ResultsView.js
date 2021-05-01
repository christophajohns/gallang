import PropTypes from "prop-types";
import { Download } from "react-bootstrap-icons";
import { VerticalGrid } from "../../components";
import {
    TitleAndDescriptionDiv,
    TitleH3,
    ContentTypeDiv,
    StyledButton,
    TopDiv,
    StyledIconButton,
    BottomRightFixed,
} from "./style";
import { CaretUpFill } from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";

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
                    <TitleH3>{title}</TitleH3>
                    <div>{numberOfObjects} Objects</div>
                </TitleAndDescriptionDiv>
                {allowDownloadAll ? (
                    <DownloadAllButton
                        onClickDownloadAll={onClickDownloadAll}
                    />
                ) : (
                    ""
                )}
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

/** Button to scroll up to the top of the page */
function ScrollToTopButton() {
    return (
        <StyledIconButton variant="link">
            <ScrollLink
                activeClass="active"
                to="info"
                spy={true}
                smooth={true}
                offset={0}
                duration={700}
            >
                <CaretUpFill />
            </ScrollLink>
        </StyledIconButton>
    );
}

/**
 * Button saying "Load more"
 * @param {Object} props - Properties to be passed to the component
 * @param {Function} props.onClickLoadMore - Function to be called when the button is clicked
 * @returns Load more button
 */
function LoadMoreButton(props) {
    const { onClickLoadMore } = props;

    return (
        <StyledButton variant="outline-dark" onClick={onClickLoadMore}>
            Load more
        </StyledButton>
    );
}

/**
 * Button saying "Download all"
 * @param {Object} props - Properties to be passed to the component
 * @param {Function} props.onClickDownloadAll - Function to be called when the button is clicked
 * @returns Download all button
 */
function DownloadAllButton(props) {
    const { onClickDownloadAll } = props;

    return (
        <StyledButton variant="outline-dark" onClick={onClickDownloadAll}>
            <Download />
            Download all
        </StyledButton>
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
};

export default ResultsView;
