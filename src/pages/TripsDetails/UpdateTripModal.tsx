import { Axe, Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { data, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { AxiosError } from "axios";

interface UpdateTripModal {
  setOpenUpdateTripModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateTripModal({ setOpenUpdateTripModal }: UpdateTripModal) {
  const { tripId } = useParams();
  const [newTripDates, setNewTripDates] = useState<DateRange | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (updateTrip: {
      destination?: string;
      starts_at?: Date;
      ends_at?: Date;
    }) => {
      const response = await api.put(`/trips/${tripId}`, updateTrip);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] });
      toast.success("Viajem atualizada com sucesso");
      setTimeout(() => {
        setOpenUpdateTripModal(false);
      }, 1500);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    },
  });

  function updateTrip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const updatedTrip = {
      destination: data.get("new_local")?.toString(),
      starts_at: newTripDates?.from,
      ends_at: newTripDates?.to,
    };
    mutate(updatedTrip);
  }

  return (
    <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

          <X
            onClick={() => setOpenUpdateTripModal(false)}
            className="text-zinc-400 hover:cursor-pointer"
          />
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Todos convidados podem visualizar as atividades.
        </p>

        <form onSubmit={updateTrip} className="flex flex-col gap-2 mb-2.5">
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              placeholder="Novo local"
              name="new_local"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>

          <div className="p-2.5 my-7 rounded-lg flex items-center justify-center gap-2 ">
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
              selected={newTripDates}
              onSelect={setNewTripDates}
            />
          </div>
          <Button variant="primary" className=" h-14">
            {isPending ? "Carregando..." : "Salvar atividade"}
          </Button>
        </form>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}
