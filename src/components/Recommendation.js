import { HorizontalGridPresenter } from "../presenters";

function Recommendation(props) {
    const { title, images, model } = props;

    return (
        <HorizontalGridPresenter
            title={title}
            description="Recommended for you."
            images={images}
            model={model}
        />
    );
}

export default Recommendation;
