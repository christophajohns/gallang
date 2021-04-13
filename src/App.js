import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import {
    DetailsPresenter,
    HomePresenter,
    SearchResultsPresenter,
    TopNavPresenter,
    LikedContentPresenter,
    CollectionPresenter,
    GalleryPresenter,
} from "./presenters";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            <TopNavPresenter model={model} />
            <Router>
                <Switch>
                    <Route path="/search">
                        <SearchResultsPresenter model={model} />
                    </Route>

                    <Route path="/details/:imageID">
                        <DetailsPresenter model={model} />
                    </Route>

                    <Route path="/">
                        <HomePresenter model={model} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
