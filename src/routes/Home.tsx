import { useQuery } from "../lib";
import { getPosts } from "../apis/posts";
import { Link } from "react-router-dom";
import { Post } from "../apis/types";

export default function HomePage() {
  const { data, status } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
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
      <h1 className="text-center text-3xl underline">Welcome to my blog</h1>
      {data.map((post) => (
        <div className="my-4" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2 className="text-xl hover:text-blue-500">→ {post.title}</h2>
          </Link>
          <p className="text-slate-500">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
