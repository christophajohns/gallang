import {
    StyledDetailsView,
    StyledImageWrapper,
    StyledInfoWrappper,
    InfoContainer,
    StyledSection,
    StyledOptionContainer,
    StyledIconButton,
    BackIconWrapper
} from "./style";
import { 
    Heart,
    Download,
    HeartFill,
    InfoCircle,
    ArrowUpLeftCircle,
    ArrowUpLeftCircleFill
} from "react-bootstrap-icons";

/**
 * Placeholder details view to test routing (would be used to render the full page version of an image and its info)
 * @param {Object} props - Properties passed to the view
 * @param {string} props.imageID - Unique identifier of the image or object displayed
 */
function DetailsView(props) {

    // const { imageID } = props;
    const {
        id,
        images,
        title,
        description,
        liked,
        onClickUnlikeButton,
        onClickLikeButton,
        onClickReturn
    } = props;

    const image = images[0];
    return(
        <div className="DetailsView">
            <StyledDetailsView>
                <BackIconWrapper>
                    <StyledIconButton
                        variant="link"
                        onClick={onClickReturn}
                    >
                        <ArrowUpLeftCircle />
                    </StyledIconButton>
                </BackIconWrapper>
                <StyledSection>
                    <StyledImageWrapper img={image.b.url}>
                        <StyledOptionContainer>
                            <StyledIconButton
                                variant="link"
                                onClick={liked ? onClickUnlikeButton : onClickLikeButton}
                            >
                                {liked? <HeartFill /> : <Heart />}
                            </StyledIconButton>
                            <StyledIconButton
                                variant="link"
                                target="_blank"
                            >
                                <InfoCircle />
                            </StyledIconButton>
                            <StyledIconButton
                                variant="link"
                                download={true}
                                href={image.b.url}
                                target="_blank"
                            >
                                <Download />
                            </StyledIconButton>
                        </StyledOptionContainer>
                    </StyledImageWrapper>
                </StyledSection>
                
                <StyledSection>
                    <StyledInfoWrappper>
                        <InfoContainer>
                            <div class="box">
                                <h2>Title: {title}</h2>
                            </div>
                            <div class="box">
                                <p>Description: {description}.</p>
                            </div>
                        </InfoContainer>
                    </StyledInfoWrappper>
                </StyledSection>

            </StyledDetailsView>

        </div>
    );
}

export default DetailsView;