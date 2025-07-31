import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

export function Guests() {
  return (
    <div className="space-y-6 ">
      <h3 className="font-semibold text-xl">Convidados</h3>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-[220px]">
            <span className="text-zinc-100 font-medium block">
              Jessica White
            </span>
            <span className="text-zinc-400 block text-sm truncate ">
              jessica.white44@yahoo.com
            </span>
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" className="w-full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
