import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSettings() {
  return useQuery({
    queryKey: [api.settings.get.path],
    queryFn: async () => {
      const res = await fetch(api.settings.get.path);
      if (!res.ok) throw new Error("Failed to fetch settings");
      // Using the Zod schema response validator
      return api.settings.get.responses[200].parse(await res.json());
    },
  });
}
