import React, { useEffect, useState } from "react";
import Draggable, { ControlPosition, DraggableEvent } from "react-draggable";

interface ITagProps {
  type: string;
  onCreatingNewBlock: (e: newBlockProperties) => void;
}

export interface newBlockProperties {
  xPos: number;
  yPos: number;
  type: string;
}

const Tag: React.FC<ITagProps> = ({ type, onCreatingNewBlock }) => {
  const eleRef = React.useRef<HTMLDivElement>(null);
  const [tagStartingPosition, setTagStartingPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isStopped, setStopped] = useState(false);

  useEffect(() => {
    if (!eleRef.current) {
      return;
    }
    setTagStartingPosition(getStartingCoordinates(eleRef.current));
  }, []);

  const getStartingCoordinates = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.y,
      left: rect.x,
    };
  };

  const handleStop = (e: DraggableEvent) => {
    setStopped(true);

    if (eleRef.current) {
      const { top: yPos, left: xPos } = getStartingCoordinates(eleRef.current);
      onCreatingNewBlock({
        xPos,
        yPos,
        type,
      });
    }
  };

  const handleDrag = (e: DraggableEvent) => {};

  let optionalProps: { position?: ControlPosition } = {};
  if (isStopped && tagStartingPosition) {
    optionalProps.position = {
      x: tagStartingPosition.top,
      y: tagStartingPosition.left,
    };
  }

  return (
    <Draggable
      onStop={(e) => handleStop(e)}
      onDrag={(e) => handleDrag(e)}
      // {...optionalProps}
      position={{ x: 0, y: 0 }}
    >
      <div className="label-box" ref={eleRef}>
        <h5>{type}</h5>
      </div>
    </Draggable>
  );
};

export default Tag;
