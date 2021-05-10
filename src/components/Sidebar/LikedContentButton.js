import { Link } from "react-router-dom";
import { Heart } from "react-bootstrap-icons";
import SidebarButton from "./SidebarButton";

/** Button linking to the user's liked content */
function LikedContentButton() {
    return (
        <Link to="/liked">
            <SidebarButton name="Liked content">
                <Heart />
            </SidebarButton>
        </Link>
    );
}

export default LikedContentButton;
