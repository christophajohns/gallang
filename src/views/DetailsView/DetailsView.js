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
    StyledTitleWrapper
} from "./style";
import { 
    Heart,
    Download,
    HeartFill,
    InfoCircle,
    ArrowUpLeftCircle,
    ArrowUpLeftCircleFill,
    CaretUpSquare
} from "react-bootstrap-icons";
import { Link, animateScroll as scroll } from "react-scroll";

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
        url,
        description,
        liked,
        onClickUnlikeButton,
        onClickLikeButton,
        onClickReturn,
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
                <StyledSection id="image">
                    <StyledOptionContainer>
                        <StyledIconButton
                            variant="link"
                            onClick={liked ? onClickUnlikeButton : onClickLikeButton}
                        >
                            {liked? <HeartFill /> : <Heart />}
                        </StyledIconButton>
                        <StyledIconButton
                            variant="link"
                        >
                            <Link
                                activeClass="active"
                                to="info"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={700}
                            >
                                <InfoCircle />
                            </Link>
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
                    
                    <StyledFrameWrapper>
                        <StyledImageWrapper img={image.b.url}>
                        </StyledImageWrapper>
                    </StyledFrameWrapper>
                    <StyledTitleWrapper>
                        {title}
                    </StyledTitleWrapper>
                </StyledSection>
                
                <StyledSection id="info">
                    <StyledInfoWrappper>
                        <InfoContainer>
                            <StyledTitle>
                                <a href={url}>{title}</a>
                            </StyledTitle>
                            <StyledDescription>
                                <p> {description}.</p>
                            </StyledDescription>
                        </InfoContainer>
                    </StyledInfoWrappper>
                    <ScrollUpWrapper>
                        <StyledIconButton
                            variant="link"
                        >
                            <Link
                                activeClass="active"
                                to="image"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={700}                            
                            >
                                <CaretUpSquare />
                            </Link>
                        </StyledIconButton>
                    </ScrollUpWrapper>
                </StyledSection>

            </StyledDetailsView>

        </div>
    );
}

export default DetailsView;