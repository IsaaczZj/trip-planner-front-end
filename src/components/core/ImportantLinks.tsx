import { Link2, Plus } from "lucide-react";

export function ImportantLinks() {
  return (
    <aside className="space-y-6 ">
      <h3 className="font-semibold text-xl">Links importantes</h3>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-[220px]">
            <span className="text-zinc-100 font-medium block">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="text-zinc-400 block text-sm truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center justify-center gap-2 hover:opacity-75 cursor-pointer w-full">
        <Plus className="size-5" />
        Cadastrar novo link
      </button>
    </aside>
  );
}
