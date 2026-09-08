import { useEffect, useState } from "react";

import { UsersIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type PatientSummaryData = {
    date: string;
    child: number;
    adult: number;
    elderly: number;
};

const rawChartData: PatientSummaryData[] = Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    return {
        date: d.toISOString().slice(0, 10),
        child: Math.floor(Math.random() * 80) + 40,
        adult: Math.floor(Math.random() * 70) + 30,
        elderly: Math.floor(Math.random() * 25) + 5,
    };
});

const chartConfig: ChartConfig = {
    child: {
        label: "Child",
        color: "var(--chart-1)",
    },
    adult: {
        label: "Adult",
        color: "var(--chart-3)",
    },
    elderly: {
        label: "Elderly",
        color: "var(--chart-5)",
    },
};

export const PatientSummaryChart = () => {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState<string | null>("15d");

    useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = rawChartData.slice(timeRange === "7d" ? -7 : timeRange === "15d" ? -15 : -30);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-md border p-2">
                        <UsersIcon className="size-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <CardTitle>Patient Summary</CardTitle>
                        <CardDescription className="text-xs leading-none">
                            Admissions by age demographic
                        </CardDescription>
                    </div>
                </div>
                <CardAction>
                    <Select value={timeRange ?? "7d"} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="h-8 w-28 text-xs shadow-none"
                            size="sm"
                            aria-label="Select time range">
                            <SelectValue placeholder="Last 7 days" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md">
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="15d">Last 15 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>

            <CardContent className="flex-1 px-3 pt-2 sm:px-4">
                <ChartContainer config={chartConfig} className="aspect-auto h-68">
                    <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={3}>
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
                            ticks={[0, 40, 80, 120, 160]}
                            domain={[0, 160]}
                        />
                        <ChartTooltip
                            cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
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
                        <Bar
                            dataKey="child"
                            fill="var(--color-child)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={timeRange === "7d" ? 14 : timeRange === "15d" ? 10 : 8}
                        />
                        <Bar
                            dataKey="adult"
                            fill="var(--color-adult)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={timeRange === "7d" ? 14 : timeRange === "15d" ? 10 : 8}
                        />
                        <Bar
                            dataKey="elderly"
                            fill="var(--color-elderly)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={timeRange === "7d" ? 14 : timeRange === "15d" ? 10 : 8}
                        />
                    </BarChart>
                </ChartContainer>

                <div className="text-muted-foreground mt-3 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="bg-chart-1 size-2.5 rounded-full" />
                        <span>Child</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-chart-3 size-2.5 rounded-full" />
                        <span>Adult</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-chart-5 size-2.5 rounded-full" />
                        <span>Elderly</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
