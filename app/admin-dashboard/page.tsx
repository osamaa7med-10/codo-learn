"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

type Section =
    | "overview"
    | "students"
    | "instructors"
    | "clients"
    | "employees"
    | "users"
    | "invitations"
    | "courses"
    | "services"
    | "projects"
    | "enrollments"
    | "payments"
    | "notifications"
    | "profile"
    | "settings";

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
    experienceYears?: string;
    jobTitle?: string;
    education?: string;
    certifications?: string;
    bio?: string;
    portfolio?: string;
    status?: string;
    role?: string;
    category?: string;
    position?: string;
    amount?: string;
    date?: string;
    description?: string;
    instructor?: string;
    image?: string;
    companyName?: string;
    companyWebsite?: string;
    industry?: string;
    companySize?: string;
    serviceRequired?: string;
    projectDescription?: string;
    price?: string;
    deliveryTime?: string;
};

const digitalSolutionCategories = [
    { value: "Web Development", label: "Web Development", arLabel: "تطوير المواقع" },
    { value: "Mobile App Development", label: "Mobile App Development", arLabel: "تطوير تطبيقات الموبايل" },
    { value: "UI/UX Design", label: "UI/UX Design", arLabel: "تصميم UI/UX" },
    { value: "E-Commerce Solutions", label: "E-Commerce Solutions", arLabel: "حلول التجارة الإلكترونية" },
    { value: "Custom Software Development", label: "Custom Software Development", arLabel: "تطوير البرمجيات المخصصة" },
    { value: "AI & Automation", label: "AI & Automation", arLabel: "الذكاء الاصطناعي والأتمتة" },
    { value: "Digital Marketing", label: "Digital Marketing", arLabel: "التسويق الرقمي" },
    { value: "Branding & Graphic Design", label: "Branding & Graphic Design", arLabel: "الهوية البصرية والتصميم" },
    { value: "IT Consulting", label: "IT Consulting", arLabel: "الاستشارات التقنية" },
];

const DIGITAL_SOLUTIONS_STORAGE_KEY = "codo-digital-solutions";
const CLIENT_REQUESTS_STORAGE_KEY = "codo-client-requests";

type ClientRequest = {
    id: number;
    submittedAt: string;
    status: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    companyName: string;
    companyWebsite?: string;
    industry: string;
    companySize: string;
    serviceRequired: string;
    projectDescription: string;
    adminNotes?: string;
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
    clients: [
        {
            id: 1,
            name: "Ahmed Business",
            email: "contact@ahmedbusiness.com",
            phone: "+201000000000",
            companyName: "Ahmed Business",
            companyWebsite: "https://example.com",
            industry: "Technology",
            companySize: "11-50 Employees",
            serviceRequired: "Web Development",
            projectDescription: "Company website development.",
            status: "Active",
        },
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
    invitations: [
        { id: 1, name: "newadmin@example.com", category: "Administrator", status: "Pending", date: "2026-10-15" }
    ],
    courses: [
        { id: 1, name: "Complete React.js Course", category: "Frontend", status: "Published", description: "Build modern React applications." },
        { id: 2, name: "UI/UX Design Fundamentals", category: "Design", status: "Draft", description: "Learn modern interface design." },
        { id: 3, name: "Node.js Backend Development", category: "Backend", status: "Published", description: "Build APIs with Node.js." },
    ],
    services: [
        {
            id: 1,
            name: "Web Development",
            category: "Web Development",
            description: "Modern, responsive websites and web applications tailored to business needs.",
            price: "Starting from $500",
            deliveryTime: "2-4 weeks",
            status: "Active",
        },
        {
            id: 2,
            name: "UI/UX Design",
            category: "UI/UX Design",
            description: "User research, wireframes and polished interface designs.",
            price: "Starting from $250",
            deliveryTime: "1-3 weeks",
            status: "Active",
        },
        {
            id: 3,
            name: "Technical Consulting",
            category: "IT Consulting",
            description: "Technical guidance, architecture reviews and digital strategy.",
            price: "Custom quote",
            deliveryTime: " حسب نطاق العمل",
            status: "Inactive",
        },
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

const navigation: {
    label: string;
    items: { id: Section; label: string; icon: string }[];
}[] = [
        {
            label: "MAIN",
            items: [{ id: "overview", label: "Overview", icon: "▦" }]
        },
        {

            label: "PEOPLE",
            items: [
                { id: "students", label: "Students", icon: "♙" },
                { id: "instructors", label: "Instructors", icon: "♧" },
                { id: "employees", label: "Employees", icon: "♙" },
                { id: "clients", label: "Clients", icon: "♧" },
                { id: "users", label: "Users & Roles", icon: "♧" },
                { id: "invitations", label: "Admin Invitations", icon: "✉" },
            ]
        },
        {
            label: "ACADEMY",
            items: [
                { id: "courses", label: "Courses", icon: "▤" },
                { id: "services", label: "Services", icon: "◇" },
                { id: "projects", label: "Projects", icon: "▧" },
                { id: "enrollments", label: "Enrollments", icon: "☷" },
                { id: "payments", label: "Payments", icon: "$" },
                { id: "notifications", label: "Notifications", icon: "♧" },
            ]
        },
        {
            label: "ACCOUNT",
            items: [
                { id: "profile", label: "My Profile", icon: "♙" },
                { id: "settings", label: "Settings", icon: "⚙" },
            ]
        },
    ];

const sectionTitles: Record<Section, string> = {
    clients: "Clients Management",
    overview: "Admin Overview",
    students: "Students Management",
    instructors: "Instructors Management",
    employees: "Employees Management",
    users: "Users & Roles",
    invitations: "Admin Invitations",
    courses: "Courses Management",
    services: "Services Management",
    projects: "Projects Management",
    enrollments: "Enrollments Management",
    payments: "Payments Management",
    notifications: "Notifications Management",
    profile: "My Profile",
    settings: "Settings",
};

const sectionDescriptions: Record<Section, string> = {
    clients: "View, search and manage client records.",
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

const arabicSectionTitles: Record<Section, string> = {
    clients: "إدارة العملاء",
    overview: "نظرة عامة على لوحة الإدارة",
    students: "إدارة الطلاب",
    instructors: "إدارة المدربين",
    employees: "إدارة الموظفين",
    users: "المستخدمون والصلاحيات",
    invitations: "دعوات المسؤولين",
    courses: "إدارة الكورسات",
    services: "إدارة الخدمات",
    projects: "إدارة المشروعات",
    enrollments: "إدارة التسجيلات",
    payments: "إدارة المدفوعات",
    notifications: "إدارة الإشعارات",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
};

const arabicSectionDescriptions: Record<Section, string> = {
    clients: "عرض بيانات العملاء والبحث عنها وإدارتها.",
    overview: "تابع أداء الأكاديمية والأنشطة الحالية.",
    students: "عرض بيانات الطلاب والبحث عنها وإدارتها.",
    instructors: "إدارة المدربين في الأكاديمية.",
    employees: "عرض بيانات الموظفين وإدارتها.",
    users: "مراجعة الحسابات والصلاحيات المخصصة لها.",
    invitations: "إرسال دعوات لمسؤولين جدد للانضمام إلى فريقك.",
    courses: "إنشاء كورسات الأكاديمية وإدارتها.",
    services: "إدارة الخدمات الرقمية التي تقدمها الأكاديمية.",
    projects: "إدارة مشروعات معرض الأعمال وطلبات المشروعات.",
    enrollments: "مراجعة تسجيلات الطلاب وإدارتها.",
    payments: "متابعة سجلات المدفوعات وحالات الدفع.",
    notifications: "إنشاء إعلانات النظام وإدارتها.",
    profile: "إدارة المعلومات الشخصية الخاصة بالمسؤول.",
    settings: "إدارة تفضيلات لوحة التحكم.",
};

function StatusBadge({
    status,
    isArabic = false,
}: {
    status?: string;
    isArabic?: boolean;
}) {
    const value = status || "Unknown";

    const arabicStatuses: Record<string, string> = {
        Active: "نشط",
        Published: "منشور",
        Approved: "تمت الموافقة",
        Paid: "مدفوع",
        Pending: "قيد الانتظار",
        Draft: "مسودة",
        "In Review": "قيد المراجعة",
        Inactive: "غير نشط",
        Failed: "فشل",
        Rejected: "مرفوض",
        Unpublished: "غير منشور",
        Unknown: "غير معروف",
    };

    const style = ["Active", "Published", "Approved", "Paid"].includes(value)
        ? "bg-emerald-50 text-emerald-700"
        : ["Pending", "Draft", "In Review"].includes(value)
            ? "bg-amber-50 text-amber-700"
            : ["Inactive", "Failed", "Rejected", "Unpublished"].includes(value)
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600";

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
            {isArabic ? arabicStatuses[value] || value : value}
        </span>
    );
}

function Panel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6 ${className}`}>
            {children}
        </div>
    );
}

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none transition focus:border-[#869CFF]";

export default function AdminDashboard() {
    const { language, setLanguage, direction } = useLanguage();
    const isArabic = language === "ar";

    const t = (english: string, arabic: string) =>
        isArabic ? arabic : english;

    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState(initialData);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [notice, setNotice] = useState("");
    const [clientRequests, setClientRequests] = useState<ClientRequest[]>([]);
    const [clientRequestsLoaded, setClientRequestsLoaded] = useState(false);
    const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);

    useEffect(() => {
        try {
            const savedServices = localStorage.getItem(
                DIGITAL_SOLUTIONS_STORAGE_KEY
            );

            if (savedServices) {
                const parsedServices = JSON.parse(savedServices);
                if (Array.isArray(parsedServices)) {
                    setData(previous => ({
                        ...previous,
                        services: parsedServices,
                    }));
                }
            }
        } catch (error) {
            console.error("Error loading services:", error);
        } finally {
            setDataLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!dataLoaded) return;

        try {
            localStorage.setItem(
                DIGITAL_SOLUTIONS_STORAGE_KEY,
                JSON.stringify(data.services)
            );
        } catch (error) {
            console.error("Error saving services:", error);
        }
    }, [data.services, dataLoaded]);
    useEffect(() => {
        try {
            const savedRequests = localStorage.getItem(CLIENT_REQUESTS_STORAGE_KEY);
            if (savedRequests) {
                const parsedRequests = JSON.parse(savedRequests);
                if (Array.isArray(parsedRequests)) setClientRequests(parsedRequests);
            }
        } catch (error) {
            console.error("Error loading client requests:", error);
        } finally {
            setClientRequestsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!clientRequestsLoaded) return;
        try {
            localStorage.setItem(CLIENT_REQUESTS_STORAGE_KEY, JSON.stringify(clientRequests));
        } catch (error) {
            console.error("Error saving client requests:", error);
        }
    }, [clientRequests, clientRequestsLoaded]);

    function updateClientRequestStatus(requestId: number, status: string): void {
        setClientRequests(previous => previous.map(request =>
            request.id === requestId ? { ...request, status } : request
        ));
        setNotice(t("Client request status updated.", "تم تحديث حالة طلب العميل."));
    }

    function updateClientRequestNotes(requestId: number, adminNotes: string): void {
        setClientRequests(previous => previous.map(request =>
            request.id === requestId ? { ...request, adminNotes } : request
        ));
    }

    const [studentName, setStudentName] = useState("Admin User");
    const [email, setEmail] = useState("admin@codolearn.com");
    const [phone, setPhone] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    // Student registration form
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

    // Client form
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientCompany, setClientCompany] = useState("");
    const [clientWebsite, setClientWebsite] = useState("");
    const [clientIndustry, setClientIndustry] = useState("");
    const [clientCompanySize, setClientCompanySize] = useState("1-10 Employees");
    const [clientService, setClientService] = useState("Web Development");
    const [clientDescription, setClientDescription] = useState("");
    const [clientStatus, setClientStatus] = useState("Active");

    // Instructor profile form
    const [instructorName, setInstructorName] = useState("");
    const [instructorEmail, setInstructorEmail] = useState("");
    const [instructorPhone, setInstructorPhone] = useState("");
    const [instructorCountry, setInstructorCountry] = useState("Egypt");
    const [instructorCity, setInstructorCity] = useState("");
    const [instructorLinkedIn, setInstructorLinkedIn] = useState("");
    const [instructorSpecialty, setInstructorSpecialty] = useState("Frontend");
    const [instructorJobTitle, setInstructorJobTitle] = useState("");
    const [instructorExperience, setInstructorExperience] = useState("1-3 years");
    const [instructorEducation, setInstructorEducation] = useState("Bachelor's Degree");
    const [instructorCertifications, setInstructorCertifications] = useState("");
    const [instructorPortfolio, setInstructorPortfolio] = useState("");
    const [instructorBio, setInstructorBio] = useState("");
    const [instructorImage, setInstructorImage] = useState("");
    const [instructorStatus, setInstructorStatus] = useState("Active");

    // Employee form
    const [newEmployeeName, setNewEmployeeName] = useState("");
    const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
    const [newEmployeePhone, setNewEmployeePhone] = useState("");
    const [newEmployeePosition, setNewEmployeePosition] = useState("HR");
    const [newEmployeeStatus, setNewEmployeeStatus] = useState("Active");

    // Digital Solutions form
    const [serviceName, setServiceName] = useState("");
    const [serviceCategory, setServiceCategory] = useState("Web Development");
    const [serviceDescription, setServiceDescription] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [serviceDeliveryTime, setServiceDeliveryTime] = useState("");
    const [serviceStatus, setServiceStatus] = useState("Active");

    // Course form
    const [courseName, setCourseName] = useState("");
    const [courseCategory, setCourseCategory] = useState("Frontend");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseImage, setCourseImage] = useState("");

    const [announcement, setAnnouncement] = useState("");
    const [invitationEmail, setInvitationEmail] = useState("");
    const [settingsSearch, setSettingsSearch] = useState("");

    const [settingsTab, setSettingsTab] = useState<
        "general" | "notifications" | "appearance" | "security" | "system"
    >("general");

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
    const [timezone, setTimezone] = useState("Africa/Cairo");
    const [compactMode, setCompactMode] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState("30");
    const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

    const currentRows = data[activeSection] || [];

    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return currentRows;

        return currentRows.filter(item =>
            Object.values(item).some(value =>
                String(value ?? "").toLowerCase().includes(query)
            )
        );
    }, [currentRows, search]);

    const addRecord = (
        section: string,
        record: Omit<RecordItem, "id">
    ) => {
        setData(previous => ({
            ...previous,
            [section]: [
                ...previous[section],
                {
                    ...record,
                    id: Math.max(
                        0,
                        ...previous[section].map(item => item.id)
                    ) + 1,
                },
            ],
        }));
    };

    const updateRecord = (
        section: string,
        id: number,
        updates: Partial<RecordItem>
    ) => {
        setData(previous => ({
            ...previous,
            [section]: previous[section].map(item =>
                item.id === id ? { ...item, ...updates } : item
            ),
        }));
    };

    const deleteRecord = (section: string, id: number) => {
        if (!window.confirm(t(
            "Are you sure you want to delete this record?",
            "هل أنت متأكد أنك تريد حذف هذا السجل؟"
        ))) return;

        setData(previous => ({
            ...previous,
            [section]: previous[section].filter(item => item.id !== id),
        }));

        setNotice(t(
            "Record deleted from this demo.",
            "تم حذف السجل من النسخة التجريبية."
        ));
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
            setNotice(t(
                "Please complete all required student information.",
                "يرجى استكمال جميع بيانات الطالب المطلوبة."
            ));
            return;
        }

        if (!emailPattern.test(normalizedEmail)) {
            setNotice(t(
                "Please enter a valid email address.",
                "يرجى إدخال بريد إلكتروني صحيح."
            ));
            return;
        }

        if (
            newStudentLinkedIn.trim() &&
            !/^https?:\/\//i.test(newStudentLinkedIn.trim())
        ) {
            setNotice(t(
                "Please enter a valid LinkedIn URL starting with http:// or https://.",
                "يرجى إدخال رابط LinkedIn صحيح يبدأ بـ http:// أو https://."
            ));
            return;
        }

        if (data.students.some(
            item => item.email?.trim().toLowerCase() === normalizedEmail
        )) {
            setNotice(t(
                "A student with this email already exists.",
                "يوجد طالب مسجل بالفعل بهذا البريد الإلكتروني."
            ));
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

        setNotice(t(
            "Student added successfully!",
            "تمت إضافة الطالب بنجاح!"
        ));
    };

    const handleAddInstructor = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = instructorName.trim();
        const normalizedEmail = instructorEmail.trim().toLowerCase();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlPattern = /^https?:\/\//i;

        if (
            !name || !normalizedEmail || !instructorPhone.trim() ||
            !instructorCity.trim() || !instructorJobTitle.trim()
        ) {
            setNotice(t(
                "Please complete all required instructor information.",
                "يرجى استكمال جميع بيانات المدرب المطلوبة."
            ));
            return;
        }

        if (!emailPattern.test(normalizedEmail)) {
            setNotice(t(
                "Please enter a valid instructor email address.",
                "يرجى إدخال بريد إلكتروني صحيح للمدرب."
            ));
            return;
        }

        if (
            instructorLinkedIn.trim() &&
            !urlPattern.test(instructorLinkedIn.trim())
        ) {
            setNotice(t(
                "Please enter a valid LinkedIn URL starting with http:// or https://.",
                "يرجى إدخال رابط LinkedIn صحيح يبدأ بـ http:// أو https://."
            ));
            return;
        }

        if (
            instructorPortfolio.trim() &&
            !urlPattern.test(instructorPortfolio.trim())
        ) {
            setNotice(t(
                "Please enter a valid portfolio or website URL starting with http:// or https://.",
                "يرجى إدخال رابط معرض أعمال أو موقع صحيح يبدأ بـ http:// أو https://."
            ));
            return;
        }

        if (data.instructors.some(
            item => item.email?.trim().toLowerCase() === normalizedEmail
        )) {
            setNotice(t(
                "An instructor with this email already exists.",
                "يوجد مدرب مسجل بالفعل بهذا البريد الإلكتروني."
            ));
            return;
        }

        addRecord("instructors", {
            name,
            email: normalizedEmail,
            phone: instructorPhone.trim(),
            country: instructorCountry,
            city: instructorCity.trim(),
            linkedIn: instructorLinkedIn.trim(),
            category: instructorSpecialty,
            jobTitle: instructorJobTitle.trim(),
            experienceYears: instructorExperience,
            education: instructorEducation,
            certifications: instructorCertifications.trim(),
            portfolio: instructorPortfolio.trim(),
            bio: instructorBio.trim(),
            status: instructorStatus,
            role: "Instructor",
            image: instructorImage,
        });

        setInstructorName("");
        setInstructorEmail("");
        setInstructorPhone("");
        setInstructorCountry("Egypt");
        setInstructorCity("");
        setInstructorLinkedIn("");
        setInstructorSpecialty("Frontend");
        setInstructorJobTitle("");
        setInstructorExperience("1-3 years");
        setInstructorEducation("Bachelor's Degree");
        setInstructorCertifications("");
        setInstructorPortfolio("");
        setInstructorBio("");
        setInstructorImage("");
        setInstructorStatus("Active");

        setNotice(t(
            "Instructor added successfully!",
            "تمت إضافة المدرب بنجاح!"
        ));
    };

    const handleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = newEmployeeName.trim();
        const normalizedEmail = newEmployeeEmail.trim().toLowerCase();
        const position = newEmployeePosition.trim();

        if (!name || !normalizedEmail || !position) {
            setNotice(t(
                "Please enter the employee's name, email, and job position.",
                "يرجى إدخال اسم الموظف والبريد الإلكتروني والمسمى الوظيفي."
            ));
            return;
        }

        if (data.employees.some(
            item => item.email?.trim().toLowerCase() === normalizedEmail
        )) {
            setNotice(t(
                "An employee with this email already exists.",
                "يوجد موظف مسجل بالفعل بهذا البريد الإلكتروني."
            ));
            return;
        }

        addRecord("employees", {
            name,
            email: normalizedEmail,
            phone: newEmployeePhone.trim(),
            category: position,
            position,
            status: newEmployeeStatus,
            role: "Employee",
        });

        setNewEmployeeName("");
        setNewEmployeeEmail("");
        setNewEmployeePhone("");
        setNewEmployeePosition("HR");
        setNewEmployeeStatus("Active");

        setNotice(t(
            "Employee added successfully!",
            "تمت إضافة الموظف بنجاح!"
        ));
    };

    const handleAddService = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = serviceName.trim();
        const description = serviceDescription.trim();

        if (!name || !description) {
            setNotice(t(
                "Please enter a service name and description.",
                "يرجى إدخال اسم الخدمة والوصف الخاص بها."
            ));
            return;
        }

        if (data.services.some(item => item.name.trim().toLowerCase() === name.toLowerCase())) {
            setNotice(t(
                "A service with this name already exists.",
                "توجد خدمة بهذا الاسم بالفعل."
            ));
            return;
        }

        addRecord("services", {
            name,
            category: serviceCategory,
            description,
            price: servicePrice.trim() || "Custom quote",
            deliveryTime: serviceDeliveryTime.trim() || "To be agreed",
            status: serviceStatus,
        });

        setServiceName("");
        setServiceCategory("Web Development");
        setServiceDescription("");
        setServicePrice("");
        setServiceDeliveryTime("");
        setServiceStatus("Active");

        setNotice(t(
            "Digital solution added successfully!",
            "تمت إضافة الحل الرقمي بنجاح!"
        ));
    };

    const handleAddCourse = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!courseName.trim() || !courseDescription.trim()) {
            setNotice(t(
                "Please enter a course name and description.",
                "يرجى إدخال اسم الكورس والوصف الخاص به."
            ));
            return;
        }

        addRecord("courses", {
            name: courseName.trim(),
            category: courseCategory,
            status: "Draft",
            description: courseDescription.trim(),
            instructor: courseInstructor.trim() || "Not assigned",
            amount: coursePrice ? `$${coursePrice}` : "Free",
            image: courseImage,
        });

        setCourseName("");
        setCourseCategory("Frontend");
        setCourseDescription("");
        setCourseInstructor("");
        setCoursePrice("");
        setCourseImage("");

        setNotice(t(
            "Course created successfully as a draft.",
            "تم إنشاء الكورس بنجاح كمسودة."
        ));
    };

    const handleInviteAdmin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!invitationEmail.trim()) return;

        addRecord("invitations", {
            name: invitationEmail.trim(),
            category: "Administrator",
            status: "Pending",
            date: new Date().toISOString().slice(0, 10),
        });

        setInvitationEmail("");

        setNotice(t(
            "Demo invitation added to the list.",
            "تمت إضافة الدعوة إلى القائمة التجريبية."
        ));
    };

    const handleAnnouncement = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!announcement.trim()) return;

        addRecord("notifications", {
            name: announcement.trim(),
            category: "Announcement",
            status: "Published",
            description: "Created from Admin Dashboard.",
        });

        setAnnouncement("");

        setNotice(t(
            "Announcement added to the demo list.",
            "تمت إضافة الإعلان إلى القائمة التجريبية."
        ));
    };

    const selectSection = (section: Section) => {
        setActiveSection(section);
        setSearch("");
        setNotice("");
        setSidebarOpen(false);
    };

    const totalRecords = (key: string) => data[key]?.length || 0;

    const pageTitle = isArabic
        ? arabicSectionTitles[activeSection]
        : sectionTitles[activeSection];

    const pageDescription = isArabic
        ? arabicSectionDescriptions[activeSection]
        : sectionDescriptions[activeSection];

    const isPeopleSection = [
        "students",
        "instructors",
        "employees",
        "users",
        "invitations",
        "clients",
        "courses",
        "services",
        "projects",
        "enrollments",
        "payments",
        "notifications"
    ].includes(activeSection);

    const searchPlaceholder = activeSection === "payments"
        ? t("Search payments...", "ابحث في المدفوعات...")
        : t(
            `Search ${sectionTitles[activeSection].toLowerCase()}...`,
            `ابحث في ${arabicSectionTitles[activeSection]}...`
        );

    function saveSettings(): void {
        setNotice(t(
            "Settings saved for this demo.",
            "تم حفظ الإعدادات في النسخة التجريبية."
        ));
    }

    function handleAddClient(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const name = clientName.trim();
        const normalizedEmail = clientEmail.trim().toLowerCase();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !normalizedEmail || !clientPhone.trim() || !clientCompany.trim() || !clientIndustry || !clientDescription.trim()) {
            setNotice(t(
                "Please complete all required client information.",
                "يرجى استكمال جميع بيانات العميل المطلوبة."
            ));
            return;
        }

        if (!emailPattern.test(normalizedEmail)) {
            setNotice(t(
                "Please enter a valid client email address.",
                "يرجى إدخال بريد إلكتروني صحيح للعميل."
            ));
            return;
        }

        addRecord("clients", {
            name,
            email: normalizedEmail,
            phone: clientPhone.trim(),
            companyName: clientCompany.trim(),
            companyWebsite: clientWebsite.trim(),
            industry: clientIndustry,
            companySize: clientCompanySize,
            serviceRequired: clientService,
            projectDescription: clientDescription.trim(),
            status: clientStatus,
        });

        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setClientCompany("");
        setClientWebsite("");
        setClientIndustry("");
        setClientCompanySize("1-10 Employees");
        setClientService("Web Development");
        setClientDescription("");
        setClientStatus("Active");
        setNotice(t("Client added successfully!", "تمت إضافة العميل بنجاح!"));
    }

    return (
        <div dir={direction} className="min-h-screen bg-[#F8F8FC] text-[#25243A]">
            {sidebarOpen && (
                <button
                    aria-label={t("Close sidebar", "إغلاق القائمة")}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
                />
            )}

            <aside className={`fixed inset-y-0 left-0 rtl:left-auto rtl:right-0 z-50 flex w-[270px] flex-col border-r rtl:border-r-0 rtl:border-l border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"
                }`}>
                <div className="flex h-[78px] items-center gap-3 border-b border-[#ECECF5] px-6">
                    <div className="min-w-0 flex-1">
                        <Link href="/" aria-label={t("Go to Codo Learn Home Page", "الذهاب إلى الصفحة الرئيسية")} className="block rounded-lg transition-opacity hover:opacity-80">
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
                    <button onClick={() => setSidebarOpen(false)} className="ml-auto text-xl text-gray-400 lg:hidden" aria-label={t("Close navigation", "إغلاق القائمة")}>×</button>
                </div>

                <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
                    {navigation.map(group => (
                        <div key={group.label}>
                            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-gray-400">
                                {t(group.label, ({
                                    MAIN: "الرئيسية",
                                    PEOPLE: "الأشخاص",
                                    ACADEMY: "الأكاديمية",
                                    ACCOUNT: "الحساب",
                                } as Record<string, string>)[group.label] || group.label)}
                            </p>

                            <div className="space-y-1">
                                {group.items.map(item => {
                                    const active = activeSection === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => selectSection(item.id)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left rtl:text-right text-sm font-semibold transition ${active
                                                ? "bg-gradient-to-r from-[#869CFF]/20 to-[#E2A3FF]/20 text-[#586FD6]"
                                                : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                                                }`}
                                        >
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-lg shadow-sm">{item.icon}</span>
                                            <span className="flex-1">
                                                {t(item.label, ({
                                                    Clients: "العملاء",
                                                    Overview: "نظرة عامة",
                                                    Students: "الطلاب",
                                                    Instructors: "المدربون",
                                                    Employees: "الموظفون",
                                                    "Users & Roles": "المستخدمون والصلاحيات",
                                                    "Admin Invitations": "دعوات المسؤولين",
                                                    Courses: "الكورسات",
                                                    Services: "الخدمات",
                                                    Projects: "المشروعات",
                                                    Enrollments: "التسجيلات",
                                                    Payments: "المدفوعات",
                                                    Notifications: "الإشعارات",
                                                    "My Profile": "ملفي الشخصي",
                                                    Settings: "الإعدادات",
                                                } as Record<string, string>)[item.label] || item.label)}
                                            </span>
                                            {active && <span className="h-2 w-2 rounded-full bg-[#869CFF]" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="border-t border-[#ECECF5] p-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#F8F8FC] p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                            {profilePhoto
                                ? <img src={profilePhoto} alt="Admin" className="h-full w-full object-cover" />
                                : studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">{studentName}</p>
                            <p className="text-xs text-gray-500">{t("Administrator", "مسؤول النظام")}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="min-h-screen lg:pl-[270px] rtl:lg:pl-0 rtl:lg:pr-[270px]">
                <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-[#ECECF5] bg-white/90 px-4 backdrop-blur-xl sm:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-gray-200 px-3 py-2 text-lg lg:hidden" aria-label={t("Open navigation", "فتح القائمة")}>☰</button>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold sm:text-base">{pageTitle}</p>
                            <p className="hidden text-xs text-gray-400 sm:block">Codo Learn / {pageTitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <button
                            type="button"
                            onClick={() => setLanguage(isArabic ? "en" : "ar")}
                            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-[#586FD6] transition hover:bg-[#F8F8FC]"
                        >
                            {isArabic ? "English" : "العربية"}
                        </button>

                        <button
                            onClick={() => selectSection("notifications")}
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-lg transition hover:bg-[#F8F8FC]"
                            aria-label={t("Notifications", "الإشعارات")}
                        >
                            ♧
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E2A3FF]" />
                        </button>

                        <button onClick={() => selectSection("profile")} className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                                {profilePhoto
                                    ? <img src={profilePhoto} alt="Admin" className="h-full w-full object-cover" />
                                    : studentName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden text-left rtl:text-right sm:block">
                                <p className="text-sm font-bold">{studentName}</p>
                                <p className="text-xs text-gray-400">{t("Admin", "المسؤول")}</p>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-[1600px] p-4 sm:p-8">
                    <div className="mb-7">
                        <p className="mb-2 text-sm font-semibold text-[#7D82C8]">
                            {t("Welcome back", "مرحبًا بعودتك")}، {studentName}
                        </p>
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{pageTitle}</h2>
                        <p className="mt-2 text-sm text-gray-500">{pageDescription}</p>
                    </div>

                    {notice && (
                        <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[#869CFF]/20 bg-[#869CFF]/10 p-4 text-sm text-[#455BC1]">
                            <span>{notice}</span>
                            <button onClick={() => setNotice("")} className="font-bold" aria-label={t("Dismiss message", "إغلاق الرسالة")}>×</button>
                        </div>
                    )}


                    {/* OVERVIEW */}
                    {activeSection === "overview" && (
                        <div className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {[
                                    {
                                        label: "Total Students",
                                        value: totalRecords("students"),
                                        icon: "♙",
                                        color: "#869CFF",
                                        note: "Registered students",
                                        section: "students" as Section
                                    },
                                    {
                                        label: "Instructors",
                                        value: totalRecords("instructors"),
                                        icon: "♧",
                                        color: "#C184E5",
                                        note: "Teaching team",
                                        section: "instructors" as Section
                                    },
                                    {
                                        label: "Employees",
                                        value: totalRecords("employees"),
                                        icon: "♙",
                                        color: "#68B8A8",
                                        note: "Academy employees",
                                        section: "employees" as Section
                                    },
                                    {
                                        label: "Clients",
                                        value: totalRecords("clients"),
                                        icon: "♧",
                                        color: "#E2A3FF",
                                        note: "Registered clients",
                                        section: "clients" as Section
                                    },
                                    {
                                        label: "Courses",
                                        value: totalRecords("courses"),
                                        icon: "▤",
                                        color: "#E2A3FF",
                                        note: "All course records",
                                        section: "courses" as Section
                                    },
                                    {
                                        label: "Payments",
                                        value: totalRecords("payments"),
                                        icon: "$",
                                        color: "#E7B85C",
                                        note: "Payment records",
                                        section: "payments" as Section
                                    },
                                    {
                                        label: "Projects",
                                        value: totalRecords("projects"),
                                        icon: "▧",
                                        color: "#7D9DBD",
                                        note: "Projects and requests",
                                        section: "projects" as Section
                                    },
                                ].map(stat => (
                                    <button
                                        key={stat.label}
                                        onClick={() => selectSection(stat.section)}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-5 text-left rtl:text-right transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    {t(stat.label, ({
                                                        "Total Students": "إجمالي الطلاب",
                                                        Instructors: "المدربون",
                                                        Employees: "الموظفون",
                                                        Clients: "العملاء",
                                                        Courses: "الكورسات",
                                                        Payments: "المدفوعات",
                                                        Projects: "المشروعات",
                                                    } as Record<string, string>)[stat.label])}
                                                </p>

                                                <p className="mt-3 text-3xl font-extrabold">
                                                    {stat.value}
                                                </p>
                                            </div>

                                            <span
                                                className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold"
                                                style={{
                                                    backgroundColor: `${stat.color}25`,
                                                    color: stat.color
                                                }}
                                            >
                                                {stat.icon}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-xs text-gray-400">
                                            {t(stat.note, ({
                                                "Registered students": "الطلاب المسجلون",
                                                "Teaching team": "فريق التدريس",
                                                "Academy employees": "موظفو الأكاديمية",
                                                "Registered clients": "العملاء المسجلون",
                                                "All course records": "جميع سجلات الكورسات",
                                                "Payment records": "سجلات المدفوعات",
                                                "Projects and requests": "المشروعات والطلبات",
                                            } as Record<string, string>)[stat.note])}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            {/* باقي كود Recent Enrollments و Academy Snapshot */}
                            {/* سيظل كما هو عندك بدون أي تغيير */}

                        </div>
                    )}

                    {/* MANAGEMENT SECTIONS */}
                    {isPeopleSection && (
                        <div className="space-y-6">

                            {/* CLIENT REQUESTS */}
                            {activeSection === "clients" && (
                                <Panel>
                                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                        <div>
                                            <p className="text-sm font-bold text-[#586FD6]">{t("INCOMING REQUESTS", "الطلبات الواردة")}</p>
                                            <h3 className="mt-1 text-xl font-extrabold text-[#20243A]">{t("Client Service Requests", "طلبات خدمات العملاء")}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{t("Review requests submitted through the Client Signup form.", "راجع الطلبات المرسلة من نموذج تسجيل العملاء.")}</p>
                                        </div>
                                        <span className="w-fit rounded-full bg-[#869CFF]/10 px-4 py-2 text-sm font-bold text-[#586FD6]">{clientRequests.length} {t("requests", "طلبات")}</span>
                                    </div>
                                    {clientRequests.length === 0 ? (
                                        <div className="rounded-xl border border-dashed border-[#D9DDF0] bg-[#F8F8FC] px-5 py-10 text-center">
                                            <p className="font-semibold text-[#343B58]">{t("No client requests yet", "لا توجد طلبات عملاء حتى الآن")}</p>
                                            <p className="mt-1 text-sm text-gray-400">{t("New requests will appear here after a client submits the signup form.", "ستظهر الطلبات الجديدة هنا بعد إرسال العميل لنموذج التسجيل.")}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {clientRequests.slice().sort((left, right) => right.id - left.id).map(request => (
                                                <article key={request.id} className="rounded-2xl border border-[#ECECF5] p-5">
                                                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h4 className="text-lg font-bold text-[#20243A]">{request.companyName}</h4>
                                                                <span className="rounded-full bg-[#869CFF]/10 px-3 py-1 text-xs font-bold text-[#586FD6]">{request.serviceRequired}</span>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{request.name} · {request.email} · {request.phone}</p>
                                                            <p className="mt-1 text-xs text-gray-400">{request.industry} · {request.companySize} · {request.city}, {request.country}</p>
                                                        </div>
                                                        <div className="w-full lg:max-w-xs">
                                                            <label className="mb-2 block text-xs font-bold text-gray-500">{t("Request Status", "حالة الطلب")}</label>
                                                            <select value={request.status} onChange={event => updateClientRequestStatus(request.id, event.target.value)} className={inputClass}>
                                                                <option value="New Request">{t("New Request", "طلب جديد")}</option>
                                                                <option value="Under Review">{t("Under Review", "قيد المراجعة")}</option>
                                                                <option value="In Progress">{t("In Progress", "قيد التنفيذ")}</option>
                                                                <option value="Completed">{t("Completed", "مكتمل")}</option>
                                                                <option value="Rejected">{t("Rejected", "مرفوض")}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 rounded-xl bg-[#F8F8FC] p-4">
                                                        <p className="mb-1 text-xs font-bold text-gray-500">{t("Project Description", "وصف المشروع")}</p>
                                                        <p className="whitespace-pre-wrap text-sm leading-6 text-[#343B58]">{request.projectDescription}</p>
                                                    </div>
                                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                                        <span className="text-xs text-gray-400">{t("Submitted", "تاريخ الإرسال")}: {new Date(request.submittedAt).toLocaleString(isArabic ? "ar-EG" : "en-US")}</span>
                                                        <button type="button" onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)} className="rounded-xl border border-[#869CFF]/40 px-4 py-2 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/10">
                                                            {expandedRequestId === request.id ? t("Hide Details", "إخفاء التفاصيل") : t("View Full Details", "عرض التفاصيل كاملة")}
                                                        </button>
                                                    </div>
                                                    {expandedRequestId === request.id && (
                                                        <div className="mt-4 space-y-4 border-t border-[#ECECF5] pt-4">
                                                            <div className="grid gap-3 sm:grid-cols-2">
                                                                <div className="rounded-xl bg-[#F8F8FC] p-3"><p className="text-xs text-gray-400">{t("Country", "الدولة")}</p><p className="mt-1 text-sm font-semibold text-[#343B58]">{request.country}</p></div>
                                                                <div className="rounded-xl bg-[#F8F8FC] p-3"><p className="text-xs text-gray-400">{t("City", "المدينة")}</p><p className="mt-1 text-sm font-semibold text-[#343B58]">{request.city}</p></div>
                                                                <div className="rounded-xl bg-[#F8F8FC] p-3"><p className="text-xs text-gray-400">{t("Industry", "مجال الشركة")}</p><p className="mt-1 text-sm font-semibold text-[#343B58]">{request.industry}</p></div>
                                                                <div className="rounded-xl bg-[#F8F8FC] p-3"><p className="text-xs text-gray-400">{t("Company Size", "حجم الشركة")}</p><p className="mt-1 text-sm font-semibold text-[#343B58]">{request.companySize}</p></div>
                                                            </div>
                                                            {request.companyWebsite && <p className="text-sm"><span className="font-semibold text-gray-500">{t("Website", "الموقع الإلكتروني")}: </span><a href={request.companyWebsite} target="_blank" rel="noreferrer" className="text-[#586FD6] hover:underline">{request.companyWebsite}</a></p>}
                                                            <div>
                                                                <label className="mb-2 block text-sm font-bold text-[#343B58]">{t("Internal Admin Notes", "ملاحظات داخلية للأدمن")}</label>
                                                                <textarea rows={4} value={request.adminNotes ?? ""} onChange={event => updateClientRequestNotes(request.id, event.target.value)} placeholder={t("Add follow-up notes, decisions, or project details...", "أضف ملاحظات المتابعة أو القرارات أو تفاصيل المشروع...")} className={inputClass + " resize-y"} />
                                                                <p className="mt-1 text-xs text-gray-400">{t("Notes are private to this admin dashboard demo and are saved in this browser.", "الملاحظات داخل لوحة الأدمن التجريبية فقط ويتم حفظها في هذا المتصفح.")}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </article>
                                            ))}
                                        </div>
                                    )}
                                </Panel>
                            )}

                            {/* CLIENT FORM */}
                            {activeSection === "clients" && (
                                <Panel className="!p-0 overflow-hidden">
                                    {/* Header */}
                                    <div className="relative overflow-hidden border-b border-[#ECECF5] bg-gradient-to-r from-[#869CFF]/10 to-[#E2A3FF]/10 p-6 sm:p-8">
                                        <div className="relative z-10">
                                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#869CFF]/15 px-3 py-1.5 text-xs font-bold text-[#586FD6]">
                                                <span>✦</span>
                                                {t("CLIENT MANAGEMENT", "إدارة العملاء")}
                                            </div>

                                            <h3 className="mt-2 text-2xl font-extrabold text-[#20243A] sm:text-3xl">
                                                {t("Add New Client", "إضافة عميل جديد")}
                                            </h3>

                                            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                                {t(
                                                    "Create a complete client profile and manage businesses interested in Codo Learn digital solutions.",
                                                    "أنشئ ملفًا متكاملًا للعميل وقم بإدارة الشركات المهتمة بخدمات وحلول Codo Learn الرقمية."
                                                )}
                                            </p>
                                        </div>

                                        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#869CFF]/10 blur-2xl" />
                                        <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#E2A3FF]/10 blur-2xl" />
                                    </div>

                                    <form onSubmit={handleAddClient} className="space-y-8 p-5 sm:p-8">

                                        <p className="text-xs text-gray-400">
                                            {t("Fields marked with", "الحقول التي تحمل علامة")}{" "}
                                            <span className="text-rose-500">*</span>{" "}
                                            {t("are required.", "مطلوبة.")}
                                        </p>

                                        {/* SECTION 01 - Contact Information */}
                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">
                                                    01
                                                </span>

                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">
                                                        {t("Contact Information", "معلومات التواصل")}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        {t(
                                                            "Basic information about the client.",
                                                            "المعلومات الأساسية الخاصة بالعميل."
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Full Name", "الاسم بالكامل")} *
                                                    </label>
                                                    <input
                                                        required
                                                        value={clientName}
                                                        onChange={e => setClientName(e.target.value)}
                                                        placeholder={t("Enter client's full name", "أدخل اسم العميل بالكامل")}
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Email Address", "البريد الإلكتروني")} *
                                                    </label>
                                                    <input
                                                        required
                                                        type="email"
                                                        value={clientEmail}
                                                        onChange={e => setClientEmail(e.target.value)}
                                                        placeholder="client@example.com"
                                                        className={inputClass}
                                                        dir="ltr"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Phone Number", "رقم الهاتف")} *
                                                    </label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        value={clientPhone}
                                                        onChange={e => setClientPhone(e.target.value)}
                                                        placeholder="+20 100 000 0000"
                                                        className={inputClass}
                                                        dir="ltr"
                                                    />
                                                </div>

                                            </div>
                                        </section>

                                        <div className="border-t border-gray-100" />

                                        {/* SECTION 02 - Company Information */}
                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9864C5]">
                                                    02
                                                </span>

                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">
                                                        {t("Company Information", "معلومات الشركة")}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        {t(
                                                            "Business details and company profile.",
                                                            "بيانات النشاط التجاري وملف الشركة."
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Company Name", "اسم الشركة")} *
                                                    </label>
                                                    <input
                                                        required
                                                        value={clientCompany}
                                                        onChange={e => setClientCompany(e.target.value)}
                                                        placeholder={t("Enter company name", "أدخل اسم الشركة")}
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Company Website", "الموقع الإلكتروني للشركة")}
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={clientWebsite}
                                                        onChange={e => setClientWebsite(e.target.value)}
                                                        placeholder="https://example.com"
                                                        className={inputClass}
                                                        dir="ltr"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Industry", "مجال العمل")} *
                                                    </label>
                                                    <select
                                                        required
                                                        value={clientIndustry}
                                                        onChange={e => setClientIndustry(e.target.value)}
                                                        className={inputClass}
                                                    >
                                                        <option value="">
                                                            {t("Select Industry", "اختر مجال العمل")}
                                                        </option>
                                                        <option value="Technology">
                                                            {t("Technology", "التكنولوجيا")}
                                                        </option>
                                                        <option value="Education">
                                                            {t("Education", "التعليم")}
                                                        </option>
                                                        <option value="Healthcare">
                                                            {t("Healthcare", "الرعاية الصحية")}
                                                        </option>
                                                        <option value="E-Commerce">
                                                            {t("E-Commerce", "التجارة الإلكترونية")}
                                                        </option>
                                                        <option value="Finance">
                                                            {t("Finance", "التمويل")}
                                                        </option>
                                                        <option value="Marketing">
                                                            {t("Marketing", "التسويق")}
                                                        </option>
                                                        <option value="Other">
                                                            {t("Other", "أخرى")}
                                                        </option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Company Size", "حجم الشركة")}
                                                    </label>
                                                    <select
                                                        value={clientCompanySize}
                                                        onChange={e => setClientCompanySize(e.target.value)}
                                                        className={inputClass}
                                                    >
                                                        <option value="1-10 Employees">
                                                            {t("1-10 Employees", "من 1 إلى 10 موظفين")}
                                                        </option>
                                                        <option value="11-50 Employees">
                                                            {t("11-50 Employees", "من 11 إلى 50 موظفًا")}
                                                        </option>
                                                        <option value="51-200 Employees">
                                                            {t("51-200 Employees", "من 51 إلى 200 موظف")}
                                                        </option>
                                                        <option value="201-500 Employees">
                                                            {t("201-500 Employees", "من 201 إلى 500 موظف")}
                                                        </option>
                                                        <option value="500+ Employees">
                                                            {t("500+ Employees", "أكثر من 500 موظف")}
                                                        </option>
                                                    </select>
                                                </div>

                                            </div>
                                        </section>

                                        <div className="border-t border-gray-100" />

                                        {/* SECTION 03 - Service Requirements */}
                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">
                                                    03
                                                </span>

                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">
                                                        {t("Service Requirements", "متطلبات الخدمة")}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        {t(
                                                            "Choose the service requested by the client.",
                                                            "حدد الخدمة التي يحتاجها العميل."
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-5">

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Required Service", "الخدمة المطلوبة")} *
                                                    </label>
                                                    <select
                                                        required
                                                        value={clientService}
                                                        onChange={e => setClientService(e.target.value)}
                                                        className={inputClass}
                                                    >
                                                        <option value="Web Development">
                                                            {t("Web Development", "تطوير المواقع")}
                                                        </option>
                                                        <option value="Mobile Applications">
                                                            {t("Mobile Applications", "تطبيقات الموبايل")}
                                                        </option>
                                                        <option value="UI/UX Design">
                                                            {t("UI/UX Design", "تصميم UI/UX")}
                                                        </option>
                                                        <option value="E-Commerce">
                                                            {t("E-Commerce", "التجارة الإلكترونية")}
                                                        </option>
                                                        <option value="Software Solutions">
                                                            {t("Software Solutions", "الحلول البرمجية")}
                                                        </option>
                                                        <option value="Digital Transformation">
                                                            {t("Digital Transformation", "التحول الرقمي")}
                                                        </option>
                                                        <option value="Multiple Services">
                                                            {t("Multiple Services", "أكثر من خدمة")}
                                                        </option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                        {t("Project Description", "وصف المشروع")} *
                                                    </label>
                                                    <textarea
                                                        required
                                                        rows={5}
                                                        value={clientDescription}
                                                        onChange={e => setClientDescription(e.target.value)}
                                                        placeholder={t(
                                                            "Describe the client's project, goals and requirements...",
                                                            "اكتب تفاصيل المشروع وأهداف العميل والمتطلبات..."
                                                        )}
                                                        className={`${inputClass} resize-y`}
                                                    />
                                                </div>

                                            </div>
                                        </section>

                                        <div className="border-t border-gray-100" />

                                        {/* SECTION 04 - Account Settings */}
                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9864C5]">
                                                    04
                                                </span>

                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">
                                                        {t("Account Settings", "إعدادات الحساب")}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        {t(
                                                            "Configure the client's account status.",
                                                            "حدد حالة حساب العميل."
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="max-w-md">
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Client Status", "حالة العميل")}
                                                </label>

                                                <select
                                                    value={clientStatus}
                                                    onChange={e => setClientStatus(e.target.value)}
                                                    className={inputClass}
                                                >
                                                    <option value="Active">
                                                        {t("Active", "نشط")}
                                                    </option>
                                                    <option value="Pending">
                                                        {t("Pending", "قيد الانتظار")}
                                                    </option>
                                                    <option value="Inactive">
                                                        {t("Inactive", "غير نشط")}
                                                    </option>
                                                </select>
                                            </div>
                                        </section>

                                        {/* Buttons */}
                                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">

                                            <button
                                                type="submit"
                                                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-7 py-3.5 font-bold text-white shadow-md shadow-[#869CFF]/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                                            >
                                                + {t("Add Client", "إضافة العميل")}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setClientName("");
                                                    setClientEmail("");
                                                    setClientPhone("");
                                                    setClientCompany("");
                                                    setClientWebsite("");
                                                    setClientIndustry("");
                                                    setClientCompanySize("1-10 Employees");
                                                    setClientService("Web Development");
                                                    setClientDescription("");
                                                    setClientStatus("Active");
                                                    setNotice("");
                                                }}
                                                className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                {t("Clear Form", "مسح النموذج")}
                                            </button>

                                        </div>
                                    </form>
                                </Panel>
                            )}


                            {/* INSTRUCTOR FORM */}
                            {activeSection === "instructors" && (
                                <Panel className="!p-0 overflow-hidden">
                                    <div className="relative overflow-hidden border-b border-[#ECECF5] bg-gradient-to-r from-[#869CFF]/10 to-[#E2A3FF]/10 p-6 sm:p-8">
                                        <div className="relative z-10">
                                            <p className="text-xs font-bold tracking-[0.2em] text-[#7587E8]">
                                                {t("INSTRUCTOR MANAGEMENT", "إدارة المدربين")}
                                            </p>
                                            <h3 className="mt-2 text-2xl font-extrabold text-[#20243A] sm:text-3xl">
                                                {t("Add New Instructor", "إضافة مدرب جديد")}
                                            </h3>
                                            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                                {t(
                                                    "Create a complete professional profile and add a new instructor to the Codo Learn teaching team.",
                                                    "أنشئ ملفًا مهنيًا متكاملًا وأضف مدربًا جديدًا إلى فريق التدريس في Codo Learn."
                                                )}
                                            </p>
                                        </div>
                                        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#E2A3FF]/15 blur-2xl" />
                                    </div>

                                    <form onSubmit={handleAddInstructor} className="space-y-8 p-5 sm:p-8">
                                        <p className="text-xs text-gray-400">
                                            {t("Fields marked with", "الحقول التي تحمل علامة")} <span className="text-rose-500">*</span> {t("are required.", "مطلوبة.")}
                                        </p>

                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">01</span>
                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">{t("Personal Information", "المعلومات الشخصية")}</h4>
                                                    <p className="text-xs text-gray-400">{t("Instructor's basic contact and location details.", "بيانات التواصل والموقع الأساسية للمدرب.")}</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Full Name", "الاسم بالكامل")} *</label><input required value={instructorName} onChange={e => setInstructorName(e.target.value)} placeholder={t("Enter instructor's full name", "أدخل اسم المدرب بالكامل")} className={inputClass} /></div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Email Address", "البريد الإلكتروني")} *</label><input required type="email" autoComplete="off" value={instructorEmail} onChange={e => setInstructorEmail(e.target.value)} placeholder="instructor@example.com" className={inputClass} /></div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Phone Number", "رقم الهاتف")} *</label><input required type="tel" value={instructorPhone} onChange={e => setInstructorPhone(e.target.value)} placeholder="+20 100 000 0000" className={inputClass} /></div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Country", "الدولة")} *</label>
                                                    <select value={instructorCountry} onChange={e => setInstructorCountry(e.target.value)} className={inputClass}>
                                                        <option value="Egypt">{t("Egypt", "مصر")}</option>
                                                        <option value="Saudi Arabia">{t("Saudi Arabia", "السعودية")}</option>
                                                        <option value="UAE">{t("United Arab Emirates", "الإمارات العربية المتحدة")}</option>
                                                        <option value="Kuwait">{t("Kuwait", "الكويت")}</option>
                                                        <option value="Jordan">{t("Jordan", "الأردن")}</option>
                                                        <option value="Other">{t("Other", "أخرى")}</option>
                                                    </select>
                                                </div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("City", "المدينة")} *</label><input required value={instructorCity} onChange={e => setInstructorCity(e.target.value)} placeholder={t("Enter city", "أدخل المدينة")} className={inputClass} /></div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("LinkedIn Profile", "حساب LinkedIn")}</label><input type="url" value={instructorLinkedIn} onChange={e => setInstructorLinkedIn(e.target.value)} placeholder="https://linkedin.com/in/username" className={inputClass} /></div>
                                            </div>
                                        </section>

                                        <div className="border-t border-gray-100" />

                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9864C5]">02</span>
                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">{t("Professional Information", "المعلومات المهنية")}</h4>
                                                    <p className="text-xs text-gray-400">{t("Teaching specialization, experience and professional background.", "التخصص والخبرة والخلفية المهنية للمدرب.")}</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Specialization", "التخصص")} *</label>
                                                    <select required value={instructorSpecialty} onChange={e => setInstructorSpecialty(e.target.value)} className={inputClass}>
                                                        <option value="Frontend">{t("Frontend Development", "تطوير الواجهات الأمامية")}</option>
                                                        <option value="Backend">{t("Backend Development", "تطوير الواجهات الخلفية")}</option>
                                                        <option value="Full Stack">{t("Full Stack Development", "تطوير Full Stack")}</option>
                                                        <option value="UI/UX">{t("UI/UX Design", "تصميم UI/UX")}</option>
                                                        <option value="Mobile">{t("Mobile Development", "تطوير تطبيقات الموبايل")}</option>
                                                        <option value="AI">{t("Artificial Intelligence", "الذكاء الاصطناعي")}</option>
                                                        <option value="Data Science">{t("Data Science", "علوم البيانات")}</option>
                                                        <option value="Cybersecurity">{t("Cybersecurity", "الأمن السيبراني")}</option>
                                                        <option value="Cloud Computing">{t("Cloud Computing", "الحوسبة السحابية")}</option>
                                                        <option value="Other">{t("Other", "أخرى")}</option>
                                                    </select>
                                                </div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Current Job Title", "المسمى الوظيفي الحالي")} *</label><input required value={instructorJobTitle} onChange={e => setInstructorJobTitle(e.target.value)} placeholder="e.g. Senior Frontend Developer" className={inputClass} /></div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Years of Experience", "سنوات الخبرة")}</label>
                                                    <select value={instructorExperience} onChange={e => setInstructorExperience(e.target.value)} className={inputClass}>
                                                        <option value="Less than 1 year">{t("Less than 1 year", "أقل من سنة")}</option>
                                                        <option value="1-3 years">{t("1–3 years", "من سنة إلى 3 سنوات")}</option>
                                                        <option value="4-6 years">{t("4–6 years", "من 4 إلى 6 سنوات")}</option>
                                                        <option value="7-10 years">{t("7–10 years", "من 7 إلى 10 سنوات")}</option>
                                                        <option value="More than 10 years">{t("More than 10 years", "أكثر من 10 سنوات")}</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Education Level", "المستوى التعليمي")}</label>
                                                    <select value={instructorEducation} onChange={e => setInstructorEducation(e.target.value)} className={inputClass}>
                                                        <option value="Bachelor's Degree">{t("Bachelor's Degree", "بكالوريوس")}</option>
                                                        <option value="Master's Degree">{t("Master's Degree", "ماجستير")}</option>
                                                        <option value="PhD">{t("PhD", "دكتوراه")}</option>
                                                        <option value="Diploma">{t("Diploma", "دبلومة")}</option>
                                                        <option value="Professional Certification">{t("Professional Certification", "شهادة مهنية")}</option>
                                                        <option value="Other">{t("Other", "أخرى")}</option>
                                                    </select>
                                                </div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Certifications", "الشهادات")}</label><input value={instructorCertifications} onChange={e => setInstructorCertifications(e.target.value)} placeholder="e.g. AWS, Meta, Google certificates" className={inputClass} /></div>
                                                <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Portfolio / Website", "معرض الأعمال / الموقع")}</label><input type="url" value={instructorPortfolio} onChange={e => setInstructorPortfolio(e.target.value)} placeholder="https://yourportfolio.com" className={inputClass} /></div>
                                                <div className="md:col-span-2">
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Professional Bio", "نبذة مهنية")}</label>
                                                    <textarea rows={4} value={instructorBio} onChange={e => setInstructorBio(e.target.value)} placeholder={t("Write a short introduction about the instructor's experience and teaching background...", "اكتب نبذة مختصرة عن خبرة المدرب وخلفيته في التدريس...")} className={`${inputClass} resize-y`} />
                                                </div>
                                            </div>
                                        </section>

                                        <div className="border-t border-gray-100" />

                                        <section>
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">03</span>
                                                <div>
                                                    <h4 className="font-bold text-[#20243A]">{t("Profile & Account Settings", "إعدادات الملف الشخصي والحساب")}</h4>
                                                    <p className="text-xs text-gray-400">{t("Set the instructor's profile image and account status.", "حدد صورة الملف الشخصي وحالة حساب المدرب.")}</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Profile Image", "الصورة الشخصية")}</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={e => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            if (file.size > 5 * 1024 * 1024) {
                                                                setNotice(t("Image must be smaller than 5 MB.", "يجب أن يكون حجم الصورة أقل من 5 ميجابايت."));
                                                                e.target.value = "";
                                                                return;
                                                            }
                                                            const reader = new FileReader();
                                                            reader.onload = () => {
                                                                if (typeof reader.result === "string") setInstructorImage(reader.result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                        className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-3 py-3 text-sm"
                                                    />
                                                    <p className="mt-2 text-xs text-gray-400">{t("Supported image files up to 5 MB.", "الصور المدعومة حتى 5 ميجابايت.")}</p>
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Account Status", "حالة الحساب")}</label>
                                                    <select value={instructorStatus} onChange={e => setInstructorStatus(e.target.value)} className={inputClass}>
                                                        <option value="Active">{t("Active", "نشط")}</option>
                                                        <option value="Pending">{t("Pending", "قيد الانتظار")}</option>
                                                        <option value="Inactive">{t("Inactive", "غير نشط")}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {instructorImage && (
                                                <div className="mt-5 flex items-center gap-4 rounded-xl border border-gray-100 bg-[#F8F8FC] p-3">
                                                    <img src={instructorImage} alt="Instructor profile preview" className="h-16 w-16 rounded-xl border border-gray-200 object-cover" />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-semibold text-[#20243A]">{t("Profile image preview", "معاينة الصورة الشخصية")}</p>
                                                        <p className="text-xs text-gray-400">{t("This image will be included in the instructor record.", "ستتم إضافة هذه الصورة إلى سجل المدرب.")}</p>
                                                    </div>
                                                    <button type="button" onClick={() => setInstructorImage("")} className="text-sm font-semibold text-red-500 hover:text-red-600">{t("Remove", "إزالة")}</button>
                                                </div>
                                            )}
                                        </section>

                                        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                                            <button type="submit" className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-7 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90">
                                                + {t("Add Instructor", "إضافة المدرب")}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setInstructorName("");
                                                    setInstructorEmail("");
                                                    setInstructorPhone("");
                                                    setInstructorCountry("Egypt");
                                                    setInstructorCity("");
                                                    setInstructorLinkedIn("");
                                                    setInstructorSpecialty("Frontend");
                                                    setInstructorJobTitle("");
                                                    setInstructorExperience("1-3 years");
                                                    setInstructorEducation("Bachelor's Degree");
                                                    setInstructorCertifications("");
                                                    setInstructorPortfolio("");
                                                    setInstructorBio("");
                                                    setInstructorImage("");
                                                    setInstructorStatus("Active");
                                                    setNotice("");
                                                }}
                                                className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                {t("Clear Form", "مسح النموذج")}
                                            </button>
                                        </div>
                                    </form>
                                </Panel>
                            )}

                            {/* EMPLOYEE FORM */}
                            {activeSection === "employees" && (
                                <Panel>
                                    <div className="mb-6 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-[#869CFF]">{t("TEAM MANAGEMENT", "إدارة الفريق")}</p>
                                            <h3 className="mt-1 text-xl font-bold text-[#20243A]">{t("Add New Employee", "إضافة موظف جديد")}</h3>
                                            <p className="mt-2 text-sm text-gray-500">{t("Add an employee to your Codo Learn team.", "أضف موظفًا إلى فريق Codo Learn.")}</p>
                                        </div>
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E2A3FF]/20 text-2xl font-bold text-[#586FD6]">+</div>
                                    </div>

                                    <form onSubmit={handleAddEmployee} className="space-y-5">
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Full Name", "الاسم بالكامل")} *</label><input required value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)} placeholder={t("Enter employee's full name", "أدخل اسم الموظف بالكامل")} className={inputClass} /></div>
                                            <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Email Address", "البريد الإلكتروني")} *</label><input required type="email" value={newEmployeeEmail} onChange={e => setNewEmployeeEmail(e.target.value)} placeholder="employee@example.com" className={inputClass} /></div>
                                            <div><label className="mb-2 block text-sm font-semibold text-gray-700">{t("Phone Number", "رقم الهاتف")}</label><input type="tel" value={newEmployeePhone} onChange={e => setNewEmployeePhone(e.target.value)} placeholder={t("Enter phone number", "أدخل رقم الهاتف")} className={inputClass} /></div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Job Position", "المسمى الوظيفي")} *</label>
                                                <select required value={newEmployeePosition} onChange={e => setNewEmployeePosition(e.target.value)} className={inputClass}>
                                                    <option value="HR">{t("Human Resources (HR)", "الموارد البشرية")}</option>
                                                    <option value="Marketing">{t("Marketing", "التسويق")}</option>
                                                    <option value="Accountant">{t("Accountant", "محاسب")}</option>
                                                    <option value="Sales">{t("Sales", "المبيعات")}</option>
                                                    <option value="Customer Support">{t("Customer Support", "خدمة العملاء")}</option>
                                                    <option value="Content Creator">{t("Content Creator", "صانع محتوى")}</option>
                                                    <option value="Graphic Designer">{t("Graphic Designer", "مصمم جرافيك")}</option>
                                                    <option value="Software Developer">{t("Software Developer", "مطور برمجيات")}</option>
                                                    <option value="Other">{t("Other", "أخرى")}</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">{t("Account Status", "حالة الحساب")}</label>
                                                <select value={newEmployeeStatus} onChange={e => setNewEmployeeStatus(e.target.value)} className={inputClass}>
                                                    <option value="Active">{t("Active", "نشط")}</option>
                                                    <option value="Inactive">{t("Inactive", "غير نشط")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                                            <button type="submit" className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90">
                                                + {t("Add Employee", "إضافة الموظف")}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNewEmployeeName("");
                                                    setNewEmployeeEmail("");
                                                    setNewEmployeePhone("");
                                                    setNewEmployeePosition("HR");
                                                    setNewEmployeeStatus("Active");
                                                }}
                                                className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                {t("Clear Form", "مسح النموذج")}
                                            </button>
                                        </div>
                                    </form>
                                </Panel>
                            )}

                            {/* DIGITAL SOLUTIONS FORM */}
                            {activeSection === "services" && (
                                <Panel className="!p-0 overflow-hidden">
                                    <div className="border-b border-[#ECECF5] bg-gradient-to-r from-[#869CFF]/10 to-[#E2A3FF]/10 p-6 sm:p-8">
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#869CFF]/15 px-3 py-1.5 text-xs font-bold text-[#586FD6]">
                                            <span>✦</span>
                                            {t("DIGITAL SOLUTIONS", "الحلول الرقمية")}
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-[#20243A]">
                                            {t("Add a Digital Solution", "إضافة حل رقمي جديد")}
                                        </h3>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                            {t(
                                                "Create and organize the services offered by Codo Learn. Choose a clear category so clients can find the right solution.",
                                                "أضف ونظّم الخدمات التي تقدمها Codo Learn، واختر تصنيفًا واضحًا ليسهل على العملاء العثور على الحل المناسب."
                                            )}
                                        </p>
                                    </div>

                                    <form onSubmit={handleAddService} className="space-y-6 p-6 sm:p-8">
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Service Name", "اسم الخدمة")} *
                                                </label>
                                                <input
                                                    required
                                                    value={serviceName}
                                                    onChange={e => setServiceName(e.target.value)}
                                                    placeholder={t("e.g. Business Website Development", "مثال: تطوير موقع شركة")}
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Digital Solution Category", "تصنيف الحل الرقمي")} *
                                                </label>
                                                <select
                                                    required
                                                    value={serviceCategory}
                                                    onChange={e => setServiceCategory(e.target.value)}
                                                    className={inputClass}
                                                >
                                                    {digitalSolutionCategories.map(category => (
                                                        <option key={category.value} value={category.value}>
                                                            {isArabic ? category.arLabel : category.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Starting Price / Pricing Note", "السعر المبدئي / ملاحظة التسعير")}
                                                </label>
                                                <input
                                                    value={servicePrice}
                                                    onChange={e => setServicePrice(e.target.value)}
                                                    placeholder={t("e.g. Starting from $500 or Custom quote", "مثال: يبدأ من 500 دولار أو حسب الطلب")}
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Estimated Delivery Time", "مدة التنفيذ المتوقعة")}
                                                </label>
                                                <input
                                                    value={serviceDeliveryTime}
                                                    onChange={e => setServiceDeliveryTime(e.target.value)}
                                                    placeholder={t("e.g. 2-4 weeks", "مثال: من أسبوعين إلى 4 أسابيع")}
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Service Description", "وصف الخدمة")} *
                                                </label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={serviceDescription}
                                                    onChange={e => setServiceDescription(e.target.value)}
                                                    placeholder={t(
                                                        "Describe what this service includes and the value it provides to clients...",
                                                        "اكتب تفاصيل الخدمة وما تتضمنه والقيمة التي تقدمها للعميل..."
                                                    )}
                                                    className={`${inputClass} resize-y`}
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    {t("Service Status", "حالة الخدمة")}
                                                </label>
                                                <select
                                                    value={serviceStatus}
                                                    onChange={e => setServiceStatus(e.target.value)}
                                                    className={inputClass}
                                                >
                                                    <option value="Active">{t("Active", "نشطة")}</option>
                                                    <option value="Inactive">{t("Inactive", "غير نشطة")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                                            <button
                                                type="submit"
                                                className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-7 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90"
                                            >
                                                + {t("Add Digital Solution", "إضافة الحل الرقمي")}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setServiceName("");
                                                    setServiceCategory("Web Development");
                                                    setServiceDescription("");
                                                    setServicePrice("");
                                                    setServiceDeliveryTime("");
                                                    setServiceStatus("Active");
                                                }}
                                                className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                {t("Clear Form", "مسح النموذج")}
                                            </button>
                                        </div>
                                    </form>
                                </Panel>
                            )}

                            {/* COURSE FORM */}
                            {activeSection === "courses" && (
                                <Panel>
                                    <h3 className="mb-4 font-bold">{t("Create a Course", "إنشاء كورس")}</h3>
                                    <form onSubmit={handleAddCourse} className="grid gap-3 md:grid-cols-[1fr_200px_auto]">
                                        <input value={courseName} onChange={e => setCourseName(e.target.value)} required placeholder={t("Course name", "اسم الكورس")} className={inputClass} />
                                        <select value={courseCategory} onChange={e => setCourseCategory(e.target.value)} className={inputClass}>
                                            <option>Frontend</option>
                                            <option>Backend</option>
                                            <option>Mobile Development</option>
                                            <option>Design</option>
                                            <option>Data Science</option>
                                            <option>Other</option>
                                        </select>
                                        <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]">
                                            + {t("Add Course", "إضافة الكورس")}
                                        </button>
                                    </form>
                                    <p className="mt-3 text-xs text-gray-400">
                                        {t(
                                            "This demo form needs a course description to create a record; you can add it to the form if needed.",
                                            "يحتاج هذا النموذج التجريبي إلى وصف للكورس لإنشاء سجل؛ يمكنك إضافة الوصف إلى النموذج عند الحاجة."
                                        )}
                                    </p>
                                </Panel>
                            )}

                            {/* ADMIN INVITATIONS */}
                            {activeSection === "invitations" && (
                                <Panel>
                                    <h3 className="mb-4 font-bold">{t("Invite an Administrator", "دعوة مسؤول جديد")}</h3>
                                    <form onSubmit={handleInviteAdmin} className="flex flex-col gap-3 sm:flex-row">
                                        <input type="email" required value={invitationEmail} onChange={e => setInvitationEmail(e.target.value)} placeholder={t("Enter administrator email", "أدخل البريد الإلكتروني للمسؤول")} className={`min-w-0 flex-1 ${inputClass}`} />
                                        <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">
                                            + {t("Create Invitation", "إنشاء دعوة")}
                                        </button>
                                    </form>
                                    <p className="mt-3 text-xs text-gray-400">
                                        {t("Demo only: this adds a pending invitation record. No email is sent.", "نسخة تجريبية فقط: تتم إضافة دعوة قيد الانتظار، ولا يتم إرسال بريد إلكتروني.")}
                                    </p>
                                </Panel>
                            )}

                            {/* NOTIFICATIONS */}
                            {activeSection === "notifications" && (
                                <Panel>
                                    <h3 className="mb-4 font-bold">{t("Create Announcement", "إنشاء إعلان")}</h3>
                                    <form onSubmit={handleAnnouncement} className="flex flex-col gap-3 sm:flex-row">
                                        <input required value={announcement} onChange={e => setAnnouncement(e.target.value)} placeholder={t("Announcement title or message", "عنوان الإعلان أو الرسالة")} className={`min-w-0 flex-1 ${inputClass}`} />
                                        <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">
                                            + {t("Publish", "نشر")}
                                        </button>
                                    </form>
                                </Panel>
                            )}

                            {/* RECORDS TABLE */}
                            <Panel className="!p-0">
                                <div className="flex flex-col gap-4 border-b border-[#ECECF5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                    <div>
                                        <h3 className="font-bold">{pageTitle}</h3>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {filteredRows.length} {t("records found", "سجل تم العثور عليه")}
                                        </p>
                                    </div>
                                    <div className="relative w-full sm:max-w-xs">
                                        <span className={`absolute ${isArabic ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-gray-400`}>⌕</span>
                                        <input
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            placeholder={searchPlaceholder}
                                            className={`w-full rounded-xl border border-gray-200 py-3 ${isArabic ? "pr-9 pl-4" : "pl-9 pr-4"} text-sm outline-none focus:border-[#869CFF]`}
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[720px] text-left rtl:text-right text-sm">
                                        <thead className="bg-[#F8F8FC] text-xs uppercase tracking-wide text-gray-400">
                                            <tr>
                                                <th className="px-6 py-4">{t("Name / Record", "الاسم / السجل")}</th>
                                                <th className="px-6 py-4">{t("Details", "التفاصيل")}</th>
                                                <th className="px-6 py-4">{t("Status", "الحالة")}</th>
                                                <th className="px-6 py-4">{t("Date / Amount", "التاريخ / المبلغ")}</th>
                                                <th className="px-6 py-4 text-right rtl:text-left">{t("Actions", "الإجراءات")}</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {filteredRows.map(item => (
                                                <tr key={item.id} className="transition hover:bg-[#FAFAFE]">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 font-bold text-[#586FD6]">
                                                                {item.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-[#25243A]">{item.name}</p>
                                                                {item.email && <p className="mt-1 text-xs text-gray-400" dir="ltr">{item.email}</p>}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="max-w-[300px] px-6 py-4 text-gray-500">
                                                        {activeSection === "clients" ? (
                                                            <div className="space-y-2">

                                                                {/* Company */}
                                                                {item.companyName && (
                                                                    <p className="font-semibold text-[#20243A]">
                                                                        <span className="text-gray-400">
                                                                            {t("Company:", "الشركة:")}
                                                                        </span>{" "}
                                                                        {item.companyName}
                                                                    </p>
                                                                )}

                                                                {/* Industry */}
                                                                {item.industry && (
                                                                    <p className="text-xs">
                                                                        <span className="font-semibold">
                                                                            {t("Industry:", "المجال:")}
                                                                        </span>{" "}
                                                                        {item.industry}
                                                                    </p>
                                                                )}

                                                                {/* Company Size */}
                                                                {item.companySize && (
                                                                    <p className="text-xs">
                                                                        <span className="font-semibold">
                                                                            {t("Company Size:", "حجم الشركة:")}
                                                                        </span>{" "}
                                                                        {item.companySize}
                                                                    </p>
                                                                )}

                                                                {/* Required Service */}
                                                                {item.serviceRequired && (
                                                                    <div className="mt-2">
                                                                        <span className="inline-flex rounded-lg bg-[#869CFF]/10 px-3 py-1.5 text-xs font-semibold text-[#586FD6]">
                                                                            {item.serviceRequired}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {/* Website */}
                                                                {item.companyWebsite && (
                                                                    <a
                                                                        href={item.companyWebsite}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        dir="ltr"
                                                                        className="block break-all text-xs text-[#586FD6] hover:underline"
                                                                    >
                                                                        {item.companyWebsite}
                                                                    </a>
                                                                )}

                                                                {/* Project Description */}
                                                                {item.projectDescription && (
                                                                    <p className="max-w-[280px] text-xs leading-5 text-gray-400">
                                                                        {item.projectDescription}
                                                                    </p>
                                                                )}

                                                            </div>
                                                        ) : activeSection === "services" ? (
                                                            <div className="max-w-[320px] space-y-2">
                                                                <span className="inline-flex rounded-lg bg-[#869CFF]/10 px-3 py-1.5 text-xs font-semibold text-[#586FD6]">
                                                                    {digitalSolutionCategories.find(category => category.value === item.category)
                                                                        ? (isArabic
                                                                            ? digitalSolutionCategories.find(category => category.value === item.category)?.arLabel
                                                                            : item.category)
                                                                        : item.category || t("Uncategorized", "غير مصنف")}
                                                                </span>
                                                                {item.description && (
                                                                    <p className="text-xs leading-5 text-gray-500">{item.description}</p>
                                                                )}
                                                                {item.deliveryTime && (
                                                                    <p className="text-xs text-gray-400">
                                                                        <span className="font-semibold">{t("Delivery:", "مدة التنفيذ:")}</span>{" "}
                                                                        {item.deliveryTime}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ) : activeSection === "users" ? (
                                                            <select
                                                                value={item.role || "Student"}
                                                                onChange={e => {
                                                                    updateRecord("users", item.id, {
                                                                        role: e.target.value
                                                                    });

                                                                    setNotice(t(
                                                                        "User role updated in this demo.",
                                                                        "تم تحديث صلاحية المستخدم في النسخة التجريبية."
                                                                    ));
                                                                }}
                                                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#869CFF]"
                                                            >
                                                                <option value="Student">{t("Student", "طالب")}</option>
                                                                <option value="Instructor">{t("Instructor", "مدرب")}</option>
                                                                <option value="Client">{t("Client", "عميل")}</option>
                                                                <option value="Employee">{t("Employee", "موظف")}</option>
                                                                <option value="Admin">{t("Admin", "مسؤول")}</option>
                                                            </select>
                                                        ) : (
                                                            <div>
                                                                <p>
                                                                    {item.position || item.category || item.role || "—"}
                                                                </p>

                                                                {item.phone && (
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        {item.phone}
                                                                    </p>
                                                                )}

                                                                {item.description && (
                                                                    <p className="mt-1 truncate text-xs text-gray-400">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">
                                                        {activeSection === "services"
                                                            ? item.price || "—"
                                                            : activeSection === "clients"
                                                                ? item.date || "—"
                                                                : item.amount || item.date || "—"}
                                                    </td>

                                                    <td className="px-6 py-4 text-gray-500">{item.amount || item.date || "—"}</td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {activeSection === "courses" && (
                                                                <button
                                                                    onClick={() => {
                                                                        const next = item.status === "Published" ? "Unpublished" : "Published";
                                                                        updateRecord("courses", item.id, { status: next });
                                                                        setNotice(t(
                                                                            `Course status changed to ${next}.`,
                                                                            `تم تغيير حالة الكورس إلى ${next === "Published" ? "منشور" : "غير منشور"}.`
                                                                        ));
                                                                    }}
                                                                    className="rounded-lg border border-[#869CFF]/30 px-3 py-2 text-xs font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                                                >
                                                                    {item.status === "Published" ? t("Unpublish", "إلغاء النشر") : t("Publish", "نشر")}
                                                                </button>
                                                            )}

                                                            {activeSection === "enrollments" && item.status === "Pending" && (
                                                                <button
                                                                    onClick={() => {
                                                                        updateRecord("enrollments", item.id, { status: "Approved" });
                                                                        setNotice(t("Enrollment approved in this demo.", "تمت الموافقة على التسجيل في النسخة التجريبية."));
                                                                    }}
                                                                    className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                                                                >
                                                                    {t("Approve", "موافقة")}
                                                                </button>
                                                            )}

                                                            {(activeSection === "services" || activeSection === "projects") && (
                                                                <button
                                                                    onClick={() => {
                                                                        const next = activeSection === "services"
                                                                            ? (item.status === "Active" ? "Inactive" : "Active")
                                                                            : (item.status === "Active" || item.status === "Published" ? "Inactive" : "Published");
                                                                        updateRecord(activeSection, item.id, { status: next });
                                                                        setNotice(t("Record status updated in this demo.", "تم تحديث حالة السجل في النسخة التجريبية."));
                                                                    }}
                                                                    className="rounded-lg border border-[#869CFF]/30 px-3 py-2 text-xs font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                                                >
                                                                    {activeSection === "services"
                                                                        ? (item.status === "Active" ? t("Deactivate", "إيقاف") : t("Activate", "تفعيل"))
                                                                        : t("Change Status", "تغيير الحالة")}
                                                                </button>
                                                            )}

                                                            <button
                                                                onClick={() => deleteRecord(activeSection, item.id)}
                                                                className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                                            >
                                                                {t("Delete", "حذف")}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {filteredRows.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-12 text-center">
                                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#869CFF]/10 text-xl text-[#586FD6]">⌕</div>
                                                        <p className="font-semibold">{t("No records found", "لم يتم العثور على سجلات")}</p>
                                                        <p className="mt-1 text-sm text-gray-400">{t("Try another search term.", "جرّب البحث بكلمة أخرى.")}</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Panel>
                        </div>
                    )}
                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <div className="grid items-start gap-6 xl:grid-cols-2">
                            <Panel>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    setNotice(t(
                                        "Profile changes saved in this demo.",
                                        "تم حفظ تغييرات الملف الشخصي في النسخة التجريبية."
                                    ));
                                }}>
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="relative h-20 w-20 shrink-0">
                                            {profilePhoto ? (
                                                <img src={profilePhoto} alt="Admin profile" className="h-20 w-20 rounded-2xl object-cover" />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-3xl font-bold text-white">
                                                    {studentName.charAt(0).toUpperCase()}
                                                </div>
                                            )}

                                            <label htmlFor="admin-photo" className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#586FD6] text-white shadow-md">+</label>

                                            <input
                                                id="admin-photo"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={e => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    if (!file.type.startsWith("image/")) {
                                                        alert(t("Please select an image.", "يرجى اختيار صورة."));
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    if (file.size > 5 * 1024 * 1024) {
                                                        alert(t("Image must be 5 MB or less.", "يجب ألا يتجاوز حجم الصورة 5 ميجابايت."));
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    const reader = new FileReader();
                                                    reader.onload = () => {
                                                        if (typeof reader.result === "string") {
                                                            setProfilePhoto(reader.result);
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-bold">{t("Personal Information", "المعلومات الشخصية")}</h3>
                                            <p className="mt-1 text-sm text-gray-400">{t("Update your admin details.", "حدّث بيانات المسؤول الخاصة بك.")}</p>
                                            <label htmlFor="admin-photo" className="mt-2 inline-block cursor-pointer text-sm font-semibold text-[#586FD6] hover:underline">
                                                {t("Upload Photo", "رفع صورة")}
                                            </label>

                                            {profilePhoto && (
                                                <button type="button" onClick={() => setProfilePhoto("")} className="ml-3 text-sm font-semibold text-red-500 hover:underline">
                                                    {t("Remove", "إزالة")}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <label className="mb-2 block text-sm font-semibold">{t("Full Name", "الاسم بالكامل")}</label>
                                    <input
                                        value={studentName}
                                        onChange={e => setStudentName(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">{t("Email Address", "البريد الإلكتروني")}</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">{t("Phone Number", "رقم الهاتف")}</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                    />

                                    <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">
                                        {t("Save Changes", "حفظ التغييرات")}
                                    </button>
                                </form>
                            </Panel>

                            <Panel>
                                <h3 className="font-bold">{t("Administrator Account", "حساب المسؤول")}</h3>
                                <p className="mb-5 mt-1 text-sm text-gray-400">{t("Account information and access.", "معلومات الحساب والصلاحيات.")}</p>

                                <div className="space-y-4">
                                    <div className="rounded-xl bg-[#F8F8FC] p-4">
                                        <p className="text-xs text-gray-400">{t("Account Role", "دور الحساب")}</p>
                                        <p className="mt-1 font-bold">{t("Super Admin (Demo)", "مسؤول رئيسي (تجريبي)")}</p>
                                    </div>

                                    <div className="rounded-xl bg-[#F8F8FC] p-4">
                                        <p className="text-xs text-gray-400">{t("Account Email", "البريد الإلكتروني للحساب")}</p>
                                        <p className="mt-1 break-all font-bold" dir="ltr">{email}</p>
                                    </div>

                                    <div className="rounded-xl bg-[#F8F8FC] p-4">
                                        <p className="text-xs text-gray-400">{t("Security", "الأمان")}</p>
                                        <p className="mt-1 font-bold">{t("Authentication not connected", "نظام تسجيل الدخول غير متصل")}</p>
                                    </div>

                                    <p className="text-xs leading-5 text-gray-400">
                                        {t(
                                            "Connect backend authentication before using these details for real administrator access.",
                                            "يجب ربط نظام المصادقة بالـ Backend قبل استخدام هذه البيانات للتحكم الحقيقي في صلاحيات المسؤولين."
                                        )}
                                    </p>
                                </div>
                            </Panel>
                        </div>
                    )}

                    {/* SETTINGS */}
                    {activeSection === "settings" && (
                        <div className="mx-auto w-full max-w-[1250px] space-y-7 px-2 pb-8 sm:px-4 lg:px-8">

                            {/* Settings Heading */}
                            <div className="rounded-3xl border border-[#ECECF5] bg-gradient-to-r from-white via-white to-[#E2A3FF]/10 p-6 sm:p-9">
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                                    <div>
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#869CFF]/10 px-3 py-1.5 text-xs font-bold text-[#586FD6]">
                                            <span>⚙</span>
                                            {t("ADMIN CONTROL CENTER", "مركز تحكم المسؤول")}
                                        </div>

                                        <h2 className="text-2xl font-extrabold tracking-tight text-[#20243A] sm:text-3xl">
                                            {t("Advanced Settings", "الإعدادات المتقدمة")}
                                        </h2>

                                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                            {t(
                                                "Manage your academy preferences, notifications, appearance and platform configuration from one place.",
                                                "تحكم في تفضيلات الأكاديمية والإشعارات والمظهر وإعدادات المنصة من مكان واحد."
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 text-3xl text-[#586FD6]">
                                        ⚙
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-[#ECECF5] bg-white/90 p-4">
                                        <p className="text-xs font-medium text-gray-400">{t("Platform", "المنصة")}</p>
                                        <p className="mt-2 font-bold text-[#20243A]">{platformName}</p>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white/90 p-4">
                                        <p className="text-xs font-medium text-gray-400">{t("Configuration", "نوع الإعداد")}</p>
                                        <p className="mt-2 font-bold text-[#20243A]">{t("Frontend Demo", "نسخة تجريبية للواجهة الأمامية")}</p>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white/90 p-4">
                                        <p className="text-xs font-medium text-gray-400">{t("Backend Status", "حالة Backend")}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                                            <p className="font-bold text-amber-600">{t("Not Connected", "غير متصل")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Search & Quick Actions */}
                            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                                <div className="relative">
                                    <span className={`pointer-events-none absolute ${isArabic ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-400`}>⌕</span>
                                    <input
                                        value={settingsSearch}
                                        onChange={event => setSettingsSearch(event.target.value)}
                                        placeholder={t("Search settings, preferences, security...", "ابحث في الإعدادات والتفضيلات والأمان...")}
                                        aria-label={t("Search settings sections", "البحث في أقسام الإعدادات")}
                                        className={`${inputClass} ${isArabic ? "pr-11" : "pl-11"}`}
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className="rounded-full bg-emerald-50 px-3 py-2 font-semibold text-emerald-700">
                                        ● {t("Local preferences enabled", "التفضيلات المحلية مفعّلة")}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPlatformName("Codo Learn");
                                            setSupportEmail("support@codolearn.com");
                                            setLanguage("en");
                                            setTimezone("Africa/Cairo");
                                            setCompactMode(false);
                                            setMaintenanceMode(false);
                                            setSessionTimeout("30");
                                            setDateFormat("DD/MM/YYYY");

                                            setSettings({
                                                emailNotifications: true,
                                                enrollmentAlerts: true,
                                                paymentAlerts: true,
                                                courseAlerts: true,
                                                projectAlerts: false,
                                                weeklyReports: true,
                                                twoFactorEnabled: false,
                                            });

                                            setNotice(t(
                                                "Settings reset to default demo preferences. Save to keep them in this browser.",
                                                "تمت إعادة الإعدادات إلى القيم الافتراضية التجريبية. احفظها للاحتفاظ بها في هذا المتصفح."
                                            ));
                                        }}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-bold text-gray-600 transition hover:border-[#869CFF] hover:text-[#586FD6]"
                                    >
                                        {t("Reset defaults", "استعادة الافتراضي")}
                                    </button>
                                </div>
                            </div>

                            {/* Settings Layout */}
                            <div className="grid items-start gap-6 xl:grid-cols-[250px_minmax(0,1fr)]">

                                {/* Inner Settings Navigation */}
                                <Panel className="!p-3 xl:sticky xl:top-28">
                                    <p className="px-3 pb-3 pt-2 text-[10px] font-bold tracking-[0.2em] text-gray-400">
                                        {t("PREFERENCES", "التفضيلات")}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
                                        {[
                                            {
                                                id: "general" as const,
                                                label: "General",
                                                icon: "⌂",
                                                description: "Platform information",
                                                arLabel: "عام",
                                                arDescription: "معلومات المنصة",
                                            },
                                            {
                                                id: "notifications" as const,
                                                label: "Notifications",
                                                icon: "♧",
                                                description: "Alerts and updates",
                                                arLabel: "الإشعارات",
                                                arDescription: "التنبيهات والتحديثات",
                                            },
                                            {
                                                id: "appearance" as const,
                                                label: "Appearance",
                                                icon: "◐",
                                                description: "Interface preferences",
                                                arLabel: "المظهر",
                                                arDescription: "تفضيلات الواجهة",
                                            },
                                            {
                                                id: "security" as const,
                                                label: "Security",
                                                icon: "◇",
                                                description: "Account protection",
                                                arLabel: "الأمان",
                                                arDescription: "حماية الحساب",
                                            },
                                            {
                                                id: "system" as const,
                                                label: "System",
                                                icon: "▦",
                                                description: "Platform status",
                                                arLabel: "النظام",
                                                arDescription: "حالة المنصة",
                                            },
                                        ].filter(item =>
                                            `${item.label} ${item.description} ${item.arLabel} ${item.arDescription}`
                                                .toLowerCase()
                                                .includes(settingsSearch.trim().toLowerCase())
                                        ).map(item => {
                                            const active = settingsTab === item.id;

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setSettingsTab(item.id)}
                                                    className={`flex min-w-0 items-center gap-3 rounded-xl p-3 text-left rtl:text-right transition ${active
                                                        ? "bg-gradient-to-r from-[#869CFF]/15 to-[#E2A3FF]/15 text-[#586FD6] ring-1 ring-[#869CFF]/20"
                                                        : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                                                        }`}
                                                >
                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                                        {item.icon}
                                                    </span>

                                                    <span className="min-w-0">
                                                        <span className="block text-sm font-bold">
                                                            {isArabic ? item.arLabel : item.label}
                                                        </span>
                                                        <span className="mt-1 hidden text-[11px] text-gray-400 xl:block">
                                                            {isArabic ? item.arDescription : item.description}
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
                                            <span>{notice}</span>
                                            <button type="button" onClick={() => setNotice("")} aria-label={t("Dismiss settings message", "إغلاق رسالة الإعدادات")} className="font-bold">×</button>
                                        </div>
                                    )}

                                    {/* GENERAL */}
                                    {settingsTab === "general" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    {t("General Settings", "الإعدادات العامة")}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {t("Configure your academy's basic information.", "قم بإعداد المعلومات الأساسية للأكاديمية.")}
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
                                                        {t("Platform Name", "اسم المنصة")}
                                                    </label>
                                                    <input
                                                        required
                                                        value={platformName}
                                                        onChange={event => setPlatformName(event.target.value)}
                                                        className={inputClass}
                                                        placeholder={t("Enter platform name", "أدخل اسم المنصة")}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold">
                                                        {t("Support Email", "البريد الإلكتروني للدعم")}
                                                    </label>
                                                    <input
                                                        required
                                                        type="email"
                                                        value={supportEmail}
                                                        onChange={event => setSupportEmail(event.target.value)}
                                                        className={inputClass}
                                                        placeholder="support@example.com"
                                                        dir="ltr"
                                                    />
                                                </div>

                                                <div className="grid gap-5 sm:grid-cols-2">
                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold">
                                                            {t("Default Language", "اللغة الافتراضية")}
                                                        </label>
                                                        <select
                                                            value={language}
                                                            onChange={event => setLanguage(event.target.value as typeof language)}
                                                            className={inputClass}
                                                        >
                                                            <option value="en">English</option>
                                                            <option value="ar">العربية</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold">
                                                            {t("Time Zone", "المنطقة الزمنية")}
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
                                                        {t("Save General Settings", "حفظ الإعدادات العامة")}
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
                                                    {t("Notification Preferences", "تفضيلات الإشعارات")}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {t("Choose which types of demo notifications are enabled.", "اختر أنواع الإشعارات التجريبية التي تريد تفعيلها.")}
                                                </p>
                                            </div>

                                            <div className="space-y-5">
                                                {[
                                                    {
                                                        key: "emailNotifications" as const,
                                                        label: "Email Notifications",
                                                        description: "Receive general account updates.",
                                                        arLabel: "إشعارات البريد الإلكتروني",
                                                        arDescription: "استقبل التحديثات العامة الخاصة بالحساب.",
                                                    },
                                                    {
                                                        key: "enrollmentAlerts" as const,
                                                        label: "Enrollment Alerts",
                                                        description: "Get notified about new student enrollments.",
                                                        arLabel: "تنبيهات التسجيل",
                                                        arDescription: "استقبل إشعارات عند تسجيل طلاب جدد.",
                                                    },
                                                    {
                                                        key: "paymentAlerts" as const,
                                                        label: "Payment Alerts",
                                                        description: "Get notified about payment status changes.",
                                                        arLabel: "تنبيهات المدفوعات",
                                                        arDescription: "استقبل إشعارات عند تغيير حالة المدفوعات.",
                                                    },
                                                    {
                                                        key: "courseAlerts" as const,
                                                        label: "Course Updates",
                                                        description: "Receive alerts when courses are created or updated.",
                                                        arLabel: "تحديثات الكورسات",
                                                        arDescription: "استقبل إشعارات عند إنشاء الكورسات أو تحديثها.",
                                                    },
                                                    {
                                                        key: "projectAlerts" as const,
                                                        label: "Project Requests",
                                                        description: "Notify me about new project requests and status changes.",
                                                        arLabel: "طلبات المشروعات",
                                                        arDescription: "استقبل إشعارات بطلبات المشروعات الجديدة وتغييرات حالتها.",
                                                    },
                                                    {
                                                        key: "weeklyReports" as const,
                                                        label: "Weekly Admin Summary",
                                                        description: "Show a weekly summary preference for academy activity.",
                                                        arLabel: "الملخص الأسبوعي للمسؤول",
                                                        arDescription: "تفعيل تفضيل عرض ملخص أسبوعي لنشاط الأكاديمية.",
                                                    },
                                                ].map(item => (
                                                    <label
                                                        key={item.key}
                                                        className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-[#869CFF]/40"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-bold text-[#20243A]">
                                                                {isArabic ? item.arLabel : item.label}
                                                            </p>
                                                            <p className="mt-1 text-xs leading-5 text-gray-400">
                                                                {isArabic ? item.arDescription : item.description}
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
                                                {t("Save Preferences", "حفظ التفضيلات")}
                                            </button>
                                        </Panel>
                                    )}

                                    {/* APPEARANCE */}
                                    {settingsTab === "appearance" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    {t("Appearance", "المظهر")}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {t("Customize your dashboard viewing preferences.", "خصص تفضيلات عرض لوحة التحكم.")}
                                                </p>
                                            </div>

                                            <div className="space-y-5">
                                                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4">
                                                    <div>
                                                        <p className="text-sm font-bold">{t("Compact Mode", "الوضع المضغوط")}</p>
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {t("Preference toggle for a more compact dashboard layout.", "تفعيل تخطيط أكثر اختصارًا للوحة التحكم.")}
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
                                                        <label className="mb-2 block text-sm font-bold">{t("Date Format", "تنسيق التاريخ")}</label>
                                                        <select value={dateFormat} onChange={event => setDateFormat(event.target.value)} className={inputClass}>
                                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                        </select>
                                                        <p className="mt-2 text-xs text-gray-400">
                                                            {t("Display preference for future integration.", "تفضيل لطريقة عرض التاريخ عند ربط النظام مستقبلًا.")}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-xl border border-gray-100 p-4">
                                                        <p className="text-sm font-bold">{t("Layout Density", "كثافة التخطيط")}</p>
                                                        <p className="mt-1 text-xs text-gray-400">{t("Choose a comfortable dashboard density.", "اختر كثافة العرض المناسبة للوحة التحكم.")}</p>

                                                        <div className="mt-3 flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setCompactMode(false)}
                                                                className={`rounded-lg px-3 py-2 text-xs font-bold ${!compactMode ? "bg-[#586FD6] text-white" : "bg-[#F8F8FC] text-gray-500"}`}
                                                            >
                                                                {t("Comfortable", "مريح")}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setCompactMode(true)}
                                                                className={`rounded-lg px-3 py-2 text-xs font-bold ${compactMode ? "bg-[#586FD6] text-white" : "bg-[#F8F8FC] text-gray-500"}`}
                                                            >
                                                                {t("Compact", "مضغوط")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="rounded-xl border border-gray-100 p-4">
                                                    <p className="text-sm font-bold">{t("Brand Colors", "ألوان الهوية")}</p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {t("Current Codo Learn color palette.", "لوحة ألوان Codo Learn الحالية.")}
                                                    </p>

                                                    <div className="mt-4 flex flex-wrap gap-3">
                                                        {[
                                                            { name: "Primary Blue", arName: "الأزرق الأساسي", color: "#869CFF" },
                                                            { name: "Soft Purple", arName: "البنفسجي الفاتح", color: "#E2A3FF" },
                                                            { name: "Page Background", arName: "خلفية الصفحة", color: "#F8F8FC" },
                                                            { name: "Text", arName: "النص", color: "#20243A" },
                                                        ].map(color => (
                                                            <div key={color.name} className="flex items-center gap-2 rounded-lg border border-gray-100 p-2">
                                                                <span className="h-7 w-7 rounded-lg border border-black/5" style={{ backgroundColor: color.color }} />
                                                                <div>
                                                                    <p className="text-xs font-semibold">{isArabic ? color.arName : color.name}</p>
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
                                                {t("Save Appearance", "حفظ إعدادات المظهر")}
                                            </button>
                                        </Panel>
                                    )}

                                    {/* SECURITY */}
                                    {settingsTab === "security" && (
                                        <Panel>
                                            <div className="mb-6 border-b border-gray-100 pb-5">
                                                <h3 className="text-lg font-bold text-[#20243A]">
                                                    {t("Security & Access", "الأمان والوصول")}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {t("Review the current security configuration.", "راجع إعدادات الأمان الحالية.")}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                                                    <span className="text-xl">⚠</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-amber-800">
                                                            {t("Backend authentication is not connected", "نظام المصادقة في Backend غير متصل")}
                                                        </p>
                                                        <p className="mt-1 text-xs leading-5 text-amber-700">
                                                            {t(
                                                                "The dashboard currently uses frontend demo data. Account protection and access control must be implemented on the backend before production.",
                                                                "تستخدم لوحة التحكم حاليًا بيانات تجريبية في الواجهة الأمامية. يجب تنفيذ حماية الحسابات والتحكم في الصلاحيات في Backend قبل إطلاق الموقع."
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center">
                                                    <div>
                                                        <p className="text-sm font-bold text-[#20243A]">{t("Two-factor authentication preference", "تفضيل المصادقة الثنائية")}</p>
                                                        <p className="mt-1 text-xs text-gray-400">{t("UI preference only; real 2FA requires backend authentication.", "هذا تفضيل في الواجهة فقط؛ المصادقة الثنائية الفعلية تحتاج إلى ربط نظام المصادقة بالـ Backend.")}</p>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        checked={settings.twoFactorEnabled}
                                                        onChange={event => setSettings(previous => ({ ...previous, twoFactorEnabled: event.target.checked }))}
                                                        className="h-5 w-5 accent-[#586FD6]"
                                                    />
                                                </div>

                                                <div className="rounded-xl border border-gray-100 p-4">
                                                    <label className="mb-2 block text-sm font-bold text-[#20243A]">{t("Session timeout preference", "مدة انتهاء الجلسة")}</label>
                                                    <select value={sessionTimeout} onChange={event => setSessionTimeout(event.target.value)} className={inputClass}>
                                                        <option value="15">{t("15 minutes", "15 دقيقة")}</option>
                                                        <option value="30">{t("30 minutes", "30 دقيقة")}</option>
                                                        <option value="60">{t("60 minutes", "60 دقيقة")}</option>
                                                        <option value="120">{t("2 hours", "ساعتان")}</option>
                                                    </select>
                                                    <p className="mt-2 text-xs text-gray-400">{t("Stored locally; does not expire real sessions.", "يتم حفظه محليًا، ولا يؤدي إلى إنهاء الجلسات الفعلية.")}</p>
                                                </div>

                                                {[
                                                    {
                                                        label: "Authentication",
                                                        value: "Backend not connected",
                                                        arLabel: "المصادقة",
                                                        arValue: "Backend غير متصل",
                                                    },
                                                    {
                                                        label: "Role-based access control",
                                                        value: "Not implemented",
                                                        arLabel: "التحكم في الصلاحيات حسب الدور",
                                                        arValue: "غير مُنفّذ",
                                                    },
                                                    {
                                                        label: "Session enforcement",
                                                        value: "Demo preference only",
                                                        arLabel: "تطبيق إعدادات الجلسة",
                                                        arValue: "تفضيل تجريبي فقط",
                                                    },
                                                ].map(item => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col justify-between gap-2 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                                                    >
                                                        <p className="text-sm font-semibold text-[#20243A]">
                                                            {isArabic ? item.arLabel : item.label}
                                                        </p>
                                                        <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                                            {isArabic ? item.arValue : item.value}
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
                                                    {t("System Configuration", "إعدادات النظام")}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {t("Review system information and demo maintenance preferences.", "راجع معلومات النظام وتفضيلات وضع الصيانة التجريبية.")}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {[
                                                    { label: "Application", value: platformName, arLabel: "التطبيق" },
                                                    { label: "Environment", value: "Frontend Demo", arLabel: "بيئة التشغيل", arValue: "نسخة تجريبية للواجهة الأمامية" },
                                                    { label: "Data Storage", value: "localStorage + React state", arLabel: "تخزين البيانات" },
                                                    { label: "Selected Language", value: language, arLabel: "اللغة المحددة", arValue: isArabic ? "العربية" : "الإنجليزية" },
                                                    { label: "Selected Time Zone", value: timezone, arLabel: "المنطقة الزمنية المحددة" },
                                                    { label: "Backend API", value: "Not connected", arLabel: "واجهة Backend", arValue: "غير متصلة" },
                                                    { label: "Database", value: "Not connected", arLabel: "قاعدة البيانات", arValue: "غير متصلة" },
                                                ].map(item => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col justify-between gap-2 rounded-xl bg-[#F8F8FC] p-4 sm:flex-row sm:items-center"
                                                    >
                                                        <span className="text-sm text-gray-500">
                                                            {isArabic ? item.arLabel : item.label}
                                                        </span>
                                                        <span className="break-words text-sm font-bold text-[#20243A]" dir={item.label === "Selected Time Zone" ? "ltr" : undefined}>
                                                            {isArabic && item.arValue ? item.arValue : item.value}
                                                        </span>
                                                    </div>
                                                ))}

                                                <div className="flex items-center justify-between gap-4 rounded-xl border border-red-100 p-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-[#20243A]">
                                                            {t("Maintenance Mode", "وضع الصيانة")}
                                                        </p>
                                                        <p className="mt-1 text-xs leading-5 text-gray-400">
                                                            {t("Demo preference only. It does not disable the live site.", "إعداد تجريبي فقط، ولا يؤدي إلى تعطيل الموقع الفعلي.")}
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
                                                {t("Save System Preferences", "حفظ تفضيلات النظام")}
                                            </button>
                                        </Panel>
                                    )}

                                    <div className="flex items-start gap-3 rounded-2xl border border-[#869CFF]/20 bg-[#869CFF]/5 p-4">
                                        <span className="text-lg text-[#586FD6]">ⓘ</span>
                                        <p className="text-xs leading-5 text-gray-500">
                                            {t(
                                                "These preferences are saved in this browser only. They are not yet synced with a backend, database, or other administrator accounts.",
                                                "يتم حفظ هذه التفضيلات في هذا المتصفح فقط. ولم تتم مزامنتها بعد مع Backend أو قاعدة البيانات أو حسابات المسؤولين الآخرين."
                                            )}
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