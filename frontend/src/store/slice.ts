import {Slice, createSlice} from "@reduxjs/toolkit";

export interface filesType{
    filesuser: Array<File>,
    files_api: Array<string>
}

export const filesaws = createSlice({
    initialState: {
        files: <filesType>({
            files_api: [],
            filesuser: []
    })  
    },
    name: "filesaws",
    reducers: {
        uploadFiles: (state, action: {payload: Array<File>})=>{
            if(state.files.filesuser.length > 0){
                action.payload.map((data)=>{
                  state.files.filesuser[state.files.filesuser.length] = data;  
                })
            }
            else{
               state.files.filesuser = action.payload; 
            }
        },
        deleteFiles: (state, action: {payload: {ix: number}})=>{
            state.files.filesuser = state.files.filesuser.filter((files, index)=>index != action.payload.ix);
        }
    }
})

export const {uploadFiles, deleteFiles} = filesaws.actions;