import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

interface DestinationDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
}

export function DestinationDateStep({
  openGuestsInput,
  closeGuestsInput,
  isGuestsInputOpen,
}: DestinationDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-2xl gap-3">
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
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5 " />
        </Button>
      ) : (
        <Button variant="primary" onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5 " />
        </Button>
      )}
    </div>
  );
}
