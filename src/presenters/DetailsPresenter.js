import { useParams } from "react-router-dom";
import { DetailsView } from "../views";

/** Placeholder presenter to test routing for the details view */
function DetailsPresenter() {
    const { imageID } = useParams();

    return <DetailsView imageID={imageID} />;
}

export default DetailsPresenter;
