import { Mail, User, X } from "lucide-react";
import { Button } from "../../components/button";
import type { DateRange } from "react-day-picker";
interface ConfirmTripModal {
  closeConfirmTripModal: () => void;
  createTrip: (e: React.FormEvent<HTMLFormElement>) => void;
  setOwnerEmail: (ownerEmail: string) => void;
  setOwnerName: (ownerName: string) => void;
  destination: string;
  date: string;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  date,
}: ConfirmTripModal) {
  return (
    <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
          <button
            className="cursor-pointer opacity-80 text-zinc-400"
            onClick={closeConfirmTripModal}
          >
            <X />
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Para concluir a criação da viagem para{" "}
          <span className="font-semibold text-zinc-100">{destination}</span> nas
          datas de <span className="font-semibold text-zinc-100">{date}</span>{" "}
          preencha seus dados abaixo:
        </p>

        <form onSubmit={createTrip} className="flex flex-col gap-2 mb-2.5">
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-7" />
            <input
              type="text"
              placeholder="Seu nome completo"
              name="name"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
              onChange={({ target }) => setOwnerName(target.value)}
            />
          </div>
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-7" />
            <input
              type="email"
              placeholder="Seu e-mail pessoal"
              name="email"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
              onChange={({ target }) => setOwnerEmail(target.value)}
            />
          </div>
          <Button className="h-14">Confirmar criação de viajem</Button>
        </form>
      </div>
    </div>
  );
}
