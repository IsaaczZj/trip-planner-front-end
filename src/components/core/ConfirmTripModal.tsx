import { Mail, User, X } from "lucide-react";
interface ConfirmTripModal {
  closeConfirmTripModal: () => void;

  createTrip: () => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
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
          <span className="font-semibold text-zinc-100">
            Florianópolis, Brasil
          </span>{" "}
          nas datas de{" "}
          <span className="font-semibold text-zinc-100">
            16 a 27 de Agosto de 2024
          </span>{" "}
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
            />
          </div>
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-7" />
            <input
              type="email"
              placeholder="Seu e-mail pessoal"
              name="email"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>
        </form>
        <button className="bg-lime-300 text-lime-950 rounded-lg px-5 h-14 font-medium flex items-center justify-center gap-2 hover:bg-lime-400 cursor-pointer w-full">
          Confirmar criação de viajem
        </button>
      </div>
    </div>
  );
}
