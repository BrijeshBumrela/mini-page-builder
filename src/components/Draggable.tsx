import React from 'react';
import ReactDraggable from 'react-draggable';
export interface IDraggableComponent {
    type: string,
    text: string,
    X: number,
    Y: number,
    fontSize: number,
    fontWeight: number,
    saved: boolean,
    id: string
}

const Draggable: React.FC<IDraggableComponent> = ({ X, Y, text, fontSize, fontWeight }) => {
    console.log("X, Y values", X, Y)

    return <ReactDraggable
        position={{ x: Number(X), y: Number(Y) }}
    >
        <div style={{ fontSize, fontWeight }}>{ text }</div>
    </ReactDraggable>
}

export default Draggable;