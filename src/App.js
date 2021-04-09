import "./App.css";
import { HomePresenter } from "./presenters";
import { ResultsView } from "./views";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <ResultsView contentType={"search results"} />
            {/* <HomePresenter model={model} /> */}
        </div>
    );
}

export default App;
