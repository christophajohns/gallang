import {
    BottomRightFixed,
    DetailsViewDiv,
    InfoContainer,
    StyledDescription,
    StyledIconButton,
    StyledImage,
    StyledOptionContainer,
    StyledSection,
    StyledSubTitle,
    StyledTitle,
    StyledTitleWrapper,
    TopFixed,
} from "./style";
import {
    CaretUpFill,
    ChevronLeft,
    Download,
    Heart,
    HeartFill,
    Info,
} from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";

/**
 * Details view to render the full page version of an image and its info
 * @param {Object} props - Properties passed to the view
 * @param {string} props.title - Name or title of the image (object)
 * @param {string} props.date - Creation date for the image
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
        title,
        date,
        objectType,
        url,
        description,
        liked,
        onClickUnlikeButton,
        onClickLikeButton,
        onClickBackButton,
    } = props;

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

/**
 * Component to like or download an image or view its information
 * @param {Object} props - Properties passed to the component
 * @param {string} props.url - URL of the image source
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 */
function ImageButtons(props) {
    const { liked, onClickLikeButton, onClickUnlikeButton, url } = props;

    return (
        <StyledOptionContainer>
            <InfoButton />
            <LikeButton
                liked={liked}
                onClickLikeButton={onClickLikeButton}
                onClickUnlikeButton={onClickUnlikeButton}
            />
            <DownloadButton url={url} />
        </StyledOptionContainer>
    );
}

/**
 * Button to like an image
 * @param {Object} props - Properties passed to the component
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 */
function LikeButton(props) {
    const { liked, onClickLikeButton, onClickUnlikeButton } = props;

    return (
        <StyledIconButton
            variant="link"
            onClick={liked ? onClickUnlikeButton : onClickLikeButton}
        >
            {liked ? <HeartFill /> : <Heart />}
        </StyledIconButton>
    );
}

/** Button to scroll down and view an image's information details */
function InfoButton() {
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
                <Info />
            </ScrollLink>
        </StyledIconButton>
    );
}

/**
 * Button to download an image
 * @param {Object} props - Properties passed to the component
 * @param {string} props.url - URL of the image source
 */
function DownloadButton(props) {
    const { url } = props;

    return (
        <StyledIconButton
            variant="link"
            download={true}
            href={url}
            target="_blank"
        >
            <Download />
        </StyledIconButton>
    );
}

/** Button to scroll up to the image */
function ScrollToTopButton() {
    return (
        <StyledIconButton variant="link">
            <ScrollLink
                activeClass="active"
                to="image"
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
 * Button to return to the previous page
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onClickBackButton - Function to be called when a user clicks on the button to return to the previous page
 */
function BackButton(props) {
    const { onClickBackButton } = props;

    return (
        <StyledIconButton variant="link" onClick={onClickBackButton}>
            <ChevronLeft />
        </StyledIconButton>
    );
}

/**
 * Section of the page displaying the large image
 * @param {Object} props - Properties passed to the component
 * @param {string} props.title - Name or title of the image (object)
 * @param {string} props.date - Creation date for the image
 * @param {string} props.objectType - Type of object that is represented in the image (e.g. Poster or Album Cover)
 * @param {string} props.url - URL of the image source
 */
function ImageSection(props) {
    const { url, title, objectType, date } = props;

    return (
        <StyledSection>
            <StyledImage src={url} alt={title} />
            <StyledTitleWrapper>
                <div>{title.toUpperCase()}</div>
                <StyledSubTitle>
                    {objectType}, {date}.
                </StyledSubTitle>
            </StyledTitleWrapper>
        </StyledSection>
    );
}

/**
 * Section of the page displaying the information details about the image (object)
 * @param {Object} props - Properties passed to the component
 * @param {string} props.title - Name or title of the image (object)
 * @param {string} props.date - Creation date for the image
 * @param {string} props.objectType - Type of object that is represented in the image (e.g. Poster or Album Cover)
 * @param {string} props.description - Long-form description of the image
 */
function InfoSection(props) {
    const { title, description, objectType, date } = props;

    return (
        <StyledSection>
            <InfoContainer>
                <StyledTitle>{title}</StyledTitle>
                <StyledSubTitle>
                    {objectType}, {date}.
                </StyledSubTitle>
                <StyledDescription>{description}</StyledDescription>
            </InfoContainer>
        </StyledSection>
    );
}

export default DetailsView;
