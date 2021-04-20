import React, { useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { v4 as uuid } from 'uuid';

import 'antd/dist/antd.css'

import './App.css';
import Draggable, { IDraggableComponent } from './components/Draggable';
import SideBar from './components/Sidebar';
import { newBlockProperties } from './components/Tag';
import FormComponent from './components/form';

const getDefaultValues = ({ type, xPos, yPos }: newBlockProperties): IDraggableComponent => ({
  text: `this is ${type}`,
  type,
  X: xPos,
  Y: yPos,
  fontSize: 12,
  fontWeight: 400,
  saved: false,
  id: uuid()
})

function App() {
  const [components, setComponents] = useState<IDraggableComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<null | IDraggableComponent>(null)

  const handleNewBlockCreation = (e: newBlockProperties) => {
    const newComponentValue = getDefaultValues(e);
    setComponents(components => [...components, newComponentValue])
    setSelectedComponent(newComponentValue);
  }

  const handleOk = (updatedBlockValues: IDraggableComponent) => {
    console.log(updatedBlockValues)
    setSelectedComponent(null);
    setComponents(components => components.map(component => component.id === updatedBlockValues.id ? { ...updatedBlockValues, saved: true } : component))
  };


  const handleCancel = () => {
    if (!selectedComponent) return;
    if (!selectedComponent.saved) {
      setComponents(components => components.filter(component => component.id !== selectedComponent.id));
      setSelectedComponent(null);
    }
  };

  return (
    <>
      <Row style={{ height: '100vh' }}>
        <Col span={18}>
          <div>
            {components.map((component, index) => <Draggable {...component} key={index} />)}
          </div>
        </Col>
        <Col span={6}>
          <SideBar onCreatingNewBlock={handleNewBlockCreation} />
        </Col>
      </Row>
      <Modal title="Edit Label" visible={!!selectedComponent} onCancel={handleCancel} footer={null}>
        {!!selectedComponent && <FormComponent onSubmit={handleOk} selectedComponent={selectedComponent} />}
      </Modal>
    </>
  );
}

export default App;
