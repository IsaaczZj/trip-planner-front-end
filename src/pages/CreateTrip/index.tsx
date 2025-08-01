import logo from "../../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { InviteGuestsModal } from "./InviteGuestsModal";
import { ConfirmTripModal } from "./ConfirmTripModal";
import { DestinationDateStep } from "./DestinationDateStep";
import { InviteGuestsStep } from "./InviteGuestsStep";
import type { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";

export function CreateTrip() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setisGuestModalOpen] = useState(false);
  const [isConfirmTripModal, setIsConfirmModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [tripDates, setTripDates] = useState<DateRange | undefined>(undefined);

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

  async function createTrip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!destination) {
      return;
    }
    if (!tripDates?.from || !tripDates.to) {
      return;
    }
    if (emailsToInvite.length === 0) {
      return;
    }
    if (!ownerName || !ownerEmail) {
      return;
    }

    const newTrip = {
      destination,
      starts_at: tripDates?.from,
      ends_at: tripDates?.to ,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    };

    try {
      const { data } = await api.post("/trips", newTrip);
      console.log(data);
      return navigate(`/trips/${data.newTrip.id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.message);
      }
    }
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
          setDestination={setDestination}
          setTripDates={setTripDates}
          tripDates={tripDates}
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
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
