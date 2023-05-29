import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/components/Footer';
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='frappe'>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='min-h-screen bg-base'>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </div>
  )
}
