import {PiNavigationArrowFill} from 'react-icons/pi';
import './CursorLayer.css';

const CursorLayer = ({top, left, username}) => {
    return (
        <div className="cursorLayer">
            <div className="cursor" style={{top, left}}>
                <PiNavigationArrowFill /> {username}
            </div>
        </div>
    );
}

export default CursorLayer;