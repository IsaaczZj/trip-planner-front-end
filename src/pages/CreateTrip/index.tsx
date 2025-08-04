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
import { formatDateRange } from "../../utils/formatDate";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

type NewTrip = {
  destination: string;
  starts_at: Date;
  ends_at: Date;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
};
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

  const date = formatDateRange(tripDates);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newTrip: NewTrip) => {
      const { data } = await api.post("/trips", newTrip);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Viajem criada com sucesso");
      setTimeout(() => {  
        navigate(`/trips/${data.newTrip.id}`);
      }, 1200);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    },
  });

  async function createTrip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!destination) {
      return toast.error("Você precisa colocar um destino");
    }
    if (!tripDates?.from || !tripDates.to) {
      return toast.error("Selecione uma data");
    }
    if (emailsToInvite.length === 0) {
      return toast.error("Você precisa convidar pelo menos uma pessoa");
    }
    if (!ownerName || !ownerEmail) {
      return toast.error("Email ou senha vazios");
    }

    const newTrip = {
      destination,
      starts_at: tripDates?.from,
      ends_at: tripDates?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    };

    mutate(newTrip);
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
          isGuestsInputOpen={isGuestsInputOpen}
          setIsGuestsInputOpen={setIsGuestsInputOpen}
          setDestination={setDestination}
          setTripDates={setTripDates}
          tripDates={tripDates}
        />

        {isGuestsInputOpen && (
          <InviteGuestsStep
            setisGuestModalOpen={setisGuestModalOpen}
            emailsToInvite={emailsToInvite}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
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
          setisGuestModalOpen={setisGuestModalOpen}
          emailsToInvite={emailsToInvite}
          removeEmailFromToInvite={removeEmailFromToInvite}
        />
      )}

      {isConfirmTripModal && (
        <ConfirmTripModal
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          date={date}
          isPending={isPending}
        />
      )}
      <ToastContainer theme="dark" position="top-center" />
    </div>
  );
}
