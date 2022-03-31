import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div className='app'>
      <Head>
        <title>Story Book App</title>
      </Head>

      <div className="top-bar">
          <Link href="/">
          <div className="home">

            <a>Home</a>
            </div>
          </Link>
         
       
        

      </div>
      <div className="grid wrapper ">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
