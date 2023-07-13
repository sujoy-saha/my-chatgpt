import Head from 'next/head'
import Header from '../../components/Header'
import Me from "../../components/Me"
import Footer from '../../components/Footer'

export default function MyPage() {  
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
      <Me></Me>             
      <Footer></Footer>
    </div>
  )
}
