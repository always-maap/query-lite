export type QueryOptions = {
  queryKey: string[];
  queryFn: () => Promise<unknown>;
  staleTime?: number;
};

type Action = () => void;

export type Query = {
  queryKey: string[];
  queryHash: string;
  promise: Promise<unknown> | null;
  subscribers: QueryObserver[];
  state: {
    status: "loading" | "success" | "error";
    isFetching: boolean;
    data: unknown;
    error: unknown;
    lastUpdated?: number;
  };
  subscribe: (subscriber: QueryObserver) => Action;
  setState: (updater: (state: Query["state"]) => Query["state"]) => void;
  fetch: () => Query["promise"];
};

export type QueryObserver = {
  notify: Action;
  getResult: () => Query["state"];
  subscribe: (cb: Action) => Action;
  fetch: Action;
};
