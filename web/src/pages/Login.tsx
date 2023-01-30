import { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { GoogleLogo } from 'phosphor-react';

export function Login() {
  // const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       const { displayName, email, photoURL } = user;

  //       try {
  //         let newUser: any = api.post('users', {
  //           name: displayName,
  //           photo: photoURL,
  //           email: email,
  //         })

  //         setCurrentUser({
  //           id: newUser.id,
  //           name: newUser.name,
  //           photo: newUser.photo,
  //           email: newUser.email,
  //         })

  //         if (currentUser) {
  //           console.log(currentUser)
  //           navigate('/home')
  //         }
  //       } catch (err) {
  //         console.log(err)
  //         setCurrentUser(null)
  //       }
  //     } else {
  //       navigate('/')
  //     }
  //   })
  // }, [auth]);

  // async function handleGoogleLogin() {
  //   const provider = new GoogleAuthProvider();

  //   await signInWithPopup(auth, provider).then((result) => {
  //     if (result.user) {
  //       const { displayName, email, photoURL } = result.user;

  //       let response: any = api.post('users', {
  //         name: displayName,
  //         photo: photoURL,
  //         email: email,
  //       })

  //       setCurrentUser(response)

  //       navigate('/home');
  //     }
  //   })
  // }

  async function handleGoogleLogin() {
    setAuthing(true)

    await signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        console.log(response.user.email)
        navigate('/home')
      })
      .catch(error => {
        console.log(error)
        setAuthing(false)
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