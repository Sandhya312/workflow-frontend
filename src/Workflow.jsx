import  { useState, useRef, useCallback } from 'react';
import {saveWorkFlow} from './store/workflow';
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Link } from 'react-router-dom';

import './index.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: ' Convert Format' },
    position: { x: 250, y: 5 },
  },
];

const flowKey = 'example-flow';

let idx=0;
let id = 0;
const getId = () => `dndnode_${id++}`;

const Workflow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const dispatch  = useDispatch();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('hello');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        name,
        position,
        data: { label: `${name} ` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const workflowInstance = {
        id:idx++,
        flow
      }
      
      dispatch(saveWorkFlow(workflowInstance));

    }
  }, [reactFlowInstance]);


  return (
    <div >
       <div className="dndflow">
       <Sidebar />

<ReactFlowProvider> 
  <div className="reactflow-wrapper " ref={reactFlowWrapper} style={{width:"80rem",height:"100vh", padding:"2rem",background:"#d3cece"}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
    >
      <Controls />
    </ReactFlow>
  </div>
 
</ReactFlowProvider>
       </div>

      <div>
      <Link className='btn btn-primary m-2' to='/execution'>next</Link>
      <button className='btn btn-success m-2' onClick={onSave}>save</button>
      </div>
    </div>
  );
};

export default Workflow;
