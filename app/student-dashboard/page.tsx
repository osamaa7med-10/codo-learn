
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

type Section =
    | "overview"
    | "courses"
    | "learning"
    | "assignments"
    | "enrollments"
    | "payments"
    | "notifications"
    | "profile";

const initialCourses = [
    {
        id: 1,
        title: "Frontend Development",
        category: "Web Development",
        instructor: "Ahmed Mohamed",
        progress: 75,
        completedLessons: 18,
        totalLessons: 24,
        color: "#869CFF",
    },
    {
        id: 2,
        title: "UI/UX Design",
        category: "Design",
        instructor: "Sara Ali",
        progress: 45,
        completedLessons: 9,
        totalLessons: 20,
        color: "#E2A3FF",
    },
    {
        id: 3,
        title: "JavaScript Fundamentals",
        category: "Programming",
        instructor: "Omar Hassan",
        progress: 60,
        completedLessons: 12,
        totalLessons: 20,
        color: "#A8B5FF",
    },
];

const initialNotifications = [
    {
        id: 1,
        title: "Enrollment confirmed",
        message: "Your Frontend Development enrollment is confirmed.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "New course material",
        message: "New materials are available in UI/UX Design.",
        time: "Yesterday",
        read: false,
    },
    {
        id: 3,
        title: "Payment successful",
        message: "Your payment for JavaScript Fundamentals was received.",
        time: "2 days ago",
        read: true,
    },
];

const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "overview", label: "Student Overview", icon: "⌂" },
    { id: "courses", label: "My Courses", icon: "▤" },
    { id: "learning", label: "Course Learning", icon: "▷" },
    { id: "assignments", label: "My Assignments", icon: "▣" },
    { id: "enrollments", label: "My Enrollments", icon: "✓" },
    { id: "payments", label: "My Payments", icon: "$" },
    { id: "notifications", label: "Notifications", icon: "♧" },
    { id: "profile", label: "My Profile", icon: "♙" },
];

const payments = [
    {
        id: "PAY-1001",
        course: "Frontend Development",
        date: "Oct 10, 2026",
        amount: "$120",
        status: "Paid",
    },
    {
        id: "PAY-1002",
        course: "UI/UX Design",
        date: "Oct 12, 2026",
        amount: "$95",
        status: "Pending",
    },
    {
        id: "PAY-1003",
        course: "JavaScript Fundamentals",
        date: "Oct 14, 2026",
        amount: "$80",
        status: "Paid",
    },
];

type StudentAssignment = {
    id: string;
    title: string;
    description: string;
    referenceLink?: string;
    videoUrl?: string;
    attachments: {
        name?: string;
        type?: string;
        size?: number;
        dataUrl?: string;
        url?: string;
    }[];
    status: "Pending" | "Submitted" | "Graded";
};

function sanitizeDescription(html: string) {
    if (typeof window === "undefined") {
        return html.replace(/<[^>]*>/g, "");
    }

    const document = new DOMParser().parseFromString(html, "text/html");

    document
        .querySelectorAll("script, style, iframe, object, embed, form")
        .forEach((node) => node.remove());

    document.body.querySelectorAll("*").forEach((element) => {
        [...element.attributes].forEach((attribute) => {
            const name = attribute.name.toLowerCase();
            const value = attribute.value.trim().toLowerCase();

            if (
                name.startsWith("on") ||
                ((name === "href" || name === "src") &&
                    value.startsWith("javascript:"))
            ) {
                element.removeAttribute(attribute.name);
            }
        });
    });

    return document.body.innerHTML;
}

export default function StudentDashboard() {
    const { language, direction, setLanguage } = useLanguage();
    const isArabic = language === "ar";

    const t = (en: string, ar: string) => (isArabic ? ar : en);

    const [activeSection, setActiveSection] =
        useState<Section>("overview");

    const [selectedCourseId, setSelectedCourseId] = useState(1);
    const [courses, setCourses] = useState(initialCourses);
    const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
    const [notifications, setNotifications] =
        useState(initialNotifications);

    const [profilePhoto, setProfilePhoto] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [studentName, setStudentName] = useState("Student Name");
    const [email, setEmail] = useState("student@example.com");
    const [phone, setPhone] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [profileLoaded, setProfileLoaded] = useState(false);

    const translateCourseCategory = (category: string) => {
        const categories: Record<string, string> = {
            "Web Development": "تطوير الويب",
            Design: "التصميم",
            Programming: "البرمجة",
        };

        return isArabic ? categories[category] || category : category;
    };

    const translateStatus = (status: string) => {
        const statuses: Record<string, string> = {
            Paid: "مدفوع",
            Approved: "تمت الموافقة",
            Pending: "قيد الانتظار",
            Rejected: "مرفوض",
            Submitted: "تم التسليم",
            Graded: "تم التقييم",
            NEW: "جديد",
        };

        return isArabic ? statuses[status] || status : status;
    };

    const translateNotification = (value: string) => {
        if (!isArabic) return value;

        const translations: Record<string, string> = {
            "Enrollment confirmed": "تم تأكيد التسجيل",
            "Your Frontend Development enrollment is confirmed.":
                "تم تأكيد تسجيلك في دورة تطوير الواجهات الأمامية.",
            "New course material": "محتوى جديد للدورة",
            "New materials are available in UI/UX Design.":
                "تتوفر مواد تعليمية جديدة في دورة UI/UX Design.",
            "Payment successful": "تم الدفع بنجاح",
            "Your payment for JavaScript Fundamentals was received.":
                "تم استلام دفعتك الخاصة بدورة JavaScript Fundamentals.",
            "2 hours ago": "منذ ساعتين",
            Yesterday: "أمس",
            "2 days ago": "منذ يومين",
        };

        return translations[value] || value;
    };

    const pageTitles: Record<Section, string> = {
        overview: t("Student Overview", "نظرة عامة"),
        courses: t("My Courses", "كورساتي"),
        learning: t("Course Learning", "التعلم"),
        assignments: t("My Assignments", "واجباتي"),
        enrollments: t("My Enrollments", "تسجيلاتي"),
        payments: t("My Payments", "مدفوعاتي"),
        notifications: t("Notifications", "الإشعارات"),
        profile: t("My Profile", "ملفي الشخصي"),
    };

    useEffect(() => {
        function loadAssignments() {
            try {
                const found: StudentAssignment[] = [];
                const prefix = "codo-instructor-assignment-content-";

                for (let index = 0; index < localStorage.length; index++) {
                    const key = localStorage.key(index);

                    if (!key || !key.startsWith(prefix)) continue;

                    const id = key.slice(prefix.length);

                    try {
                        const saved = JSON.parse(
                            localStorage.getItem(key) ?? "{}"
                        );

                        const rawAttachments = Array.isArray(saved.attachments)
                            ? saved.attachments
                            : [];

                        const statusValue = localStorage.getItem(
                            `codo-student-assignment-status-${id}`
                        );

                        const status: StudentAssignment["status"] =
                            statusValue === "Submitted" ||
                                statusValue === "Graded"
                                ? statusValue
                                : "Pending";

                        found.push({
                            id,
                            title:
                                typeof saved.title === "string" &&
                                    saved.title.trim()
                                    ? saved.title
                                    : `Assignment ${id}`,
                            description:
                                typeof saved.description === "string"
                                    ? sanitizeDescription(saved.description)
                                    : "",
                            referenceLink:
                                typeof saved.referenceLink === "string"
                                    ? saved.referenceLink
                                    : "",
                            videoUrl:
                                typeof saved.videoUrl === "string"
                                    ? saved.videoUrl
                                    : "",
                            attachments: rawAttachments.map((file: any) => ({
                                name:
                                    typeof file?.name === "string"
                                        ? file.name
                                        : "Attachment",
                                type:
                                    typeof file?.type === "string"
                                        ? file.type
                                        : "",
                                size:
                                    typeof file?.size === "number"
                                        ? file.size
                                        : undefined,
                                dataUrl:
                                    typeof file?.dataUrl === "string"
                                        ? file.dataUrl
                                        : undefined,
                                url:
                                    typeof file?.url === "string"
                                        ? file.url
                                        : undefined,
                            })),
                            status,
                        });
                    } catch {
                        // Ignore malformed assignment content.
                    }
                }

                found.sort((a, b) => a.title.localeCompare(b.title));
                setAssignments(found);
            } catch {
                setAssignments([]);
            }
        }

        loadAssignments();

        window.addEventListener("storage", loadAssignments);
        window.addEventListener("focus", loadAssignments);

        return () => {
            window.removeEventListener("storage", loadAssignments);
            window.removeEventListener("focus", loadAssignments);
        };
    }, []);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("codo-student-profile");

            if (saved) {
                const profile = JSON.parse(saved);

                if (typeof profile.studentName === "string") {
                    setStudentName(profile.studentName);
                }

                if (typeof profile.email === "string") {
                    setEmail(profile.email);
                }

                if (typeof profile.phone === "string") {
                    setPhone(profile.phone);
                }

                if (typeof profile.profilePhoto === "string") {
                    setProfilePhoto(profile.profilePhoto);
                }
            }
        } catch {
            console.error("Could not load student profile.");
        } finally {
            setProfileLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!profileLoaded) return;

        try {
            localStorage.setItem(
                "codo-student-profile",
                JSON.stringify({
                    studentName,
                    email,
                    phone,
                    profilePhoto,
                })
            );
        } catch {
            setSaveMessage(
                t(
                    "Could not save your profile. Try using a smaller photo.",
                    "تعذر حفظ الملف الشخصي. حاول استخدام صورة أصغر."
                )
            );
        }
    }, [studentName, email, phone, profilePhoto, profileLoaded]);

    const selectedCourse =
        courses.find((course) => course.id === selectedCourseId) ??
        courses[0];

    const unreadCount = notifications.filter((n) => !n.read).length;

    function openSection(section: Section) {
        setActiveSection(section);
        setSidebarOpen(false);
        setSaveMessage("");
        setPasswordMessage("");
    }

    function markAllRead() {
        setNotifications((previous) =>
            previous.map((item) => ({ ...item, read: true }))
        );
    }

    function markLessonComplete() {
        setCourses((previous) =>
            previous.map((course) => {
                if (course.id !== selectedCourseId) return course;

                const completedLessons = Math.min(
                    course.completedLessons + 1,
                    course.totalLessons
                );

                return {
                    ...course,
                    completedLessons,
                    progress: Math.round(
                        (completedLessons / course.totalLessons) * 100
                    ),
                };
            })
        );
    }

    function saveProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSaveMessage(
            t(
                "Your profile changes have been saved successfully.",
                "تم حفظ تغييرات ملفك الشخصي بنجاح."
            )
        );
    }

    function changePassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (newPassword.length < 8) {
            setPasswordMessage(
                t(
                    "Password must be at least 8 characters.",
                    "يجب ألا تقل كلمة المرور عن 8 أحرف."
                )
            );
            return;
        }

        setPasswordMessage(
            t(
                "Demo only: connect the backend to update your real password.",
                "هذه نسخة تجريبية فقط: اربط النظام بالـ Backend لتغيير كلمة المرور الحقيقية."
            )
        );

        setCurrentPassword("");
        setNewPassword("");
    }

    return (
        <div
            dir={direction}
            className="min-h-screen bg-[#F8F8FC] text-[#20243A]"
        >
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    aria-label={t("Close navigation", "إغلاق القائمة")}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-[#20243A]/30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 start-0 z-50 flex w-[270px] flex-col border-e border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen
                        ? "translate-x-0"
                        : isArabic
                            ? "translate-x-full"
                            : "-translate-x-full"
                    }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-[#ECECF5] px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn"
                            width={145}
                            height={48}
                            priority
                            className="h-auto w-[145px] object-contain"
                        />
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-xl lg:hidden"
                        aria-label={t("Close menu", "إغلاق القائمة")}
                    >
                        ×
                    </button>
                </div>

                <div className="px-5 pb-3 pt-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                        {t("Student Portal", "بوابة الطالب")}
                    </p>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => openSection(item.id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-start text-sm font-medium transition ${activeSection === item.id
                                    ? "bg-[#869CFF]/15 text-[#586FD6]"
                                    : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                                }`}
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-lg">
                                {item.icon}
                            </span>

                            <span className="flex-1">
                                {t(
                                    item.label,
                                    {
                                        "Student Overview": "نظرة عامة",
                                        "My Courses": "كورساتي",
                                        "Course Learning": "التعلم",
                                        "My Assignments": "واجباتي",
                                        "My Enrollments": "تسجيلاتي",
                                        "My Payments": "مدفوعاتي",
                                        Notifications: "الإشعارات",
                                        "My Profile": "ملفي الشخصي",
                                    }[item.label] || item.label
                                )}
                            </span>

                            {item.id === "notifications" &&
                                unreadCount > 0 && (
                                    <span className="rounded-full bg-[#E2A3FF] px-2 py-0.5 text-xs text-[#20243A]">
                                        {unreadCount}
                                    </span>
                                )}
                        </button>
                    ))}
                </nav>

                <div className="m-4 rounded-2xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 p-4">
                    <p className="font-bold">
                        {t("Keep learning!", "استمر في التعلم!")}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                        {t(
                            "Every lesson takes you one step closer to your goals.",
                            "كل درس تتعلمه يقربك خطوة من تحقيق أهدافك."
                        )}
                    </p>

                    <button
                        onClick={() => openSection("courses")}
                        className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#586FD6]"
                    >
                        {t("Explore my courses", "استكشف كورساتي")}
                    </button>
                </div>
            </aside>

            {/* Main area */}
            <main className="min-h-screen lg:ms-[270px]">
                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#ECECF5] bg-white/90 px-4 backdrop-blur-md sm:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-xl border border-gray-200 px-3 py-2 lg:hidden"
                            aria-label={t("Open navigation", "فتح القائمة")}
                        >
                            ☰
                        </button>

                        <div>
                            <p className="text-xs text-gray-400">
                                {t("Student Portal", "بوابة الطالب")}
                            </p>

                            <h1 className="text-lg font-bold sm:text-xl">
                                {pageTitles[activeSection]}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Language Switcher */}
                        <button
                            onClick={() =>
                                setLanguage(isArabic ? "en" : "ar")
                            }
                            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-[#586FD6] transition hover:bg-[#869CFF]/10"
                            title={t("Switch to Arabic", "التغيير إلى الإنجليزية")}
                        >
                            <span>🌐</span>
                            {isArabic ? "English" : "العربية"}
                        </button>

                        <button
                            onClick={() => openSection("notifications")}
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg hover:bg-gray-50"
                            aria-label={t("Notifications", "الإشعارات")}
                        >
                            ♧
                            {unreadCount > 0 && (
                                <span className="absolute end-1 top-1 h-2.5 w-2.5 rounded-full bg-[#E2A3FF]" />
                            )}
                        </button>

                        <button
                            onClick={() => openSection("profile")}
                            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                                {profilePhoto ? (
                                    <img
                                        src={profilePhoto}
                                        alt="Student profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    studentName.charAt(0).toUpperCase()
                                )}
                            </div>

                            <div className="hidden text-start sm:block">
                                <p className="max-w-32 truncate text-sm font-semibold">
                                    {studentName}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {t("Student", "طالب")}
                                </p>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-[1500px] p-4 sm:p-8">

                    {/* OVERVIEW */}
                    {activeSection === "overview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-7"
                        >
                            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#869CFF]/25 via-[#E2A3FF]/25 to-white p-6 sm:p-9">
                                <div className="relative z-10 max-w-2xl">
                                    <p className="text-sm font-semibold text-[#586FD6]">
                                        {t(
                                            "YOUR LEARNING JOURNEY",
                                            "رحلتك التعليمية"
                                        )}
                                    </p>

                                    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                                        {t("Welcome back, ", "مرحباً بعودتك، ")}
                                        {studentName}!
                                    </h2>

                                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                        {t(
                                            "Keep building your skills. Continue your courses, track your progress, and reach your next goal.",
                                            "استمر في تطوير مهاراتك. تابع كورساتك، وراقب تقدمك، وحقق هدفك القادم."
                                        )}
                                    </p>

                                    <button
                                        onClick={() => openSection("courses")}
                                        className="mt-6 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                    >
                                        {t(
                                            "Continue Learning →",
                                            "تابع التعلم ←"
                                        )}
                                    </button>
                                </div>

                                <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#869CFF]/25 blur-2xl" />
                                <div className="pointer-events-none absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-[#E2A3FF]/40 blur-2xl" />
                            </section>

                            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    {
                                        label: t("Enrolled Courses", "الكورسات المسجل بها"),
                                        value: String(courses.length),
                                        icon: "▤",
                                        color: "#869CFF",
                                    },
                                    {
                                        label: t("Lessons Completed", "الدروس المكتملة"),
                                        value: String(
                                            courses.reduce(
                                                (total, course) =>
                                                    total + course.completedLessons,
                                                0
                                            )
                                        ),
                                        icon: "✓",
                                        color: "#E2A3FF",
                                    },
                                    {
                                        label: t("Average Progress", "متوسط التقدم"),
                                        value:
                                            Math.round(
                                                courses.reduce(
                                                    (total, course) =>
                                                        total + course.progress,
                                                    0
                                                ) / Math.max(courses.length, 1)
                                            ) + "%",
                                        icon: "↗",
                                        color: "#A8B5FF",
                                    },
                                    {
                                        label: t("Unread Notifications", "الإشعارات غير المقروءة"),
                                        value: String(unreadCount),
                                        icon: "♧",
                                        color: "#F2C3E8",
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-500">
                                                {stat.label}
                                            </p>

                                            <span
                                                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                                                style={{
                                                    backgroundColor: `${stat.color}35`,
                                                }}
                                            >
                                                {stat.icon}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-3xl font-extrabold">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </section>

                            <section>
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {t("Continue Learning", "تابع التعلم")}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {t(
                                                "Pick up where you left off.",
                                                "استكمل من حيث توقفت."
                                            )}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => openSection("courses")}
                                        className="text-sm font-bold text-[#586FD6]"
                                    >
                                        {t("View all →", "عرض الكل ←")}
                                    </button>
                                </div>

                                <div className="grid gap-5 xl:grid-cols-3">
                                    {courses.map((course) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            isArabic={isArabic}
                                            onClick={() => {
                                                setSelectedCourseId(course.id);
                                                openSection("learning");
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>

                            <section className="grid gap-5 xl:grid-cols-2">
                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">
                                            {t("Upcoming Activities", "الأنشطة القادمة")}
                                        </h3>

                                        <span className="text-xs text-gray-400">
                                            {t("Coming up", "قريباً")}
                                        </span>
                                    </div>

                                    <div className="mt-5 space-y-4">
                                        {[
                                            {
                                                date: "16",
                                                month: "OCT",
                                                title: "React Components & Props",
                                                time: "10:00 AM – 11:30 AM",
                                            },
                                            {
                                                date: "18",
                                                month: "OCT",
                                                title: "Design Systems Workshop",
                                                time: "2:00 PM – 3:30 PM",
                                            },
                                            {
                                                date: "20",
                                                month: "OCT",
                                                title: "JavaScript Practice",
                                                time: "12:00 PM – 1:00 PM",
                                            },
                                        ].map((activity) => (
                                            <div
                                                key={activity.title}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="w-14 shrink-0 rounded-xl bg-[#869CFF]/15 p-2 text-center">
                                                    <p className="text-xs font-bold text-[#586FD6]">
                                                        {isArabic
                                                            ? "أكتوبر"
                                                            : activity.month}
                                                    </p>

                                                    <p className="text-xl font-extrabold">
                                                        {activity.date}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {activity.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">
                                            {t("Recent Notifications", "آخر الإشعارات")}
                                        </h3>

                                        <button
                                            onClick={() => openSection("notifications")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            {t("View all →", "عرض الكل ←")}
                                        </button>
                                    </div>

                                    <div className="mt-5 space-y-4">
                                        {notifications.slice(0, 3).map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="flex gap-3 rounded-xl bg-[#F8F8FC] p-3"
                                            >
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E2A3FF]/30">
                                                    ♧
                                                </span>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold">
                                                        {translateNotification(notification.title)}
                                                    </p>

                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                        {translateNotification(notification.message)}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {translateNotification(notification.time)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* MY COURSES */}
                    {activeSection === "courses" && (
                        <SectionPanel
                            title={t("My Courses", "كورساتي")}
                            description={t(
                                "All the courses you're currently enrolled in.",
                                "جميع الكورسات التي قمت بالتسجيل فيها حالياً."
                            )}
                        >
                            <div className="grid gap-5 xl:grid-cols-2">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        isArabic={isArabic}
                                        onClick={() => {
                                            setSelectedCourseId(course.id);
                                            openSection("learning");
                                        }}
                                    />
                                ))}
                            </div>
                        </SectionPanel>
                    )}

                    {/* COURSE LEARNING */}
                    {activeSection === "learning" && (
                        <SectionPanel
                            title={t("Course Learning", "التعلم")}
                            description={t(
                                "Access lessons, course materials, and your progress.",
                                "تابع الدروس والمواد التعليمية وتقدمك في الكورس."
                            )}
                        >
                            <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
                                <div className="h-fit rounded-2xl border border-[#ECECF5] bg-white p-4">
                                    <h3 className="mb-3 font-bold">
                                        {t("Choose a course", "اختر كورساً")}
                                    </h3>

                                    {courses.map((course) => (
                                        <button
                                            key={course.id}
                                            onClick={() => setSelectedCourseId(course.id)}
                                            className={`mb-2 w-full rounded-xl p-3 text-start text-sm font-medium ${selectedCourseId === course.id
                                                    ? "bg-[#869CFF]/15 text-[#586FD6]"
                                                    : "hover:bg-gray-50"
                                                }`}
                                        >
                                            {course.title}

                                            <p className="mt-1 text-xs text-gray-400">
                                                {course.progress}%
                                                {t(" complete", " مكتمل")}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-5">
                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <p className="text-sm text-gray-500">
                                            {translateCourseCategory(selectedCourse.category)}
                                        </p>

                                        <h3 className="mt-2 text-2xl font-extrabold">
                                            {selectedCourse.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">
                                            {t("Instructor: ", "المدرب: ")}
                                            {selectedCourse.instructor}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between text-sm">
                                            <span>
                                                {t("Course progress", "تقدم الكورس")}
                                            </span>

                                            <strong>{selectedCourse.progress}%</strong>
                                        </div>

                                        <ProgressBar value={selectedCourse.progress} />

                                        <p className="mt-2 text-xs text-gray-400">
                                            {selectedCourse.completedLessons}
                                            {t(" of ", " من ")}
                                            {selectedCourse.totalLessons}
                                            {t(" lessons completed", " درس مكتمل")}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <h3 className="text-lg font-bold">
                                            {t("Course Lessons", "دروس الكورس")}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {t(
                                                "Demo lesson list — replace with lessons from your API.",
                                                "قائمة تجريبية للدروس — استبدلها بالدروس القادمة من الـ API."
                                            )}
                                        </p>

                                        <div className="mt-5 space-y-3">
                                            {Array.from(
                                                {
                                                    length: Math.min(
                                                        selectedCourse.totalLessons,
                                                        6
                                                    ),
                                                },
                                                (_, index) => {
                                                    const lessonNumber = index + 1;

                                                    const completed =
                                                        lessonNumber <=
                                                        selectedCourse.completedLessons;

                                                    const lessonNames = [
                                                        ["Introduction", "مقدمة"],
                                                        ["Getting Started", "البدء"],
                                                        ["Core Concepts", "المفاهيم الأساسية"],
                                                        ["Practical Examples", "أمثلة عملية"],
                                                        ["Build a Project", "إنشاء مشروع"],
                                                        ["Review and Practice", "المراجعة والتدريب"],
                                                    ];

                                                    return (
                                                        <div
                                                            key={lessonNumber}
                                                            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                                                        >
                                                            <span
                                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${completed
                                                                        ? "bg-[#869CFF]/20 text-[#586FD6]"
                                                                        : "bg-gray-100 text-gray-500"
                                                                    }`}
                                                            >
                                                                {completed ? "✓" : "▷"}
                                                            </span>

                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold">
                                                                    {t("Lesson ", "الدرس ")}
                                                                    {lessonNumber}:{" "}
                                                                    {lessonNames[index][isArabic ? 1 : 0]}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    {completed
                                                                        ? t("Completed", "مكتمل")
                                                                        : t("Not completed", "غير مكتمل")}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <button
                                            onClick={markLessonComplete}
                                            disabled={
                                                selectedCourse.completedLessons >=
                                                selectedCourse.totalLessons
                                            }
                                            className="mt-5 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {t(
                                                "Mark next lesson complete",
                                                "تحديد الدرس التالي كمكتمل"
                                            )}
                                        </button>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <h3 className="text-lg font-bold">
                                            {t("Course Materials", "المواد التعليمية")}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {t(
                                                "Add real files and links when the course API is ready.",
                                                "ستتم إضافة الملفات والروابط الفعلية عند تجهيز Course API."
                                            )}
                                        </p>

                                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                            {[
                                                ["Course notes.pdf", "PDF document", "ملف PDF"],
                                                ["Practice exercises", "Exercise collection", "مجموعة تمارين"],
                                                ["Reference links", "External resources", "مصادر خارجية"],
                                                ["Final project brief", "Project instructions", "تعليمات المشروع"],
                                            ].map(([title, type, arabicType]) => (
                                                <div
                                                    key={title}
                                                    className="flex items-center gap-3 rounded-xl bg-[#F8F8FC] p-4"
                                                >
                                                    <span className="text-xl">▧</span>

                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            {title}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {isArabic ? arabicType : type}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionPanel>
                    )}

                    {/* MY ASSIGNMENTS */}
                    {activeSection === "assignments" && (
                        <SectionPanel
                            title={t("My Assignments", "واجباتي")}
                            description={t(
                                "View the assignments shared by your instructors, including instructions, reference links, videos, and attachments.",
                                "اعرض الواجبات التي يشاركها المدربون معك، بما في ذلك التعليمات والروابط والفيديوهات والمرفقات."
                            )}
                        >
                            {assignments.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-[#DCDDF0] bg-white px-6 py-14 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#869CFF]/15 text-2xl text-[#586FD6]">
                                        ▣
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold">
                                        {t(
                                            "No assignments available yet",
                                            "لا توجد واجبات متاحة حالياً"
                                        )}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                        {t(
                                            "When your instructor creates assignment content, it will appear here.",
                                            "عندما يقوم المدرب بإنشاء واجب جديد، سيظهر هنا."
                                        )}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {assignments.map((assignment) => (
                                        <article
                                            key={assignment.id}
                                            className="overflow-hidden rounded-2xl border border-[#ECECF5] bg-white"
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#ECECF5] p-5 sm:p-6">
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#586FD6]">
                                                        {t("Assignment", "واجب")}
                                                    </p>

                                                    <h3 className="mt-2 break-words text-lg font-bold">
                                                        {assignment.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {t("Assignment ID: ", "رقم الواجب: ")}
                                                        {assignment.id}
                                                    </p>
                                                </div>

                                                <StatusBadge
                                                    status={assignment.status}
                                                    isArabic={isArabic}
                                                />
                                            </div>

                                            <div className="space-y-5 p-5 sm:p-6">
                                                <div>
                                                    <h4 className="text-sm font-bold">
                                                        {t("Instructions", "التعليمات")}
                                                    </h4>

                                                    {assignment.description ? (
                                                        <div
                                                            className="prose prose-sm mt-3 max-w-none break-words text-gray-600 prose-headings:text-[#20243A] prose-a:text-[#586FD6] prose-strong:text-[#20243A]"
                                                            dangerouslySetInnerHTML={{
                                                                __html: assignment.description,
                                                            }}
                                                        />
                                                    ) : (
                                                        <p className="mt-2 text-sm text-gray-400">
                                                            {t(
                                                                "No instructions have been added.",
                                                                "لم تتم إضافة أي تعليمات."
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {(assignment.referenceLink ||
                                                    assignment.videoUrl) && (
                                                        <div className="flex flex-wrap gap-3">
                                                            {assignment.referenceLink && (
                                                                <a
                                                                    href={assignment.referenceLink}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-2 rounded-xl border border-[#869CFF]/40 px-4 py-2.5 text-sm font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                                                >
                                                                    ↗ {t("Open reference", "فتح المرجع")}
                                                                </a>
                                                            )}

                                                            {assignment.videoUrl && (
                                                                <a
                                                                    href={assignment.videoUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-2 rounded-xl bg-[#586FD6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#455BC1]"
                                                                >
                                                                    ▶ {t("Open assignment video", "فتح فيديو الواجب")}
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}

                                                {assignment.attachments.length > 0 && (
                                                    <div>
                                                        <h4 className="mb-3 text-sm font-bold">
                                                            {t("Attachments", "المرفقات")}
                                                        </h4>

                                                        <div className="grid gap-3 sm:grid-cols-2">
                                                            {assignment.attachments.map((file, index) => {
                                                                const fileUrl =
                                                                    file.dataUrl || file.url;

                                                                return (
                                                                    <div
                                                                        key={`${file.name}-${index}`}
                                                                        className="flex min-w-0 items-center gap-3 rounded-xl bg-[#F8F8FC] p-3"
                                                                    >
                                                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2A3FF]/30">
                                                                            ▧
                                                                        </span>

                                                                        <div className="min-w-0 flex-1">
                                                                            <p className="truncate text-sm font-semibold">
                                                                                {file.name ||
                                                                                    `Attachment ${index + 1}`}
                                                                            </p>

                                                                            <p className="mt-1 text-xs text-gray-400">
                                                                                {file.type ||
                                                                                    t("File attachment", "ملف مرفق")}
                                                                            </p>
                                                                        </div>

                                                                        {fileUrl ? (
                                                                            <a
                                                                                href={fileUrl}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                download={file.name || undefined}
                                                                                className="shrink-0 text-sm font-bold text-[#586FD6] hover:underline"
                                                                            >
                                                                                {t("Open", "فتح")}
                                                                            </a>
                                                                        ) : (
                                                                            <span className="shrink-0 text-xs text-gray-400">
                                                                                {t("Unavailable", "غير متاح")}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}

                            <p className="mt-4 text-xs leading-5 text-gray-400">
                                {t(
                                    "Demo note: assignments are read from this browser's localStorage. For students and instructors on different devices or accounts, connect this section to the backend/API.",
                                    "ملاحظة: يتم قراءة الواجبات من localStorage في هذا المتصفح. لكي تظهر الواجبات للطلاب والمدربين على أجهزة أو حسابات مختلفة، يجب ربط هذا القسم بالـ Backend/API."
                                )}
                            </p>
                        </SectionPanel>
                    )}

                    {/* ENROLLMENTS */}
                    {activeSection === "enrollments" && (
                        <SectionPanel
                            title={t("My Enrollments", "تسجيلاتي")}
                            description={t(
                                "Review your registration status for each course.",
                                "راجع حالة تسجيلك في كل كورس."
                            )}
                        >
                            <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                <table className="w-full min-w-[650px] text-start text-sm">
                                    <thead className="bg-[#F8F8FC] text-gray-500">
                                        <tr>
                                            <th className="p-4 font-medium">
                                                {t("Course", "الكورس")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Enrollment ID", "رقم التسجيل")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Date", "التاريخ")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Status", "الحالة")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Action", "الإجراء")}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr
                                                key={course.id}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="p-4 font-semibold">
                                                    {course.title}
                                                </td>

                                                <td className="p-4 text-gray-500">
                                                    ENR-10{course.id}
                                                </td>

                                                <td className="p-4 text-gray-500">
                                                    Oct {10 + index * 2}, 2026
                                                </td>

                                                <td className="p-4">
                                                    <StatusBadge
                                                        status="Approved"
                                                        isArabic={isArabic}
                                                    />
                                                </td>

                                                <td className="p-4">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedCourseId(course.id);
                                                            openSection("learning");
                                                        }}
                                                        className="font-semibold text-[#586FD6]"
                                                    >
                                                        {t("Open course →", "فتح الكورس ←")}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-xs text-gray-400">
                                {t(
                                    "Enrollment records and statuses are sample data.",
                                    "بيانات التسجيل والحالات المعروضة هي بيانات تجريبية."
                                )}
                            </p>
                        </SectionPanel>
                    )}

                    {/* PAYMENTS */}
                    {activeSection === "payments" && (
                        <SectionPanel
                            title={t("My Payments", "مدفوعاتي")}
                            description={t(
                                "Check your payment history and transaction statuses.",
                                "راجع سجل مدفوعاتك وحالات المعاملات."
                            )}
                        >
                            <div className="mb-5 grid gap-4 sm:grid-cols-3">
                                <SummaryCard
                                    label={t("Total Paid", "إجمالي المدفوع")}
                                    value="$200"
                                    description={t(
                                        "Sample completed payments",
                                        "مدفوعات مكتملة تجريبية"
                                    )}
                                />

                                <SummaryCard
                                    label={t("Pending", "قيد الانتظار")}
                                    value="$95"
                                    description={t(
                                        "Awaiting confirmation",
                                        "في انتظار التأكيد"
                                    )}
                                />

                                <SummaryCard
                                    label={t("Transactions", "المعاملات")}
                                    value={String(payments.length)}
                                    description={t(
                                        "Payment records",
                                        "سجلات الدفع"
                                    )}
                                />
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                <table className="w-full min-w-[650px] text-start text-sm">
                                    <thead className="bg-[#F8F8FC] text-gray-500">
                                        <tr>
                                            <th className="p-4 font-medium">
                                                {t("Transaction ID", "رقم المعاملة")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Course", "الكورس")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Date", "التاريخ")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Amount", "المبلغ")}
                                            </th>
                                            <th className="p-4 font-medium">
                                                {t("Status", "الحالة")}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr
                                                key={payment.id}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="p-4 font-semibold">
                                                    {payment.id}
                                                </td>

                                                <td className="p-4">
                                                    {payment.course}
                                                </td>

                                                <td className="p-4 text-gray-500">
                                                    {payment.date}
                                                </td>

                                                <td className="p-4 font-semibold">
                                                    {payment.amount}
                                                </td>

                                                <td className="p-4">
                                                    <StatusBadge
                                                        status={payment.status}
                                                        isArabic={isArabic}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </SectionPanel>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeSection === "notifications" && (
                        <SectionPanel
                            title={t("Notifications", "الإشعارات")}
                            description={t(
                                "Stay updated about enrollments, courses, and payments.",
                                "تابع آخر التحديثات المتعلقة بالتسجيلات والكورسات والمدفوعات."
                            )}
                        >
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm text-gray-500">
                                    {unreadCount}{" "}
                                    {t(
                                        "unread notification(s)",
                                        "إشعار غير مقروء"
                                    )}
                                </p>

                                <button
                                    onClick={markAllRead}
                                    className="rounded-xl border border-[#869CFF]/40 px-4 py-2 text-sm font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                >
                                    {t("Mark all as read", "تحديد الكل كمقروء")}
                                </button>
                            </div>

                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex items-start gap-4 rounded-2xl border p-5 ${notification.read
                                                ? "border-[#ECECF5] bg-white"
                                                : "border-[#869CFF]/30 bg-[#869CFF]/[0.06]"
                                            }`}
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/30 to-[#E2A3FF]/40 text-xl">
                                            ♧
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold">
                                                    {translateNotification(notification.title)}
                                                </h3>

                                                {!notification.read && (
                                                    <span className="rounded-full bg-[#869CFF]/20 px-2 py-1 text-[10px] font-bold text-[#586FD6]">
                                                        {t("NEW", "جديد")}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                                {translateNotification(notification.message)}
                                            </p>

                                            <p className="mt-2 text-xs text-gray-400">
                                                {translateNotification(notification.time)}
                                            </p>
                                        </div>

                                        {!notification.read && (
                                            <button
                                                onClick={() =>
                                                    setNotifications((previous) =>
                                                        previous.map((item) =>
                                                            item.id === notification.id
                                                                ? { ...item, read: true }
                                                                : item
                                                        )
                                                    )
                                                }
                                                className="shrink-0 text-xs font-semibold text-[#586FD6]"
                                            >
                                                {t("Mark read", "تحديد كمقروء")}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SectionPanel>
                    )}

                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <SectionPanel
                            title={t("My Profile", "ملفي الشخصي")}
                            description={t(
                                "Manage your personal information and password.",
                                "إدارة معلوماتك الشخصية وكلمة المرور."
                            )}
                        >
                            <div className="grid items-start gap-6 xl:grid-cols-[1fr_1fr]">
                                {/* Personal Information */}
                                <form
                                    onSubmit={saveProfile}
                                    className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                >
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="relative h-20 w-20 shrink-0">
                                            {profilePhoto ? (
                                                <img
                                                    src={profilePhoto}
                                                    alt="Student profile"
                                                    className="h-20 w-20 rounded-2xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-3xl font-bold text-white">
                                                    {studentName.charAt(0).toUpperCase()}
                                                </div>
                                            )}

                                            <label
                                                htmlFor="student-photo"
                                                title={t(
                                                    "Upload profile photo",
                                                    "رفع صورة الملف الشخصي"
                                                )}
                                                className="absolute -bottom-2 -end-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#586FD6] text-white shadow-md transition hover:bg-[#455BC1]"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M14 5h-4L8 8H4v12h16V8h-4z" />
                                                    <circle cx="12" cy="14" r="3" />
                                                </svg>
                                            </label>

                                            <input
                                                id="student-photo"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];

                                                    if (!file) return;

                                                    if (!file.type.startsWith("image/")) {
                                                        alert(
                                                            t(
                                                                "Please select an image file.",
                                                                "من فضلك اختر ملف صورة."
                                                            )
                                                        );
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    if (file.size > 5 * 1024 * 1024) {
                                                        alert(
                                                            t(
                                                                "Image size must be 5 MB or less.",
                                                                "يجب ألا يتجاوز حجم الصورة 5 ميجابايت."
                                                            )
                                                        );
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
                                            <h3 className="text-lg font-bold">
                                                {t("Personal Information", "المعلومات الشخصية")}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {t(
                                                    "Update your profile details and photo.",
                                                    "قم بتحديث بياناتك الشخصية وصورتك."
                                                )}
                                            </p>

                                            <label
                                                htmlFor="student-photo"
                                                className="mt-2 inline-block cursor-pointer text-sm font-semibold text-[#586FD6] hover:underline"
                                            >
                                                {t("Upload Photo", "رفع صورة")}
                                            </label>

                                            {profilePhoto && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setProfilePhoto("");

                                                        const input =
                                                            document.getElementById(
                                                                "student-photo"
                                                            ) as HTMLInputElement | null;

                                                        if (input) input.value = "";
                                                    }}
                                                    className="ms-3 text-sm font-semibold text-red-500 hover:underline"
                                                >
                                                    {t("Remove", "إزالة")}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        {t("Full Name", "الاسم بالكامل")}
                                    </label>

                                    <input
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder={t(
                                            "Enter your full name",
                                            "أدخل اسمك بالكامل"
                                        )}
                                    />

                                    <label className="mb-2 block text-sm font-semibold">
                                        {t("Email Address", "البريد الإلكتروني")}
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        dir="ltr"
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-start outline-none focus:border-[#869CFF]"
                                        placeholder="Enter your email"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">
                                        {t("Phone Number", "رقم الهاتف")}
                                    </label>

                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        dir="ltr"
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-start outline-none focus:border-[#869CFF]"
                                        placeholder={t(
                                            "Enter your phone number",
                                            "أدخل رقم هاتفك"
                                        )}
                                    />

                                    {saveMessage && (
                                        <p className="mb-4 rounded-xl bg-[#869CFF]/10 p-3 text-sm text-[#455BC1]">
                                            {saveMessage}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]"
                                    >
                                        {t("Save Changes", "حفظ التغييرات")}
                                    </button>
                                </form>

                                {/* Change Password */}
                                <form
                                    onSubmit={changePassword}
                                    className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                >
                                    <h3 className="text-lg font-bold">
                                        {t("Change Password", "تغيير كلمة المرور")}
                                    </h3>

                                    <p className="mb-6 mt-1 text-sm text-gray-500">
                                        {t(
                                            "Choose a strong password for your account.",
                                            "اختر كلمة مرور قوية لحسابك."
                                        )}
                                    </p>

                                    <label className="mb-2 block text-sm font-semibold">
                                        {t("Current Password", "كلمة المرور الحالية")}
                                    </label>

                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder={t(
                                            "Enter current password",
                                            "أدخل كلمة المرور الحالية"
                                        )}
                                    />

                                    <label className="mb-2 block text-sm font-semibold">
                                        {t("New Password", "كلمة المرور الجديدة")}
                                    </label>

                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                        minLength={8}
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder={t(
                                            "At least 8 characters",
                                            "8 أحرف على الأقل"
                                        )}
                                    />

                                    {passwordMessage && (
                                        <p className="mb-4 rounded-xl bg-[#E2A3FF]/20 p-3 text-sm">
                                            {passwordMessage}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl border border-[#869CFF]/50 px-5 py-3 text-sm font-bold text-[#586FD6] hover:bg-[#869CFF]/10"
                                    >
                                        {t("Update Password", "تحديث كلمة المرور")}
                                    </button>

                                    <p className="mt-4 text-xs leading-5 text-gray-400">
                                        {t(
                                            "Password changes require backend authentication before they can update a real account.",
                                            "تغيير كلمة المرور يحتاج إلى ربط نظام المصادقة بالـ Backend حتى يتم تحديث الحساب الحقيقي."
                                        )}
                                    </p>
                                </form>
                            </div>
                        </SectionPanel>
                    )}

                    <footer className="mt-10 border-t border-[#ECECF5] py-6 text-center text-xs text-gray-400">
                        {new Date().getFullYear()} Codo Learn.{" "}
                        {t(
                            "Keep learning, keep growing.",
                            "استمر في التعلم والتطور."
                        )}
                    </footer>
                </div>
            </main>
        </div>
    );
}

type Course = (typeof initialCourses)[number];

function CourseCard({
    course,
    onClick,
    isArabic,
}: {
    course: Course;
    onClick: () => void;
    isArabic: boolean;
}) {
    const t = (en: string, ar: string) => (isArabic ? ar : en);

    const categoryTranslations: Record<string, string> = {
        "Web Development": "تطوير الويب",
        Design: "التصميم",
        Programming: "البرمجة",
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ECECF5] bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#869CFF]/10">
            <div
                className="h-2"
                style={{
                    background: `linear-gradient(to right, ${course.color}, #E2A3FF)`,
                }}
            />

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <span className="rounded-lg bg-[#869CFF]/10 px-3 py-1.5 text-xs font-semibold text-[#586FD6]">
                        {isArabic
                            ? categoryTranslations[course.category] || course.category
                            : course.category}
                    </span>

                    <span className="text-xs text-gray-400">
                        {course.completedLessons}/{course.totalLessons}{" "}
                        {t("lessons", "درس")}
                    </span>
                </div>

                <h3 className="mt-5 text-lg font-bold">
                    {course.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    {t("Instructor: ", "المدرب: ")}
                    {course.instructor}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        {t("Your progress", "تقدمك")}
                    </span>

                    <strong>{course.progress}%</strong>
                </div>

                <ProgressBar value={course.progress} />

                <button
                    onClick={onClick}
                    className="mt-5 w-full rounded-xl bg-[#869CFF]/15 px-4 py-3 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/25"
                >
                    {t("Continue Course →", "متابعة الكورس ←")}
                </button>
            </div>
        </div>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                    width: `${value}%`,
                    background: "linear-gradient(to right, #869CFF, #E2A3FF)",
                }}
            />
        </div>
    );
}

function SectionPanel({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-2xl font-extrabold">{title}</h2>
                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            {children}
        </motion.section>
    );
}

function StatusBadge({
    status,
    isArabic,
}: {
    status: string;
    isArabic: boolean;
}) {
    const styles: Record<string, string> = {
        Paid: "bg-emerald-50 text-emerald-700",
        Approved: "bg-emerald-50 text-emerald-700",
        Pending: "bg-amber-50 text-amber-700",
        Rejected: "bg-red-50 text-red-700",
        Submitted: "bg-blue-50 text-blue-700",
        Graded: "bg-purple-50 text-purple-700",
    };

    const translations: Record<string, string> = {
        Paid: "مدفوع",
        Approved: "تمت الموافقة",
        Pending: "قيد الانتظار",
        Rejected: "مرفوض",
        Submitted: "تم التسليم",
        Graded: "تم التقييم",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-600"
                }`}
        >
            {isArabic ? translations[status] || status : status}
        </span>
    );
}

function SummaryCard({
    label,
    value,
    description,
}: {
    label: string;
    value: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-[#ECECF5] bg-white p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-3 text-2xl font-extrabold">{value}</p>
            <p className="mt-2 text-xs text-gray-400">{description}</p>
        </div>
    );
}
