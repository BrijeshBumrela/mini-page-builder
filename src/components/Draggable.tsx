import React from "react";
import ReactDraggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./Draggable.css";
export interface IDraggableComponent {
  type: string;
  text: string;
  X: number;
  Y: number;
  fontSize: number;
  fontWeight: number;
  saved: boolean;
  id: string;
}

export interface IUpdatePosition {
  id: string;
  xPos: number;
  yPos: number;
}

const Draggable: React.FC<{
  block: IDraggableComponent;
  onSelect: (
    id: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  selected: boolean;
  updatePosition: (data: IUpdatePosition) => void;
}> = ({ block, onSelect, selected, updatePosition }) => {
  const { X, Y, text, fontSize, fontWeight, type, id } = block;

  const element = () => {
    if (type.toLowerCase() === "label") {
      return (
        <label
          className={"" + (selected ? "border-brijesh" : "")}
          style={{ fontSize: Number(fontSize), padding: "5px", fontWeight }}
        >
          {text}
        </label>
      );
    } else if (type.toLowerCase() === "input") {
      return (
        <input
          className={"" + (selected ? "border-brijesh" : "")}
          style={{ fontSize: Number(fontSize), padding: "5px", fontWeight }}
          readOnly
          value={text}
        />
      );
    } else if (type.toLowerCase() === "button") {
      return (
        <button
          className={"" + (selected ? "border-brijesh" : "")}
          style={{
            fontSize: Number(fontSize),
            padding: "10px",
            fontWeight,
            backgroundColor: "#0044C1",
            color: "#fff",
          }}
        >
          {text}
        </button>
      );
    }
  };

  const handleStop = (e: DraggableEvent, ui: DraggableData) => {
    updatePosition({
      id,
      xPos: Number(X) + ui.deltaX,
      yPos: Number(Y) + ui.deltaY,
    });
  };

  return (
    <ReactDraggable
      onDrag={handleStop}
      position={{ x: Number(X), y: Number(Y) }}
    >
      <div onClick={(e) => onSelect(id, e)} style={{ display: "inline-block" }}>
        {element()}
      </div>
    </ReactDraggable>
  );
};

export default Draggable;
