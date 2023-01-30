import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';

type User = {
  id: string,
  name?: string,
  photo?: string,
  email: string,
}

interface UserContextProps {
  currentUser: User | any;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | any>>;
  list: User[]
}

type AuthContextProviderProps = {
  children?: ReactNode | undefined;
}

export const AuthContext = createContext({} as UserContextProps);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const [list, setList] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>()
  
  useEffect(() => {
    api.get('users').then((response) => {
      setList(response.data)
    });
  }, [])

  let value = {
    currentUser,
    setCurrentUser,
    list
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
