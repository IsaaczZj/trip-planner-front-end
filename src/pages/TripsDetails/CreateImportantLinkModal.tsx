import { Link2, Tag, Variable, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

interface CreateImportantLinksProps {
  setOpenCreateImportantLinkModal: (value: boolean) => void;
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}
export function CreateImportantLinkModal({
  setOpenCreateImportantLinkModal,
  setLinks,
}: CreateImportantLinksProps) {
  const { tripId } = useParams();
  const createLinkSchema = z.object({
    title: z.string().min(3, "Digite um título maior"),
    url: z.url().min(3, "Digite uma url válida"),
  });
  const {mutate, isPending} = useMutation({
    mutationFn: async (formData:FormData) => {
       
      const newLink = createLinkSchema.parse({
        title: formData.get("title")?.toString(),
        url: formData.get("url")?.toString(),
      });
      const response = api.post(`/trips/${tripId}/links`, newLink);
      return {data:(await response).data, newLink}
    },
    onSuccess: ({data, newLink}) => {
      setLinks((prev) => [
        ...prev,
        {
          id: data.id,
          ...newLink,
        },
      ]);
      toast.success('Link criado com sucesso')
      setTimeout(() =>{
        setOpenCreateImportantLinkModal(false)
      },1200)
    },
    onError: (error) => {
      if (error instanceof z.ZodError) {
        return toast.error(error.issues[0].message);
      } else {
        toast.error("Link nao foi criadp");
      }
    },
  });
  async function creteLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    mutate(data)
    
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
          <Button className={`${isPending && 'pointer-events-none'}`}>{isPending ? 'Cadastrando link...': 'Cadastrar link'}</Button>
        </form>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}
