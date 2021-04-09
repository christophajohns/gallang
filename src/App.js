import "./App.css";
import { HomePresenter } from "./presenters";
import { CollectionView } from "./views";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <CollectionView
                title={mockCollections[0].title}
                numberOfObjects={mockCollections[0].numberOfImages}
                images={mockCollections[0].images}
                model={model}
            />
            {/* <HomePresenter model={model} /> */}
        </div>
    );
}

export default App;
