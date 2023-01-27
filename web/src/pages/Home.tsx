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
    <div className="w-full flex justify-center items-center transition-all  bg-[color:var(--bg-color)]">
      <div className="w-full max-w-5xl px-6 flex flex-col md:gap-16 sm:mb-10">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}