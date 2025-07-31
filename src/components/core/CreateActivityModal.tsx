import { Calendar, Tag, X } from "lucide-react";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({closeCreateActivityModal}:CreateActivityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
          <button className="cursor-pointer opacity-80 text-zinc-400">
            <X onClick={closeCreateActivityModal} />
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Todos convidados podem visualizar as atividades.
        </p>

        <form className="flex flex-col gap-2 mb-2.5">
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              placeholder="Qual a atividade?"
              name="name"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>

          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 flex-11/12">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              placeholder="20 de agosto"
              name="occus_at"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>
          <button className="bg-lime-300 text-lime-950 rounded-lg px-5 h-14 font-medium flex items-center justify-center gap-2 hover:bg-lime-400 cursor-pointer w-full">
            Salvar atividade
          </button>
        </form>
      </div>
    </div>
  );
}
