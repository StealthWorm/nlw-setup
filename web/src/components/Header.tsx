import { Plus, X } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

import LogoImage from '../assets/logo.svg'
import { NewHabitForm } from "./NewHabitForm";

export function Header() {

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between bg-[#09090A] z-20
      sm:flex-col sm:gap-8 sm:pt-8 sm:sticky sm:top-0
      md:flex-row
    "
    >
      <img src={LogoImage} alt="" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="group border border-emerald-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-emerald-300 hover:shadow-custom-md hover:shadow-emerald-800 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-background
          sm:w-full sm:justify-center
          md:w-auto 
          "
        >
          <Plus size={20} className="text-emerald-500" />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className="text-3xl leading-tight font-extrabold">
              Criar bábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>
    </div>
  );
}