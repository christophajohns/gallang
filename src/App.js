import "./App.css";
import { LikedContentPresenter, HomePresenter } from "./presenters";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            {/* <LikedContentPresenter
                numberOfObjects={26}
                images={mockCollections[0].images}
                model={model}
            /> */}
            <HomePresenter model={model} />
        </div>
    );
}

export default App;
