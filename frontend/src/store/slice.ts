import {Slice, createSlice} from "@reduxjs/toolkit";

export const filesaws = createSlice({
    initialState: Array<string>,
    name: "filesaws",
    reducers: {
        uploadFiles: (state, action: {payload: []})=>{
            state = action.payload;
        },
        deleteFiles: (state, action: {payload: {ix: number}})=>{
            state = state.filter((files, index)=>index != action.payload.ix);
        }
    }
})

export const {uploadFiles, deleteFiles} = filesaws.actions;