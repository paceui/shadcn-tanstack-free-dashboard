import { MoreVerticalIcon, PieChartIcon } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PatientInsightSegment = {
    name: string;
    value: number;
    fill: string;
};

const insightsData: PatientInsightSegment[] = [
    { name: "Critical Care", value: 480, fill: "var(--chart-1)" },
    { name: "General Healthcare", value: 360, fill: "var(--chart-2)" },
    { name: "Internal Healthcare", value: 240, fill: "var(--chart-3)" },
    { name: "Additional Medical Services", value: 188, fill: "var(--chart-5)" },
];

export const PatientInsightsChart = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-md border p-2">
                        <PieChartIcon className="size-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <CardTitle>Patient Insights</CardTitle>
                        <CardDescription className="text-xs leading-none">Distribution by department</CardDescription>
                    </div>
                </div>
                <CardAction>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
                                    <MoreVerticalIcon className="size-4" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            }
                        />
                        <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem>View Report</DropdownMenuItem>
                            <DropdownMenuItem>Export Data</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardAction>
            </CardHeader>

            <CardContent>
                <div className="relative mx-auto flex h-59 w-full items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                wrapperClassName="shadow-none"
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0];
                                        return (
                                            <div className="bg-popover rounded-md border p-2 text-xs shadow-none">
                                                <p className="text-foreground font-medium">{data.name}</p>
                                                <p className="text-muted-foreground">{data.value} patients</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Pie
                                data={insightsData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={62}
                                outerRadius={84}
                                paddingAngle={3}
                                stroke="none"
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-muted-foreground text-xs font-medium">Overall</span>
                        <span className="mt-1 text-xl font-semibold sm:text-2xl">1,268</span>
                        <span className="text-muted-foreground mt-1 text-xs">This Week</span>
                    </div>
                </div>

                <div className="mt-4.5 space-y-3 text-xs">
                    {insightsData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="text-foreground font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
