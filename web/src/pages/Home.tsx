import { Header } from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase"
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SignOut, User } from 'phosphor-react';

export function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full flex justify-center items-center transition-all  bg-[color:var(--bg-color)]">
      <div className="w-full max-w-5xl px-6 flex flex-col md:gap-16 sm:mb-10">
        <button type='button' className='absolute top-2 left-10 hover:brightness-150 transition-all' onClick={() => signOut(auth)}>
          <div className='flex justify-between p-2 gap-4 items-center'>
            {currentUser?.photo
              ?
              <img src={currentUser.photo} alt="user_photo"  className="flex rounded-full w-8"/>
              :
              <User size={24} />
            }

            <strong>{currentUser?.name}</strong>
            <SignOut size={24} />
          </div>
        </button>
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