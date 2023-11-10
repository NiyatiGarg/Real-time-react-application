import { getUsername } from "../utils/KeycloakUtil";
import StorageUtils from "../utils/StorageUtils";

const UserItem = ({ user }) => {
    const removeUser = (e) => {
        if (window.confirm('Are you sure you want to remove this user')) {
            StorageUtils.removeUser(user?.username);
        }
    }

    const canRemove = StorageUtils.owner !== user?.username && user?.username !== getUsername();

    return (
        <div className="container">
            <p>{user?.name || user?.username}</p>
            {
                canRemove && <button onClick={removeUser}>X</button>
            }
        </div>
    )
}

export default UserItem;