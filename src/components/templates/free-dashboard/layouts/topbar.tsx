import { useLocation } from "@tanstack/react-router"
import { useEffect } from "react"

import { SearchIcon } from "lucide-react"

import { Notification1 } from "@/components/blocks/layout/notification/notification-1"
import { Profile1 } from "@/components/blocks/layout/profile/profile-1"
import { Widget1 } from "@/components/blocks/layout/widget/widget-1"
import { Widget2 } from "@/components/blocks/layout/widget/widget-2"
import { Button } from "@/components/ui/button"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export const Topbar = () => {
  const { pathname } = useLocation()
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 flex min-h-14 items-center justify-between border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <div>
          <Button
            variant="outline"
            size="sm"
            className="w-48 justify-between shadow-none max-md:hidden"
          >
            <span className="font-normal text-muted-foreground">Search...</span>

            <div className="flex items-center gap-1">
              <kbd className="flex h-5 items-center justify-center rounded-lg border bg-background px-1">
                <span className="pt-px text-[0.625rem] leading-none">Pro</span>
              </kbd>
            </div>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label="Search"
          >
            <SearchIcon className="size-4.5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-4">
        <Widget1 />
        <Widget2 />
        <Notification1 />
        <div className="ms-3 h-6.5 w-px bg-border max-sm:hidden" />
        <div className="flex items-center gap-1">
          <Profile1 />
        </div>
      </div>
    </header>
  )
}
