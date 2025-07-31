import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  UserCog,
} from "lucide-react";

export function TripDetails() {
  return (
    <div className="max-w-7xl px-4 py-10 mx-auto space-y-8">
      <header className="px-6 rounded-lg h-16 bg-zinc-900 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100 text-lg">Florianópolis, Brasil</span>
        </div>
        <div>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-zinc-100 text-lg">17 a 23 de Agosto</span>
            </div>
            <div className="w-px h-6 bg-zinc-500" />

            <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:opacity-75 cursor-pointer">
              Alterar local/data
              <Settings2 className="size-5 " />
            </button>
          </div>
        </div>
      </header>

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-3 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer">
              <Plus className="size-5 " />
              Cadastrar atividade
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-2xl text-zinc-300 font-semibold">
                  Dia 17
                </span>
                <span className="text-xs text-zinc-500">Sábado</span>
              </div>
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-2xl text-zinc-300 font-semibold">
                  Dia 18
                </span>
                <span className="text-xs text-zinc-500">Domingo</span>
              </div>
              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-lg shadow-2xl flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className=" text-zinc-100 text-lg">
                    Academia em grupo
                  </span>
                  <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 space-y-6">
          <div className="space-y-6 ">
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
          </div>
          <div className="w-full h-px bg-zinc-800 my-6"></div>

          <div className="space-y-6 ">
            <h3 className="font-semibold text-xl">Convidados</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-[220px]">
                  <span className="text-zinc-100 font-medium block">
                    Jessica White
                  </span>
                  <span className="text-zinc-400 block text-sm truncate ">
                    jessica.white44@yahoo.com
                  </span>
                </div>
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              </div>
            </div>

            <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center justify-center gap-2 hover:opacity-75 cursor-pointer w-full">
              <UserCog className="size-5" />
              Gerenciar convidados
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
