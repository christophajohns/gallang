import { CaretUpFill } from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";
import { StyledIconButton } from "./style";

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

export default ScrollToTopButton;
