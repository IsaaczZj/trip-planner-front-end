import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../components/button";

interface InviteGuestsStep {
  setisGuestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emailsToInvite: string[];
}

export function InviteGuestsStep({
  setisGuestModalOpen,
  setIsConfirmModalOpen,
  emailsToInvite,
}: InviteGuestsStep) {
  return (
    <div className="min-h-16 bg-zinc-900 px-3 md:px-4 py-3 md:py-0 rounded-xl flex flex-col md:flex-row items-stretch md:items-center shadow-2xl gap-3 -mt-4">
      <button
        className="flex flex-1 cursor-pointer min-w-0"
        onClick={() => setisGuestModalOpen(true)}
      >
        <div className="flex items-center gap-2 w-full">
          <UserRoundPlus className="size-4 md:size-5 text-zinc-400 flex-shrink-0" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-sm md:text-lg flex-1 text-left truncate">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 text-sm md:text-lg flex-1 text-left">
              Quem estará na viagem?
            </span>
          )}
        </div>
      </button>

      <div className="hidden md:block w-px h-6 bg-zinc-500" />

      <div className="flex-shrink-0">
        <Button
          variant="primary"
          className="w-full md:w-auto text-sm md:text-base h-12 md:h-auto"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          <span className="hidden sm:inline">Confirmar viagem</span>
          <span className="sm:hidden">Confirmar</span>
          <ArrowRight className="size-4 md:size-5" />
        </Button>
      </div>
    </div>
  );
}
