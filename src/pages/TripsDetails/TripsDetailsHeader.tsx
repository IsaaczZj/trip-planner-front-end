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
    ? format(trip.starts_at, "d ' de ' LLLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(trip.ends_at, "d ' de ' LLLL", { locale: ptBR }))
    : null;
  const formatedDateMobile = trip
    ? format(trip.starts_at, "dd '/' LL", { locale: ptBR })
        .concat(" a ")
        .concat(format(trip.ends_at, "dd '/' LL", { locale: ptBR }))
    : null;

  return (
    <header className="md:px-6 px-2 py-3 rounded-lg h-auto bg-zinc-900 shadow-2xl flex flex-col md:flex-row items-center justify-between">
      {isLoading && <p>Carregando dados da viajem</p>}
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <MapPin className="md:size-5 size-4 text-zinc-400" />
        <span className="text-zinc-100 md:text-lg text-xs break-words ">
          {trip?.destination}
        </span>
      </div>
      <div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="md:size-5 size-3 text-zinc-400" />
            <span className="text-zinc-100 md:text-lg text-xs w-[100px] md:w-auto md:hidden">
              {formatedDateMobile}
            </span>
            <span className="text-zinc-100 md:text-lg text-xs w-[100px] md:w-auto hidden md:block">
              {formatedDate}
            </span>
          </div>
          <div className="w-px h-6 bg-zinc-500" />

          <Button
            variant="secondary"
            className="h-12 w-[100px] text-xs md:w-auto md:text-lg"
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
