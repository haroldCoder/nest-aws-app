import './App.css'
import {useSelector} from "react-redux"
import StoreRedux from './store/store';
import {uploadFiles} from "./store/slice";
import UploadFiles from './components/UploadFiles';
import { useEffect } from 'react';
import {Toaster} from "react-hot-toast"

function App() {
  const files = useSelector((state: any)=>state);
  const store = new StoreRedux();
  
  useEffect(()=>{
    console.log(files);
    
  }, [files]);
  
  return (
    <div className='flex justify-center items-center h-[100vh]'>
     <UploadFiles store={store} />
     <Toaster />
    </div>
  )
}

export default App
