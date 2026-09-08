import { CalendarDaysIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type AppointmentStatus = "in-consultation" | "in-progress" | "needs-followup" | "scheduled" | "waiting";

export type AppointmentItem = {
    id: string;
    patientNo: string;
    treatment: string;
    time: string;
    status: AppointmentStatus;
    statusLabel: string;
    assignee: {
        name: string;
        avatar?: string;
        initials: string;
    }[];
    location: string;
};

export type TimeGroup = {
    hour: string;
    items: AppointmentItem[];
};

const appointmentsData: TimeGroup[] = [
    {
        hour: "10 AM",
        items: [
            {
                id: "apt-1",
                patientNo: "#21",
                treatment: "Cardiology Consultation",
                time: "10:00 AM",
                status: "in-consultation",
                statusLabel: "In Consultation",
                assignee: [
                    {
                        name: "Dr. Alina Patel",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
                        initials: "AP",
                    },
                ],
                location: "Cardio Ward 302",
            },
            {
                id: "apt-2",
                patientNo: "#20",
                treatment: "MRI Brain Scanning",
                time: "10:30 AM",
                status: "in-progress",
                statusLabel: "In Progress",
                assignee: [
                    {
                        name: "Dr. Michael Smith",
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
                        initials: "MS",
                    },
                    {
                        name: "Dr. Sarah Connor",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
                        initials: "SC",
                    },
                    {
                        name: "Dr. Alex Ray",
                        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
                        initials: "AR",
                    },
                ],
                location: "Radiology Unit B",
            },
        ],
    },
    {
        hour: "11 AM",
        items: [
            {
                id: "apt-3",
                patientNo: "#19",
                treatment: "Orthopedic Follow-Up",
                time: "11:00 AM",
                status: "needs-followup",
                statusLabel: "Needs Follow Up",
                assignee: [
                    {
                        name: "Dr. Oliver Jackson",
                        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
                        initials: "OJ",
                    },
                ],
                location: "Ortho Clinic 105",
            },
            {
                id: "apt-4",
                patientNo: "#18",
                treatment: "Appendectomy Surgery",
                time: "11:15 AM",
                status: "scheduled",
                statusLabel: "Scheduled",
                assignee: [
                    {
                        name: "Dr. Benjamin Garcia",
                        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=60",
                        initials: "BG",
                    },
                ],
                location: "Operation Theater 3",
            },
            {
                id: "apt-5",
                patientNo: "#17",
                treatment: "Pediatric Health Check",
                time: "11:45 AM",
                status: "waiting",
                statusLabel: "Waiting",
                assignee: [
                    {
                        name: "Dr. Michael Smith",
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
                        initials: "MS",
                    },
                ],
                location: "Pediatrics OPD",
            },
        ],
    },
    {
        hour: "12 PM",
        items: [
            {
                id: "apt-6",
                patientNo: "#32",
                treatment: "Post-Op Wound Care",
                time: "12:00 PM",
                status: "in-consultation",
                statusLabel: "In Consultation",
                assignee: [
                    {
                        name: "Dr. Alina Patel",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
                        initials: "AP",
                    },
                ],
                location: "Recovery Room 4",
            },
            {
                id: "apt-7",
                patientNo: "#24",
                treatment: "Echocardiogram Screening",
                time: "12:30 PM",
                status: "in-progress",
                statusLabel: "In Progress",
                assignee: [
                    {
                        name: "Dr. Oliver Jackson",
                        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
                        initials: "OJ",
                    },
                    {
                        name: "Dr. Benjamin Garcia",
                        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=60",
                        initials: "BG",
                    },
                ],
                location: "Cardio Lab 2",
            },
        ],
    },
    {
        hour: "01 PM",
        items: [
            {
                id: "apt-8",
                patientNo: "#22",
                treatment: "Neurology Evaluation",
                time: "01:00 PM",
                status: "in-consultation",
                statusLabel: "In Consultation",
                assignee: [
                    {
                        name: "Dr. Alina Patel",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
                        initials: "AP",
                    },
                ],
                location: "Neuro Clinic 204",
            },
        ],
    },
];

const getStatusBadge = (status: AppointmentStatus, label: string) => {
    const config = {
        "in-consultation": { color: "text-amber-500", dot: "bg-amber-500" },
        "in-progress": { color: "text-purple-500", dot: "bg-purple-500" },
        "needs-followup": { color: "text-blue-500", dot: "bg-blue-500" },
        scheduled: {
            color: "text-yellow-600 dark:text-yellow-400",
            dot: "bg-yellow-500",
        },
        waiting: { color: "text-rose-500", dot: "bg-rose-500" },
    }[status];

    return (
        <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className={cn("size-2 rounded-full", config.dot)} />
            <span className={config.color}>{label}</span>
        </div>
    );
};

export const AppointmentsTable = () => {
    return (
        <Card className="pb-0">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-md border p-2">
                        <CalendarDaysIcon className="size-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <CardTitle>Today&apos;s Appointments</CardTitle>
                        <CardDescription className="text-xs leading-none">
                            Scheduled visits and consultations
                        </CardDescription>
                    </div>
                </div>
                <CardAction>
                    <Button variant="outline" size="sm" className="gap-1.5">
                        <CalendarDaysIcon className="text-muted-foreground size-3.5" />
                        Today
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent className="px-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border/60 bg-muted/40 hover:bg-muted/40">
                            <TableHead className="text-muted-foreground w-24 px-4 text-xs font-medium">
                                Time Block
                            </TableHead>
                            <TableHead className="text-muted-foreground text-xs font-medium">Treatment</TableHead>
                            <TableHead className="text-muted-foreground text-xs font-medium">Time</TableHead>
                            <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
                            <TableHead className="text-muted-foreground text-xs font-medium">Assigned Doctor</TableHead>
                            <TableHead className="text-muted-foreground text-xs font-medium">Location</TableHead>
                            <TableHead className="text-muted-foreground pr-4 text-right text-xs font-medium">
                                Patient ID
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointmentsData.map((group) =>
                            group.items.map((item, idx) => (
                                <TableRow key={item.id} className="hover:bg-muted/30">
                                    {idx === 0 ? (
                                        <TableCell
                                            rowSpan={group.items.length}
                                            className="border-border/50 border-r px-4 align-top text-sm font-medium">
                                            <div className="sticky top-2 pt-1">{group.hour}</div>
                                        </TableCell>
                                    ) : null}

                                    <TableCell className="text-xs font-medium">{item.treatment}</TableCell>

                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        {item.time}
                                    </TableCell>

                                    <TableCell>{getStatusBadge(item.status, item.statusLabel)}</TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.assignee.length === 1 ? (
                                                <>
                                                    <Avatar className="size-6">
                                                        {item.assignee[0].avatar && (
                                                            <AvatarImage
                                                                src={item.assignee[0].avatar}
                                                                alt={item.assignee[0].name}
                                                            />
                                                        )}
                                                        <AvatarFallback className="text-[10px]">
                                                            {item.assignee[0].initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-xs font-medium">{item.assignee[0].name}</span>
                                                </>
                                            ) : (
                                                <div className="flex items-center -space-x-1.5 overflow-visible">
                                                    {item.assignee.slice(0, 2).map((doctor, dIdx) => (
                                                        <Avatar
                                                            key={dIdx}
                                                            className="border-background ring-border/50 size-6 border ring-1">
                                                            {doctor.avatar && (
                                                                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                                            )}
                                                            <AvatarFallback className="text-[10px]">
                                                                {doctor.initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                    {item.assignee.length > 2 && (
                                                        <div className="border-background bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-full border text-[10px] font-medium">
                                                            +{item.assignee.length - 2}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-muted-foreground text-xs">{item.location}</TableCell>

                                    <TableCell className="pr-4 text-right">
                                        <span className="cursor-pointer font-mono text-xs font-medium hover:underline">
                                            {item.patientNo}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )),
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
