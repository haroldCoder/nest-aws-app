import './App.css'
import {useSelector} from "react-redux"
import StoreRedux from './store/store';
import {uploadFiles} from "./store/slice";
import UploadFiles from './components/UploadFiles';
import { useEffect } from 'react';

function App() {
  const files = useSelector((state: any)=>state);
  const store = new StoreRedux();
  
  useEffect(()=>{
    console.log(files);
    
  }, [files]);
  
  return (
    <div className='flex justify-center items-center h-[100vh]'>
     <UploadFiles store={store} />
    </div>
  )
}

export default App
