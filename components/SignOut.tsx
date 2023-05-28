import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function SignOut() {

  const router = useRouter();

  const handleSignOut = () => {
    deleteCookie('sessionId')
    deleteCookie('userId')
    router.push('/')
  }

  return (
    <button
    className='w-[100px] h-[40px] bg-crust rounded-md border-2 border-red text-red'
    onClick={handleSignOut}
    >
    Sign Out
    </button>
  )
};
