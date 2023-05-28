import { useRouter } from 'next/router';

export default function Back() {

  const router = useRouter();

  return (
    <button
    className='w-[100px] h-[40px] bg-crust rounded-md border-2 border-blue text-blue'
    onClick={() => router.back()}
    >
    Back
    </button>
  )
};
