import { GetServerSideProps } from 'next';
import { sanitize } from 'isomorphic-dompurify';
import { parse } from 'cookie';
import { Instance } from '../types/InstanceType';
import { Teacher } from '../types/TeacherType';
import Navbar from '@/components/Navbar';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '');
    
    if (!cookies.sessionId || !cookies.userId) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const {instanceId} = context.query

    const requestData = {
        sessionId: cookies.sessionId,
        userId: cookies.userId,
      };
    const presponse = await fetch(`http://localhost:3000/api/timetable/${instanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    
    const periodData = await presponse.json();

    const id = periodData.managerId
    if(periodData.coveringManagerId != ''){const guid = periodData.coveringManagerId}
    

    const tresponse = await fetch(`http://localhost:3000/api/teacher${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const teacherData = await tresponse.json();
    console.log(teacherData)

    return {
      props: {
        periodData,
        teacherData
      },
    }
}

export default function Dashboard({ periodData, teacherData }: {periodData: Instance, teacherData: Teacher}) {

  const sanitizedData = () => ({
    __html: sanitize(periodData.studentLessonPlan)
  });

  return (
    <div className='p-5'>
      <Navbar/>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-white bg-crust w-[1000px] p-5 mb-5 rounded-md border-2 border-pink flex flex-row gap-4'>
          {/* <img src={`https://mullauna-vic.compass.education/download/cdn/full/${pfp()}`} className='w-20 rounded-md' /> */}
          <h1>{teacherData.userFullName}</h1>
        </div>
        <div className='text-white bg-crust w-[1000px] p-10  rounded-md border-2 border-pink' dangerouslySetInnerHTML={sanitizedData()}/>
      </div>
    </div>
  )
};
