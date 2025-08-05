import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { queryClient } from "../../libs/react-query";
import { AxiosError } from "axios";

interface DeleteParticipantModalProps {
  closeDeleteParticipantModal: React.Dispatch<React.SetStateAction<boolean>>;
  participant: Participant;
}

export function DeleteParticipantModal({
  closeDeleteParticipantModal,
  participant,
}: DeleteParticipantModalProps) {
  const { tripId } = useParams();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/trips/${tripId}`, {
        data: { participantId: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", tripId] });

      closeDeleteParticipantModal(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
      toast.error("Erro ao deletar participante");
    },
  });
  function deleteParticipant() {
    mutate(participant.id);
  }

  return (
    <div className="fixed inset-0 bg-black/60 h-screen w-screen flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              Tem certeza que deseja excluir este participante com email
            </h2>
            <span className="text-zinc-100 block text-xl mb-4">
              {participant.email}
            </span>
          </div>

          <X
            onClick={() => closeDeleteParticipantModal(false)}
            className="text-zinc-400 hover:cursor-pointer self-start"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button className="flex-1" onClick={deleteParticipant}>
            Sim
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => closeDeleteParticipantModal(false)}
          >
            Não
          </Button>
        </div>
      </div>
    </div>
  );
}
