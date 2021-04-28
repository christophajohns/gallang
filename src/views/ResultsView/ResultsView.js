import PropTypes from "prop-types";
import { Download } from "react-bootstrap-icons";
import { VerticalGrid } from "../../components";
import { imageType } from "../../types";
import { modelType as imagePresenterModelType } from "../../presenters/ImagePresenter";
import {
    TitleAndDescriptionDiv,
    TitleH3,
    ContentTypeDiv,
    StyledButton,
    TopDiv,
    LoadMoreButton,
    StyledIconButton,
    BottomRightFixed
} from "./style";
import {
    CaretUpFill
} from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {string} [props.contentType] - Type of results to display
 * @param {string} props.title - Title or name for the results
 * @param {number} props.numberOfObjects - Total number of objects to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {boolean} props.allowDownloadAll - Flag whether to have a "Download all" button on the page
 * @param {Function} [props.onClickDownloadAll] - Function to be called when the button is clicked (default: empty function)
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
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
        visiable,
        model,
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
            <VerticalGrid images={images.slice(0, visiable)} model={model} />
            <LoadMoreButton variant="success" onClick={onClickLoadMore}>Load more</LoadMoreButton>
            <BottomRightFixed>
                <ScrollToTopButton />
            </BottomRightFixed>
        </main>
    );
}

/** Button to scroll up to the image */
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

export const resultsViewPropTypes = {
    contentType: PropTypes.string,
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    model: imagePresenterModelType.isRequired,
};

ResultsView.propTypes = resultsViewPropTypes;

export default ResultsView;
