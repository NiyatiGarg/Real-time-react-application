import { logout } from '../utils/KeycloakUtil';
import StorageUtils from '../utils/StorageUtils';
import UserItem from './UserItem';

const Sidebar = ({ users = [] }) => {
    const inviteUser = () => {
        alert('Invite ...');
    }

    return (
        <div className="container">
            <h1>{StorageUtils.whiteboardId}</h1>
            {
                users.map(user => <UserItem key={user} user={StorageUtils.users[user]} />)
            }
            <div className="buttons">
                <button onClick={inviteUser}>Invite</button>
            </div>
            <button onClick={logout}>LOG OUT</button>
        </div>
    )
}

export default Sidebar;