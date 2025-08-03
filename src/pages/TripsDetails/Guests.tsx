import {
  CheckCircle,
  CheckCircle2,
  CircleDashed,
  UserCog,
  X,
} from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import z from "zod";

export function Guests() {
  const [managerParticipants, setManagerParticipants] = useState(false);
  const { tripId } = useParams();
  const queryClient = useQueryClient();
  const { data: participants, isLoading } = useQuery<Participant[]>({
    queryKey: ["participants", tripId],
    queryFn: async () => {
      const response = await api.get(`/trips/${tripId}/participants`);
      console.log(response.data);

      console.log(response.data.participants);
      return response.data.participants;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/trips/${tripId}`, {
        data: { participantId: id },
      });
      return { data: await response.data, id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", tripId] });
      toast.success("Participante removido com sucesso");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast.error(error.message);
      }
    },
  });

  function deleteParticipant(id: string) {
    mutate(id);
  }

  return (
    <div className="space-y-6 ">
      <h3 className="font-semibold text-xl">Convidados</h3>
      <div className="space-y-5">
        {isLoading && (
          <p className="text-zinc-400 text-lg">Carregando participantes...</p>
        )}
        {participants?.map((participant, i) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-[220px]">
              <span className="text-zinc-100 font-medium block">
                {participant.name ?? `Convidado ${i}`}
              </span>
              <span className="text-zinc-400 text-sm truncate ">
                {participant.email}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              {participant.isConfirmed ? (
                <CheckCircle2 className="text-green-300 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
              {managerParticipants && !participant.is_owner && (
                <X
                  className="size-5 text-red-500 animate-bounce cursor-pointer"
                  onClick={() => deleteParticipant(participant.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {managerParticipants ? (
        <Button
          variant="primary"
          className="w-full"
          onClick={() => setManagerParticipants(false)}
        >
          <UserCog className="size-5" />
          Cancelar
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setManagerParticipants(true)}
        >
          <UserCog className="size-5" />
          Gerenciar participantes
        </Button>
      )}
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}
