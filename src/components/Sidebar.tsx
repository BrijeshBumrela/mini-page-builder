import React from 'react';
import './Sidebar.css';

const SideBar = () => {
    return <section className="sidebar">
        <h3 style={{ color: 'white', fontWeight: 600 }}>BLOCKS</h3>
        <div className="label-box">
            <h5>Label</h5>
        </div>
        <div className="label-box">
            <h5>Input</h5>
        </div>
        <div className="label-box">
            <h5>Button</h5>
        </div>
    </section>
}

export default SideBar;