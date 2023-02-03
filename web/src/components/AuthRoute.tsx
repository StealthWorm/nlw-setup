import { onAuthStateChanged } from 'firebase/auth'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { AuthContext, User } from '../contexts/AuthContext'
import { api } from '../lib/axios'
import { auth } from "../lib/firebase"

export interface IAuthRouteProps { children?: ReactNode }

export const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, photoURL, displayName } = user

        api.post<User>('/users', {
          "name": displayName,
          "photo": photoURL,
          "email": email
        }).then(response => {
          setCurrentUser(response.data)
        });

        setLoading(false)
      } else {
        setCurrentUser(null)
        navigate('/')
      }
    })

    return () => {
      unsubscribe();
    };
  }, [auth, navigate, setCurrentUser]);

  if (loading)
    return (
      <div className='w-10 h-10 bg-zinc absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Oval
          height={30}
          width={30}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#cfcfcf"
          strokeWidth={4}
          strokeWidthSecondary={4}
          color="#ffffff"
        />
      </div>
    )

  return (
    <>{children}</>
  )
}

export default AuthRoute;