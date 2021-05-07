import { Info } from "react-bootstrap-icons";
import { Link as ScrollLink } from "react-scroll";
import { StyledIconButton } from "./style";

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

export default InfoButton;
