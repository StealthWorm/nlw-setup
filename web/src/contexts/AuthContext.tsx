import { createContext, ReactNode, useState } from 'react';

export type User = {
  id: string,
  name?: string,
  photo?: string,
  email: string,
}

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

type AuthContextProviderProps = {
  children?: ReactNode;
}

export const AuthContext = createContext({} as UserContextProps);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  let value = {
    currentUser,
    setCurrentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
