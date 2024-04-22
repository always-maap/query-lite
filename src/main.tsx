import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "./lib";

import GlassContainer from "./components/Container";
import { Home } from "./routes/Home";
import { Post } from "./routes/Post";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlassContainer>
        <RouterProvider router={router} />
      </GlassContainer>
    </QueryClientProvider>
  </React.StrictMode>
);
