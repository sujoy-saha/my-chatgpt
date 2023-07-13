'use client'
import styles from '../styles/page.module.css'
import { useSession } from "next-auth/react"
import Unauthorized from './Unauthorized'

export default function MeComp() {
  // get the session object
  const { data: session, status } = useSession(); 
  if (status === "loading") {
    return <div>Loading...</div>
  }
  var content = session ? <pre>{JSON.stringify(session, null, 2)}</pre>  : <Unauthorized></Unauthorized>    
  return (
    <main>
      <h1 className={styles.description}>
          Azure OpenAI ChatBot
      </h1> 
      {content}
    </main>  
  )
}