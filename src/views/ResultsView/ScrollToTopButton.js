import { StyledIconButton } from "./style";
import { CaretUpFill } from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";

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

export default ScrollToTopButton;
