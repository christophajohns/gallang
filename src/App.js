import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { 
    DetailsPresenter,
    HomePresenter,
    SearchResultsPresenter,
    LikedContentPresenter, 
} from "./presenters";
import { mockCollections } from "./model/MockData";

function App(props) {
    const {
        model, // Model keeping application state
    } = props;

    return (
        <div className="App">
            {/* <LikedContentPresenter
                numberOfObjects={26}
                images={mockCollections[0].images}
                model={model}
            /> */}
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact>
                            <HomePresenter model={model} />
                        </Route>
                        
                        <Route path="/search">
                            <SearchResultsPresenter model={model}/>
                        </Route>

                        <Route path="/details/:imageID">
                            <DetailsPresenter model={model}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
