import "./App.css";
import { HomePresenter, TopNavPresenter } from "./presenters";

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
