import {
  Calendar,
  MailCheckIcon,
  MailIcon,
  MailMinus,
  MailQuestionMark,
  Tag,
  X,
} from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { AxiosError } from "axios";

interface InviteNewParticipantProps {
  setOpenInviteNewParticipantModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export function InviteNewParticipant({
  setOpenInviteNewParticipantModal,
}: InviteNewParticipantProps) {
  const { tripId } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post(`/trips/${tripId}/invites`, {email});
      return response.data;
    },
    onSuccess: () => {
      toast.success("Participante convidado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["participants", tripId] });
      setTimeout(() => {
        setOpenInviteNewParticipantModal(false);
      }, 1200);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
      toast.error("Erro ao convidar participante");
    },
  });
  function inviteNewParticipant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const email = data.get("email_participant")?.toString();
    if (!email && email?.length === 0) {
      return toast.error("O campo de email não pode estar vazio");
    }
    if (email) mutate(email);
  }

 
  return (
    <div className="fixed inset-0 bg-black/80 h-screen w-screen flex items-center justify-center px-5">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-2xl bg-zinc-900">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Convidar novo participante</h2>

          <X
            onClick={() => setOpenInviteNewParticipantModal(false)}
            className="text-zinc-400 hover:cursor-pointer"
          />
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-5">
          Insira o email do participante a ser convidado
        </p>
        <form
          onSubmit={inviteNewParticipant}
          className="flex flex-col gap-2 mb-2.5"
        >
          <div className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 mb-3">
            <MailQuestionMark className="text-zinc-400 size-5" />
            <input
              type="email"
              placeholder="Email do novo participante"
              name="email_participant"
              className="text-md outline-none placeholder:text-zinc-400 w-full"
            />
          </div>
          <Button className="w-full h-14">
            {isPending ? "Convidando..." : "Convidar participante"}
          </Button>
        </form>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}
