import * as Switch from '@radix-ui/react-switch';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
  let theme = localStorage.getItem('data-theme');
  const [checked, setChecked] = useState(theme == 'dark' ? true : false);

  useEffect(() => {
    themeChange()
  }, [checked])

  function themeChange() {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }

    if (checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('data-theme', checked ? 'dark' : 'light');
  }

  return (
    <div className="flex flex-row w-full p-4 justify-end">
      <label htmlFor="theme-mode" className="pr-4 text-[color:var(--text-color)]">
        Theme
      </label>
      <Switch.Root id="theme-mode" checked={checked} onCheckedChange={() => setChecked(!checked)} className='group flex w-10 h-auto bg-[color:var(--text-color)] rounded-full relative transition-all p-[2px]'>
        <Switch.Thumb className='block w-5 h-5 bg-[color:var(--primary-border-color)] rounded-full translate-x-0 group-data-[state=checked]:translate-x-4 transition-all' />
      </Switch.Root>
    </div>
  )
}