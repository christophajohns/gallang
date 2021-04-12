
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
                <Switch>
                    <Route path="/search">
                        <SearchResultsPresenter />
                    </Route>

                    <Route path="/details/:imageID">
                        <DetailsPresenter />
                    </Route>

                    <Route path="/">
                        <HomePresenter model={model} />
                    </Route>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
