import './App.css';
import {
  LoginPresenter,
} from './presenters';

function App(props) {
  const {
    model, // Model keeping application state
  } = props;

  return (
    <div className="App">
      <LoginPresenter model={model} />
    </div>
  );
}

export default App;
