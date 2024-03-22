import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType,name) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('hello',name);
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className=" dg1 dndnode input" onDragStart={(event) => onDragStart(event,'input', 'Convert Format')} draggable>
      Convert Format
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event,'default', 'Wait')} draggable>
      Wait
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event,'default', 'Filter Data')} draggable>
      Filter Data
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output','Send Post Request')} draggable>
      Send POST Request
      </div>
      
    </aside>
  );
};


export default Sidebar;