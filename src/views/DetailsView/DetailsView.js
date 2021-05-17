import PropTypes from "prop-types";
import { BottomRightFixed, DetailsViewDiv, TopFixed } from "./style";
import BackButton from "./BackButton";
import ImageButtons from "./ImageButtons";
import ScrollToTopButton from "./ScrollToTopButton";
import ImageSection from "./ImageSection";
import InfoSection from "./InfoSection";

/**
 * Details view to render the full page version of an image and its info
 * @param {Object} props - Properties passed to the view
 * @param {string} [props.title] - Name or title of the image (object)
 * @param {string} [props.date] - Creation date for the image
 * @param {string} props.objectType - Type of object that is represented in the image (e.g. Poster or Album Cover)
 * @param {string} props.url - URL of the image source
 * @param {string} props.description - Long-form description of the image
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 * @param {Function} props.onClickImage - Function to be called when a user clicks on the image
 * @param {Function} props.onClickBackButton - Function to be called when a user clicks on the button to return to the previous page
 */
function DetailsView(props) {
    const {
        title: titleProp,
        date: dateProp,
        objectType,
        url,
        description,
        liked,
        onClickUnlikeButton,
        onClickLikeButton,
        onClickBackButton,
    } = props;

    const title = titleProp ? titleProp : "Untitled";
    const date = dateProp ? dateProp : "Unknown date";

    return (
        <DetailsViewDiv className="DetailsView">
            <TopFixed>
                <BackButton onClickBackButton={onClickBackButton} />

                <ImageButtons
                    liked={liked}
                    onClickLikeButton={onClickLikeButton}
                    onClickUnlikeButton={onClickUnlikeButton}
                    url={url}
                />
            </TopFixed>

            <BottomRightFixed>
                <ScrollToTopButton />
            </BottomRightFixed>

            <ImageSection
                url={url}
                title={title}
                objectType={objectType}
                date={date}
            />
            <InfoSection
                title={title}
                description={description}
                objectType={objectType}
                date={date}
            />
        </DetailsViewDiv>
    );
}

DetailsView.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    objectType: PropTypes.string.isRequired,
    date: PropTypes.string,
    url: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    onClickLikeButton: PropTypes.func.isRequired,
    onClickUnlikeButton: PropTypes.func.isRequired,
    onClickBackButton: PropTypes.func.isRequired,
};

export default DetailsView;
