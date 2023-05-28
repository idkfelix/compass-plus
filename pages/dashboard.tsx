import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { Period } from '../types/PeriodType';
import Timetable from '@/components/Timetable';

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

  const response = await fetch('http://localhost:3000/api/timetable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const timetableData = await response.json();
  return {
    props: {
      timetableData,
    },
  };
};

export default function Dashboard({ timetableData }: {timetableData: Period[]}) {
  return (
    <Timetable data={timetableData}/>
  )
};
