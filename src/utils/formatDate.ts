import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

export function formatDateRange(dateRange: DateRange | undefined ) {
  if (!dateRange?.from) return "Quando";
  if (!dateRange.to) {
    return format(dateRange.from, "d'de' LLLL", { locale: ptBR });
  }
  const formatedDate = `${format(dateRange.from, "d 'de' LLLL", {
    locale: ptBR,
  })} à ${format(dateRange.to, "d 'de' LLLL", { locale: ptBR })}`;

  return formatedDate;
}
