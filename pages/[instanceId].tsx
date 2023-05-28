import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { Instance } from '../types/InstanceType';

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
    const response = await fetch(`http://localhost:3000/api/timetable/${instanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    
      const periodData = await response.json();
      console.log(periodData)
      return {
        props: {
          periodData,
        },
      }
}

export default function Dashboard({ periodData }: {periodData: Instance}) {
  return (
    <p className='text-white'>{JSON.stringify(periodData, null, 4)}</p>
  )
};
