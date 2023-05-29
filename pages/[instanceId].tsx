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
    const presponse = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/timetable/${instanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    
    const periodData = await presponse.json();

    const id = periodData.managerId
    if(periodData.coveringManagerId != ''){const id = periodData.coveringManagerId}
    

    const tresponse = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/teacher/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const teacherData = await tresponse.json();

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
        <div className='text-white bg-crust w-[1000px] p-5 mb-5 rounded-md border-2 border-surface1 flex flex-row gap-4'>
          <div className='flex flex-col w-full'>
              <h1 className='text-lg font-bold'>{periodData.activityName}</h1>
              <h1 className='text-lg font-semibold'>{periodData.locationName}</h1>
              <h1 className='text-md font-semibold'>{periodData.start}</h1>
          </div>
          <div className='flex flex-col text-right'>
            <h1 className='text-lg font-semibold'>{teacherData.userFullName}</h1>
            <h1 className='text-sm'>{teacherData.userEmail}</h1>
          </div>
          <img 
            src={`https://${process.env.NEXT_PUBLIC_PREFIX}.compass.education${teacherData.userPhotoPath}`} 
            className='w-20 rounded-md' 
          />
        </div>
        <div 
          className='text-white bg-crust w-[1000px] p-10  rounded-md border-2 border-surface1' 
        >
          <h1 className='font-bold text-4xl text-center'>Lesson Plan</h1>
          <br/>
          <div dangerouslySetInnerHTML={sanitizedData()}/>
        </div>
      </div>
    </div>
  )
};
