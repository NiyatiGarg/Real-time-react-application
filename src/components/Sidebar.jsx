import { logout } from '../utils/KeycloakUtil';
import StorageUtils from '../utils/StorageUtils';
import UserItem from './UserItem';
import './Sidebar.css';
import { Form, Button } from 'react-bootstrap';
import {BsBoxArrowRight} from 'react-icons/bs';
import { useState } from 'react';

const Sidebar = ({ users = [], exitRoom }) => {
    const [username, setUsername] = useState('');

    const inviteUser = async () => {
        const done  = await StorageUtils.invite(username);
        console.log(done);
    }

    return (
        <div className="sidebarContainer">
            <div className='invite'><h1>{StorageUtils.whiteboardId}</h1><BsBoxArrowRight onClick={exitRoom}/></div>
            <div className='usersContainer'>
            <h3>Users</h3>
            {
                users.map(user => <UserItem key={user} user={StorageUtils.users[user]} />)
            }
            </div>
            <div className="invite">
                <Form.Control
                    placeholder='...'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <Button onClick={inviteUser}>Invite</Button>
            </div>
            <Button variant="danger" onClick={logout}>LOG OUT</Button>
        </div>
    )
}

export default Sidebar;