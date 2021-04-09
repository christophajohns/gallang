import "./App.css";
import { HomePresenter } from "./presenters";
import { ResultsView } from "./views";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <ResultsView
                contentType={"search results"}
                title={"Some search query"}
                numberOfObjects={137}
                images={mockCollections[0].images}
                model={model}
            />
            {/* <HomePresenter model={model} /> */}
        </div>
    );
}

export default App;
