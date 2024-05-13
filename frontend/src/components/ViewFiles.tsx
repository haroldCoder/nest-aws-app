import React, { useEffect, useState } from 'react'
import StoreRedux from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFilesofServer } from '../store/slice';
import { getFiles_server } from '../utils/requests';
import { files_out } from '../types';
import TargetFileServer from './TargetFileServer';

export default function ViewFiles({ store }: { store: StoreRedux }) {
  const [files, setFiles] = useState<Array<files_out>>([]);
  const filess = useSelector((state: any) => state.files.files.files_api);
  const dispatch = useDispatch()

  useEffect(() => {
    setFiles(filess)
  }, [filess]);

  useEffect(() => {
    const getFilesServer = async () => {
      const response = await (await getFiles_server())?.json();
      dispatch(setFilesofServer(response))
    }
    
    const t = setInterval(()=>{
      getFilesServer()
    }, 2000);

    return ()=>clearInterval(t);
  })

  return (
    <div className='grid gap-y-6 max-h-[30vh] grid-cols-2'>
      {
        files.map((fl: files_out) => (
          <>
            <TargetFileServer name={fl.Key} lastdate={fl.LastModified} file={fl.uri!} />
          </>
        ))
      }
    </div>
  )
}


