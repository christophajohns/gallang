import PropTypes from "prop-types";
import { Download } from "react-bootstrap-icons";
import { StyledButton } from "./style";

/**
 * Button saying "Download all"
 * @param {Object} props - Properties to be passed to the component
 * @param {Function} props.onClickDownloadAll - Function to be called when the button is clicked
 * @returns Download all button
 */
function DownloadAllButton(props) {
    const { onClickDownloadAll } = props;

    return (
        <StyledButton variant="outline-dark" onClick={onClickDownloadAll}>
            <Download />
            Download all
        </StyledButton>
    );
}

DownloadAllButton.propTypes = {
    allowDownloadAll: PropTypes.bool.isRequired,
};

export default DownloadAllButton;
