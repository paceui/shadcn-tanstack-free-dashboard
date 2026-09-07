import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AdminLayout } from "@/components/templates/free-dashboard/layouts"

export const Route = createFileRoute("/_layout")({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
