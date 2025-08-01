import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { tripId } = useParams();

  async function getActivitiesDetails() {
    try {
      const { data } = await api.get(`/trips/${tripId}/activities`);
      console.log(data.activities);

      setActivities(data.activities);
    } catch (error) {}
  }

  useEffect(() => {
    getActivitiesDetails();
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-2xl text-zinc-300 font-semibold">
              Dia {format(activity.date, "d")}
            </span>
            <span className="text-xs text-zinc-500">
              {format(activity.date, "EEEE", { locale: ptBR })}
            </span>
          </div>
          {activity.activities.length <= 0 ? (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada
            </p>
          ) : (
            <>
              {activity.activities.map((activity) => (
                <div className="space-y-2.5">
                  <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-lg shadow-2xl flex items-center gap-3">
                      <CircleCheck className="size-5 text-lime-300" />
                      <span className=" text-zinc-100 text-lg">
                        {activity.title}
                      </span>
                      <span className="text-zinc-400 text-sm ml-auto">
                        {format(activity.occurs_at, 'HH:MM')}h
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
