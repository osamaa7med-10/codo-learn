"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Section =
    | "overview" | "students" | "instructors" | "employees" | "users"
    | "invitations" | "courses" | "services" | "projects" | "enrollments"
    | "payments" | "notifications" | "profile" | "settings";

type RecordItem = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
    linkedIn?: string;
    university?: string;
    educationLevel?: string;
    major?: string;
    learningTrack?: string;
    status?: string;
    role?: string;
    category?: string;
    position?: string;
    amount?: string;
    date?: string;
    description?: string;
    instructor?: string;
    image?: string;
};

const initialData: Record<string, RecordItem[]> = {
    students: [
        { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", status: "Active" },
        { id: 2, name: "Sara Ali", email: "sara@example.com", status: "Active" },
        { id: 3, name: "Omar Hassan", email: "omar@example.com", status: "Inactive" },
    ],
    instructors: [
        { id: 1, name: "Mohamed Khaled", email: "mohamed@example.com", status: "Active", category: "Frontend" },
        { id: 2, name: "Mariam Adel", email: "mariam@example.com", status: "Active", category: "UI/UX Design" },
    ],
    employees: [
        { id: 1, name: "Nour Ahmed", email: "nour@example.com", status: "Active", category: "HR", position: "HR" },
        { id: 2, name: "Youssef Samir", email: "youssef@example.com", status: "Active", category: "Marketing", position: "Marketing" },
    ],
    users: [
        { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", role: "Student", status: "Active" },
        { id: 2, name: "Mohamed Khaled", email: "mohamed@example.com", role: "Instructor", status: "Active" },
        { id: 3, name: "Admin Account", email: "admin@codolearn.com", role: "Admin", status: "Active" },
    ],
    invitations: [{ id: 1, name: "newadmin@example.com", category: "Administrator", status: "Pending", date: "2026-10-15" }],
    courses: [
        { id: 1, name: "Complete React.js Course", category: "Frontend", status: "Published", description: "Build modern React applications." },
        { id: 2, name: "UI/UX Design Fundamentals", category: "Design", status: "Draft", description: "Learn modern interface design." },
        { id: 3, name: "Node.js Backend Development", category: "Backend", status: "Published", description: "Build APIs with Node.js." },
    ],
    services: [
        { id: 1, name: "Web Development", category: "Digital Service", status: "Active" },
        { id: 2, name: "UI/UX Design", category: "Digital Service", status: "Active" },
        { id: 3, name: "Technical Consulting", category: "Digital Service", status: "Inactive" },
    ],
    projects: [
        { id: 1, name: "E-commerce Website", category: "Portfolio", status: "Published" },
        { id: 2, name: "Mobile Learning App", category: "Portfolio", status: "In Review" },
        { id: 3, name: "Company Website Request", category: "Project Request", status: "Pending" },
    ],
    enrollments: [
        { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", category: "Complete React.js Course", status: "Approved", date: "2026-10-12" },
        { id: 2, name: "Sara Ali", email: "sara@example.com", category: "UI/UX Design Fundamentals", status: "Pending", date: "2026-10-15" },
        { id: 3, name: "Omar Hassan", email: "omar@example.com", category: "Node.js Backend Development", status: "Approved", date: "2026-10-16" },
    ],
    payments: [
        { id: 1, name: "Ahmed Mohamed", category: "React.js Course", amount: "$120", status: "Paid", date: "2026-10-10" },
        { id: 2, name: "Sara Ali", category: "UI/UX Course", amount: "$90", status: "Pending", date: "2026-10-15" },
        { id: 3, name: "Omar Hassan", category: "Backend Course", amount: "$150", status: "Failed", date: "2026-10-16" },
    ],
    notifications: [
        { id: 1, name: "Welcome to Codo Learn", category: "Announcement", status: "Published", description: "Welcome message for new students." },
        { id: 2, name: "New Courses Available", category: "Announcement", status: "Draft", description: "Explore our latest courses." },
    ],
};

const navigation: { label: string; items: { id: Section; label: string; icon: string }[] }[] = [
    { label: "MAIN", items: [{ id: "overview", label: "Overview", icon: "▦" }] },
    {
        label: "PEOPLE", items: [
            { id: "students", label: "Students", icon: "♙" },
            { id: "instructors", label: "Instructors", icon: "♧" },
            { id: "employees", label: "Employees", icon: "♙" },
            { id: "users", label: "Users & Roles", icon: "♧" },
            { id: "invitations", label: "Admin Invitations", icon: "✉" },
        ]
    },
    {
        label: "ACADEMY", items: [
            { id: "courses", label: "Courses", icon: "▤" },
            { id: "services", label: "Services", icon: "◇" },
            { id: "projects", label: "Projects", icon: "▧" },
            { id: "enrollments", label: "Enrollments", icon: "☷" },
            { id: "payments", label: "Payments", icon: "$" },
            { id: "notifications", label: "Notifications", icon: "♧" },
        ]
    },
    {
        label: "ACCOUNT", items: [
            { id: "profile", label: "My Profile", icon: "♙" },
            { id: "settings", label: "Settings", icon: "⚙" },
        ]
    },
];

const sectionTitles: Record<Section, string> = {
    overview: "Admin Overview", students: "Students Management",
    instructors: "Instructors Management", employees: "Employees Management",
    users: "Users & Roles", invitations: "Admin Invitations",
    courses: "Courses Management", services: "Services Management",
    projects: "Projects Management", enrollments: "Enrollments Management",
    payments: "Payments Management", notifications: "Notifications Management",
    profile: "My Profile", settings: "Settings",
};

const sectionDescriptions: Record<Section, string> = {
    overview: "Monitor your academy performance and activity.",
    students: "View, search and manage student records.",
    instructors: "Manage your academy instructors.",
    employees: "View and manage employee records.",
    users: "Review accounts and their assigned roles.",
    invitations: "Invite new administrators to your team.",
    courses: "Create and manage your academy courses.",
    services: "Manage the digital services offered by your academy.",
    projects: "Manage portfolio projects and project requests.",
    enrollments: "Review and manage student enrollments.",
    payments: "Track payment records and payment statuses.",
    notifications: "Create and manage system announcements.",
    profile: "Manage your personal administrator information.",
    settings: "Manage your dashboard preferences.",
};

function StatusBadge({ status }: { status?: string }) {
    const value = status || "Unknown";
    const style = ["Active", "Published", "Approved", "Paid"].includes(value)
        ? "bg-emerald-50 text-emerald-700"
        : ["Pending", "Draft", "In Review"].includes(value)
            ? "bg-amber-50 text-amber-700"
            : ["Inactive", "Failed", "Rejected", "Unpublished"].includes(value)
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600";
    return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>{value}</span>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6 ${className}`}>{children}</div>;
}

const inputClass = "w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none transition focus:border-[#869CFF]";

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState(initialData);
    const [notice, setNotice] = useState("");

    const [studentName, setStudentName] = useState("Admin User");
    const [email, setEmail] = useState("admin@codolearn.com");
    const [phone, setPhone] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    // Advanced student registration form state
    const [newStudentName, setNewStudentName] = useState("");
    const [newStudentEmail, setNewStudentEmail] = useState("");
    const [newStudentPhone, setNewStudentPhone] = useState("");
    const [newStudentCountry, setNewStudentCountry] = useState("Egypt");
    const [newStudentCity, setNewStudentCity] = useState("");
    const [newStudentLinkedIn, setNewStudentLinkedIn] = useState("");
    const [newStudentUniversity, setNewStudentUniversity] = useState("");
    const [newStudentEducation, setNewStudentEducation] = useState("Undergraduate");
    const [newStudentMajor, setNewStudentMajor] = useState("");
    const [newStudentTrack, setNewStudentTrack] = useState("Web Development");
    const [newStudentStatus, setNewStudentStatus] = useState("Active");

    const [instructorName, setInstructorName] = useState("");
    const [instructorEmail, setInstructorEmail] = useState("");
    const [instructorPhone, setInstructorPhone] = useState("");
    const [instructorSpecialty, setInstructorSpecialty] = useState("Frontend");
    const [instructorImage, setInstructorImage] = useState("");
    const [instructorStatus, setInstructorStatus] = useState("Active");

    // New employee form state
    const [newEmployeeName, setNewEmployeeName] = useState("");
    const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
    const [newEmployeePhone, setNewEmployeePhone] = useState("");
    const [newEmployeePosition, setNewEmployeePosition] = useState("HR");
    const [newEmployeeStatus, setNewEmployeeStatus] = useState("Active");

    const [courseName, setCourseName] = useState("");
    const [courseCategory, setCourseCategory] = useState("Frontend");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseImage, setCourseImage] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const [invitationEmail, setInvitationEmail] = useState("");
    const [settingsSearch, setSettingsSearch] = useState("");
    const [settingsTab, setSettingsTab] = useState<"general" | "notifications" | "appearance" | "security" | "system">("general");
    const [settings, setSettings] = useState({
        emailNotifications: true,
        enrollmentAlerts: true,
        paymentAlerts: true,
        courseAlerts: true,
        projectAlerts: false,
        weeklyReports: true,
        twoFactorEnabled: false,
    });
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [platformName, setPlatformName] = useState("Codo Learn");
    const [supportEmail, setSupportEmail] = useState("support@codolearn.com");
    const [language, setLanguage] = useState("English");
    const [timezone, setTimezone] = useState("Africa/Cairo");
    const [compactMode, setCompactMode] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState("30");
    const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

    const currentRows = data[activeSection] || [];
    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return currentRows;
        return currentRows.filter(item =>
            Object.values(item).some(value => String(value ?? "").toLowerCase().includes(query))
        );
    }, [currentRows, search]);

    const addRecord = (section: string, record: Omit<RecordItem, "id">) => {
        setData(previous => ({
            ...previous,
            [section]: [...previous[section], {
                ...record, id: Math.max(0, ...previous[section].map(item => item.id)) + 1,
            }],
        }));
    };

    const updateRecord = (section: string, id: number, updates: Partial<RecordItem>) => {
        setData(previous => ({
            ...previous,
            [section]: previous[section].map(item => item.id === id ? { ...item, ...updates } : item),
        }));
    };

    const deleteRecord = (section: string, id: number) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        setData(previous => ({ ...previous, [section]: previous[section].filter(item => item.id !== id) }));
        setNotice("Record deleted from this demo.");
    };

    const handleAddStudent = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = newStudentName.trim();
        const normalizedEmail = newStudentEmail.trim().toLowerCase();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !name || !normalizedEmail || !newStudentPhone.trim() ||
            !newStudentCity.trim() || !newStudentUniversity.trim() ||
            !newStudentMajor.trim()
        ) {
            setNotice("Please complete all required student information.");
            return;
        }

        if (!emailPattern.test(normalizedEmail)) {
            setNotice("Please enter a valid email address.");
            return;
        }

        if (newStudentLinkedIn.trim() && !/^https?:\/\//i.test(newStudentLinkedIn.trim())) {
            setNotice("Please enter a valid LinkedIn URL starting with http:// or https://.");
            return;
        }

        if (data.students.some(item => item.email?.trim().toLowerCase() === normalizedEmail)) {
            setNotice("A student with this email already exists.");
            return;
        }

        addRecord("students", {
            name,
            email: normalizedEmail,
            phone: newStudentPhone.trim(),
            country: newStudentCountry,
            city: newStudentCity.trim(),
            linkedIn: newStudentLinkedIn.trim(),
            university: newStudentUniversity.trim(),
            educationLevel: newStudentEducation,
            major: newStudentMajor.trim(),
            learningTrack: newStudentTrack,
            status: newStudentStatus,
            role: "Student",
        });

        setNewStudentName("");
        setNewStudentEmail("");
        setNewStudentPhone("");
        setNewStudentCountry("Egypt");
        setNewStudentCity("");
        setNewStudentLinkedIn("");
        setNewStudentUniversity("");
        setNewStudentEducation("Undergraduate");
        setNewStudentMajor("");
        setNewStudentTrack("Web Development");
        setNewStudentStatus("Active");
        setNotice("Student added successfully!");
    };

    const handleAddInstructor = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = instructorName.trim();
        const normalizedEmail = instructorEmail.trim().toLowerCase();
        if (!name || !normalizedEmail) {
            setNotice("Please enter the instructor's name and email.");
            return;
        }
        if (data.instructors.some(item => item.email?.trim().toLowerCase() === normalizedEmail)) {
            setNotice("An instructor with this email already exists.");
            return;
        }
        addRecord("instructors", {
            name, email: normalizedEmail, phone: instructorPhone.trim(),
            category: instructorSpecialty, status: instructorStatus, role: "Instructor", image: instructorImage,
        });
        setInstructorName(""); setInstructorEmail(""); setInstructorPhone("");
        setInstructorSpecialty("Frontend"); setInstructorImage(""); setInstructorStatus("Active");
        setNotice("Instructor added successfully!");
    };

    const handleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = newEmployeeName.trim();
        const normalizedEmail = newEmployeeEmail.trim().toLowerCase();
        const position = newEmployeePosition.trim();
        if (!name || !normalizedEmail || !position) {
            setNotice("Please enter the employee's name, email, and job position.");
            return;
        }
        if (data.employees.some(item => item.email?.trim().toLowerCase() === normalizedEmail)) {
            setNotice("An employee with this email already exists.");
            return;
        }
        addRecord("employees", {
            name, email: normalizedEmail, phone: newEmployeePhone.trim(),
            category: position, position, status: newEmployeeStatus, role: "Employee",
        });
        setNewEmployeeName(""); setNewEmployeeEmail(""); setNewEmployeePhone("");
        setNewEmployeePosition("HR"); setNewEmployeeStatus("Active");
        setNotice("Employee added successfully!");
    };

    const handleAddCourse = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!courseName.trim() || !courseDescription.trim()) {
            setNotice("Please enter a course name and description.");
            return;
        }
        addRecord("courses", {
            name: courseName.trim(), category: courseCategory, status: "Draft",
            description: courseDescription.trim(), instructor: courseInstructor.trim() || "Not assigned",
            amount: coursePrice ? `$${coursePrice}` : "Free", image: courseImage,
        });
        setCourseName(""); setCourseCategory("Frontend"); setCourseDescription("");
        setCourseInstructor(""); setCoursePrice(""); setCourseImage("");
        setNotice("Course created successfully as a draft.");
    };

    const handleInviteAdmin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!invitationEmail.trim()) return;
        addRecord("invitations", { name: invitationEmail.trim(), category: "Administrator", status: "Pending", date: new Date().toISOString().slice(0, 10) });
        setInvitationEmail(""); setNotice("Demo invitation added to the list.");
    };

    const handleAnnouncement = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!announcement.trim()) return;
        addRecord("notifications", { name: announcement.trim(), category: "Announcement", status: "Published", description: "Created from Admin Dashboard." });
        setAnnouncement(""); setNotice("Announcement added to the demo list.");
    };

    const selectSection = (section: Section) => {
        setActiveSection(section); setSearch(""); setNotice(""); setSidebarOpen(false);
    };
    const totalRecords = (key: string) => data[key]?.length || 0;
    const pageTitle = sectionTitles[activeSection];
    const isPeopleSection = ["students", "instructors", "employees", "users", "invitations", "courses", "services", "projects", "enrollments", "payments", "notifications"].includes(activeSection);
    const searchPlaceholder = activeSection === "payments" ? "Search payments..." : `Search ${pageTitle.toLowerCase()}...`;

    function saveSettings(): void {
        setNotice("Settings saved for this demo.");
    }

    return (
        <div className="min-h-screen bg-[#F8F8FC] text-[#25243A]">
            {sidebarOpen && <button aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" />}
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-[78px] items-center gap-3 border-b border-[#ECECF5] px-6">
                    <div className="min-w-0 flex-1">
                        <Link href="/" aria-label="Go to Codo Learn Home Page" className="block rounded-lg transition-opacity hover:opacity-80">
                            <Image
                                src="/logoooo-removebg-preview.png"
                                alt="Codo Learn Logo"
                                width={145}
                                height={48}
                                priority
                                className="h-auto w-full max-w-[160px] object-contain"
                            />
                        </Link>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="ml-auto text-xl text-gray-400 lg:hidden" aria-label="Close navigation">×</button>
                </div>
                <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
                    {navigation.map(group => (
                        <div key={group.label}>
                            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-gray-400">{group.label}</p>
                            <div className="space-y-1">
                                {group.items.map(item => {
                                    const active = activeSection === item.id;
                                    return <button key={item.id} onClick={() => selectSection(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active ? "bg-gradient-to-r from-[#869CFF]/20 to-[#E2A3FF]/20 text-[#586FD6]" : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"}`}>
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-lg shadow-sm">{item.icon}</span>
                                        <span className="flex-1">{item.label}</span>
                                        {active && <span className="h-2 w-2 rounded-full bg-[#869CFF]" />}
                                    </button>;
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
                <div className="border-t border-[#ECECF5] p-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#F8F8FC] p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                            {profilePhoto ? <img src={profilePhoto} alt="Admin" className="h-full w-full object-cover" /> : studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{studentName}</p><p className="text-xs text-gray-500">Administrator</p></div>
                    </div>
                </div>
            </aside>

            <main className="min-h-screen lg:pl-[270px]">
                <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-[#ECECF5] bg-white/90 px-4 backdrop-blur-xl sm:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-gray-200 px-3 py-2 text-lg lg:hidden" aria-label="Open navigation">☰</button>
                        <div className="min-w-0"><p className="truncate text-sm font-bold sm:text-base">{pageTitle}</p><p className="hidden text-xs text-gray-400 sm:block">Codo Learn / {pageTitle}</p></div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-5">
                        <button onClick={() => selectSection("notifications")} className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-lg transition hover:bg-[#F8F8FC]" aria-label="Notifications">♧<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E2A3FF]" /></button>
                        <button onClick={() => selectSection("profile")} className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">{profilePhoto ? <img src={profilePhoto} alt="Admin" className="h-full w-full object-cover" /> : studentName.charAt(0).toUpperCase()}</div>
                            <div className="hidden text-left sm:block"><p className="text-sm font-bold">{studentName}</p><p className="text-xs text-gray-400">Admin</p></div>
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-[1600px] p-4 sm:p-8">
                    <div className="mb-7">
                        <p className="mb-2 text-sm font-semibold text-[#7D82C8]">Welcome back, {studentName} </p>
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{pageTitle}</h2>
                        <p className="mt-2 text-sm text-gray-500">{sectionDescriptions[activeSection]}</p>
                    </div>
                    {notice && <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[#869CFF]/20 bg-[#869CFF]/10 p-4 text-sm text-[#455BC1]"><span>{notice}</span><button onClick={() => setNotice("")} className="font-bold" aria-label="Dismiss message">×</button></div>}

                    {activeSection === "overview" && <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {[
                                { label: "Total Students", value: totalRecords("students"), icon: "♙", color: "#869CFF", note: "Registered students" },
                                { label: "Instructors", value: totalRecords("instructors"), icon: "♧", color: "#C184E5", note: "Teaching team" },
                                { label: "Employees", value: totalRecords("employees"), icon: "♙", color: "#68B8A8", note: "Academy employees" },
                                { label: "Courses", value: totalRecords("courses"), icon: "▤", color: "#E2A3FF", note: "All course records" },
                                { label: "Payments", value: totalRecords("payments"), icon: "$", color: "#E7B85C", note: "Payment records" },
                                { label: "Projects", value: totalRecords("projects"), icon: "▧", color: "#7D9DBD", note: "Projects and requests" },
                            ].map(stat => <button key={stat.label} onClick={() => {
                                const destinations: Record<string, Section> = { "Total Students": "students", Instructors: "instructors", Employees: "employees", Courses: "courses", Payments: "payments", Projects: "projects" };
                                selectSection(destinations[stat.label]);
                            }} className="rounded-2xl border border-[#ECECF5] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex items-start justify-between"><div><p className="text-sm font-medium text-gray-500">{stat.label}</p><p className="mt-3 text-3xl font-extrabold">{stat.value}</p></div><span className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold" style={{ backgroundColor: `${stat.color}25`, color: stat.color }}>{stat.icon}</span></div>
                                <p className="mt-4 text-xs text-gray-400">{stat.note}</p>
                            </button>)}
                        </div>
                        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                            <Panel>
                                <div className="mb-5 flex items-center justify-between gap-3"><div><h3 className="font-bold">Recent Enrollments</h3><p className="mt-1 text-sm text-gray-400">Latest student registrations</p></div><button onClick={() => selectSection("enrollments")} className="text-sm font-bold text-[#586FD6] hover:underline">View all</button></div>
                                <div className="space-y-4">{data.enrollments.slice(0, 4).map(item => <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">{item.name.charAt(0)}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.name}</p><p className="truncate text-xs text-gray-400">{item.category}</p></div><StatusBadge status={item.status} /></div>)}</div>
                            </Panel>
                            <Panel><h3 className="font-bold">Academy Snapshot</h3><p className="mb-5 mt-1 text-sm text-gray-400">Current demo records</p><div className="space-y-5">
                                {[
                                    { label: "Published Courses", count: data.courses.filter(item => item.status === "Published").length, total: Math.max(data.courses.length, 1), color: "#869CFF" },
                                    { label: "Paid Transactions", count: data.payments.filter(item => item.status === "Paid").length, total: Math.max(data.payments.length, 1), color: "#68B8A8" },
                                    { label: "Pending Enrollments", count: data.enrollments.filter(item => item.status === "Pending").length, total: Math.max(data.enrollments.length, 1), color: "#E2A3FF" },
                                ].map(item => <div key={item.label}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="text-gray-500">{item.label}</span><span className="font-bold">{item.count}</span></div><div className="h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full" style={{ width: `${item.count / item.total * 100}%`, backgroundColor: item.color }} /></div></div>)}
                            </div></Panel>
                        </div>
                    </div>}

                    {isPeopleSection && <div className="space-y-6">
                        {activeSection === "students" && (
                            <Panel className="!p-0 overflow-hidden">
                                {/* Student form header */}
                                <div className="relative overflow-hidden border-b border-[#ECECF5] bg-gradient-to-r from-[#869CFF]/10 to-[#E2A3FF]/10 p-6 sm:p-8">
                                    <div className="relative z-10">
                                        <p className="text-xs font-bold tracking-[0.2em] text-[#7587E8]">STUDENT MANAGEMENT</p>
                                        <h3 className="mt-2 text-2xl font-extrabold text-[#20243A] sm:text-3xl">Add New Student</h3>
                                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                            Create a complete academic profile and register a new student in the Codo Learn learning platform.
                                        </p>
                                    </div>
                                    <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#869CFF]/10 blur-2xl" />
                                </div>

                                <form onSubmit={handleAddStudent} className="space-y-8 p-5 sm:p-8">
                                    <p className="text-xs text-gray-400">Fields marked with <span className="text-rose-500">*</span> are required.</p>

                                    {/* Personal information */}
                                    <section>
                                        <div className="mb-5 flex items-center gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">01</span>
                                            <div>
                                                <h4 className="font-bold text-[#20243A]">Personal Information</h4>
                                                <p className="text-xs text-gray-400">Student's basic contact details.</p>
                                            </div>
                                        </div>
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Full Name *</label>
                                                <input required value={newStudentName} onChange={e => setNewStudentName(e.target.value)} placeholder="Enter student's full name" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address *</label>
                                                <input required type="email" autoComplete="off" value={newStudentEmail} onChange={e => setNewStudentEmail(e.target.value)} placeholder="student@example.com" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Phone Number *</label>
                                                <input required type="tel" value={newStudentPhone} onChange={e => setNewStudentPhone(e.target.value)} placeholder="+20 100 000 0000" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Country *</label>
                                                <select value={newStudentCountry} onChange={e => setNewStudentCountry(e.target.value)} className={inputClass}>
                                                    <option value="Egypt">Egypt</option>
                                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                                    <option value="UAE">United Arab Emirates</option>
                                                    <option value="Kuwait">Kuwait</option>
                                                    <option value="Jordan">Jordan</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">City *</label>
                                                <input required value={newStudentCity} onChange={e => setNewStudentCity(e.target.value)} placeholder="Enter city" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">LinkedIn Profile</label>
                                                <input type="url" value={newStudentLinkedIn} onChange={e => setNewStudentLinkedIn(e.target.value)} placeholder="https://linkedin.com/in/username" className={inputClass} />
                                            </div>
                                        </div>
                                    </section>

                                    <div className="border-t border-gray-100" />

                                    {/* Academic information */}
                                    <section>
                                        <div className="mb-5 flex items-center gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9864C5]">02</span>
                                            <div>
                                                <h4 className="font-bold text-[#20243A]">Academic Information</h4>
                                                <p className="text-xs text-gray-400">Education background and learning preferences.</p>
                                            </div>
                                        </div>
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">University *</label>
                                                <input required value={newStudentUniversity} onChange={e => setNewStudentUniversity(e.target.value)} placeholder="Enter university name" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Education Level *</label>
                                                <select value={newStudentEducation} onChange={e => setNewStudentEducation(e.target.value)} className={inputClass}>
                                                    <option value="High School">High School</option>
                                                    <option value="Undergraduate">Undergraduate</option>
                                                    <option value="Graduate">Graduate</option>
                                                    <option value="Postgraduate">Postgraduate</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Major / Department *</label>
                                                <input required value={newStudentMajor} onChange={e => setNewStudentMajor(e.target.value)} placeholder="e.g. Computer Science" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Learning Track *</label>
                                                <select value={newStudentTrack} onChange={e => setNewStudentTrack(e.target.value)} className={inputClass}>
                                                    <option value="Web Development">Web Development</option>
                                                    <option value="Mobile Development">Mobile Development</option>
                                                    <option value="UI/UX Design">UI/UX Design</option>
                                                    <option value="Data Science">Data Science</option>
                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                    <option value="Cybersecurity">Cybersecurity</option>
                                                    <option value="Digital Marketing">Digital Marketing</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="border-t border-gray-100" />

                                    {/* Account settings */}
                                    <section>
                                        <div className="mb-5 flex items-center gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">03</span>
                                            <div>
                                                <h4 className="font-bold text-[#20243A]">Account Settings</h4>
                                                <p className="text-xs text-gray-400">Configure the student's account status.</p>
                                            </div>
                                        </div>
                                        <div className="max-w-md">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">Account Status</label>
                                            <select value={newStudentStatus} onChange={e => setNewStudentStatus(e.target.value)} className={inputClass}>
                                                <option value="Active">Active</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </section>

                                    <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                                        <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-7 py-3.5 font-bold text-white shadow-md shadow-[#869CFF]/20 transition hover:-translate-y-0.5 hover:shadow-lg">+ Add Student</button>
                                        <button type="button" onClick={() => {
                                            setNewStudentName("");
                                            setNewStudentEmail("");
                                            setNewStudentPhone("");
                                            setNewStudentCountry("Egypt");
                                            setNewStudentCity("");
                                            setNewStudentLinkedIn("");
                                            setNewStudentUniversity("");
                                            setNewStudentEducation("Undergraduate");
                                            setNewStudentMajor("");
                                            setNewStudentTrack("Web Development");
                                            setNewStudentStatus("Active");
                                            setNotice("");
                                        }} className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50">Clear Form</button>
                                    </div>
                                </form>
                            </Panel>
                        )}

                        {activeSection === "instructors" && <Panel>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold text-[#869CFF]">TEAM MANAGEMENT</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Add New Instructor</h2><p className="mt-2 text-sm text-gray-500">Add an instructor to your Codo Learn team.</p></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2A3FF]/20 text-2xl text-[#869CFF]">+</div></div>
                            <form onSubmit={handleAddInstructor} className="space-y-5"><div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div><label className="mb-2 block text-sm font-medium text-gray-700">Full Name *</label><input required value={instructorName} onChange={e => setInstructorName(e.target.value)} placeholder="Enter instructor name" className={inputClass} /></div>
                                <div><label className="mb-2 block text-sm font-medium text-gray-700">Email Address *</label><input required type="email" value={instructorEmail} onChange={e => setInstructorEmail(e.target.value)} placeholder="instructor@example.com" className={inputClass} /></div>
                                <div><label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" value={instructorPhone} onChange={e => setInstructorPhone(e.target.value)} placeholder="Enter phone number" className={inputClass} /></div>
                                <div><label className="mb-2 block text-sm font-medium text-gray-700">Specialization *</label><select required value={instructorSpecialty} onChange={e => setInstructorSpecialty(e.target.value)} className={inputClass}><option value="Frontend">Frontend Development</option><option value="Backend">Backend Development</option><option value="Full Stack">Full Stack Development</option><option value="UI/UX">UI/UX Design</option><option value="Mobile">Mobile Development</option><option value="AI">Artificial Intelligence</option><option value="Data Science">Data Science</option><option value="Cybersecurity">Cybersecurity</option></select></div>
                                <div><label className="mb-2 block text-sm font-medium text-gray-700">Account Status</label><select value={instructorStatus} onChange={e => setInstructorStatus(e.target.value)} className={inputClass}><option value="Active">Active</option><option value="Pending">Pending</option></select></div>
                                <div><label className="mb-2 block text-sm font-medium text-gray-700">Profile Image</label><input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { setNotice("Image must be smaller than 5 MB."); e.target.value = ""; return; } const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === "string") setInstructorImage(reader.result); }; reader.readAsDataURL(file); }} className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-3 py-2.5 text-sm" /></div>
                            </div>
                                {instructorImage && <div className="flex items-center gap-4"><img src={instructorImage} alt="Instructor preview" className="h-16 w-16 rounded-2xl border border-gray-200 object-cover" /><button type="button" onClick={() => setInstructorImage("")} className="text-sm font-medium text-red-500 hover:text-red-600">Remove image</button></div>}
                                <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5"><button type="submit" className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90">+ Add Instructor</button><button type="button" onClick={() => { setInstructorName(""); setInstructorEmail(""); setInstructorPhone(""); setInstructorSpecialty("Frontend"); setInstructorImage(""); setInstructorStatus("Active"); }} className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50">Clear Form</button></div>
                            </form>
                        </Panel>}

                        {/* EMPLOYEE FORM */}
                        {activeSection === "employees" && <Panel>
                            <div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-[#869CFF]">TEAM MANAGEMENT</p><h3 className="mt-1 text-xl font-bold text-[#20243A]">Add New Employee</h3><p className="mt-2 text-sm text-gray-500">Add an employee to your Codo Learn team.</p></div><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E2A3FF]/20 text-2xl font-bold text-[#586FD6]">+</div></div>
                            <form onSubmit={handleAddEmployee} className="space-y-5"><div className="grid gap-5 md:grid-cols-2">
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Full Name *</label><input required value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)} placeholder="Enter employee's full name" className={inputClass} /></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Email Address *</label><input required type="email" value={newEmployeeEmail} onChange={e => setNewEmployeeEmail(e.target.value)} placeholder="employee@example.com" className={inputClass} /></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Phone Number</label><input type="tel" value={newEmployeePhone} onChange={e => setNewEmployeePhone(e.target.value)} placeholder="Enter phone number" className={inputClass} /></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Job Position *</label><select required value={newEmployeePosition} onChange={e => setNewEmployeePosition(e.target.value)} className={inputClass}>
                                    <option value="HR">Human Resources (HR)</option><option value="Marketing">Marketing</option><option value="Accountant">Accountant</option><option value="Sales">Sales</option><option value="Customer Support">Customer Support</option><option value="Content Creator">Content Creator</option><option value="Graphic Designer">Graphic Designer</option><option value="Software Developer">Software Developer</option><option value="Other">Other</option>
                                </select></div>
                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">Account Status</label><select value={newEmployeeStatus} onChange={e => setNewEmployeeStatus(e.target.value)} className={inputClass}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                            </div><div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5"><button type="submit" className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90">+ Add Employee</button><button type="button" onClick={() => { setNewEmployeeName(""); setNewEmployeeEmail(""); setNewEmployeePhone(""); setNewEmployeePosition("HR"); setNewEmployeeStatus("Active"); }} className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50">Clear Form</button></div></form>
                        </Panel>}

                        {activeSection === "courses" && <Panel><h3 className="mb-4 font-bold">Create a Course</h3><form onSubmit={handleAddCourse} className="grid gap-3 md:grid-cols-[1fr_200px_auto]"><input value={courseName} onChange={e => setCourseName(e.target.value)} required placeholder="Course name" className={inputClass} /><select value={courseCategory} onChange={e => setCourseCategory(e.target.value)} className={inputClass}><option>Frontend</option><option>Backend</option><option>Mobile Development</option><option>Design</option><option>Data Science</option><option>Other</option></select><button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]">+ Add Course</button></form><p className="mt-3 text-xs text-gray-400">This demo form needs a course description to create a record; you can add it to the form if needed.</p></Panel>}

                        {activeSection === "invitations" && <Panel><h3 className="mb-4 font-bold">Invite an Administrator</h3><form onSubmit={handleInviteAdmin} className="flex flex-col gap-3 sm:flex-row"><input type="email" required value={invitationEmail} onChange={e => setInvitationEmail(e.target.value)} placeholder="Enter administrator email" className={`min-w-0 flex-1 ${inputClass}`} /><button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">+ Create Invitation</button></form><p className="mt-3 text-xs text-gray-400">Demo only: this adds a pending invitation record. No email is sent.</p></Panel>}

                        {activeSection === "notifications" && <Panel><h3 className="mb-4 font-bold">Create Announcement</h3><form onSubmit={handleAnnouncement} className="flex flex-col gap-3 sm:flex-row"><input required value={announcement} onChange={e => setAnnouncement(e.target.value)} placeholder="Announcement title or message" className={`min-w-0 flex-1 ${inputClass}`} /><button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">+ Publish</button></form></Panel>}

                        <Panel className="!p-0">
                            <div className="flex flex-col gap-4 border-b border-[#ECECF5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h3 className="font-bold">{pageTitle}</h3><p className="mt-1 text-sm text-gray-400">{filteredRows.length} record{filteredRows.length === 1 ? "" : "s"} found</p></div><div className="relative w-full sm:max-w-xs"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder={searchPlaceholder} className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-[#869CFF]" /></div></div>
                            <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#F8F8FC] text-xs uppercase tracking-wide text-gray-400"><tr><th className="px-6 py-4">Name / Record</th><th className="px-6 py-4">Details</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Date / Amount</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                                <tbody className="divide-y divide-gray-100">{filteredRows.map(item => <tr key={item.id} className="transition hover:bg-[#FAFAFE]">
                                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 font-bold text-[#586FD6]">{item.name.charAt(0).toUpperCase()}</div><div><p className="font-bold text-[#25243A]">{item.name}</p>{item.email && <p className="mt-1 text-xs text-gray-400">{item.email}</p>}</div></div></td>
                                    <td className="max-w-[260px] px-6 py-4 text-gray-500">{activeSection === "users" ? <select value={item.role || "Student"} onChange={e => { updateRecord("users", item.id, { role: e.target.value }); setNotice("User role updated in this demo."); }} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#869CFF]"><option>Student</option><option>Instructor</option><option>Employee</option><option>Admin</option></select> : <div><p>{activeSection === "employees" ? (item.position || item.category || "—") : (item.category || item.role || "—")}</p>{item.phone && <p className="mt-1 text-xs text-gray-400">{item.phone}</p>}{item.description && <p className="mt-1 truncate text-xs text-gray-400">{item.description}</p>}</div>}</td>
                                    <td className="px-6 py-4"><StatusBadge status={item.status} /></td><td className="px-6 py-4 text-gray-500">{item.amount || item.date || "—"}</td>
                                    <td className="px-6 py-4"><div className="flex items-center justify-end gap-2">
                                        {activeSection === "courses" && <button onClick={() => { const next = item.status === "Published" ? "Unpublished" : "Published"; updateRecord("courses", item.id, { status: next }); setNotice(`Course status changed to ${next}.`); }} className="rounded-lg border border-[#869CFF]/30 px-3 py-2 text-xs font-semibold text-[#586FD6] hover:bg-[#869CFF]/10">{item.status === "Published" ? "Unpublish" : "Publish"}</button>}
                                        {activeSection === "enrollments" && item.status === "Pending" && <button onClick={() => { updateRecord("enrollments", item.id, { status: "Approved" }); setNotice("Enrollment approved in this demo."); }} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">Approve</button>}
                                        {(activeSection === "services" || activeSection === "projects") && <button onClick={() => { const next = item.status === "Active" || item.status === "Published" ? "Inactive" : "Published"; updateRecord(activeSection, item.id, { status: next }); setNotice("Record status updated in this demo."); }} className="rounded-lg border border-[#869CFF]/30 px-3 py-2 text-xs font-semibold text-[#586FD6] hover:bg-[#869CFF]/10">Change Status</button>}
                                        <button onClick={() => deleteRecord(activeSection, item.id)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50">Delete</button>
                                    </div></td>
                                </tr>)}
                                    {filteredRows.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#869CFF]/10 text-xl text-[#586FD6]">⌕</div><p className="font-semibold">No records found</p><p className="mt-1 text-sm text-gray-400">Try another search term.</p></td></tr>}</tbody>
                            </table></div>
                        </Panel>
                    </div>}

                    {activeSection === "profile" && <div className="grid items-start gap-6 xl:grid-cols-2">
                        <Panel><form onSubmit={e => { e.preventDefault(); setNotice("Profile changes saved in this demo."); }}>
                            <div className="mb-6 flex items-center gap-4"><div className="relative h-20 w-20 shrink-0">{profilePhoto ? <img src={profilePhoto} alt="Admin profile" className="h-20 w-20 rounded-2xl object-cover" /> : <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-3xl font-bold text-white">{studentName.charAt(0).toUpperCase()}</div>}<label htmlFor="admin-photo" className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#586FD6] text-white shadow-md">+</label><input id="admin-photo" type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (!file) return; if (!file.type.startsWith("image/")) { alert("Please select an image."); e.target.value = ""; return; } if (file.size > 5 * 1024 * 1024) { alert("Image must be 5 MB or less."); e.target.value = ""; return; } const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === "string") setProfilePhoto(reader.result); }; reader.readAsDataURL(file); }} /></div><div><h3 className="font-bold">Personal Information</h3><p className="mt-1 text-sm text-gray-400">Update your admin details.</p><label htmlFor="admin-photo" className="mt-2 inline-block cursor-pointer text-sm font-semibold text-[#586FD6] hover:underline">Upload Photo</label>{profilePhoto && <button type="button" onClick={() => setProfilePhoto("")} className="ml-3 text-sm font-semibold text-red-500 hover:underline">Remove</button>}</div></div>
                            <label className="mb-2 block text-sm font-semibold">Full Name</label><input value={studentName} onChange={e => setStudentName(e.target.value)} required className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]" />
                            <label className="mb-2 block text-sm font-semibold">Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]" />
                            <label className="mb-2 block text-sm font-semibold">Phone Number</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]" />
                            <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">Save Changes</button>
                        </form></Panel>
                        <Panel><h3 className="font-bold">Administrator Account</h3><p className="mb-5 mt-1 text-sm text-gray-400">Account information and access.</p><div className="space-y-4"><div className="rounded-xl bg-[#F8F8FC] p-4"><p className="text-xs text-gray-400">Account Role</p><p className="mt-1 font-bold">Super Admin (Demo)</p></div><div className="rounded-xl bg-[#F8F8FC] p-4"><p className="text-xs text-gray-400">Account Email</p><p className="mt-1 break-all font-bold">{email}</p></div><div className="rounded-xl bg-[#F8F8FC] p-4"><p className="text-xs text-gray-400">Security</p><p className="mt-1 font-bold">Authentication not connected</p></div><p className="text-xs leading-5 text-gray-400">Connect backend authentication before using these details for real administrator access.</p></div></Panel>
                    </div>}

                    {activeSection === "settings" && (
                        <div className="mx-auto w-full max-w-[1250px] space-y-7 px-2 pb-8 sm:px-4 lg:px-8">

                            {/* Settings Heading */}
                            <div className="rounded-3xl border border-[#ECECF5] bg-gradient-to-r from-white via-white to-[#E2A3FF]/10 p-6 sm:p-9">
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                                    <div>
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#869CFF]/10 px-3 py-1.5 text-xs font-bold text-[#586FD6]">
                                            <span>⚙</span>
                                            ADMIN CONTROL CENTER
                                        </div>

                                        <h2 className="text-2xl font-extrabold tracking-tight text-[#20243A] sm:text-3xl">
                                            Advanced Settings
                                        </h2>

                                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                            Manage your academy preferences, notifications,
                                            appearance and platform configuration from one place.
                                        </p>
                                    </div>

                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 text-3xl text-[#586FD6]">
                                        ⚙
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-[#ECECF5] bg-white/90 p-4">
                                        <p className="text-xs font-medium text-gray-400">Platform</p>
                                        <p className="mt-2 font-bold text-[#20243A]">{platformName}</p>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white/90 p-4">
                                        <p className="text-xs font-medium text-gray-400">Configuration</p>
                                        <p className="mt-2 font-bold text-[#20243A]">Frontend Demo</p>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white/90 p-4">
                                        <p className="text-xs font-medium text-gray-400">Backend Status</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                                            <p className="font-bold text-amber-600">Not Connected</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Search & Quick Actions */}
                            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                                    <input value={settingsSearch} onChange={event => setSettingsSearch(event.target.value)} placeholder="Search settings, preferences, security..." aria-label="Search settings sections" className={`${inputClass} pl-11`} />
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className="rounded-full bg-emerald-50 px-3 py-2 font-semibold text-emerald-700">● Local preferences enabled</span>
                                    <button type="button" onClick={() => {
                                        setPlatformName("Codo Learn"); setSupportEmail("support@codolearn.com"); setLanguage("English"); setTimezone("Africa/Cairo"); setCompactMode(false); setMaintenanceMode(false); setSessionTimeout("30"); setDateFormat("DD/MM/YYYY");
                                        setSettings({ emailNotifications: true, enrollmentAlerts: true, paymentAlerts: true, courseAlerts: true, projectAlerts: false, weeklyReports: true, twoFactorEnabled: false });
                                        setNotice("Settings reset to default demo preferences. Save to keep them in this browser.");
                                    }} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-bold text-gray-600 transition hover:border-[#869CFF] hover:text-[#586FD6]">Reset defaults</button>
                                </div>
                            </div>

                            {/* Settings Layout */}
                            <div className="grid items-start gap-6 xl:grid-cols-[250px_minmax(0,1fr)]">

                                {/* Inner Settings Navigation */}
                                <Panel className="!p-3 xl:sticky xl:top-28">
                                    <p className="px-3 pb-3 pt-2 text-[10px] font-bold tracking-[0.2em] text-gray-400">
                                        PREFERENCES
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
                                        {[
                                            { id: "general" as const, label: "General", icon: "⌂", description: "Platform information" },
                                            { id: "notifications" as const, label: "Notifications", icon: "♧", description: "Alerts and updates" },
                                            { id: "appearance" as const, label: "Appearance", icon: "◐", description: "Interface preferences" },
                                            { id: "security" as const, label: "Security", icon: "◇", description: "Account protection" },
                                            { id: "system" as const, label: "System", icon: "▦", description: "Platform status" },
                                        ].filter(item => `${item.label} ${item.description}`.toLowerCase().includes(settingsSearch.trim().toLowerCase())).map(item => {
                                            const active = settingsTab === item.id;

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setSettingsTab(item.id)}
                                                    className={`flex min-w-0 items-center gap-3 rounded-xl p-3 text-left transition ${active
                                                        ? "bg-gradient-to-r from-[#869CFF]/15 to-[#E2A3FF]/15 text-[#586FD6] ring-1 ring-[#869CFF]/20"
                                                        : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                                                        }`}
                                                >
                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                                        {item.icon}
                                                    </span>

                                                    <span className="min-w-0">
                                                        <span className="block text-sm font-bold">
                                                            {item.label}
                                                        </span>
                                                        <span className="mt-1 hidden text-[11px] text-gray-400 xl:block">
                                                            {item.description}
                                                        </span>
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </Panel>

                                {/* Settings Content */}
                                <div className="min-w-0 space-y-6">
                                    {notice && (
                                        <div role="status" className="flex items-start justify-between gap-3 rounded-xl border border-[#869CFF]/25 bg-[#869CFF]/10 px-4 py-3 text-sm text-[#455BC1]">
                                            <span>{notice}</span><button type="button" onClick={() => setNotice("")} aria-label="Dismiss settings message" className="font-bold">×</button>
                                        </div>
                                    )}

                                    {/* GENERAL */}
                                    {settingsTab === "general" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    General Settings
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Configure your academy's basic information.
                                                </p>
                                            </div>

                                            <form
                                                onSubmit={event => {
                                                    event.preventDefault();
                                                    saveSettings();
                                                }}
                                                className="space-y-5"
                                            >
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold">
                                                        Platform Name
                                                    </label>
                                                    <input
                                                        required
                                                        value={platformName}
                                                        onChange={event => setPlatformName(event.target.value)}
                                                        className={inputClass}
                                                        placeholder="Enter platform name"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold">
                                                        Support Email
                                                    </label>
                                                    <input
                                                        required
                                                        type="email"
                                                        value={supportEmail}
                                                        onChange={event => setSupportEmail(event.target.value)}
                                                        className={inputClass}
                                                        placeholder="support@example.com"
                                                    />
                                                </div>

                                                <div className="grid gap-5 sm:grid-cols-2">
                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold">
                                                            Default Language
                                                        </label>
                                                        <select
                                                            value={language}
                                                            onChange={event => setLanguage(event.target.value)}
                                                            className={inputClass}
                                                        >
                                                            <option value="English">English</option>
                                                            <option value="Arabic">Arabic</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold">
                                                            Time Zone
                                                        </label>
                                                        <select
                                                            value={timezone}
                                                            onChange={event => setTimezone(event.target.value)}
                                                            className={inputClass}
                                                        >
                                                            <option value="Africa/Cairo">Cairo (GMT+2/+3)</option>
                                                            <option value="Europe/London">London</option>
                                                            <option value="UTC">UTC</option>
                                                            <option value="America/New_York">New York</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-100 pt-5">
                                                    <button
                                                        type="submit"
                                                        className="rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                                    >
                                                        Save General Settings
                                                    </button>
                                                </div>
                                            </form>
                                        </Panel>
                                    )}


                                    {/* NOTIFICATIONS */}
                                    {settingsTab === "notifications" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    Notification Preferences
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Choose which types of demo notifications are enabled.
                                                </p>
                                            </div>

                                            <div className="space-y-5">
                                                {[
                                                    {
                                                        key: "emailNotifications" as const,
                                                        label: "Email Notifications",
                                                        description: "Receive general account updates.",
                                                    },
                                                    {
                                                        key: "enrollmentAlerts" as const,
                                                        label: "Enrollment Alerts",
                                                        description: "Get notified about new student enrollments.",
                                                    },
                                                    {
                                                        key: "paymentAlerts" as const,
                                                        label: "Payment Alerts",
                                                        description: "Get notified about payment status changes.",
                                                    },
                                                    { key: "courseAlerts" as const, label: "Course Updates", description: "Receive alerts when courses are created or updated." },
                                                    { key: "projectAlerts" as const, label: "Project Requests", description: "Notify me about new project requests and status changes." },
                                                    { key: "weeklyReports" as const, label: "Weekly Admin Summary", description: "Show a weekly summary preference for academy activity." },
                                                ].map(item => (
                                                    <label
                                                        key={item.key}
                                                        className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-[#869CFF]/40"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-bold text-[#20243A]">
                                                                {item.label}
                                                            </p>
                                                            <p className="mt-1 text-xs leading-5 text-gray-400">
                                                                {item.description}
                                                            </p>
                                                        </div>

                                                        <input
                                                            type="checkbox"
                                                            checked={settings[item.key]}
                                                            onChange={event =>
                                                                setSettings(previous => ({
                                                                    ...previous,
                                                                    [item.key]: event.target.checked,
                                                                }))
                                                            }
                                                            className="h-5 w-5 shrink-0 accent-[#586FD6]"
                                                        />
                                                    </label>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={saveSettings}
                                                className="mt-6 rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                            >
                                                Save Preferences
                                            </button>
                                        </Panel>
                                    )}

                                    {/* APPEARANCE */}
                                    {settingsTab === "appearance" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    Appearance
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Customize your dashboard viewing preferences.
                                                </p>
                                            </div>

                                            <div className="space-y-5">
                                                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4">
                                                    <div>
                                                        <p className="text-sm font-bold">Compact Mode</p>
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            Preference toggle for a more compact dashboard layout.
                                                        </p>
                                                    </div>

                                                    <input
                                                        type="checkbox"
                                                        checked={compactMode}
                                                        onChange={event => setCompactMode(event.target.checked)}
                                                        className="h-5 w-5 accent-[#586FD6]"
                                                    />
                                                </div>

                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="rounded-xl border border-gray-100 p-4">
                                                        <label className="mb-2 block text-sm font-bold">Date Format</label>
                                                        <select value={dateFormat} onChange={event => setDateFormat(event.target.value)} className={inputClass}>
                                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option><option value="MM/DD/YYYY">MM/DD/YYYY</option><option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                        </select>
                                                        <p className="mt-2 text-xs text-gray-400">Display preference for future integration.</p>
                                                    </div>
                                                    <div className="rounded-xl border border-gray-100 p-4">
                                                        <p className="text-sm font-bold">Layout Density</p><p className="mt-1 text-xs text-gray-400">Choose a comfortable dashboard density.</p>
                                                        <div className="mt-3 flex gap-2">
                                                            <button type="button" onClick={() => setCompactMode(false)} className={`rounded-lg px-3 py-2 text-xs font-bold ${!compactMode ? "bg-[#586FD6] text-white" : "bg-[#F8F8FC] text-gray-500"}`}>Comfortable</button>
                                                            <button type="button" onClick={() => setCompactMode(true)} className={`rounded-lg px-3 py-2 text-xs font-bold ${compactMode ? "bg-[#586FD6] text-white" : "bg-[#F8F8FC] text-gray-500"}`}>Compact</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="rounded-xl border border-gray-100 p-4">
                                                    <p className="text-sm font-bold">Brand Colors</p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Current Codo Learn color palette.
                                                    </p>

                                                    <div className="mt-4 flex flex-wrap gap-3">
                                                        {[
                                                            { name: "Primary Blue", color: "#869CFF" },
                                                            { name: "Soft Purple", color: "#E2A3FF" },
                                                            { name: "Page Background", color: "#F8F8FC" },
                                                            { name: "Text", color: "#20243A" },
                                                        ].map(color => (
                                                            <div key={color.name} className="flex items-center gap-2 rounded-lg border border-gray-100 p-2">
                                                                <span
                                                                    className="h-7 w-7 rounded-lg border border-black/5"
                                                                    style={{ backgroundColor: color.color }}
                                                                />
                                                                <div>
                                                                    <p className="text-xs font-semibold">{color.name}</p>
                                                                    <p className="text-[10px] text-gray-400">{color.color}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={saveSettings}
                                                className="mt-6 rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                            >
                                                Save Appearance
                                            </button>
                                        </Panel>
                                    )}

                                    {/* SECURITY */}
                                    {settingsTab === "security" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    Security & Access
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Review the current security configuration.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                                                    <span className="text-xl">⚠</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-amber-800">
                                                            Backend authentication is not connected
                                                        </p>
                                                        <p className="mt-1 text-xs leading-5 text-amber-700">
                                                            The dashboard currently uses frontend demo data.
                                                            Account protection and access control must be
                                                            implemented on the backend before production.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center">
                                                    <div><p className="text-sm font-bold text-[#20243A]">Two-factor authentication preference</p><p className="mt-1 text-xs text-gray-400">UI preference only; real 2FA requires backend authentication.</p></div>
                                                    <input type="checkbox" checked={settings.twoFactorEnabled} onChange={event => setSettings(previous => ({ ...previous, twoFactorEnabled: event.target.checked }))} className="h-5 w-5 accent-[#586FD6]" />
                                                </div>
                                                <div className="rounded-xl border border-gray-100 p-4">
                                                    <label className="mb-2 block text-sm font-bold text-[#20243A]">Session timeout preference</label>
                                                    <select value={sessionTimeout} onChange={event => setSessionTimeout(event.target.value)} className={inputClass}><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="60">60 minutes</option><option value="120">2 hours</option></select>
                                                    <p className="mt-2 text-xs text-gray-400">Stored locally; does not expire real sessions.</p>
                                                </div>
                                                {[
                                                    { label: "Authentication", value: "Backend not connected" },
                                                    { label: "Role-based access control", value: "Not implemented" },
                                                    { label: "Session enforcement", value: "Demo preference only" },
                                                ].map(item => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col justify-between gap-2 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                                                    >
                                                        <p className="text-sm font-semibold text-[#20243A]">
                                                            {item.label}
                                                        </p>
                                                        <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Panel>
                                    )}

                                    {/* SYSTEM */}
                                    {settingsTab === "system" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    System Configuration
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Review system information and demo maintenance preferences.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {[
                                                    { label: "Application", value: platformName },
                                                    { label: "Environment", value: "Frontend Demo" },
                                                    { label: "Data Storage", value: "localStorage + React state" },
                                                    { label: "Selected Language", value: language },
                                                    { label: "Selected Time Zone", value: timezone },
                                                    { label: "Backend API", value: "Not connected" },
                                                    { label: "Database", value: "Not connected" },
                                                ].map(item => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col justify-between gap-2 rounded-xl bg-[#F8F8FC] p-4 sm:flex-row sm:items-center"
                                                    >
                                                        <span className="text-sm text-gray-500">{item.label}</span>
                                                        <span className="break-words text-sm font-bold text-[#20243A]">
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                ))}

                                                <div className="flex items-center justify-between gap-4 rounded-xl border border-red-100 p-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-[#20243A]">
                                                            Maintenance Mode
                                                        </p>
                                                        <p className="mt-1 text-xs leading-5 text-gray-400">
                                                            Demo preference only. It does not disable the live site.
                                                        </p>
                                                    </div>

                                                    <input
                                                        type="checkbox"
                                                        checked={maintenanceMode}
                                                        onChange={event => setMaintenanceMode(event.target.checked)}
                                                        className="h-5 w-5 accent-red-500"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={saveSettings}
                                                className="mt-6 rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                            >
                                                Save System Preferences
                                            </button>
                                        </Panel>
                                    )}

                                    <div className="flex items-start gap-3 rounded-2xl border border-[#869CFF]/20 bg-[#869CFF]/5 p-4">
                                        <span className="text-lg text-[#586FD6]">ⓘ</span>
                                        <p className="text-xs leading-5 text-gray-500">
                                            These preferences are saved in this browser only. They are not yet synced
                                            with a backend, database, or other administrator accounts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
