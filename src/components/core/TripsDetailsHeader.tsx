import { Calendar, MapPin, Settings2 } from "lucide-react";

export function TripDetailsHeader() {
  return (
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
  );
}
