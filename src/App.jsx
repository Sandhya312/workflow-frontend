import Workflow from './Workflow';
import {Routes, Route} from 'react-router-dom';
import Execution from './Execution';

const App = () =>{
  return (
    <>
      <Routes>
        <Route path="/" index element={<Workflow/>} />
        <Route path='/execution' element={<Execution/>} />
      </Routes>
    </>
  )
}

export default App;