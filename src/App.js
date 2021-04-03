import './App.css';
import {
  HomePresenter,
} from './presenters';

function App(props) {
  const {
    model, // Model keeping application state
  } = props;

  return (
    <div className="App">
      <HomePresenter model={model} />
    </div>
  );
}

export default App;
