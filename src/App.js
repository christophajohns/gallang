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
    SidebarPresenter,
} from "./presenters";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <Router>
            <div className="App">
                <div className="topnav">
                    <TopNavPresenter model={model} />
                </div>
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

                    <Route path="/search" exact={true}>
                        <SearchResultsPresenter model={model} />
                    </Route>

                    <Route path="/liked" exact={true}>
                        <LikedContentPresenter model={model} />
                    </Route>

                    <Route path="/details/:imageID" exact={true}>
                        <DetailsPresenter model={model} />
                    </Route>

                    <Route path="/" exact={true}>
                        <div className="mainContent">
                            <HomePresenter model={model} />
                        </div>
                        <aside>
                            <SidebarPresenter />
                        </aside>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
