import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthContextProvider from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
