import { Link } from "@tanstack/react-router"
import { Fragment } from "react"
import type { ReactNode } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Props = {
  title: string
  endContent?: ReactNode
  links?: {
    label: string
    href: string
  }[]
}

export const PageTitle = ({ title, endContent, links }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-medium sm:text-xl">{title}</p>
      {endContent || (
        <Breadcrumb className="max-sm:hidden">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link to="/">Admin</Link>}
              ></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {links?.map((link, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link to={link.href}>{link.label}</Link>}
                  ></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  )
}
