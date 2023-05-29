import { Personal } from "@/types/PersonalType";

export default function Account({data}: {data: Personal}) {
  return (
    <div className='w-[500px] bg-crust rounded-xl border-2 border-surface1 m-5 p-3 text-white'>
        <p className="font-semibold text-2xl text-center text-pink">Welcome Back {data.preferredName}</p>
        <div className="flex flex-row p-4">
          <div className="flex flex-col w-full">
            <h1 className="text-xl font-semibold">{data.reportName}</h1>
            <h1 className="text-lgs">{data.email}</h1>
            <h1 className="text-lg ">{data.dob}</h1>
            <h1>Form: {data.formGroup}</h1>
          </div>
          <img 
            src={`https://${process.env.NEXT_PUBLIC_PREFIX}.compass.education/download/cdn/full/${data.imageGuid}`} 
            alt="pfp"
            className="w-24 rounded-md" />
        </div>
    </div>
  )
};
