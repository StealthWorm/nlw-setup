import { useContext, useEffect } from 'react';
import { Header } from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';

export function Home() {
  const { currentUser, setCurrentUser, list } = useContext(AuthContext);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL } = user;
        let existingUser = list.find(p => p.email === email)

        if (existingUser) {
          setCurrentUser({
            id: existingUser.id,
            name: existingUser.name,
            photo: existingUser.photo,
            email: existingUser.email,
          })
        }
      }
    })
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center px-2">
      <div className="w-full max-w-5xl px-6 flex flex-col md:gap-16 sm:gap-[30rem]">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}