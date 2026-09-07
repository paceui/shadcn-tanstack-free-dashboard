import { createFileRoute } from "@tanstack/react-router"
import { SalesDashboard } from "@/components/templates/free-dashboard/dashboards/sales"

export const Route = createFileRoute("/_layout/")({
  component: SalesDashboard,
})
