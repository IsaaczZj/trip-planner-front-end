import { CheckCircle, CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function Guests() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { tripId } = useParams();
  async function getDetaisTrip() {
    try {
      const response = await api.get(`/trips/${tripId}/participants`);
      console.log(response.data);

      setParticipants(response.data.participants);
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.message);
      }
    }
  }

  useEffect(() => {
    getDetaisTrip();
  }, [tripId]);
  return (
    <div className="space-y-6 ">
      <h3 className="font-semibold text-xl">Convidados</h3>
      <div className="space-y-5">
        {participants?.map((participant,i) => (
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
            {participant.isConfirmed ? (
              <CheckCircle2 className="text-green-300 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" className="w-full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
