import Head from 'next/head'
import Header from '../../components/Header'
import DashboardComp from "../../components/Dashboard"
import Footer from '../../components/Footer'

export default function Dashboard() {  
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
      <DashboardComp></DashboardComp>   
      <Footer></Footer>
    </div>
  )
}
