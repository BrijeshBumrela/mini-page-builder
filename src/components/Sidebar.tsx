import React from "react";
import "./Sidebar.css";
import Tag, { newBlockProperties } from "./Tag";

interface ISideBarProps {
  onCreatingNewBlock: (e: newBlockProperties) => void;
}

const SideBar: React.FC<ISideBarProps> = ({ onCreatingNewBlock }) => {
  return (
    <section className="sidebar">
      <h3 style={{ color: "white", fontWeight: 600 }}>BLOCKS</h3>
      <Tag onCreatingNewBlock={onCreatingNewBlock} type="Input"></Tag>
      <Tag onCreatingNewBlock={onCreatingNewBlock} type="Label"></Tag>
      <Tag onCreatingNewBlock={onCreatingNewBlock} type="Button"></Tag>
    </section>
  );
};

export default SideBar;
