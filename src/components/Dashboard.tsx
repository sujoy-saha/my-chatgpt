'use client'
import styles from '../styles/page.module.css'
import { useSession } from "next-auth/react"
import Chat from './Chat'
import Unauthorized from './Unauthorized'

export default function DashboardComp() {
  // get the session object
  const { data: session, status } = useSession(); 
  var content = session ? <Chat></Chat> : <Unauthorized></Unauthorized>   
  return (
    <main>
      <h1 className={styles.description}>
          Azure OpenAI ChatBot
        </h1> 
      {content}
    </main>  
  )
}