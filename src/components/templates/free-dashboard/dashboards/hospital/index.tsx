import { FlaskConicalIcon, ReceiptTextIcon, StethoscopeIcon, UsersIcon } from "lucide-react";

import { PageTitle } from "../../layouts/page-title";
import { AppointmentsTable } from "./components/appointments-table";
import { IncomeChart } from "./components/income-chart";
import { PatientInsightsChart } from "./components/patient-insights-chart";
import { PatientSummaryChart } from "./components/patient-summary-chart";
import { StatCard, type StatCardProps } from "./components/stat-card";

const hospitalStats: StatCardProps[] = [
    {
        title: "Total Invoices",
        value: "1,287",
        trendValue: "+2.14%",
        direction: "up",
        icon: ReceiptTextIcon,
    },
    {
        title: "Total Patients",
        value: "965",
        trendValue: "+3.78%",
        direction: "up",
        icon: UsersIcon,
    },
    {
        title: "Lab Reports",
        value: "128",
        trendValue: "-1.56%",
        direction: "down",
        icon: FlaskConicalIcon,
    },
    {
        title: "Surgeries",
        value: "315",
        trendValue: "+1.64%",
        direction: "up",
        icon: StethoscopeIcon,
    },
];

export const HospitalDashboard = () => {
    return (
        <div className="space-y-4 sm:space-y-5">
            <PageTitle title="Hospital Analytics" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                {hospitalStats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-12">
                <div className="xl:col-span-7">
                    <PatientSummaryChart />
                </div>
                <div className="xl:col-span-5">
                    <IncomeChart />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-12">
                <div className="xl:col-span-8">
                    <AppointmentsTable />
                </div>
                <div className="xl:col-span-4">
                    <PatientInsightsChart />
                </div>
            </div>
        </div>
    );
};

export default HospitalDashboard;
