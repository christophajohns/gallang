import {
    StyledDetailsView,
    StyledImageWrapper,
    StyledInfoWrappper,
    InfoContainer,
    StyledSection,
    StyledOptionContainer,
    StyledIconButton,
    BackIconWrapper,
    ScrollUpWrapper,
    StyledTitle,
    StyledDescription,
    StyledFrameWrapper,
    StyledTitleWrapper,
} from "./style";
import {
    Heart,
    Download,
    HeartFill,
    InfoCircle,
    X as XIcon,
    CaretUpSquare,
} from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";

/**
 * Details view to render the full page version of an image and its info
 * @param {Object} props - Properties passed to the view
 * @param {string} props.id - Unique identifier of the image or object displayed
 * @param {string} props.title - Name or title of the image (object)
 * @param {string} props.url - URL of the image source
 * @param {string} props.description - Long-form description of the image
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 * @param {Function} props.onClickImage - Function to be called when a user clicks on the image
 * @param {Function} props.onClickClose - Function to be called when a user clicks on the button to close the details view (return to previous page)
 */
function DetailsView(props) {
    const {
        id,
        title,
        url,
        description,
        liked,
        onClickUnlikeButton,
        onClickLikeButton,
        onClickClose,
    } = props;

    return (
        <StyledDetailsView className="DetailsView">
            <BackIconWrapper>
                <StyledIconButton variant="link" onClick={onClickClose}>
                    <XIcon />
                </StyledIconButton>
            </BackIconWrapper>
            <StyledSection id="image">
                <StyledOptionContainer>
                    <StyledIconButton
                        variant="link"
                        onClick={
                            liked ? onClickUnlikeButton : onClickLikeButton
                        }
                    >
                        {liked ? <HeartFill /> : <Heart />}
                    </StyledIconButton>
                    <StyledIconButton variant="link">
                        <ScrollLink
                            activeClass="active"
                            to="info"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={700}
                        >
                            <InfoCircle />
                        </ScrollLink>
                    </StyledIconButton>
                    <StyledIconButton
                        variant="link"
                        download={true}
                        href={url}
                        target="_blank"
                    >
                        <Download />
                    </StyledIconButton>
                </StyledOptionContainer>

                <StyledFrameWrapper>
                    <StyledImageWrapper img={url}></StyledImageWrapper>
                </StyledFrameWrapper>
                <StyledTitleWrapper>{title}</StyledTitleWrapper>
            </StyledSection>

            <StyledSection id="info">
                <StyledInfoWrappper>
                    <InfoContainer>
                        <StyledTitle>
                            <a href={url}>{title}</a>
                        </StyledTitle>
                        <StyledDescription>
                            <p>{description}</p>
                        </StyledDescription>
                    </InfoContainer>
                </StyledInfoWrappper>
                <ScrollUpWrapper>
                    <StyledIconButton variant="link">
                        <ScrollLink
                            activeClass="active"
                            to="image"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={700}
                        >
                            <CaretUpSquare />
                        </ScrollLink>
                    </StyledIconButton>
                </ScrollUpWrapper>
            </StyledSection>
        </StyledDetailsView>
    );
}

export default DetailsView;
