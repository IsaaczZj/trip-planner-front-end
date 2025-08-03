import { Calendar, MapPin, Plus, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivityModal } from "./CreateActivityModal";
import { ImportantLinks } from "./ImportantLinks";
import { Guests } from "./Guests";
import { Activities } from "./Activities";
import { TripDetailsHeader } from "./TripsDetailsHeader";
import { useParams } from "react-router";
import { api } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export function TripDetails() {
  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false);
  

  const { tripId } = useParams();


  function openCreateActivityModal() {
    return setIsCreateActivityModal(true);
  }
  function closeCreateActivityModal() {
    setIsCreateActivityModal(false);
  }

  return (
    <div className="max-w-7xl px-4 py-10 mx-auto space-y-8">
      <TripDetailsHeader />
      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-3 font-medium flex items-center gap-2 hover:bg-lime-400 cursor-pointer"
              onClick={openCreateActivityModal}
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities/>
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800 my-6"></div>

          <Guests />
        </div>
      </main>

      {isCreateActivityModal && (
        <CreateActivityModal
          
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
