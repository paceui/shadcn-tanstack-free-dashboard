import { createFileRoute } from "@tanstack/react-router"
import { HospitalDashboard } from "@/components/templates/free-dashboard/dashboards/hospital"

export const Route = createFileRoute("/_layout/dashboards/hospital")({
  component: HospitalDashboard,
})
