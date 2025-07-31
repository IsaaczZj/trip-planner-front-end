import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

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

          <Button variant="secondary">
            Alterar local/data
            <Settings2 />
          </Button>
        </div>
      </div>
    </header>
  );
}
