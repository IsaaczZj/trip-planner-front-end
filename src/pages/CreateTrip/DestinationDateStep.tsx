import "react-day-picker/style.css";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { format } from "date-fns";
import { formatDateRange } from "../../utils/formatDate";

interface DestinationDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destinatiom: string) => void;
  setTripDates: (dates: DateRange | undefined) => void;
  tripDates: DateRange | undefined;
}

export function DestinationDateStep({
  openGuestsInput,
  closeGuestsInput,
  isGuestsInputOpen,
  setDestination,
  setTripDates,
  tripDates,
}: DestinationDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }
  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-2xl gap-3">
      <div className="flex items-center gap-2 flex-1 ">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          className="text-lg outline-none placeholder:text-zinc-400 "
          type="text"
          placeholder="Para onde você vai?"
          onChange={({ target }) => setDestination(target.value)}
        />
      </div>
      <button
        className="flex items-center gap-2 cursor-pointer"
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-left text-zinc-400 flex-1 ">
          {formatDateRange(tripDates)}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
          <div className="w-[350px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Selecione a data</h2>
              <button
                className="cursor-pointer opacity-80 text-zinc-400 "
                onClick={closeDatePicker}
              >
                <X />
              </button>
            </div>
            <DayPicker
              mode="range"
              locale={ptBR}
              classNames={{
                month_caption: "text-zinc-100 font-semibold mb-4",
                chevron: "fill-zinc-400",
                weekday: "uppercase font-medium text-xs",
                day: "text-zinc-300 hover:bg-zinc-700 rounded-lg transition-colors",
                caption_label: "uppercase",
                today: "border border-lime-300",
                selected:
                  "bg-lime-300 text-lime-950 font-semibold hover:bg-lime-400",
                disabled: "text-zinc-300 cursor-not-allowed",
                range_end: "bg-lime-700",
                range_start: "bg-lime-700",
                range_middle: "bg-lime-700",
              }}
              selected={tripDates}
              onSelect={setTripDates}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-500" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5 " />
        </Button>
      ) : (
        <Button variant="primary" onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5 " />
        </Button>
      )}
    </div>
  );
}
