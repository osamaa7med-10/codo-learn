
"use client";

import { useMemo, useState } from "react";

type RecordItem = {
    status?: string;
    amount?: string | number;
};

type Props = {
    data?: Record<string, RecordItem[]>;
};

const sampleHistory = [
    { month: "May", students: 18, revenue: 1450 },
    { month: "Jun", students: 26, revenue: 2180 },
    { month: "Jul", students: 34, revenue: 2860 },
    { month: "Aug", students: 29, revenue: 2420 },
    { month: "Sep", students: 43, revenue: 3610 },
    { month: "Oct", students: 51, revenue: 4280 },
];

function Metric({
    title,
    value,
    detail,
    icon,
}: {
    title: string;
    value: string | number;
    detail: string;
    icon: string;
}) {
    return (
        <div className="rounded-2xl border border-[#ECECF5] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="mt-3 text-3xl font-bold text-[#20243A]">
                        {value}
                    </h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#869CFF]/15 text-xl text-[#586FD6]">
                    {icon}
                </span>
            </div>
            <p className="mt-3 text-xs text-gray-400">{detail}</p>
        </div>
    );
}

export default function AdminAnalytics({ data = {} }: Props) {
    const [period, setPeriod] = useState("6");

    const stats = useMemo(() => {
        const students = data.students ?? [];
        const instructors = data.instructors ?? [];
        const employees = data.employees ?? [];
        const courses = data.courses ?? [];
        const payments = data.payments ?? [];
        const enrollments = data.enrollments ?? [];
        const projects = data.projects ?? [];

        const paid = payments.filter(
            (item) => item.status?.toLowerCase() === "paid"
        );
        const pendingPayments = payments.filter(
            (item) => item.status?.toLowerCase() === "pending"
        );

        const revenue = paid.reduce((total, item) => {
            const amount =
                typeof item.amount === "number"
                    ? item.amount
                    : Number(String(item.amount ?? "").replace(/[^0-9.]/g, ""));

            return total + (Number.isFinite(amount) ? amount : 0);
        }, 0);

        const published = courses.filter(
            (item) => item.status?.toLowerCase() === "published"
        );

        const approvedEnrollments = enrollments.filter(
            (item) => item.status?.toLowerCase() === "approved"
        );

        const pendingEnrollments = enrollments.filter(
            (item) => item.status?.toLowerCase() === "pending"
        );

        return {
            students: students.length,
            instructors: instructors.length,
            employees: employees.length,
            courses: courses.length,
            published: published.length,
            revenue,
            paid: paid.length,
            pendingPayments: pendingPayments.length,
            approvedEnrollments: approvedEnrollments.length,
            pendingEnrollments: pendingEnrollments.length,
            projects: projects.length,
        };
    }, [data]);

    const history = useMemo(() => {
        if (period === "3") return sampleHistory.slice(-3);

        if (period === "12") {
            return [
                { month: "Jan", students: 12, revenue: 980 },
                { month: "Feb", students: 15, revenue: 1200 },
                { month: "Mar", students: 20, revenue: 1680 },
                { month: "Apr", students: 24, revenue: 1980 },
                ...sampleHistory,
            ];
        }

        return sampleHistory;
    }, [period]);

    const maxStudents = Math.max(
        ...history.map((item) => item.students),
        1
    );

    const maxRevenue = Math.max(
        ...history.map((item) => item.revenue),
        1
    );

    const money = (value: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);

    function exportCSV() {
        const rows = [
            ["Metric", "Value"],
            ["Students", stats.students],
            ["Instructors", stats.instructors],
            ["Employees", stats.employees],
            ["Total courses", stats.courses],
            ["Published courses", stats.published],
            ["Recorded revenue", stats.revenue],
            ["Paid payments", stats.paid],
            ["Pending payments", stats.pendingPayments],
            ["Approved enrollments", stats.approvedEnrollments],
            ["Pending enrollments", stats.pendingEnrollments],
            ["Projects", stats.projects],
        ];

        const csv = rows
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "codo-learn-analytics.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    const enrollmentTotal = Math.max(
        stats.approvedEnrollments + stats.pendingEnrollments,
        1
    );

    const paymentTotal = Math.max(
        stats.paid + stats.pendingPayments,
        1
    );

    const courseTotal = Math.max(stats.courses, 1);

    return (
        <div className="space-y-6">
            {/* Header */}
            <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#ECECF5] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                    <p className="text-sm font-semibold tracking-wider text-[#7D82C8]">
                        PERFORMANCE CENTER
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[#20243A]">
                        Analytics & Reports
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Monitor your academy performance from one place.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={period}
                        onChange={(event) => setPeriod(event.target.value)}
                        aria-label="Select report period"
                        className="rounded-xl border border-gray-200 bg-[#F8F8FC] px-3 py-3 text-sm outline-none focus:border-[#869CFF]"
                    >
                        <option value="3">Last 3 months</option>
                        <option value="6">Last 6 months</option>
                        <option value="12">This year</option>
                    </select>

                    <button
                        onClick={exportCSV}
                        className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        Export CSV
                    </button>
                </div>
            </section>

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <Metric
                    title="Total Students"
                    value={stats.students}
                    detail="Registered student records"
                    icon="♙"
                />
                <Metric
                    title="Instructors"
                    value={stats.instructors}
                    detail="Registered teaching team"
                    icon="♧"
                />
                <Metric
                    title="Employees"
                    value={stats.employees}
                    detail="Registered team members"
                    icon="♙"
                />
                <Metric
                    title="Published Courses"
                    value={`${stats.published} / ${stats.courses}`}
                    detail="Published out of all courses"
                    icon="▤"
                />
                <Metric
                    title="Recorded Revenue"
                    value={money(stats.revenue)}
                    detail="Payment records marked Paid"
                    icon="$"
                />
                <Metric
                    title="Pending Payments"
                    value={stats.pendingPayments}
                    detail="Payments awaiting completion"
                    icon="◷"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-6 xl:grid-cols-2">
                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6">
                    <h3 className="font-bold text-[#20243A]">
                        Student Registration Trend
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                        Sample monthly registration activity
                    </p>

                    <div className="mt-8 flex h-56 items-end gap-3 border-b border-l border-gray-100 px-2 sm:gap-5">
                        {history.map((item) => (
                            <div
                                key={item.month}
                                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                            >
                                <span className="text-xs font-semibold text-[#586FD6]">
                                    {item.students}
                                </span>
                                <div
                                    className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#869CFF] to-[#C7D0FF] transition-all duration-500"
                                    style={{
                                        height: `${Math.max(
                                            (item.students / maxStudents) * 75,
                                            5
                                        )}%`,
                                    }}
                                />
                                <span className="pb-2 text-xs text-gray-400">
                                    {item.month}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 text-xs text-gray-400">
                        Chart values are examples until dated registration data is connected.
                    </p>
                </section>

                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6">
                    <h3 className="font-bold text-[#20243A]">Revenue Trend</h3>
                    <p className="mt-1 text-sm text-gray-400">
                        Sample monthly revenue in USD
                    </p>

                    <div className="mt-8 flex h-56 items-end gap-3 border-b border-l border-gray-100 px-2 sm:gap-5">
                        {history.map((item) => (
                            <div
                                key={item.month}
                                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                            >
                                <span className="text-[10px] font-semibold text-[#9866B5] sm:text-xs">
                                    {money(item.revenue)}
                                </span>
                                <div
                                    className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#C184E5] to-[#E2A3FF] transition-all duration-500"
                                    style={{
                                        height: `${Math.max(
                                            (item.revenue / maxRevenue) * 75,
                                            5
                                        )}%`,
                                    }}
                                />
                                <span className="pb-2 text-xs text-gray-400">
                                    {item.month}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 text-xs text-gray-400">
                        This chart uses illustrative values, not actual payment history.
                    </p>
                </section>
            </div>

            {/* Status breakdown */}
            <div className="grid gap-6 xl:grid-cols-3">
                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5">
                    <h3 className="font-bold text-[#20243A]">Course Publishing</h3>
                    <p className="mt-1 text-sm text-gray-400">Current course records</p>

                    <div className="mt-6 flex justify-between text-sm">
                        <span className="text-gray-500">Published</span>
                        <strong>
                            {stats.published} / {stats.courses}
                        </strong>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full bg-[#869CFF] transition-all"
                            style={{
                                width: `${(stats.published / courseTotal) * 100}%`,
                            }}
                        />
                    </div>
                    <p className="mt-3 text-xs text-gray-400">
                        {stats.courses - stats.published} unpublished course(s).
                    </p>
                </section>

                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5">
                    <h3 className="font-bold text-[#20243A]">Enrollment Status</h3>
                    <p className="mt-1 text-sm text-gray-400">Current enrollment records</p>

                    <div className="mt-6 space-y-5">
                        {[
                            {
                                label: "Approved",
                                value: stats.approvedEnrollments,
                                color: "#68B8A8",
                            },
                            {
                                label: "Pending",
                                value: stats.pendingEnrollments,
                                color: "#E2A3FF",
                            },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-gray-500">{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${(item.value / enrollmentTotal) * 100}%`,
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5">
                    <h3 className="font-bold text-[#20243A]">Payment Status</h3>
                    <p className="mt-1 text-sm text-gray-400">Current payment records</p>

                    <div className="mt-6 space-y-5">
                        {[
                            {
                                label: "Paid",
                                value: stats.paid,
                                color: "#68B8A8",
                            },
                            {
                                label: "Pending",
                                value: stats.pendingPayments,
                                color: "#E7B85C",
                            },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-gray-500">{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${(item.value / paymentTotal) * 100}%`,
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Notice */}
            <section className="rounded-2xl border border-[#869CFF]/20 bg-[#869CFF]/5 p-5">
                <h3 className="font-bold text-[#20243A]">About these reports</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                    Summary cards use the records currently passed from the dashboard.
                    Monthly charts use demo data because historical registration and
                    payment dates are not connected yet. Exported CSV contains the
                    current summary, not the sample monthly chart history.
                </p>
            </section>
        </div>
    );
}
