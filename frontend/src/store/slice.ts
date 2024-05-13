import { Slice, createSlice } from "@reduxjs/toolkit";
import { files_out } from "../types";

export interface filesType {
    filesuser: Array<File>,
    files_api: Array<files_out>
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
        uploadFiles: (state, action: { payload: Array<File> }) => {
            if (state.files.filesuser.length > 0) {
                action.payload.map((data) => {
                    state.files.filesuser[state.files.filesuser.length] = data;
                })
            }
            else {
                state.files.filesuser = action.payload;
            }
        },
        deleteFiles: (state, action: { payload: { ix: number } }) => {
            state.files.filesuser = state.files.filesuser.filter((files, index) => index != action.payload.ix);
        },
        deleteAllFiles: (state) => {
            state.files.filesuser.splice(0, state.files.filesuser.length);
        },
        setFilesofServer: (state, action: { payload: Array<files_out> }) => {
            state.files.files_api = action.payload;
        }
    }
})

export const { uploadFiles, deleteFiles, deleteAllFiles, setFilesofServer } = filesaws.actions;