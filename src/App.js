import "./App.css";
import { LikedContentPresenter } from "./presenters";
import { SearchResultsPresenter } from "./presenters";
import { CollectionPresenter } from "./presenters";
import { GalleryPresenter } from "./presenters";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
        <CollectionPresenter title={mockCollections[0].title} numberOfObjects={mockCollections[0].numberOfObjects} images={mockCollections[0].images} model={model} />

        </div>
    );
}

export default App;
