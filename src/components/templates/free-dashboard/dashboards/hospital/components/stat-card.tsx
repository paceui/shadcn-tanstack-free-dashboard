import {
    DownloadIcon,
    EyeIcon,
    type LucideIcon,
    MinusIcon,
    MoreVerticalIcon,
    RefreshCwIcon,
    TrendingDownIcon,
    TrendingUpIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type StatCardMenuItem = {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
};

export type StatCardProps = {
    title: string;
    value: string | number;
    trendValue: string | number;
    direction?: "up" | "down" | "neutral";
    icon?: LucideIcon;
    menuItems?: StatCardMenuItem[];
};

export const StatCard = ({
    title,
    value,
    trendValue,
    direction = "up",
    icon: Icon,
    menuItems = [
        { label: "View Details", icon: EyeIcon },
        { label: "Export Data", icon: DownloadIcon },
        { label: "Refresh", icon: RefreshCwIcon },
    ],
}: StatCardProps) => {
    const isUp = direction === "up";
    const isDown = direction === "down";
    const TrendIcon = isUp ? TrendingUpIcon : isDown ? TrendingDownIcon : MinusIcon;

    const badgeClass = isUp
        ? "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        : isDown
          ? "bg-rose-100/80 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
          : "bg-muted text-muted-foreground";

    return (
        <Card className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    {Icon && (
                        <div className="bg-card flex size-9 items-center justify-center rounded-md border">
                            <Icon className="size-4.5" />
                        </div>
                    )}
                    <CardTitle>{title}</CardTitle>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" size="icon-sm">
                                <MoreVerticalIcon className="size-3.5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuGroup>
                            {menuItems.map((item, index) => {
                                const ItemIcon = item.icon;
                                return (
                                    <DropdownMenuItem key={index} onClick={item.onClick}>
                                        {ItemIcon && <ItemIcon className="size-4" />}
                                        <span>{item.label}</span>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <CardContent className="bg-muted/60 flex items-center justify-between rounded-md px-3.5 py-3">
                <span className="text-2xl font-medium sm:text-3xl">{value}</span>
                <span
                    className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                        badgeClass,
                    )}>
                    <TrendIcon className="size-3.5" />
                    <span>{trendValue}</span>
                </span>
            </CardContent>
        </Card>
    );
};
