import { Link, useLocation } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"

import type { MenuItem } from "./items"

const Tag = ({ tag }: { tag?: MenuItem["tag"] }) => {
  if (tag == "coming-soon")
    return (
      <div
        title="Coming Soon"
        className="size-1.5 rounded-full bg-foreground/20 transition-all delay-100 duration-300 group-hover/sub-item:w-3 group-hover/sub-item:bg-foreground/30"
      />
    )
  if (tag == "new")
    return (
      <div
        title="New"
        className="size-1.5 rounded-full bg-primary/60 transition-all delay-100 duration-300 group-hover/sub-item:w-3 group-hover/sub-item:bg-primary"
      />
    )
  if (tag == "trend")
    return (
      <div
        title="Trending"
        className="size-1.5 rounded-full bg-red-500/60 transition-all delay-100 duration-300 group-hover/sub-item:w-3 group-hover/sub-item:bg-red-500"
      />
    )
  if (tag == "pro")
    return (
      <div title="Pro" className="rounded-md bg-secondary px-1.5 py-px text-xs">
        Pro
      </div>
    )
  return null
}

const TagItems = ({ tag }: { tag?: MenuItem["tag"] }) => {
  if (!tag) return null
  return (
    <div className="inline-flex">
      <Tag tag={tag} />
    </div>
  )
}

export const NavItem = ({ item }: { item: MenuItem }) => {
  const [active, setActive] = useState(false)
  const { href } = useLocation()

  useEffect(() => {
    setActive(
      (item.href && href == item.href) ||
        item.items?.find((subItem) => subItem.href && href == subItem.href) !=
          null
    )
  }, [href])

  if (item.isTitle)
    return (
      <SidebarMenuItem className="mb-1 px-2 text-xs font-semibold tracking-wide text-foreground/60 uppercase not-first:mt-4">
        {item.label}
      </SidebarMenuItem>
    )

  if (!item.items) {
    return (
      <SidebarMenuItem className="group/sub-item px-0">
        <SidebarMenuButton
          isActive={active}
          className={cn("h-8 px-2.5 py-2", {
            "font-medium": active,
            "bg-transparent! opacity-80": !item.href,
          })}
          render={
            <Link to={item.href} target={item.external ? "_blank" : undefined}>
              {item.icon && <item.icon />}
              <p className="grow">{item.label}</p>
              <TagItems tag={item.tag} />
            </Link>
          }
        ></SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible
      key={item.label}
      open={active}
      onOpenChange={setActive}
      render={
        <SidebarMenuItem className="px-0.5">
          <CollapsibleTrigger
            render={
              <SidebarMenuButton
                tooltip={item.label}
                className={cn("group/sub-item", { "font-medium": active })}
              >
                {item.icon && <item.icon />}
                <span>{item.label}</span>
                <div className="ms-auto flex items-center gap-2">
                  <TagItems tag={item.tag} />
                  <ChevronRightIcon className="transition-transform duration-200 group-data-open/menu-item:rotate-90" />
                </div>
              </SidebarMenuButton>
            }
          ></CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="group/menu-sub me-0 gap-0.5 ps-2 pe-0">
              {item.items.map((subItem, index) => (
                <NavItem item={subItem} key={index} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      }
      className="group/collapsible"
    ></Collapsible>
  )
}
