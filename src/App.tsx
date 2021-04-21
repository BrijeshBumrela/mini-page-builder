import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "antd";
import { v4 as uuid } from "uuid";

import "antd/dist/antd.css";

import "./App.css";
import Draggable, {
  IDraggableComponent,
  IUpdatePosition,
} from "./components/Draggable";
import SideBar from "./components/Sidebar";
import { newBlockProperties } from "./components/Tag";
import FormComponent from "./components/form";

const getDefaultValues = ({
  type,
  xPos,
  yPos,
}: newBlockProperties): IDraggableComponent => ({
  text: `this is ${type}`,
  type,
  X: xPos,
  Y: yPos,
  fontSize: 12,
  fontWeight: 400,
  saved: false,
  id: uuid(),
});

function App() {
  const [components, setComponents] = useState<IDraggableComponent[]>(() => {
    const blocks = localStorage.getItem("blocks");
    if (blocks) {
      return JSON.parse(blocks).blocks;
    }
    return [];
  });
  const [
    selectedComponent,
    setSelectedComponent,
  ] = useState<null | IDraggableComponent>(null);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  const handleNewBlockCreation = (e: newBlockProperties) => {
    const newComponentValue = getDefaultValues(e);
    setComponents((components) => [...components, newComponentValue]);
    setSelectedComponent(newComponentValue);
    setShouldOpenModal(true);
  };

  const handleOk = (updatedBlockValues: IDraggableComponent) => {
    setSelectedComponent(null);
    setShouldOpenModal(false);
    setComponents((components) =>
      components.map((component) =>
        component.id === updatedBlockValues.id
          ? { ...updatedBlockValues, saved: true }
          : component
      )
    );
  };

  useEffect(() => {
    const savedComponents = components.filter((component) => component.saved);
    localStorage.setItem("blocks", JSON.stringify({ blocks: savedComponents }));
  }, [components]);

  const handleCancel = () => {
    if (!selectedComponent) return;
    if (!selectedComponent.saved) {
      deleteBlock(selectedComponent.id);
    }
    setSelectedComponent(null);
    setShouldOpenModal(false);
  };

  const deleteBlock = (id: string) => {
    setComponents((components) =>
      components.filter((component) => component.id !== id)
    );
  };

  const handleSelect = (
    id: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedComponent = components.find(
      (component) => component.id === id
    );
    if (!selectedComponent) return;
    setSelectedComponent(selectedComponent);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.key.toLowerCase() === "enter" && selectedComponent) {
      setShouldOpenModal(true);
    }
    if (e.key.toLowerCase() === "delete" && selectedComponent) {
      deleteBlock(selectedComponent.id);
    }
  };

  const handleUpdatePosition = (data: IUpdatePosition): void => {
    const { id, xPos, yPos } = data;
    setComponents((components) =>
      components.map((component) =>
        component.id === id ? { ...component, X: xPos, Y: yPos } : component
      )
    );
  };

  return (
    <div tabIndex={0} onKeyUp={(e) => handleKeyPress(e)}>
      <Row style={{ height: "100vh" }}>
        <Col span={18}>
          <div style={{ height: "100%", width: "100%" }}>
            {components.map((component, index) => (
              <Draggable
                selected={
                  !!(selectedComponent && selectedComponent.id === component.id)
                }
                block={component}
                onSelect={handleSelect}
                key={index}
                updatePosition={handleUpdatePosition}
              />
            ))}
          </div>
        </Col>
        <Col span={6}>
          <SideBar onCreatingNewBlock={handleNewBlockCreation} />
        </Col>
      </Row>
      <Modal
        title="Edit Label"
        visible={!!selectedComponent && shouldOpenModal}
        onCancel={handleCancel}
        footer={null}
      >
        {!!selectedComponent && (
          <FormComponent
            key={selectedComponent.id}
            onSubmit={handleOk}
            selectedComponent={selectedComponent}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
