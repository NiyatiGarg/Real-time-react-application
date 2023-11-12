import {PiNavigationArrowFill} from 'react-icons/bs';
import './CursorLayer.css';

const CursorLayer = ({top, left, username}) => {
    return (
        <div className="cursorLayer">
            <div className="cursor" styles={{top, left}}>
                <PiNavigationArrowFill /> {username}
            </div>
        </div>
    );
}

export default CursorLayer;