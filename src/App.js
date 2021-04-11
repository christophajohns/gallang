import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { HomePresenter, SearchResultsPresenter } from "./presenters";

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
                    <Route path="/">
                        <HomePresenter model={model} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
