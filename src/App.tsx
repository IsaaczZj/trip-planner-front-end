import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from "lucide-react";
import logo from "./assets/logo.svg";
import { useState } from "react";
export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setisGuestModalOpen] = useState(false);

  function openGuestsInput(e: React.FormEvent) {
    e.preventDefault();
    setIsGuestsInputOpen(true);
  }
  function closeGuestsInput(e: React.FormEvent) {
    e.preventDefault();
    setIsGuestsInputOpen(false);
  }

  function openGuestModal() {
    setisGuestModalOpen(true);
  }
  function closeGuestModal() {
    setisGuestModalOpen(false);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-image">
      <div className="max-w-4xl w-full px-8 text-center space-y-10">
        <div>
          <img src={logo} alt="" className="mx-auto mb-3" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <form
          action=""
          className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-2xl gap-3"
        >
          <div className="flex items-center gap-2 flex-1 ">
            <MapPin className="size-5 text-zinc-400" />
            <input
              disabled={isGuestsInputOpen}
              className="text-lg outline-none placeholder:text-zinc-400 "
              type="text"
              placeholder="Para onde você vai?"
            />
          </div>
          <div className="flex items-center gap-2 ">
            <Calendar className="size-5 text-zinc-400" />
            <input
              disabled={isGuestsInputOpen}
              className="text-lg outline-none placeholder:text-zinc-400 w-40"
              type="text"
              placeholder="Quando?"
            />
          </div>

          <div className="w-px h-6 bg-zinc-500" />

          {isGuestsInputOpen ? (
            <button
              className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:opacity-75 cursor-pointer"
              onClick={closeGuestsInput}
            >
              Alterar local/data
              <Settings2 className="size-5 " />
            </button>
          ) : (
            <button
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer"
              onClick={openGuestsInput}
            >
              Continuar
              <ArrowRight className="size-5 " />
            </button>
          )}
        </form>

        {isGuestsInputOpen && (
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-2xl gap-3 -mt-4">
            <button
              className="flex flex-1 cursor-pointer"
              onClick={openGuestModal}
            >
              <div className="flex items-center gap-2">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="text-zinc-400 text-lg flex-1">
                  Quem estará na viajem?
                </span>
              </div>
            </button>

            <button
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer"
              onClick={openGuestsInput}
            >
              Confirmar viagem
              <ArrowRight className="size-5 " />
            </button>
          </div>
        )}

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a href="" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestModalOpen && (
        // MODAL DE EMAILS
        <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-semibold">Selecionar convidados</h2>
              <button
                className="cursor-pointer opacity-80 text-zinc-400"
                onClick={closeGuestModal}
              >
                <X />
              </button>
            </div>
            <p className="text-sm text-zinc-400 mt-2 mb-5">
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </p>
            {/* ÁREA DOS EMAILS MODAL*/}
            <div className="flex flex-wrap gap-2">
              <div className="px-2.5 py-1.5 bg-zinc-800 flex items-center gap-2.5 rounded-lg">
                <span className="text-zinc-300">jessica.white44@yahoo.com</span>

                <X className="text-zinc-400" />
              </div>
            </div>

            <div className="w-full h-px bg-zinc-800 my-6"></div>

            <form className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <AtSign className="text-zinc-400 size-7" />
              <input
                type="text"
                placeholder="Digite o email do convidado"
                className="text-md outline-none placeholder:text-zinc-400 w-full"
              />
              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer">
                Convidar
                <Plus className="size-5 " />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
