import aws from "../assets/services/aws100.png";
import pdf from "../assets/files/pdf.png";
import dcs from "../assets/files/docs.png"
import txt from "../assets/files/txt.png"
import any_file from "../assets/files/web_file.png"

export default function TargetFileServer({file, name, lastdate}: {file: string, name: string, lastdate: string | Date}) {
  return (
    <div className="w-[70%] overflow-auto h-[60vh] p-4 bg-gradient-to-tr flex flex-col justify-between from-slate-50 to-zinc-700 rounded-md">
        <section className="mb-6 flex justify-center p-4 border-b-2 border-zinc-300">
            <img className=" pointer-events-none" src={
                name.match(/\.png/) || name.match(/\.jpg/)
                || name.match(/\.jpeg/) || name.match(/\.web/)
                ? file : name.match(/\.pdf/) ? pdf :
                name.match(/\.docs/) || name.match(/\.docx/) ? dcs : name.match(/\.txt/)
                ? txt : any_file} 
            />
        </section>
        <section className='w-full flex flex-col gap-y-8'>
            <div className='w-full'>
                <img className="w-14 rounded-full h-14" src={aws} />
            </div>
            <div className="flex flex-col gap-y-3">
                <h1 className="text-2xl">{name}</h1>
                <p className="text-zinc-600">{lastdate.toString()}</p>
            </div>
        </section>
    </div>
  )
}
