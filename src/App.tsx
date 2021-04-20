import React, { useState } from 'react';

import './App.css';
import 'antd/dist/antd.css'
import Draggable from './components/Draggable';
import { Col, Row } from 'antd';
import SideBar from './components/Sidebar';

interface IDraggableComponent {
  type: string,
  text: string,
  X: number,
  Y: number,
  fontSize: number,
  fontWeight: number,
  saved: false
}

function App() {
  const [components, setComponents] = useState<IDraggableComponent[]>([]);

  return (
      <>
        <Row style={{ height: '100vh' }}>
          <Col span={18}>col-18</Col>
          <Col span={6}>
            <SideBar />
          </Col>
        </Row>

        <div>
          {components.map((component, index) => <Draggable {...component} key={index} />)}
        </div>
      </>
  );
}

export default App;
