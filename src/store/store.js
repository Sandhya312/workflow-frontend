import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './workflow';


const store = configureStore({
    reducer:{
       workflow: workflowReducer
    }
});

export default store;