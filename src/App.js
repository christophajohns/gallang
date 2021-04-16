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
                        <MainContent>
                            <SearchResultsPresenter model={model} />
                        </MainContent>
                        <aside>
                            <SidebarPresenter />
                        </aside>
                    </Route>

                    <Route path="/liked" exact={true}>
                        <MainContent>
                            <LikedContentPresenter model={model} />
                        </MainContent>
                        <aside>
                            <SidebarPresenter />
                        </aside>
                    </Route>

                    <Route path="/details/:imageID" exact={true}>
                        <DetailsPresenter model={model} />
                    </Route>

                    <Route path="/" exact={true}>
                        <MainContent>
                            <HomePresenter model={model} />
                        </MainContent>
                        <aside>
                            <SidebarPresenter />
                        </aside>
                    </Route>
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
