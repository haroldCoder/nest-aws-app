import './App.css'
import { useSelector } from "react-redux"
import StoreRedux from './store/store';
import { setFilesofServer } from "./store/slice";
import UploadFiles from './components/UploadFiles';
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast"
import ViewFiles from './components/ViewFiles';

function App() {
  const files = useSelector((state: any) => state.files);
  const store = new StoreRedux();

  return (
    <div className='flex justify-center flex-col gap-y-24 items-center h-[100vh]'>
      <UploadFiles store={store} />
      <ViewFiles store={store} />
      <Toaster />
    </div>
  )
}

export default App
