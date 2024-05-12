import upload from "../assets/upload.png";
import Files from "react-files";
import { uploadFiles } from "../store/slice"
import StoreRedux from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import TargetFiles from "./TargetFiles"
import { useEffect } from "react";

export default function UploadFiles({ store }: { store: StoreRedux }) {
    const selector = useSelector((state: any) => state.files.files.filesuser);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(selector);
    }, [selector]);

    return (
        <div className='w-[40%] gap-y-12 p-5 flex-col rounded-md shadow-md bg-gray-900 shadow-gray-500 flex justify-center items-center'>
            <button>
                <Files multiple={true} onChange={(files: Array<any>) => {
                    dispatch(uploadFiles(files))
                }}>
                    <img src={upload} alt='icon_upload' />
                </Files>
            </button>
            <section className="flex max-lg:flex-col justify-between w-full">
                <div className="mt-6 flex w-[70%] gap-y-4 max-lg:flex-col flex-wrap gap-x-5">
                    {
                        selector.map((file: any, index: number) => (
                            <TargetFiles index={index} name={file.name} />
                        ))
                    }
                </div>
                <div className="flex max-lg:mt-10 max-lg:w-full w-[20%] items-end">
                    <button className="bg-gray-950 w-full rounded-md px-8 hover:bg-gray-800 py-2 text-blue-600">Send</button>
                </div>
            </section>

        </div>
    )
}
