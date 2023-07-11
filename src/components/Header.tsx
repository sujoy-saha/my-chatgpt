'use client'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {  
  //define labbel
  let loggedInUser;
  // define the button object
  let button;
  // get the session object
  const { data: session, status } = useSession();        
  if (session) {
    loggedInUser = <p className="card p">Signed in as {session.user?.name}</p>
    button = <button className="btn btn-primary" onClick={() => signOut()} >Log out</button>;
  } else {
    button = <button className="btn btn-primary" onClick={() => signIn()}>Log in</button>;    
  }
  return (
    <div className="row mb-4">
      <div className="col-lg-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href=".">Home</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="dashboard">Chat</a>
                </li>
              </ul>                            
              {loggedInUser}
              <form className="d-flex">                
                {button}
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}