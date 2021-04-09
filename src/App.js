import "./App.css";
import { HomePresenter } from "./presenters";
import { GalleryView } from "./views";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <GalleryView
                title={"Dark and Moody"}
                numberOfObjects={26}
                images={mockCollections[0].images}
                model={model}
            />
            {/* <HomePresenter model={model} /> */}
        </div>
    );
}

export default App;
