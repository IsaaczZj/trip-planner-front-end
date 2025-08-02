import { Link2, Tag, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router";
import z from "zod";

interface CreateImportantLinksProps {
  setOpenCreateImportantLinkModal: (value: boolean) => void;
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}
export function CreateImportantLinkModal({
  setOpenCreateImportantLinkModal,
  setLinks,
}: CreateImportantLinksProps) {
  const [errors, setErrors] = useState({});
  const { tripId } = useParams();
  const createLinkSchema = z.object({
    title: z.string().min(3, "Digite um título maior"),
    url: z.url().min(3, "Digite uma url válida"),
  });
  async function creteLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    try {
      const data = new FormData(e.currentTarget);
      const newLink = createLinkSchema.parse({
        title: data.get("title")?.toString(),
        url: data.get("url")?.toString(),
      });
      setLinks((prev) => [
        ...prev,
        {
          id: `${Date.now()}`,
          ...newLink,
        },
      ]);

      await api.post(`/trips/${tripId}/links`, newLink);
      setOpenCreateImportantLinkModal(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.message);
      }
      alert(error);
      setLinks([])
    }
  }

  return (
    <div className="h-screen w-screen bg-black/80 inset-0 fixed flex items-center justify-center">
      <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar link</h2>
          <X
            className="size-5 text-zinc-400 cursor-pointer"
            onClick={() => setOpenCreateImportantLinkModal(false)}
          />
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Todos convidados podem visualizar os links importantes.
        </p>
        <form onSubmit={creteLink} className="flex flex-col gap-2 mb-2.5">
          <div className="bg-zinc-950 border border-zinc-800 p-2.5 flex items-center gap-2 rounded-lg">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
              placeholder="Título do link"
            />
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-2.5 flex items-center gap-2 rounded-lg">
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="text"
              name="url"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
              placeholder="URL"
            />
          </div>
          <Button>Salvar link</Button>
        </form>
      </div>
    </div>
  );
}
