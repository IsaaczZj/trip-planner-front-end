import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsStep {
  openGuestModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep({
  openGuestModal,
  emailsToInvite,
  openConfirmTripModal,
}: InviteGuestsStep) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-2xl gap-3 -mt-4">
      <button className="flex flex-1 cursor-pointer" onClick={openGuestModal}>
        <div className="flex items-center gap-2">
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1">
              Quem estará na viagem?
            </span>
          )}
        </div>
      </button>

      <button
        className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer"
        onClick={openConfirmTripModal}
      >
        Confirmar viagem
        <ArrowRight className="size-5 " />
      </button>
    </div>
  );
}
