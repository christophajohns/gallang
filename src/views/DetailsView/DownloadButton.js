import PropTypes from "prop-types";
import { Download } from "react-bootstrap-icons";
import { StyledIconButton } from "./style";

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

DownloadButton.propTypes = {
    url: PropTypes.string.isRequired,
};

export default DownloadButton;
