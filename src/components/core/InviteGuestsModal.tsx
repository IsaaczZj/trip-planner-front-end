import { AtSign, Plus, X } from "lucide-react";
import { Button } from "../button";

interface InviteGuestsModalProps {
  closeGuestModal: () => void;
  emailsToInvite: string[];
  addEmailToInvite: (e: React.FormEvent<HTMLFormElement>) => void;
  removeEmailFromToInvite: (email: string) => void;
}

export function InviteGuestsModal({
  closeGuestModal,
  emailsToInvite,
  addEmailToInvite,
  removeEmailFromToInvite,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Selecionar convidados</h2>

          <X className="cursor-pointer opacity-80 text-zinc-400" onClick={closeGuestModal}/>
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Os convidados irão receber e-mails para confirmar a participação na
          viagem.
        </p>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => (
            <div
              key={email}
              className="px-2.5 py-1.5 bg-zinc-800 flex items-center gap-2.5 rounded-lg"
            >
              <span className="text-zinc-300">{email}</span>

              <X
                className="text-zinc-400 cursor-pointer"
                onClick={() => removeEmailFromToInvite(email)}
              />
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-zinc-800 my-6"></div>

        <form
          onSubmit={addEmailToInvite}
          className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <AtSign className="text-zinc-400 size-7" />
          <input
            type="email"
            placeholder="Digite o email do convidado"
            name="email"
            className="text-md outline-none placeholder:text-zinc-400 w-full"
          />
          <Button variant="primary">
            Convidar
            <Plus className="size-5 " />
          </Button>
        </form>
      </div>
    </div>
  );
}
