import { useContext, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase"
import { useNavigate } from 'react-router-dom';
import { AuthContext, User } from '../contexts/AuthContext';
import { GoogleLogo } from 'phosphor-react';
import { api } from '../lib/axios';

export function Login() {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  async function handleGoogleLogin() {
    setAuthing(true)

    await signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        if (response.user) {

          api.post<User>('/users', {
            "name": response.user.displayName,
            "photo": response.user.photoURL,
            "email": response.user.email
          }).then(response => {
            setCurrentUser(response.data)
            navigate('/home')
            setAuthing(false)
          }).catch(error => {
            console.log(error)
            setAuthing(false)
            setCurrentUser(null)
          });
        }
      })
      .catch(error => {
        console.log(error)
        setAuthing(false)
        setCurrentUser(null)
      })
  }

  return (
    <div className='flex flex-col text-[color:var(--bg-color-modal)] w-full h-screen items-center justify-center bg-[color:var(--bg-color)]'>
      <h1 className='text-[color:var(--text-color)]'>LOGIN</h1>
      <div className="flex flex-row hover:brightness-200 gap-3 transition-all items-center justify-center bg-[color:var(--text-color)] rounded-full p-3">
        <GoogleLogo size={30} className="" />
        <button className="flex text-4xl text-[color:var(--bg-color-modal)] leading-none" onClick={() => handleGoogleLogin()} disabled={authing}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
