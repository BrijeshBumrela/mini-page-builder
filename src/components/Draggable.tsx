import React from 'react';
import ReactDraggable from 'react-draggable';
export interface IDraggableComponent {
    type: string,
    text: string,
    X: number,
    Y: number,
    fontSize: number,
    fontWeight: number,
    saved: false
}

const Draggable: React.FC<IDraggableComponent> = ({ X, Y }) => {
    return <ReactDraggable
        position={{ x: X, y: Y }}
    >
        <div>hello</div>
    </ReactDraggable>
}

export default Draggable;