import React from 'react'
import { IoIosClose } from "react-icons/io";
import {deleteFiles} from "../store/slice";
import { useDispatch } from 'react-redux';

export default function TargetFiles({name, index}: {name: string, index: number}) {
  const dispatch = useDispatch();

  return (
    <div className='flex max-lg:w-full w-[40%] justify-between items-center gap-x-3 bg-gray-950 rounded-md px-3 py-2'>
        <section className='overflow-auto'>
            <h2 className='text-md text-gray-400 font-semibold'>{name}</h2>
        </section>
        <section className='flex items-center'>
          <button onClick={()=>{
            dispatch(deleteFiles({ix: index}));
          }}>
            <IoIosClose className='text-white text-2xl' />
          </button>
        </section>
    </div>
  )
}
