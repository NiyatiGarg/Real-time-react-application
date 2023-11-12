import CursorLayer from './CursorLayer';
import './Cursors.css';

const Cursors = ({ users }) => {
    return (
        <div className='cursorsContainer'>
            {
                Object.keys(users).map(username =>
                    <CursorLayer
                        key={username}
                        top={users[username].y+'px'}
                        left={users[username].x+'px'}
                        username={username}
                    />
                )
            }
        </div>
    )
}

export default Cursors;