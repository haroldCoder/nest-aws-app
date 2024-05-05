import { Store, configureStore } from "@reduxjs/toolkit";
import { filesaws } from "./slice";


class StoreRedux{
    filestore: Store;

    constructor(){
        this.filestore = configureStore({
            reducer: {
                files: filesaws.reducer
            }
        })
    }

    getState = () =>{
        return this.filestore.getState();
    }

    subscribe = (listener: ()=>void) =>{
        return this.filestore.subscribe(listener);
    }

    dispatch = (action: any) =>{
        return this.filestore.dispatch(action);
    }
}

export default StoreRedux;