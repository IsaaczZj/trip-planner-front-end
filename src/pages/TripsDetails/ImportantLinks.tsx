import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../lib/axios";
import { CreateImportantLinkModal } from "./CreateImportantLinkModal";

export function ImportantLinks() {
  const [openCreateImportantLinkModal, setOpenCreateImportantLinkModal] =
    useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const { tripId } = useParams();
  async function getLinks() {
    try {
      const { data } = await api.get(`/trips/${tripId}/links`);
      setLinks(data.links);
    } catch (error) {}
  }

  useEffect(() => {
    getLinks();
  }, [tripId]);

  return (
    <aside className="space-y-6 ">
      <h3 className="font-semibold text-xl">Links importantes</h3>
      <div className="space-y-5">
        {links.length <= 0 && (
          <p className="text-zinc-400 text-center">Nenhum link cadastrado</p>
        )}
        {links.map((link) => (
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-[220px]">
              <span className="text-zinc-100 font-medium block">
                {link.title}
              </span>
              <a
                href={link.url}
                target="_blank"
                className="text-zinc-400 block text-sm truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => setOpenCreateImportantLinkModal(true)}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
      {openCreateImportantLinkModal && (
        <CreateImportantLinkModal
          setOpenCreateImportantLinkModal={setOpenCreateImportantLinkModal}
          setLinks={setLinks}
        />
      )}
    </aside>
  );
}
