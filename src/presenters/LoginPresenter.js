import { useModelProperty } from './customHooks';
import { LoginView } from '../views';

function LoginPresenter(props) {
    const {
        model, // Model keeping application state
    } = props;

    const currentUser = useModelProperty(model, "currentUser");

    return (
        <LoginView />
    );
}

export default LoginPresenter;