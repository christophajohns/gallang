import "./App.css";

import { HomePresenter, TopNavPresenter } from "./presenters";
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

            <TopNavPresenter model={model} />
            <HomePresenter model={model} />

        </div>
    );
}

export default App;
