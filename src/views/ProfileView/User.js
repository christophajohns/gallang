import PropTypes from "prop-types";
import { UserSection, Account, CreationTimeDiv } from "./style";

/**
 * Component to display summary information about the currently logged in user
 * @param {Object} props - Properties passed to the component
 * @param {string} props.name - Username of the currently logged in user
 * @param {string} props.creationTime - Creation date for the image
 */
function User(props) {
    const { name, creationTime } = props;

    const initial = name.charAt(0).toUpperCase();

    return (
        <UserSection>
            <Account>{initial}</Account>
            <div>
                <div className="bold">{name}</div>
                <CreationTimeDiv className="grey">
                    Since {creationTime}
                </CreationTimeDiv>
            </div>
        </UserSection>
    );
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    creationTime: PropTypes.string.isRequired,
};

export default User;
