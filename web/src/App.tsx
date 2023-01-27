import './styles/global.css';
import './lib/dayjs'
import Router from './routes';
import { ThemeSwitch } from './components/ThemeSwitch';

export function App() {


  return (
    <>
      <ThemeSwitch />
      <Router />
    </>
  )
}