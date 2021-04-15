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
import { PrivateRoute } from "./components";
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
                    <Route path="/login" exact={true}>
                        <LoginPresenter />
                    </Route>

                    <Route path="/signup" exact={true}>
                        <SignupPresenter />
                    </Route>

                    <Route path="/forgot-password" exact={true}>
                        <ForgotPasswordPresenter />
                    </Route>

                    <PrivateRoute path="/search" exact={true}>
                        <SearchResultsPresenter model={model} />
                    </PrivateRoute>

                    <PrivateRoute path="/liked" exact={true}>
                        <LikedContentPresenter model={model} />
                    </PrivateRoute>

                    <PrivateRoute path="/details/:imageID" exact={true}>
                        <DetailsPresenter model={model} />
                    </PrivateRoute>

                    <PrivateRoute path="/" exact={true}>
                        <HomePresenter model={model} />
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
