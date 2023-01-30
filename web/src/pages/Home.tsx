import { Header } from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase"

export function Home() {
  return (
    <div className="w-full flex justify-center items-center transition-all  bg-[color:var(--bg-color)]">
      <div className="w-full max-w-5xl px-6 flex flex-col md:gap-16 sm:mb-10">
        <button type='button' onClick={() => signOut(auth)}>Sign out</button>
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}