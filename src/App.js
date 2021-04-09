import "./App.css";
import { HomePresenter } from "./presenters";
import { SearchResultsView } from "./views";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <SearchResultsView
                searchQuery={"Some search query"}
                numberOfResults={137}
                images={mockCollections[0].images}
                model={model}
            />
            {/* <HomePresenter model={model} /> */}
        </div>
    );
}

export default App;
