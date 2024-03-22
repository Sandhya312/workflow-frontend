
import CSVComponent from "./CSV";
// import { useDispatch } from "react-redux";
// import toggleIsSubmit from './store/workflow'
import  { useState, useCallback } from 'react';
import ReactFlow, {
  
  useNodesState,
  useEdgesState,
  Controls,
//   useReactFlow,
  Panel,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';




const Execution = () =>{
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);
    // const { setViewport } = useReactFlow();
    // const dispatch = useDispatch();

    // const isSubmitBool = useSelector((state)=>state.workflow.isSubmit);
    const workflow = JSON.parse(localStorage.getItem("workflow"));
    const onRestore = useCallback((id) => {
        const restoreFlow = async () => {
          const flow = workflow[id].flow;
          console.log(flow)
           
          if (flow) {
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            // setViewport({ x, y, zoom });
          }
        };
    
        restoreFlow();
      }, [setNodes]);

    // const onSubmitHandler = ()=>{
    //     dispatch(toggleIsSubmit(true))
        
       
    //   }

    return (
        <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center " >
           <select  className="border-none outline-none m-2" style={{height:"2rem"}} onChange={(e) => onRestore(e.target.value)}>
            <option>Select the workflow id</option>
  {workflow.map(flow => (
    <option  key={flow.id} value={flow.id}>{flow.id}</option>
  ))}
</select>

        <div style={{width:"80rem",height:"35rem",padding:"2rem",background:"#d3cece"}}>
       <ReactFlowProvider>
       <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={setRfInstance}
    >
      <Panel position="top-right">
        {/* <button onClick={onRestore}>restore</button> */}
      </Panel>
      <Controls />

    </ReactFlow>
       </ReactFlowProvider>
        </div>
        <div className="m-2">
        <CSVComponent />
        <pre className="border border-dark-subtle">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, adipisci.
        </pre>
        </div>
       
        </div>
    )
}


export default Execution;