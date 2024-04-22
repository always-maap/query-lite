import { ReactNode } from "react";

export default function GlassContainer(props: { children: ReactNode }) {
  return <div className="container max-w-screen-lg mx-auto rounded-lg shadow-lg p-4 bg-white">{props.children}</div>;
}
