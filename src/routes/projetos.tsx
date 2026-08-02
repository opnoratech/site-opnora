import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projetos")({
  beforeLoad: () => {
    throw redirect({
      to: "/solucoes",
    });
  },
});
