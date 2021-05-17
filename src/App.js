import { HashRouter as Router, Switch, Route } from "react-router-dom";
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
    ProfilePresenter,
    GalleryPresenter,
    SidebarPresenter,
    LoggedInAreaPresenter,
    PrivateRoute,
    CollectionPresenter,
} from "./presenters";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    const sidebar = (
        <aside>
            <SidebarPresenter model={model} />
        </aside>
    );

    return (
        <Router>
            <div className="App">
                <div className="topnav">
                    <TopNavPresenter model={model} />
                </div>

                <Switch>
                    <Route path="/login" exact={true}>
                        <LoginPresenter model={model} />
                    </Route>

                    <Route path="/signup" exact={true}>
                        <SignupPresenter model={model} />
                    </Route>

                    <Route path="/forgot-password" exact={true}>
                        <ForgotPasswordPresenter model={model} />
                    </Route>

                    <LoggedInAreaPresenter model={model}>
                        <PrivateRoute
                            path="/profile"
                            exact={true}
                            model={model}
                        >
                            <MainContent>
                                <ProfilePresenter model={model} />
                            </MainContent>
                            {sidebar}
                        </PrivateRoute>

                        <PrivateRoute path="/search" exact={true} model={model}>
                            <MainContent>
                                <SearchResultsPresenter model={model} />
                            </MainContent>
                            {sidebar}
                        </PrivateRoute>

                        <PrivateRoute path="/liked" exact={true} model={model}>
                            <MainContent>
                                <LikedContentPresenter model={model} />
                            </MainContent>
                            {sidebar}
                        </PrivateRoute>

                        <PrivateRoute
                            path="/gallery/:galleryID"
                            exact={true}
                            model={model}
                        >
                            <MainContent>
                                <GalleryPresenter model={model} />
                            </MainContent>
                            {sidebar}
                        </PrivateRoute>

                        <PrivateRoute
                            path="/details/:imageID"
                            exact={true}
                            model={model}
                        >
                            <DetailsPresenter model={model} />
                        </PrivateRoute>

                        <PrivateRoute
                            path="/collection/:collectionID"
                            exact={true}
                            model={model}
                        >
                            <MainContent>
                                <CollectionPresenter model={model} />
                            </MainContent>
                            {sidebar}
                        </PrivateRoute>

                        <PrivateRoute path="/" exact={true} model={model}>
                            <MainContent>
                                <HomePresenter model={model} />
                            </MainContent>
                            {sidebar}
                        </PrivateRoute>
                    </LoggedInAreaPresenter>
                </Switch>
            </div>
        </Router>
    );
}

/**
 * Wrapper component to display main content correctly in the app layout
 * @param {Object} props - Properties passed to the object
 * @returns div element with className "mainContent" containing the children elements
 */
function MainContent(props) {
    const { children } = props;
    return <div className="mainContent">{children}</div>;
}

export default App;
