import { createFileRoute } from "@tanstack/react-router"
import { LogsDashboard } from "@/components/templates/free-dashboard/dashboards/logs"

export const Route = createFileRoute("/_layout/dashboards/logs")({
  component: LogsDashboard,
})
