import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import {
    DetailsPresenter,
    HomePresenter,
    SearchResultsPresenter,
    TopNavPresenter,
    LoginPresenter,
    SignupPresenter,
    ForgotPasswordPresenter,
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
                    <Route path="/login">
                        <LoginPresenter />
                    </Route>

                    <Route path="/signup">
                        <SignupPresenter />
                    </Route>

                    <Route path="/forgot-password">
                        <ForgotPasswordPresenter />
                    </Route>

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
            </div>
        </Router>
    );
}

export default App;
