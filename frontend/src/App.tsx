import './App.css'
import {useSelector} from "react-redux"
import StoreRedux from './store/store';
import {uploadFiles} from "./store/slice";

function App() {
  const files = useSelector((state: any)=>state);
  const store = new StoreRedux();
  

  return (
    <>
     
    </>
  )
}

export default App
