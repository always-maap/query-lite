import { Link, useParams } from "react-router-dom";
import { useQuery } from "../lib";
import { getPost } from "../apis/post";

export function Post() {
  const { id } = useParams() as { id: string };
  console.log(id);

  const { data, status } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: Infinity,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div>
      <Link to="/">← Back</Link>
      <h1 className="text-center text-3xl underline my-4">{data.title}</h1>
      <p className="text-slate-500">{data.body}</p>
    </div>
  );
}
