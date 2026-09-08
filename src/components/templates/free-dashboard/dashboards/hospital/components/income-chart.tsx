import { useEffect, useState } from "react";

import { DollarSignIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export type IncomeData = {
    date: string;
    earnings: number;
    cost: number;
};

const rawIncomeData: IncomeData[] = Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    return {
        date: d.toISOString().slice(0, 10),
        earnings: Math.floor(Math.random() * 600) + 900,
        cost: Math.floor(Math.random() * 400) + 350,
    };
});

const chartConfig: ChartConfig = {
    earnings: {
        label: "Earnings",
        color: "var(--chart-1)",
    },
    cost: {
        label: "Cost",
        color: "var(--chart-2)",
    },
};

export const IncomeChart = () => {
    const isMobile = useIsMobile();
    const [period, setPeriod] = useState<"week" | "month" | "year">("week");

    useEffect(() => {
        if (isMobile) {
            setPeriod("week");
        }
    }, [isMobile]);

    const filteredData = rawIncomeData.slice(period === "week" ? -7 : period === "month" ? -30 : -90);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-md border p-2">
                        <DollarSignIcon className="size-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <CardTitle>Hospital Income</CardTitle>
                        <CardDescription className="text-xs leading-none">Earnings vs Operating Cost</CardDescription>
                    </div>
                </div>
                <CardAction>
                    <div className="bg-muted/40 inline-flex rounded-md border p-0.5 text-xs">
                        {(["week", "month", "year"] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setPeriod(t)}
                                className={cn(
                                    "rounded-md px-2.5 py-1 font-medium capitalize transition-colors",
                                    period === t
                                        ? "bg-background text-foreground shadow-xs"
                                        : "text-muted-foreground hover:text-foreground",
                                )}>
                                {t}
                            </button>
                        ))}
                    </div>
                </CardAction>
            </CardHeader>

            <CardContent className="flex-1 px-3 pt-2 sm:px-4">
                <ChartContainer config={chartConfig} className="aspect-auto h-68">
                    <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-earnings)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-earnings)" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-cost)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-cost)" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={16}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            ticks={[0, 400, 800, 1200, 1600]}
                            tickFormatter={(val) => (val >= 1000 ? `$${val / 1000}k` : `$${val}`)}
                            domain={[0, 1600]}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="shadow-xs"
                                    labelFormatter={(value) =>
                                        new Date(value as string).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="earnings"
                            type="monotone"
                            fill="url(#fillEarnings)"
                            stroke="var(--color-earnings)"
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="cost"
                            type="monotone"
                            fill="url(#fillCost)"
                            stroke="var(--color-cost)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>

                <div className="text-muted-foreground mt-3 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="bg-chart-1 size-2.5 rounded-full" />
                        <span>Earnings</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-chart-2 size-2.5 rounded-full" />
                        <span>Cost</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
