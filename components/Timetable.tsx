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
    const extractedString = extractValues(item.topAndBottomLine);
    const activityId = item.activityId;
    const instanceId = item.instanceId;
    const d = {
      activityId: activityId,
      instanceId: instanceId,
      data: extractedString
    }
    resultArray.push(d);
    });
    return resultArray;
  }



  return (
    <div className='pt-10' >
      {performExtractValues(data).map((period) => (
        <Link key={period.instanceId} href={`/${period.instanceId}`}>
          <div 
            key={period.instanceId}
            className='w-[500px] h-[75px] bg-crust rounded-md border-2 border-surface1 m-5 p-3 text-pink flex flex-row justify-center'
          >
            <div className='flex items-center justify-center'>
              <h1 className='text-sm text-subtext0 font-semibold'>{period.data[0]}</h1>
              <h1 className='font-bold'>&nbsp;&nbsp; {period.data[2]}</h1>
              <h1 className='text-sm text-subtext1 font-semibold'>&nbsp;&nbsp; {period.data[3]}</h1>
              <h1 className='text-sm text-subtext0 font-bold'>&nbsp;&nbsp; {period.data[4]}</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
};