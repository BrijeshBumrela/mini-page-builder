import React from "react";
import ReactDraggable from "react-draggable";
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

const Draggable: React.FC<{
  block: IDraggableComponent;
  onSelect: (
    id: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  selected: boolean;
}> = ({ block, onSelect, selected }) => {
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
            padding: "5px",
            fontWeight,
            outline: "none",
          }}
        >
          {text}
        </button>
      );
    }
  };

  return (
    <ReactDraggable position={{ x: Number(X), y: Number(Y) }}>
      <div onClick={(e) => onSelect(id, e)} style={{ display: "inline-block" }}>
        {element()}
      </div>
    </ReactDraggable>
  );
};

export default Draggable;
