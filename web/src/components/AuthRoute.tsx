import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from "../lib/firebase"

export interface IAuthRouteProps { children?: ReactNode }

const AuthRoute: React.FC<IAuthRouteProps> = props => {
  const { children } = props
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
  }, [auth]);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false)
    } else {
      console.log('unauthorized')
      navigate('/')
    }
  })

  if (loading) return <p>Loading...</p>

  return (
    <>{children}</>
  )
}

export default AuthRoute;