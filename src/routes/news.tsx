import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  component: () => <Outlet />,
});
