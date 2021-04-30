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
    ProfilePresenter,
    GalleryPresenter,
    SidebarPresenter,
    CreateGalleryPresenter,
} from "./presenters";
import { PrivateRoute } from "./components";

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
                        <LoginPresenter />
                    </Route>

                    <Route path="/signup" exact={true}>
                        <SignupPresenter />
                    </Route>

                    <Route path="/forgot-password" exact={true}>
                        <ForgotPasswordPresenter />
                    </Route>

                    <PrivateRoute path="/profile" exact={true}>
                        <MainContent>
                            <ProfilePresenter model={model} />
                        </MainContent>
                        {sidebar}
                    </PrivateRoute>

                    <PrivateRoute path="/search" exact={true}>
                        <MainContent>
                            <SearchResultsPresenter model={model} />
                        </MainContent>
                        {sidebar}
                    </PrivateRoute>

                    <PrivateRoute path="/liked" exact={true}>
                        <MainContent>
                            <LikedContentPresenter model={model} />
                        </MainContent>
                        {sidebar}
                    </PrivateRoute>

                    <PrivateRoute path="/new-gallery" exact={true}>
                        <MainContent>
                            <CreateGalleryPresenter model={model}/>
                            {console.log("App.js")}
                        </ MainContent>
                        {sidebar}
                    </ PrivateRoute>
                    
                    <PrivateRoute path="/gallery/:galleryID" exact={true}>
                        <MainContent>
                            <GalleryPresenter model={model} />
                        </MainContent>
                        {sidebar}
                    </PrivateRoute>

                    <PrivateRoute path="/details/:imageID" exact={true}>
                        <DetailsPresenter model={model} />
                    </PrivateRoute>

                    <PrivateRoute path="/" exact={true}>
                        <MainContent>
                            <HomePresenter model={model} />
                        </MainContent>
                        {sidebar}
                    </PrivateRoute>
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
