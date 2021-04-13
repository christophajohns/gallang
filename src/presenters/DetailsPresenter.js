import { useParams } from "react-router-dom";
import { DetailsView } from "../views";


function DetailsPresenter() {
    const { imageID } = useParams();

    return <DetailsView imageID={imgaeID}/>;
}

export default DetailsPresenter;