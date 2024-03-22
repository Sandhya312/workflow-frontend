import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    workflow:[],
    isSubmit:false
}


const workflowSlice = createSlice({
    name:'workflow',
    initialState,
    reducers:{
        toggleIsSubmit:(state,action)=>{
             state.isSubmit= action.payload;
        },
        saveWorkFlow:(state,action)=>{
            state.workflow.push(action.payload);
            console.log(JSON.parse(JSON.stringify(state.workflow)));
      localStorage.setItem("workflow", JSON.stringify(state.workflow));
        
        }
    }
})



export const {toggleIsSubmit,saveWorkFlow}  = workflowSlice.actions;
export default workflowSlice.reducer;