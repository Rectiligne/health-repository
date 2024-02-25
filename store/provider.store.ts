import { Provider } from "@/types/provider.type";
import { Account } from "@prisma/client";
import { getSession } from "next-auth/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProviderStore {
  current: Account | null;
  providers: Account[];
  updateProvider: (newProvider: Account) => void;
  fetchAllProviders: () => Promise<void>;
}

export const useProviderStore = create<ProviderStore>()(
  persist(
    (set) => ({
      current: null,
      providers: [],
      updateProvider: (newProvider) => set({ current: newProvider }),
      fetchAllProviders: async () => {
        const session = await getSession();
        const response = await fetch(
          process.env.NEXT_PUBLIC_PUBLIC_URL + "/api/providers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              where: { type: Provider.GIT, userId: session?.user.id },
            }),
          }
        );
        const data = await response.json();
        set({ providers: data.data });
      },
    }),
    {
      name: "provider-storage",
    }
  )
);
