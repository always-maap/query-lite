import { QueryObserver, QueryOptions } from "./types";
import { QueryClient } from "./QueryClient";

export function createQueryObserver(client: QueryClient, { queryKey, queryFn, staleTime = 0 }: QueryOptions) {
  const query = client.getQuery({ queryKey, queryFn });

  const observer: QueryObserver = {
    notify: () => {},
    getResult: () => query.state,
    subscribe: (cb) => {
      observer.notify = cb;
      const unsubscribe = query.subscribe(observer);

      observer.fetch();

      return unsubscribe;
    },
    fetch: () => {
      if (!query.state.lastUpdated || Date.now() - query.state.lastUpdated > staleTime) {
        query.fetch();
      }
    },
  };

  return observer;
}
