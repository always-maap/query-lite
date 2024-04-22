import { QueryClient } from "./QueryClient";
import { Query, QueryOptions } from "./types";

export function createQuery<TData = unknown>(client: QueryClient, { queryKey, queryFn }: QueryOptions) {
  const query: Query<TData> = {
    queryKey,
    queryHash: JSON.stringify(queryKey),
    promise: null,
    subscribers: [],
    state: {
      status: "loading",
      isFetching: true,
      data: undefined,
      error: undefined,
    },
    subscribe: (subscriber) => {
      query.subscribers.push(subscriber);

      return () => {
        query.subscribers = query.subscribers.filter((sub) => sub !== subscriber);
      };
    },
    setState: (updater) => {
      query.state = updater(query.state);
      query.subscribers.forEach((subscriber) => subscriber.notify());
    },
    fetch: () => {
      if (!query.promise) {
        query.promise = (async () => {
          query.setState((state) => ({
            ...state,
            isFetching: true,
            error: undefined,
          }));

          try {
            const data = (await queryFn()) as TData;

            query.setState((state) => ({
              ...state,
              status: "success",
              lastUpdated: Date.now(),
              data,
            }));
          } catch (error) {
            query.setState((state) => ({
              ...state,
              status: "error",
              data: undefined,
              error,
            }));
          } finally {
            query.promise = null;
            query.setState((state) => ({
              ...state,
              isFetching: false,
            }));
          }
        })();
      }
      return query.promise;
    },
  };

  return query;
}
