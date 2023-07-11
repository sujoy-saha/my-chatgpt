import { signIn } from 'next-auth/react'

export default function Unauthorized() {
  return (
    <div className="row">
      <div className="col-lg-10 col-offset-1">
        <p>You don't have the access to this application.</p>
        <p>Log in with your Okta account to continue.</p>
        <p><button className="btn btn-primary" onClick={() => signIn()}>Log in</button></p>
      </div>
    </div>
  )
}