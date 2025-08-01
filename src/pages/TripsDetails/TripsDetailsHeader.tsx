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

export function TripDetailsHeader() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const { tripId } = useParams();

  async function getTripDetails() {
    try {
      const response = await api.get(`/trips/${tripId}`);
      console.log(response.data);

      setTrip(response.data.trip);
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.message);
      }
    }
  }

  const formatedDate = trip
    ? format(trip.starts_at, "d ' de ' LLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(trip.ends_at, "d ' de ' LLL", { locale: ptBR }))
    : null;

  useEffect(() => {
    getTripDetails();
  }, [tripId]);
  return (
    <header className="px-6 rounded-lg h-16 bg-zinc-900 shadow-2xl flex items-center justify-between">
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

          <Button variant="secondary">
            Alterar local/data
            <Settings2 />
          </Button>
        </div>
      </div>
    </header>
  );
}
