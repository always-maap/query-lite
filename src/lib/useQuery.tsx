import { useEffect, useReducer, useRef } from "react";
import { useQueryContext } from "./QueryClientProvider";
import { createQueryObserver } from "./createQueryObserver";
import { QueryObserver, QueryOptions } from "./types";

export function useQuery<TData>({ queryKey, queryFn, staleTime }: QueryOptions) {
  const client = useQueryContext();

  const [, rerender] = useReducer((x) => x + 1, 0);

  const observerRef = useRef<QueryObserver<TData> | null>(null);

  if (!observerRef.current) {
    observerRef.current = createQueryObserver<TData>(client!, { queryKey, queryFn, staleTime });
  }

  useEffect(() => {
    return observerRef.current!.subscribe(rerender);
  }, []);

  return observerRef.current!.getResult();
}
