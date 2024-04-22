export type QueryOptions = {
  queryKey: string[];
  queryFn: () => Promise<unknown>;
  staleTime?: number;
};

type Action = () => void;

export type Query<TData = unknown> = {
  queryKey: string[];
  queryHash: string;
  promise: unknown | null;
  subscribers: QueryObserver<TData>[];
  state:
    | {
        status: "loading";
        isFetching: boolean;
        data: undefined;
        error: unknown;
        lastUpdated?: number;
      }
    | {
        status: "success";
        isFetching: boolean;
        data: TData;
        error: unknown;
        lastUpdated?: number;
      }
    | {
        status: "error";
        isFetching: boolean;
        data: undefined;
        error: unknown;
        lastUpdated?: number;
      };
  subscribe: (subscriber: QueryObserver<TData>) => Action;
  setState: (updater: (state: Query<TData>["state"]) => Query<TData>["state"]) => void;
  fetch: () => Query<TData>["promise"];
};

export type QueryObserver<TData> = {
  notify: Action;
  getResult: () => Query<TData>["state"];
  subscribe: (cb: Action) => Action;
  fetch: Action;
};
