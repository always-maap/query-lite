import { useContext, useEffect, useReducer, useRef } from "react";
import { context } from "./QueryClientProvider";
import { createQueryObserver } from "./createQueryObserver";
import { QueryObserver, QueryOptions } from "./types";

export function useQuery({ queryKey, queryFn, staleTime }: QueryOptions) {
  const client = useContext(context);

  const [, rerender] = useReducer((x) => x + 1, 0);

  const observerRef = useRef<QueryObserver | null>(null);

  if (!observerRef.current) {
    observerRef.current = createQueryObserver(client!, { queryKey, queryFn, staleTime });
  }

  useEffect(() => {
    return observerRef.current!.subscribe(rerender);
  }, []);

  return observerRef.current!.getResult();
}
