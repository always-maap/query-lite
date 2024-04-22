import { createContext, useContext } from "react";
import { QueryClient } from "./QueryClient";

export const context = createContext<QueryClient | undefined>(undefined);

type QueryClientProviderProps = {
  client: QueryClient;
  children: React.ReactNode;
};

export function QueryClientProvider({ children, client }: QueryClientProviderProps) {
  return <context.Provider value={client}>{children}</context.Provider>;
}

export function useQueryContext() {
  const client = useContext(context);

  if (!client) {
    throw new Error("useQueryContext must be used within a QueryClientProvider");
  }

  return client;
}
