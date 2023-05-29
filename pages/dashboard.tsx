import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { Period } from '../types/PeriodType';
import Timetable from '@/components/Timetable';
import Account from '@/components/Account';
import Navbar from '@/components/Navbar';
import { Personal } from '@/types/PersonalType';


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

  const requestData = {
    sessionId: cookies.sessionId,
    userId: cookies.userId,
  };

  const tresponse = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/timetable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const timetableData = await tresponse.json();

  const presponse = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/personal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const personalData = await presponse.json();
  return {
    props: {
      timetableData,
      personalData
    },
  };
};

export default function Dashboard({ timetableData, personalData }: {timetableData: Period[], personalData: Personal}) {

  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center'>
        <Timetable data={timetableData}/>
        <Account data={personalData}/>
      </div>
    </div>
  )
};
