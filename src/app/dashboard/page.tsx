'use client'
import Head from 'next/head'
import { useSession } from "next-auth/react"
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Chat from '../../components/Chat'
import Unauthorized from '../../components/Unauthorized'

export default function Dashboard() {
  const { data: session } = useSession(); 
  var content = session ? <Chat></Chat> : <Unauthorized></Unauthorized>
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
      {content}
      <Footer></Footer>
    </div>
  )
}
