import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { Stage, Layer, Line } from 'react-konva';
import { BsFillPencilFill, BsFillEraserFill } from 'react-icons/bs';
import Cursors from './Cursors';
import { downloadURI } from '../utils/FileUtils';
import StorageUtils from '../utils/StorageUtils';

function KonvaWhiteboard({ lines, setLines, users }) {
    const [lineHistory, setLineHistory] = useState([]);
    const [lineDragHistory, setLineDragHistory] = useState([]);

    const [tool, setTool] = useState('pen');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [strokeWidth, setStrokeWidth] = useState(2);

    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    const nextLineId = useRef(0);

    useEffect(() => {
        StorageUtils.updateLines(lines);
    }, [lines])

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, {
            id: nextLineId.current++,
            tool,
            points: [pos.x, pos.y],
            color: selectedColor,
            strokeWidth
        }]);
    };

    const handleMouseMove = (e) => {
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        StorageUtils.updatePointer(point.x, point.y)

        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }

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
        if (!getUndoItem) {
            return;
        }
        newArray.push(getUndoItem);
        setLines(newArray);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear the whiteboard')) {
            stageRef.current.clear();
            setLines([]);
            setLineHistory([]);
            setLineDragHistory([]);
        }
    }

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        downloadURI(uri, 'stage.png');
    };

    const handleDragStart = (e) => {
        const id = e.target.id();
        setLines((prevLines) =>
            prevLines.map((line) => {
                return {
                    ...line,
                    isDragging: line.id === id,
                };
            }).filter((line, index) => index !== line.length - 1)
        );

    };

    const handleDragMove = (e) => {
        const id = e.target.id();
        setLines((prevLines) =>
            prevLines.map((line) => ({
                ...line,
                isDragging: line.id === id,
            }))
        );
    };

    const handleDragEnd = (e) => {
        const id = e.target.id();
        setLines((prevLines) =>
            prevLines.map((line) => ({
                ...line,
                isDragging: false,
            }))
        );

        const draggedLine = lines.find((line) => line.id === id);
        setLineDragHistory([...lineDragHistory, draggedLine]);
    };

    return (
        <div>
            <div style={{ backgroundColor: 'black', display: 'flex', gap: '20px', padding: '10px', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Button variant="primary" onClick={handleUndo} disabled={lines.length < 1}>Undo</Button>
                <Button variant="primary" onClick={handleRedo} disabled={lineHistory.length < 1}>Redo</Button>
                <Button variant="primary" onClick={handleClear} disabled={lines.length < 1}>Clear</Button>
                <Button variant={tool === 'pen' ? 'primary' : 'light'} onClick={(e) => setTool('pen')}><BsFillPencilFill /></Button>
                <Button variant={tool === 'eraser' ? 'primary' : 'light'} onClick={(e) => setTool('eraser')}><BsFillEraserFill /></Button>
                <div style={{ color: 'white' }}>
                    <span>Drawing Color: &nbsp;</span>
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                </div>
                <div style={{ color: 'white' }}>
                    <span>Background Color: &nbsp;</span>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                </div>
                <div style={{ color: 'white' }}>
                    <span>Stroke Width: &nbsp;</span>
                    <input
                        type='number'
                        value={strokeWidth}
                        onChange={e => setStrokeWidth(e.target.value)}
                    />
                </div>
                <Button variant="primary" onClick={handleExport} disabled={lines.length < 1}>Export</Button>
            </div>
            <div style={{position: 'relative'}}>
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight - 30}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    style={{ backgroundColor: backgroundColor }}
                    ref={stageRef}
                >
                    <Layer>
                        {lines.map((line, i) => (

                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={line.strokeWidth || 5}
                                tension={0.2}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                                draggable={line.tool !== 'eraser'}
                                onDragStart={handleDragStart}
                                onDragMove={handleDragMove}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                    </Layer>
                </Stage>
                <Cursors users={users} />
            </div>
        </div>
    );
}
export default KonvaWhiteboard;
