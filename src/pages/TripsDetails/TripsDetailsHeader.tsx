import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router";
import { AxiosError } from "axios";
import { formatDateRange } from "../../utils/formatDate";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { UpdateTripModal } from "./UpdateTripModal";
import { useQuery } from "@tanstack/react-query";

export function TripDetailsHeader() {
  const [openUpdateTripModal, setOpenUpdateTripModal] = useState(false);

  const { tripId } = useParams();

  async function getTripDetails() {
    const response = await api.get(`/trips/${tripId}`);
    console.log(response.data);
    return response.data.trip;
  }

  const { data: trip, isLoading } = useQuery<Trip>({
    queryKey: ["trip", tripId],
    queryFn: getTripDetails,
  });
  const formatedDate = trip
    ? format(trip.starts_at, "d ' de ' LLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(trip.ends_at, "d ' de ' LLL", { locale: ptBR }))
    : null;

  return (
    <header className="px-6 rounded-lg h-16 bg-zinc-900 shadow-2xl flex items-center justify-between">
      {isLoading && <p>Carregando dados da viajem</p>}
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100 text-lg">{trip?.destination}</span>
      </div>
      <div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100 text-lg">{formatedDate}</span>
          </div>
          <div className="w-px h-6 bg-zinc-500" />

          <Button
            variant="secondary"
            onClick={() => setOpenUpdateTripModal(true)}
          >
            Alterar local/data
            <Settings2 />
          </Button>
        </div>
      </div>
      {openUpdateTripModal && (
        <UpdateTripModal setOpenUpdateTripModal={setOpenUpdateTripModal} />
      )}
    </header>
  );
}
