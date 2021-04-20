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
  const [selectedComponentId, setSelectedComponentId] = useState<null | string>(null)

  const handleNewBlockCreation = (e: newBlockProperties) => {
    const newComponentValue = getDefaultValues(e);
    setComponents(components => [...components, newComponentValue])
    setSelectedComponentId(newComponentValue.id);
  }

  const handleOk = () => { };
  const handleCancel = () => { };

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
      <Modal title="Edit Label" visible={!!selectedComponentId} onOk={handleOk} onCancel={handleCancel}>
        <FormComponent />
      </Modal>
    </>
  );
}

export default App;
