import { Plus, X } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

import LogoImage from '../assets/logo.svg'
import { NewHabitForm } from "./NewHabitForm";

export function Header() {

  return (
    <div className="w-full px-2 max-w-3xl mx-auto flex items-center justify-between  bg-[color:var(--bg-color)] transition-all z-10
      sm:flex-col sm:gap-8 sm:pt-8 sm:sticky sm:top-0
      md:flex-row
    "
    >
      <img src={LogoImage} alt="" />

      <Dialog.Root >
        <Dialog.Trigger
          type="button"
          className=" group border border-[color:var(--primary-border-color)] bg-[#282a36] font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-[color:var(--primary-hover-color)] hover:shadow-custom-md hover:shadow-[color:var(--shadow-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-focus-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg-color)]
          sm:w-full sm:justify-center
          md:w-auto 
          "
        >
          <Plus size={20} className="text-emerald-500" />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0 z-20" />

          <Dialog.Content className="absolute p-10 bg-[color:var(--bg-color-modal)] rounded-2xl w-full max-w-md z-30
            md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            sm:top-4 sm:left-1/2 sm:-translate-x-1/2
          ">
            <Dialog.Close className="absolute right-6 top-6 text-[color:var(--text-color)] rounded-lg hover:text-[color:var(--secondary-hover-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-focus-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg-color-modal)]">
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className="text-3xl leading-tight font-extrabold text-[color:var(--text-color)]">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>
    </div>
  );
}