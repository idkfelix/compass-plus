import React from 'react';
import { Period } from '../types/PeriodType';
import Link from 'next/link';

export default function Timetable({ data }: { data: Period[] }) {

  function extractValues(input: string): any | null {
    const splitted = input.split(/ - /);
    if ( splitted ) {
      return splitted;
    }
  }
  
  interface resultPeriod {
    activityId: string,
    instanceId: string,
    data: string[]
  }

  function performExtractValues(inputArray: any[]): resultPeriod[] {
    const resultArray: resultPeriod[] = [];
    inputArray.forEach(item => {
    const sortedString = extractValues(item.topAndBottomLine);
    const activityId = item.activityId;
    const instanceId = item.instanceId;
    const d = {
      activityId: activityId,
      instanceId: instanceId,
      data: sortedString
    }
    resultArray.push(d);
    });
    return resultArray;
  }



  return (
    <div className='p-10' >
      {performExtractValues(data).map((period) => (
        <Link href={`/${period.instanceId}`}>
          <div 
            key={period.instanceId}
            className='w-[500px] h-[75px] bg-crust rounded-md border-2 border-pink m-5 p-3 text-pink'
          >
            <h1>{period.data[2]}</h1>
          </div>
        </Link>
      ))}
    </div>
  )
};