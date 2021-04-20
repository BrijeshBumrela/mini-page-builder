import React, { useState } from 'react';

import './App.css';
import 'antd/dist/antd.css'
import Draggable, { IDraggableComponent } from './components/Draggable';
import { Col, Row } from 'antd';
import SideBar from './components/Sidebar';
import { newBlockProperties } from './components/Tag';

const getDefaultValues = ({ type, xPos, yPos }: newBlockProperties): IDraggableComponent => ({
  text: `this is ${type}`,
  type,
  X: xPos,
  Y: yPos,
  fontSize: 12,
  fontWeight: 400,
  saved: false
})

function App() {
  const [components, setComponents] = useState<IDraggableComponent[]>([]);

  const handleNewBlockCreation = (e: newBlockProperties) => {
    setComponents(components => [...components, getDefaultValues(e)])
  }

  return (
      <>
        <Row style={{ height: '100vh' }}>
          <Col span={18}>
            <div>
              {components.map((component, index) => <Draggable {...component} key={index} />)}
            </div>
          </Col>
          <Col span={6}>
            <SideBar onCreatingNewBlock={handleNewBlockCreation}/>
          </Col>
        </Row>
      </>
  );
}

export default App;
