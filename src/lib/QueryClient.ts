import { createQuery } from "./createQuery";
import { Query, QueryOptions } from "./types";

export class QueryClient {
  queries: Query[];

  constructor() {
    this.queries = [];
  }

  getQuery(options: QueryOptions) {
    const queryHash = JSON.stringify(options.queryKey);
    let query = this.queries.find((query) => query.queryHash === queryHash);

    if (!query) {
      query = createQuery(this, options);
      this.queries.push(query);
    }

    return query;
  }
}
