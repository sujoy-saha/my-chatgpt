'use client'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeMain from '../components/HomeMain'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Azure OpenAI ChatGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="row">
        <div className="col-lg-12">
          <Header></Header>
        </div>
      </div>
      <HomeMain></HomeMain>    
      <Footer></Footer>
    </div>
  )
}

