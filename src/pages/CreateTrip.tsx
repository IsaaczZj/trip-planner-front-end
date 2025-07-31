import logo from "../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { InviteGuestsModal } from "../components/core/InviteGuestsModal";
import { ConfirmTripModal } from "../components/core/ConfirmTripModal";
import { DestinationDateStep } from "../components/core/DestinationDateStep";
import { InviteGuestsStep } from "../components/core/InviteGuestsStep";
export function CreateTrip() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setisGuestModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModal, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }
  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestModal() {
    setisGuestModalOpen(true);
  }
  function closeGuestModal() {
    setisGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmModalOpen(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmModalOpen(false);
  }

  function createTrip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return navigate("/trips/123");
  }

  function addEmailToInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) {
      return alert("Preencha um email");
    }
    if (emailsToInvite.includes(email)) {
      return alert("Coloque um email diferente");
    }
    setEmailsToInvite([...emailsToInvite, email]);
    e.currentTarget.reset();
  }

  function removeEmailFromToInvite(emailToRemove: string) {
    const removedEmail = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(removedEmail);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-image">
      <div className="max-w-4xl w-full px-8 text-center space-y-10">
        <div>
          <img src={logo} alt="" className="mx-auto mb-3" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <DestinationDateStep
          closeGuestsInput={closeGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          openGuestsInput={openGuestsInput}
        />

        {isGuestsInputOpen && (
          <InviteGuestsStep
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={openConfirmTripModal}
            openGuestModal={openGuestModal}
          />
        )}

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a href="" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestModalOpen && (
        <InviteGuestsModal
          addEmailToInvite={addEmailToInvite}
          closeGuestModal={closeGuestModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromToInvite={removeEmailFromToInvite}
        />
      )}

      {isConfirmTripModal && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
}
