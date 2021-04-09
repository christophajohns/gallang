import "./App.css";
import { LikedContentView } from "./views";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <LikedContentView
                numberOfObjects={26}
                images={mockCollections[0].images}
                model={model}
            />
        </div>
    );
}

export default App;
