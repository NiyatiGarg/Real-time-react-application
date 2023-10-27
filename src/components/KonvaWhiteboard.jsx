import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { Stage, Layer, Line, Text } from 'react-konva';
import { BsFillPencilFill, BsFillEraserFill } from 'react-icons/bs';

function KonvaWhiteboard() {

    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const [lineHistory] = useState([]);
    const isDrawing = React.useRef(false);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };


    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const handleUndo = () => {
        const newArray = [...lines]
        const getUndoItem = newArray.pop();
        lineHistory.push(getUndoItem);
        setLines(newArray);
    };
    const handleRedo = () => {
        const newArray = [...lines];
        const getUndoItem = lineHistory.pop();
        newArray.push(getUndoItem);
        setLines(newArray);
    };

    useEffect(() => {
        console.log(lines, 'undo function is currently empty')
    }, [lines]);


    return (
        <div>
            <div style={{ backgroundColor: 'pink' }}>
                <Text onClick={handleUndo} >Undo</Text>
                <Text onClick={handleRedo} >Redo</Text>
                <BsFillPencilFill className={tool === 'pen' ? 'pen-cursor' : ''} onClick={(e) => setTool('pen')} />
                <BsFillEraserFill className={tool === 'eraser' ? 'eraser-cursor' : ''} onClick={(e) => setTool('eraser')} />
            </div>
            <div>
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight * 0.5}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    style={{ backgroundColor: 'skyBlue' }}
                >
                    <Layer>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke="#df4b26"
                                strokeWidth={5}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default KonvaWhiteboard;
