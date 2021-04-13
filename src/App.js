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
        <Router>
            <div className="App">
                <TopNavPresenter model={model} />
                <Switch>
                    <Route path="/search" exact={true}>
                        <SearchResultsPresenter model={model} />
                    </Route>

                    <Route path="/details/:imageID" exact={true}>
                        <DetailsPresenter model={model} />
                    </Route>

                    <Route path="/" exact={true}>
                        <HomePresenter model={model} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
