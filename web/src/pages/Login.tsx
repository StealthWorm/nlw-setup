import { useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../lib/axios';

type User = {
  id: string,
  name?: string,
  photo?: string,
  email: string,
}

export function Login() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [list, setList] = useState<User[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL } = user;

        try {
          let newUser: any = api.post('users', {
            name: displayName,
            photo: photoURL,
            email: email,
          })

          setCurrentUser({
            id: newUser.id,
            name: newUser.name,
            photo: newUser.photo,
            email: newUser.email,
          })

          if (currentUser)
            navigate('/home')
        } catch (err) {
          console.log(err)
          setCurrentUser(null)
        }
      } else {
        navigate('/')
      }
    })
  }, [auth]);

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        const { displayName, email, photoURL } = result.user;

        try {
          let newUser: any = api.post('users', {
            name: displayName,
            photo: photoURL,
            email: email,
          })

          setCurrentUser({
            id: newUser.id,
            name: newUser.name,
            photo: newUser.photo,
            email: newUser.email,
          })

          if (currentUser)
            navigate('/home')
        } catch (err) {
          console.log(err)
          setCurrentUser(null)
        }
      }
    })
  }

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <h1>LOGIN</h1>
      <button className="flex text-6xl text-slate-400 z-0 relative hover:brightness-200 transition-all" onClick={handleGoogleLogin}>
        Entrar com Google
      </button>
    </div>
  )
}