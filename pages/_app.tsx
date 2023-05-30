import '@/styles/globals.css'
import React from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
    const [pageLoading, setPageLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        const handleStart = () => { setPageLoading(true); };
        const handleComplete = () => { setPageLoading(false); };
    
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
      }, [router]);

  return (
    <div className='frappe'>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='min-h-screen bg-base'>
      { pageLoading 
        ? (<div className='flex items-center justify-center h-screen'><p className='text-3xl text-pink font-extrabold text-primary text-center'>Loading...</p></div>)
        : <Component {...pageProps} />
      }
      </div>
    </div>
  )
}
