import { Header } from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase"
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full flex justify-center items-center transition-all  bg-[color:var(--bg-color)]">
      <div className="w-full max-w-5xl px-6 flex flex-col md:gap-16 sm:mb-10">
        <button type='button' onClick={() => signOut(auth)}>Sign out {currentUser?.name} </button>
        {currentUser && (
          <>
            <Header />
            <SummaryTable />
          </>
        )
        }
      </div>
    </div>
  )
}