import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  async function createActivity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const newActivity = {
        title: data.get("activity_name")?.toString(),
        occurs_at: data.get("occurs_at")?.valueOf(),
      };
      const response = await api.post(
        `/trips/${tripId}/activities`,
        newActivity
      );
      if (response.status === 200) {
        alert("Atividade criada com sucesso");
        return closeCreateActivityModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

          <X
            onClick={closeCreateActivityModal}
            className="text-zinc-400 hover:cursor-pointer"
          />
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Todos convidados podem visualizar as atividades.
        </p>

        <form onSubmit={createActivity} className="flex flex-col gap-2 mb-2.5">
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              placeholder="Qual a atividade?"
              name="activity_name"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>

          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 flex-11/12">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              placeholder="20 de agosto"
              name="occurs_at"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>
          <Button variant="primary" className=" h-14">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
