import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='frappe'>
      <div className='min-h-screen bg-base'>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </div>
  )
}
