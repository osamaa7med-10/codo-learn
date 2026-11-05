"use client";

import {
    useEffect,
    useState,
    type FormEvent,
    type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage, useTheme } from "../../context/LanguageContext";
import DashboardSettings from "../../components/DashboardSettings";

type Section =
    | "overview"
    | "courses"
    | "content"
    | "students"
    | "assignments"
    | "schedule"
    | "reviews"
    | "profile"
    | "settings";

type Course = {
    id: number;
    title: string;
    category: string;
    students: number;
    lessons: number;
    status: "Published" | "Draft";
    color: string;
};

type InstructorNotification = {
    id: number;
    title: string;
    description: string;
    type: "student" | "assignment" | "review" | "course" | "lesson";
    createdAt: string;
    read: boolean;
};

const NOTIFICATIONS_STORAGE_KEY = "codo-instructor-notifications";

const initialCourses: Course[] = [
    {
        id: 1,
        title: "Frontend Development",
        category: "Web Development",
        students: 42,
        lessons: 24,
        status: "Published",
        color: "#869CFF",
    },
    {
        id: 2,
        title: "JavaScript Fundamentals",
        category: "Programming",
        students: 35,
        lessons: 20,
        status: "Published",
        color: "#E2A3FF",
    },
    {
        id: 3,
        title: "React Advanced",
        category: "Web Development",
        students: 0,
        lessons: 0,
        status: "Draft",
        color: "#A8B5FF",
    },
];

const initialStudents = [
    {
        id: 1,
        name: "Omar Hassan",
        email: "omar@example.com",
        course: "Frontend Development",
        progress: 78,
        status: "Active",
    },
    {
        id: 2,
        name: "Sara Ahmed",
        email: "sara@example.com",
        course: "JavaScript Fundamentals",
        progress: 92,
        status: "Active",
    },
    {
        id: 3,
        name: "Ali Mohamed",
        email: "ali@example.com",
        course: "Frontend Development",
        progress: 35,
        status: "Active",
    },
    {
        id: 4,
        name: "Mariam Adel",
        email: "mariam@example.com",
        course: "JavaScript Fundamentals",
        progress: 60,
        status: "Active",
    },
];

const initialAssignments = [
    {
        id: 1,
        title: "Build a Responsive Landing Page",
        course: "Frontend Development",
        dueDate: "2026-10-20",
        submissions: 28,
        status: "Open",
    },
    {
        id: 2,
        title: "JavaScript Array Methods",
        course: "JavaScript Fundamentals",
        dueDate: "2026-10-22",
        submissions: 21,
        status: "Open",
    },
];

const initialSessions = [
    {
        id: 1,
        title: "React Components & Props",
        course: "Frontend Development",
        date: "Oct 16, 2026",
        time: "10:00 AM – 11:30 AM",
        type: "Live Session",
    },
    {
        id: 2,
        title: "JavaScript Practice",
        course: "JavaScript Fundamentals",
        date: "Oct 18, 2026",
        time: "12:00 PM – 1:00 PM",
        type: "Workshop",
    },
    {
        id: 3,
        title: "React State Management",
        course: "React Advanced",
        date: "Oct 20, 2026",
        time: "2:00 PM – 3:30 PM",
        type: "Live Session",
    },
];

const reviews = [
    {
        name: "Omar Hassan",
        course: "Frontend Development",
        rating: 5,
        message:
            "The explanations are clear, and the practical projects make learning easier.",
    },
    {
        name: "Sara Ahmed",
        course: "JavaScript Fundamentals",
        rating: 5,
        message:
            "A well-organized course with useful examples and exercises.",
    },
    {
        name: "Ali Mohamed",
        course: "Frontend Development",
        rating: 4,
        message:
            "Great learning experience. I would love to see more advanced projects.",
    },
];

const defaultNotifications: InstructorNotification[] = [
    {
        id: 1001,
        title: "New student enrolled",
        description: "Omar Hassan enrolled in Frontend Development.",
        type: "student",
        createdAt: "2026-10-18T10:30:00",
        read: false,
    },
    {
        id: 1002,
        title: "New assignment submission",
        description: "A student submitted JavaScript Array Methods.",
        type: "assignment",
        createdAt: "2026-10-18T09:15:00",
        read: false,
    },
    {
        id: 1003,
        title: "New course review",
        description: "Sara Ahmed left a 5-star review.",
        type: "review",
        createdAt: "2026-10-17T16:00:00",
        read: true,
    },
];

const navItems: {
    id: Section;
    label: string;
    arabicLabel: string;
    icon: string;
}[] = [
        { id: "overview", label: "Overview", arabicLabel: "الرئيسية", icon: "⌂" },
        { id: "courses", label: "My Courses", arabicLabel: "كورساتي", icon: "▤" },
        { id: "content", label: "Course Content", arabicLabel: "محتوى الكورسات", icon: "▷" },
        { id: "students", label: "My Students", arabicLabel: "طلابي", icon: "♙" },
        { id: "assignments", label: "Assignments", arabicLabel: "التكليفات", icon: "✓" },
        { id: "schedule", label: "Schedule", arabicLabel: "الجدول", icon: "▦" },
        { id: "reviews", label: "Reviews", arabicLabel: "التقييمات", icon: "☆" },
        { id: "profile", label: "My Profile", arabicLabel: "ملفي الشخصي", icon: "♙" },
        { id: "settings", label: "Settings", arabicLabel: "الإعدادات", icon: "⚙" },
    ];

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#869CFF] focus:ring-2 focus:ring-[#869CFF]/10";

export default function InstructorDashboard() {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, direction } = useLanguage();
    const isArabic = language === "ar";

    const t = (english: string, arabic: string) =>
        isArabic ? arabic : english;

    const [activeSection, setActiveSection] =
        useState<Section>("overview");

    const [phone, setPhone] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [message, setMessage] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [courses, setCourses] = useState(initialCourses);
    const [students] = useState(initialStudents);
    const [assignments, setAssignments] = useState(initialAssignments);
    const [sessions] = useState(initialSessions);

    const [profilePhoto, setProfilePhoto] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);

    const [courseTitle, setCourseTitle] = useState("");
    const [courseCategory, setCourseCategory] =
        useState("Web Development");
    const [courseStatus, setCourseStatus] =
        useState<"Published" | "Draft">("Draft");

    const [lessonTitle, setLessonTitle] = useState("");

    const [courseLessons, setCourseLessons] = useState<
        { id: number; courseId: number; title: string; type: string }[]
    >([
        {
            id: 1,
            courseId: 1,
            title: "Introduction to HTML",
            type: "Video",
        },
        {
            id: 2,
            courseId: 1,
            title: "CSS Fundamentals",
            type: "Video",
        },
        {
            id: 3,
            courseId: 1,
            title: "Responsive Design",
            type: "Material",
        },
        {
            id: 4,
            courseId: 2,
            title: "Variables and Data Types",
            type: "Video",
        },
    ]);

    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentCourseId, setAssignmentCourseId] = useState("1");
    const [assignmentDueDate, setAssignmentDueDate] =
        useState("2026-10-25");

    const [instructorName, setInstructorName] =
        useState("Instructor Name");
    const [email, setEmail] = useState("instructor@example.com");
    const [profileLoaded, setProfileLoaded] = useState(false);

    const [notifications, setNotifications] =
        useState<InstructorNotification[]>(defaultNotifications);
    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const [notificationFilter, setNotificationFilter] = useState<
        "all" | "unread"
    >("all");

    const [lessonsLoaded, setLessonsLoaded] = useState(false);

    // Load instructor profile
    useEffect(() => {
        try {
            const saved = localStorage.getItem("codo-instructor-profile");

            if (saved) {
                const profile = JSON.parse(saved);

                if (typeof profile.instructorName === "string") {
                    setInstructorName(profile.instructorName);
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
            console.error("Could not load instructor profile.");
        } finally {
            setProfileLoaded(true);
        }
    }, []);

    // Save instructor profile
    useEffect(() => {
        if (!profileLoaded) return;

        try {
            localStorage.setItem(
                "codo-instructor-profile",
                JSON.stringify({
                    instructorName,
                    email,
                    phone,
                    profilePhoto,
                })
            );
        } catch {
            setSaveMessage(
                t(
                    "Could not save the photo. Try a smaller image.",
                    "تعذر حفظ الصورة. جرّب صورة بحجم أصغر."
                )
            );
        }
    }, [instructorName, email, phone, profilePhoto, profileLoaded]);

    // Load notifications
    useEffect(() => {
        try {
            const saved = localStorage.getItem(
                NOTIFICATIONS_STORAGE_KEY
            );

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (
                    Array.isArray(parsed) &&
                    parsed.every(
                        (item) =>
                            item &&
                            typeof item.id === "number" &&
                            typeof item.title === "string" &&
                            typeof item.description === "string" &&
                            typeof item.createdAt === "string" &&
                            typeof item.read === "boolean" &&
                            [
                                "student",
                                "assignment",
                                "review",
                                "course",
                                "lesson",
                            ].includes(item.type)
                    )
                ) {
                    setNotifications(parsed as InstructorNotification[]);
                }
            }
        } catch {
            // Keep default notifications.
        } finally {
            setNotificationsLoaded(true);
        }
    }, []);

    // Save notifications
    useEffect(() => {
        if (!notificationsLoaded) return;

        try {
            localStorage.setItem(
                NOTIFICATIONS_STORAGE_KEY,
                JSON.stringify(notifications)
            );
        } catch {
            // Storage is optional.
        }
    }, [notifications, notificationsLoaded]);

    // Load lessons
    useEffect(() => {
        try {
            const saved = localStorage.getItem("codo-instructor-lessons");

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (
                    Array.isArray(parsed) &&
                    parsed.every(
                        (lesson) =>
                            typeof lesson.id === "number" &&
                            typeof lesson.courseId === "number" &&
                            typeof lesson.title === "string" &&
                            typeof lesson.type === "string"
                    )
                ) {
                    setCourseLessons(parsed);
                }
            }
        } catch {
            console.error("Could not load saved lessons.");
        } finally {
            setLessonsLoaded(true);
        }
    }, []);

    // Save lessons
    useEffect(() => {
        if (!lessonsLoaded) return;

        try {
            localStorage.setItem(
                "codo-instructor-lessons",
                JSON.stringify(courseLessons)
            );
        } catch {
            console.error("Could not save lessons.");
        }
    }, [courseLessons, lessonsLoaded]);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const visibleNotifications = notifications.filter(
        (notification) =>
            notificationFilter === "all" || !notification.read
    );

    const selectedCourse =
        courses.find((course) => course.id === selectedCourseId) ??
        courses[0];

    const totalStudents = courses.reduce(
        (sum, course) => sum + course.students,
        0
    );

    const publishedCourses = courses.filter(
        (course) => course.status === "Published"
    ).length;

    const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;

    const currentLessons = courseLessons.filter(
        (lesson) => lesson.courseId === selectedCourseId
    );

    const pageTitles: Record<Section, string> = {
        overview: t("Instructor Overview", "لوحة المدرب"),
        courses: t("My Courses", "كورساتي"),
        content: t("Course Content", "محتوى الكورسات"),
        students: t("My Students", "طلابي"),
        assignments: t("Assignments", "التكليفات"),
        schedule: t("Schedule", "الجدول"),
        reviews: t("Student Reviews", "تقييمات الطلاب"),
        profile: t("My Profile", "ملفي الشخصي"),
        settings: t("Settings", "الإعدادات"),
    };

    function openSection(section: Section) {
        setActiveSection(section);
        setSidebarOpen(false);
        setMessage("");
    }

    function addNotification(
        notification: Omit<
            InstructorNotification,
            "id" | "createdAt" | "read"
        >
    ) {
        setNotifications((previous) => [
            {
                ...notification,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                read: false,
            },
            ...previous,
        ]);
    }

    function markNotificationRead(id: number) {
        setNotifications((previous) =>
            previous.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    }

    function markAllNotificationsRead() {
        setNotifications((previous) =>
            previous.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    }

    function clearNotifications() {
        setNotifications([]);
    }

    function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        setSaveMessage(
            t(
                "Profile changes saved in this demo.",
                "تم حفظ تغييرات الملف الشخصي في النسخة التجريبية."
            )
        );
    }

    function changePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (newPassword.length < 8) {
            setPasswordMessage(
                t(
                    "Password must be at least 8 characters.",
                    "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل."
                )
            );
            return;
        }

        if (currentPassword === newPassword) {
            setPasswordMessage(
                t(
                    "Your new password must be different from your current password.",
                    "يجب أن تكون كلمة المرور الجديدة مختلفة عن الحالية."
                )
            );
            return;
        }

        setPasswordMessage(
            t(
                "Demo only: connect backend authentication to change your real password.",
                "هذه نسخة تجريبية فقط: يجب ربط نظام تسجيل الدخول بالـ Backend لتغيير كلمة المرور الحقيقية."
            )
        );

        setCurrentPassword("");
        setNewPassword("");
    }

    function addCourse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!courseTitle.trim()) return;

        const newCourse: Course = {
            id: Date.now(),
            title: courseTitle.trim(),
            category: courseCategory,
            students: 0,
            lessons: 0,
            status: courseStatus,
            color: courses.length % 2 === 0 ? "#E2A3FF" : "#869CFF",
        };

        setCourses((previous) => [...previous, newCourse]);
        setSelectedCourseId(newCourse.id);
        setCourseTitle("");
        setCourseStatus("Draft");
        setShowCourseForm(false);

        setMessage(
            t(
                "Course added to this demo dashboard.",
                "تمت إضافة الكورس إلى لوحة التحكم التجريبية."
            )
        );

        addNotification({
            title: "New course created",
            description: `${newCourse.title} was added to your courses.`,
            type: "course",
        });
    }

    function addLesson(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!lessonTitle.trim()) return;

        const newLessonTitle = lessonTitle.trim();

        setCourseLessons((previous) => [
            ...previous,
            {
                id: Date.now(),
                courseId: selectedCourseId,
                title: newLessonTitle,
                type: "Lesson",
            },
        ]);

        setCourses((previous) =>
            previous.map((course) =>
                course.id === selectedCourseId
                    ? { ...course, lessons: course.lessons + 1 }
                    : course
            )
        );

        setLessonTitle("");

        setMessage(
            t(
                "Lesson added to the local demo.",
                "تمت إضافة الدرس إلى النسخة التجريبية."
            )
        );

        addNotification({
            title: "New lesson added",
            description: `A new lesson "${newLessonTitle}" was added to ${selectedCourse.title}.`,
            type: "lesson",
        });
    }

    function addAssignment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newAssignmentTitle = assignmentTitle.trim();

        if (!newAssignmentTitle) return;

        const course = courses.find(
            (item) => item.id === Number(assignmentCourseId)
        );

        if (!course) return;

        setAssignments((previous) => [
            ...previous,
            {
                id: Date.now(),
                title: newAssignmentTitle,
                course: course.title,
                dueDate: assignmentDueDate,
                submissions: 0,
                status: "Open",
            },
        ]);

        setAssignmentTitle("");
        setShowAssignmentForm(false);

        setMessage(
            t(
                "Assignment added to this demo dashboard.",
                "تمت إضافة التكليف إلى لوحة التحكم التجريبية."
            )
        );

        addNotification({
            title: "New assignment created",
            description: `${newAssignmentTitle} was created for ${course.title}.`,
            type: "assignment",
        });
    }

    function handlePhotoUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert(
                t(
                    "Please select an image file.",
                    "من فضلك اختر ملف صورة."
                )
            );
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(
                t(
                    "Image size must be 5 MB or less.",
                    "يجب ألا يتجاوز حجم الصورة 5 ميجابايت."
                )
            );
            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                setProfilePhoto(reader.result);
                setSaveMessage("");
            }
        };

        reader.readAsDataURL(file);
    }
    return (
        <div
            dir={direction}
            className="min-h-screen bg-[#F8F8FC] text-[#20243A]"
        >
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#ECECF5] bg-white transition-transform duration-300 rtl:left-auto rtl:right-0 rtl:border-r-0 rtl:border-l ${sidebarOpen
                        ? "translate-x-0"
                        : isArabic
                            ? "translate-x-full lg:translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-[82px] items-center justify-between border-b border-[#F0F0F5] px-6">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={theme === "dark" ? "/logo-white.png" : "/logoooo-removebg-preview.png"}
                            alt="Codo Learn"
                            width={145}
                            height={55}
                            className="h-auto w-[135px] object-contain"
                            priority
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                    >
                        ✕
                    </button>
                </div>

                {/* Instructor Info */}
                <div className="mx-4 mt-6 rounded-2xl bg-[#F8F8FC] p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#869CFF]/20">
                            {profilePhoto ? (
                                <Image
                                    src={profilePhoto}
                                    alt="Instructor"
                                    width={44}
                                    height={44}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="font-bold text-[#586FD6]">
                                    {instructorName.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                                {instructorName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {t("Instructor Account", "حساب المدرب")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-7 flex-1 space-y-1 overflow-y-auto px-4 pb-6">
                    <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {t("Workspace", "مساحة العمل")}
                    </p>

                    {navItems.map((item) => {
                        const active = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => openSection(item.id)}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${active
                                        ? "bg-[#869CFF]/15 text-[#586FD6]"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-[#586FD6]"
                                    }`}
                            >
                                <span className="flex h-6 w-6 items-center justify-center text-lg">
                                    {item.icon}
                                </span>

                                <span>
                                    {isArabic
                                        ? item.arabicLabel
                                        : item.label}
                                </span>

                                {active && (
                                    <span className="ms-auto h-2 w-2 rounded-full bg-[#869CFF]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-[#F0F0F5] p-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#586FD6]"
                    >
                        <span>←</span>
                        {t("Back to Website", "العودة للموقع")}
                    </Link>

                    <div className="mt-3 rounded-xl bg-[#F8F8FC] p-3 text-center">
                        <p className="text-xs text-gray-400">
                            Codo Learn
                        </p>
                        <p className="mt-1 text-[10px] text-gray-400">
                            {t(
                                "Instructor Dashboard",
                                "لوحة تحكم المدرب"
                            )}
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="min-h-screen lg:ml-[270px] rtl:lg:ml-0 rtl:lg:mr-[270px]">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-[#ECECF5] bg-white/95 px-4 backdrop-blur-md sm:px-7 lg:px-9">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-xl border border-gray-200 p-2 text-gray-600 lg:hidden"
                        >
                            ☰
                        </button>

                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-bold sm:text-xl">
                                {pageTitles[activeSection]}
                            </h1>
                            <p className="hidden text-xs text-gray-400 sm:block">
                                {t(
                                    "Manage your teaching workspace",
                                    "إدارة مساحة العمل التعليمية الخاصة بك"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
<button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                            title={theme === "dark" ? "Light mode" : "Soft dark mode"}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#869CFF]/30 bg-[#F8F8FC] text-lg text-[#586FD6] transition hover:bg-[#869CFF]/15 dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300"
                        >
                            {theme === "dark" ? "☀️" : "🌙"}
                        </button>

                        {/* Language Toggle */}
                        <button
                            type="button"
                            onClick={() =>
                                setLanguage(isArabic ? "en" : "ar")
                            }
                            className="rounded-xl border border-[#ECECF5] bg-white px-3 py-2.5 text-xs font-bold text-[#586FD6] transition hover:bg-[#869CFF]/10 sm:px-4 sm:text-sm"
                        >
                            {isArabic ? "English" : "العربية"}
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setNotificationsOpen(
                                        !notificationsOpen
                                    )
                                }
                                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECECF5] text-lg text-gray-600 transition hover:bg-gray-50"
                            >
                                ♧

                                {unreadCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {notificationsOpen && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Close notifications"
                                        onClick={() =>
                                            setNotificationsOpen(false)
                                        }
                                        className="fixed inset-0 z-40 cursor-default"
                                    />

                                    <div className="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#ECECF5] bg-white shadow-xl rtl:right-auto rtl:left-0">
                                        <div className="flex items-center justify-between border-b border-gray-100 p-4">
                                            <div>
                                                <h3 className="font-bold">
                                                    {t(
                                                        "Notifications",
                                                        "الإشعارات"
                                                    )}
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {unreadCount}{" "}
                                                    {t(
                                                        "unread notifications",
                                                        "إشعارات غير مقروءة"
                                                    )}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={
                                                    markAllNotificationsRead
                                                }
                                                className="text-xs font-semibold text-[#586FD6] hover:underline"
                                            >
                                                {t(
                                                    "Mark all read",
                                                    "تحديد الكل كمقروء"
                                                )}
                                            </button>
                                        </div>

                                        <div className="max-h-[360px] overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <p className="p-6 text-center text-sm text-gray-400">
                                                    {t(
                                                        "No notifications yet.",
                                                        "لا توجد إشعارات حتى الآن."
                                                    )}
                                                </p>
                                            ) : (
                                                notifications
                                                    .slice(0, 6)
                                                    .map((notification) => (
                                                        <button
                                                            key={notification.id}
                                                            type="button"
                                                            onClick={() =>
                                                                markNotificationRead(
                                                                    notification.id
                                                                )
                                                            }
                                                            className={`w-full border-b border-gray-50 p-4 text-start transition hover:bg-gray-50 ${!notification.read
                                                                    ? "bg-[#869CFF]/5"
                                                                    : ""
                                                                }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#869CFF]" />

                                                                <div>
                                                                    <p className="text-sm font-bold">
                                                                        {translateNotification(
                                                                            notification.title,
                                                                            isArabic
                                                                        )}
                                                                    </p>
                                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                        {translateNotification(
                                                                            notification.description,
                                                                            isArabic
                                                                        )}
                                                                    </p>
                                                                    <p
                                                                        dir="ltr"
                                                                        className="mt-2 text-start text-[10px] text-gray-400"
                                                                    >
                                                                        {new Date(
                                                                            notification.createdAt
                                                                        ).toLocaleString(
                                                                            isArabic
                                                                                ? "ar-EG"
                                                                                : "en-GB"
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))
                                            )}
                                        </div>

                                        <div className="border-t border-gray-100 p-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    openSection(
                                                        "overview"
                                                    );
                                                    setNotificationsOpen(
                                                        false
                                                    );
                                                }}
                                                className="w-full text-center text-xs font-bold text-[#586FD6]"
                                            >
                                                {t(
                                                    "View Dashboard",
                                                    "عرض لوحة التحكم"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Profile Shortcut */}
                        <button
                            type="button"
                            onClick={() => openSection("profile")}
                            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#869CFF]/30 bg-[#869CFF]/10 font-bold text-[#586FD6]"
                        >
                            {profilePhoto ? (
                                <Image
                                    src={profilePhoto}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                instructorName.charAt(0).toUpperCase()
                            )}
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-9">
                    {/* General Message */}
                    {message && (
                        <div className="mb-6 flex items-center justify-between rounded-xl border border-[#869CFF]/30 bg-[#869CFF]/10 px-4 py-3 text-sm text-[#586FD6]">
                            <span>{message}</span>
                            <button
                                type="button"
                                onClick={() => setMessage("")}
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* OVERVIEW */}
                    {activeSection === "overview" && (
                        <div className="space-y-8">
                            {/* Welcome */}
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#586FD6] to-[#869CFF] p-6 text-white sm:p-9">
                                <div className="relative z-10 max-w-2xl">
                                    <p className="text-sm font-medium text-white/80">
                                        {t(
                                            "Welcome back,",
                                            "مرحباً بعودتك،"
                                        )}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                                        {instructorName}
                                    </h2>

                                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/85">
                                        {t(
                                            "Here is what's happening with your courses and students. Keep inspiring learners and sharing your knowledge.",
                                            "إليك آخر المستجدات المتعلقة بكورساتك وطلابك. استمر في إلهام المتعلمين ومشاركة معرفتك."
                                        )}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openSection("courses")
                                        }
                                        className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#586FD6] transition hover:bg-white/90"
                                    >
                                        {t(
                                            "Manage My Courses",
                                            "إدارة كورساتي"
                                        )}
                                    </button>
                                </div>

                                <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10 rtl:right-auto rtl:left-[-40px]" />
                                <div className="absolute -bottom-28 right-36 h-64 w-64 rounded-full bg-white/10 rtl:right-auto rtl:left-36" />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    label={t(
                                        "Total Courses",
                                        "إجمالي الكورسات"
                                    )}
                                    value={courses.length}
                                    icon="▤"
                                    color="bg-[#869CFF]/15 text-[#586FD6]"
                                />

                                <StatCard
                                    label={t(
                                        "Published Courses",
                                        "الكورسات المنشورة"
                                    )}
                                    value={publishedCourses}
                                    icon="✓"
                                    color="bg-emerald-50 text-emerald-600"
                                />

                                <StatCard
                                    label={t(
                                        "Total Students",
                                        "إجمالي الطلاب"
                                    )}
                                    value={totalStudents}
                                    icon="♙"
                                    color="bg-purple-50 text-purple-600"
                                />

                                <StatCard
                                    label={t(
                                        "Average Rating",
                                        "متوسط التقييم"
                                    )}
                                    value={`${averageRating.toFixed(1)}/5`}
                                    icon="☆"
                                    color="bg-amber-50 text-amber-600"
                                />
                            </div>

                            {/* Courses and Schedule */}
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6 xl:col-span-2">
                                    <div className="mb-6 flex items-center justify-between gap-3">
                                        <div>
                                            <h3 className="font-bold">
                                                {t(
                                                    "My Courses",
                                                    "كورساتي"
                                                )}
                                            </h3>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {t(
                                                    "Overview of your courses",
                                                    "نظرة عامة على كورساتك"
                                                )}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openSection("courses")
                                            }
                                            className="text-xs font-bold text-[#586FD6] hover:underline"
                                        >
                                            {t("View All", "عرض الكل")}
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {courses.slice(0, 4).map((course) => (
                                            <CourseCard
                                                key={course.id}
                                                course={course}
                                                isArabic={isArabic}
                                                onManage={() => {
                                                    setSelectedCourseId(
                                                        course.id
                                                    );
                                                    openSection("content");
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {courses.length === 0 && (
                                        <EmptyState
                                            title={t(
                                                "No courses yet",
                                                "لا توجد كورسات حتى الآن"
                                            )}
                                            description={t(
                                                "Create your first course to get started.",
                                                "أنشئ أول كورس لك للبدء."
                                            )}
                                        />
                                    )}
                                </section>

                                {/* Upcoming Sessions */}
                                <section className="rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6">
                                    <h3 className="font-bold">
                                        {t(
                                            "Upcoming Sessions",
                                            "المحاضرات القادمة"
                                        )}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {t(
                                            "Your teaching schedule",
                                            "جدولك التعليمي"
                                        )}
                                    </p>

                                    <div className="mt-6 space-y-5">
                                        {sessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="flex gap-3"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/10 text-[#586FD6]">
                                                    ▦
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold">
                                                        {session.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {session.course}
                                                    </p>
                                                    <p
                                                        dir="ltr"
                                                        className="mt-1 text-start text-[11px] text-gray-400"
                                                    >
                                                        {session.date} ·{" "}
                                                        {session.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openSection("schedule")
                                        }
                                        className="mt-6 w-full rounded-xl border border-[#ECECF5] py-3 text-xs font-bold text-[#586FD6] transition hover:bg-[#869CFF]/10"
                                    >
                                        {t(
                                            "View Schedule",
                                            "عرض الجدول"
                                        )}
                                    </button>
                                </section>
                            </div>

                            {/* Recent Assignments */}
                            <section className="rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold">
                                            {t(
                                                "Recent Assignments",
                                                "أحدث التكليفات"
                                            )}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {t(
                                                "Track your students' submissions",
                                                "تابع تسليمات الطلاب"
                                            )}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openSection("assignments")
                                        }
                                        className="text-xs font-bold text-[#586FD6]"
                                    >
                                        {t("View All", "عرض الكل")}
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {assignments.slice(0, 3).map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col justify-between gap-3 rounded-xl bg-[#F8F8FC] p-4 sm:flex-row sm:items-center"
                                        >
                                            <div>
                                                <p className="text-sm font-bold">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {item.course}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-gray-500">
                                                    {item.submissions}{" "}
                                                    {t(
                                                        "Submissions",
                                                        "تسليم"
                                                    )}
                                                </span>

                                                <StatusBadge
                                                    status={item.status}
                                                    isArabic={isArabic}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* MY COURSES */}
                    {activeSection === "courses" && (
                        <div className="space-y-6">
                            <SectionPanel
                                title={t("My Courses", "كورساتي")}
                                description={t(
                                    "Create, organize, and manage your learning courses.",
                                    "أنشئ ونظّم وأدر الكورسات التعليمية الخاصة بك."
                                )}
                                action={
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCourseForm(!showCourseForm)
                                        }
                                        className="rounded-xl bg-[#586FD6] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#455BC2]"
                                    >
                                        {showCourseForm
                                            ? t("Cancel", "إلغاء")
                                            : `+ ${t(
                                                "Create Course",
                                                "إنشاء كورس"
                                            )}`}
                                    </button>
                                }
                            >
                                {showCourseForm && (
                                    <form
                                        onSubmit={addCourse}
                                        className="mb-6 rounded-2xl border border-[#ECECF5] bg-[#F8F8FC] p-5"
                                    >
                                        <h3 className="mb-5 font-bold">
                                            {t(
                                                "Create New Course",
                                                "إنشاء كورس جديد"
                                            )}
                                        </h3>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <Field
                                                label={t(
                                                    "Course Title",
                                                    "اسم الكورس"
                                                )}
                                            >
                                                <input
                                                    required
                                                    value={courseTitle}
                                                    onChange={(event) =>
                                                        setCourseTitle(
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder={t(
                                                        "Enter course title",
                                                        "اكتب اسم الكورس"
                                                    )}
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field
                                                label={t(
                                                    "Category",
                                                    "التصنيف"
                                                )}
                                            >
                                                <select
                                                    value={courseCategory}
                                                    onChange={(event) =>
                                                        setCourseCategory(
                                                            event.target.value
                                                        )
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="Web Development">
                                                        {t(
                                                            "Web Development",
                                                            "تطوير الويب"
                                                        )}
                                                    </option>
                                                    <option value="Programming">
                                                        {t(
                                                            "Programming",
                                                            "البرمجة"
                                                        )}
                                                    </option>
                                                    <option value="UI/UX Design">
                                                        {t(
                                                            "UI/UX Design",
                                                            "تصميم واجهات المستخدم"
                                                        )}
                                                    </option>
                                                    <option value="Data & AI">
                                                        {t(
                                                            "Data & AI",
                                                            "البيانات والذكاء الاصطناعي"
                                                        )}
                                                    </option>
                                                </select>
                                            </Field>

                                            <Field
                                                label={t(
                                                    "Course Status",
                                                    "حالة الكورس"
                                                )}
                                            >
                                                <select
                                                    value={courseStatus}
                                                    onChange={(event) =>
                                                        setCourseStatus(
                                                            event.target.value as
                                                            | "Published"
                                                            | "Draft"
                                                        )
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="Draft">
                                                        {t(
                                                            "Draft",
                                                            "مسودة"
                                                        )}
                                                    </option>
                                                    <option value="Published">
                                                        {t(
                                                            "Published",
                                                            "منشور"
                                                        )}
                                                    </option>
                                                </select>
                                            </Field>
                                        </div>

                                        <button
                                            type="submit"
                                            className="mt-5 rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#455BC2]"
                                        >
                                            {t(
                                                "Save Course",
                                                "حفظ الكورس"
                                            )}
                                        </button>
                                    </form>
                                )}

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    {courses.map((course) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            isArabic={isArabic}
                                            onManage={() => {
                                                setSelectedCourseId(
                                                    course.id
                                                );
                                                openSection("content");
                                            }}
                                        />
                                    ))}
                                </div>

                                {courses.length === 0 && (
                                    <EmptyState
                                        title={t(
                                            "No courses found",
                                            "لا توجد كورسات"
                                        )}
                                        description={t(
                                            "Create your first course to get started.",
                                            "أنشئ أول كورس لك للبدء."
                                        )}
                                    />
                                )}
                            </SectionPanel>
                        </div>
                    )}

                    {/* COURSE CONTENT */}
                    {activeSection === "content" && (
                        <div className="space-y-6">
                            <SectionPanel
                                title={t(
                                    "Course Content",
                                    "محتوى الكورسات"
                                )}
                                description={t(
                                    "Manage lessons and learning materials for your courses.",
                                    "أدر الدروس والمواد التعليمية الخاصة بكورساتك."
                                )}
                            >
                                <div className="mb-6">
                                    <Field
                                        label={t(
                                            "Select Course",
                                            "اختر الكورس"
                                        )}
                                    >
                                        <select
                                            value={selectedCourseId}
                                            onChange={(event) =>
                                                setSelectedCourseId(
                                                    Number(event.target.value)
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            {courses.map((course) => (
                                                <option
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                {selectedCourse ? (
                                    <>
                                        <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl bg-[#F8F8FC] p-5 sm:flex-row sm:items-center">
                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    {t(
                                                        "Selected Course",
                                                        "الكورس المحدد"
                                                    )}
                                                </p>
                                                <h3 className="mt-1 text-lg font-bold">
                                                    {selectedCourse.title}
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {currentLessons.length}{" "}
                                                    {t(
                                                        "Lessons",
                                                        "دروس"
                                                    )}
                                                </p>
                                            </div>

                                            <StatusBadge
                                                status={selectedCourse.status}
                                                isArabic={isArabic}
                                            />
                                        </div>

                                        <form
                                            onSubmit={addLesson}
                                            className="mb-6 rounded-2xl border border-[#ECECF5] p-5"
                                        >
                                            <h3 className="mb-4 font-bold">
                                                {t(
                                                    "Add New Lesson",
                                                    "إضافة درس جديد"
                                                )}
                                            </h3>

                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <input
                                                    required
                                                    value={lessonTitle}
                                                    onChange={(event) =>
                                                        setLessonTitle(
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder={t(
                                                        "Enter lesson title",
                                                        "اكتب اسم الدرس"
                                                    )}
                                                    className={inputClass}
                                                />

                                                <button
                                                    type="submit"
                                                    className="shrink-0 rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#455BC2]"
                                                >
                                                    + {t(
                                                        "Add Lesson",
                                                        "إضافة درس"
                                                    )}
                                                </button>
                                            </div>
                                        </form>

                                        <div className="space-y-3">
                                            {currentLessons.map(
                                                (lesson, index) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center gap-4 rounded-xl border border-[#ECECF5] p-4"
                                                    >
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">
                                                            {String(
                                                                index + 1
                                                            ).padStart(2, "0")}
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-bold">
                                                                {lesson.title}
                                                            </p>
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {translateLessonType(
                                                                    lesson.type,
                                                                    isArabic
                                                                )}
                                                            </p>
                                                        </div>

                                                        <span className="text-xs text-gray-400">
                                                            {t(
                                                                "Lesson",
                                                                "درس"
                                                            )}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {currentLessons.length === 0 && (
                                            <EmptyState
                                                title={t(
                                                    "No lessons yet",
                                                    "لا توجد دروس حتى الآن"
                                                )}
                                                description={t(
                                                    "Add your first lesson using the form above.",
                                                    "أضف أول درس باستخدام النموذج بالأعلى."
                                                )}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <EmptyState
                                        title={t(
                                            "No course selected",
                                            "لم يتم اختيار كورس"
                                        )}
                                        description={t(
                                            "Create a course first to add lessons.",
                                            "أنشئ كورسًا أولًا حتى تتمكن من إضافة الدروس."
                                        )}
                                    />
                                )}

                                <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs leading-6 text-amber-700">
                                    {t(
                                        "Demo mode: Lessons are saved in this browser only. Video uploads and backend storage are not connected yet.",
                                        "الوضع التجريبي: يتم حفظ الدروس في هذا المتصفح فقط. رفع الفيديوهات والتخزين على الخادم غير متاحين حاليًا."
                                    )}
                                </div>
                            </SectionPanel>
                        </div>
                    )}

                    {/* STUDENTS */}
                    {activeSection === "students" && (
                        <SectionPanel
                            title={t("My Students", "طلابي")}
                            description={t(
                                "View your enrolled students and track their learning progress.",
                                "اعرض الطلاب المسجلين في كورساتك وتابع تقدمهم التعليمي."
                            )}
                        >
                            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <MiniStat
                                    label={t(
                                        "Total Students",
                                        "إجمالي الطلاب"
                                    )}
                                    value={students.length}
                                />
                                <MiniStat
                                    label={t(
                                        "Active Students",
                                        "الطلاب النشطون"
                                    )}
                                    value={
                                        students.filter(
                                            (student) =>
                                                student.status === "Active"
                                        ).length
                                    }
                                />
                                <MiniStat
                                    label={t(
                                        "Average Progress",
                                        "متوسط التقدم"
                                    )}
                                    value={`${Math.round(
                                        students.reduce(
                                            (sum, student) =>
                                                sum + student.progress,
                                            0
                                        ) / Math.max(students.length, 1)
                                    )}%`}
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] text-start">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-xs text-gray-400">
                                            <th className="px-4 py-4 text-start font-semibold">
                                                {t(
                                                    "Student",
                                                    "الطالب"
                                                )}
                                            </th>
                                            <th className="px-4 py-4 text-start font-semibold">
                                                {t(
                                                    "Course",
                                                    "الكورس"
                                                )}
                                            </th>
                                            <th className="px-4 py-4 text-start font-semibold">
                                                {t(
                                                    "Progress",
                                                    "التقدم"
                                                )}
                                            </th>
                                            <th className="px-4 py-4 text-start font-semibold">
                                                {t(
                                                    "Status",
                                                    "الحالة"
                                                )}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {students.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="border-b border-gray-50 last:border-0"
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#869CFF]/15 text-sm font-bold text-[#586FD6]">
                                                            {student.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-bold">
                                                                {student.name}
                                                            </p>
                                                            <p
                                                                dir="ltr"
                                                                className="text-start text-xs text-gray-400"
                                                            >
                                                                {student.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {student.course}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                                            <div
                                                                className="h-full rounded-full bg-[#869CFF]"
                                                                style={{
                                                                    width: `${student.progress}%`,
                                                                }}
                                                            />
                                                        </div>

                                                        <span className="text-xs font-semibold text-gray-500">
                                                            {student.progress}%
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <StatusBadge
                                                        status={student.status}
                                                        isArabic={isArabic}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-5 rounded-xl border border-[#ECECF5] bg-[#F8F8FC] p-4 text-xs leading-6 text-gray-500">
                                {t(
                                    "Student information is sample data for this frontend demo.",
                                    "بيانات الطلاب المعروضة بيانات تجريبية خاصة بنسخة الواجهة الأمامية."
                                )}
                            </div>
                        </SectionPanel>
                    )}

                    {/* ASSIGNMENTS */}
                    {activeSection === "assignments" && (
                        <SectionPanel
                            title={t("Assignments", "التكليفات")}
                            description={t(
                                "Create assignments and follow up on student submissions.",
                                "أنشئ التكليفات وتابع تسليمات الطلاب."
                            )}
                            action={
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAssignmentForm(
                                            !showAssignmentForm
                                        )
                                    }
                                    className="rounded-xl bg-[#586FD6] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#455BC2]"
                                >
                                    {showAssignmentForm
                                        ? t("Cancel", "إلغاء")
                                        : `+ ${t(
                                            "Create Assignment",
                                            "إنشاء تكليف"
                                        )}`}
                                </button>
                            }
                        >
                            {showAssignmentForm && (
                                <form
                                    onSubmit={addAssignment}
                                    className="mb-6 rounded-2xl border border-[#ECECF5] bg-[#F8F8FC] p-5"
                                >
                                    <h3 className="mb-5 font-bold">
                                        {t(
                                            "New Assignment",
                                            "تكليف جديد"
                                        )}
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Field
                                            label={t(
                                                "Assignment Title",
                                                "اسم التكليف"
                                            )}
                                        >
                                            <input
                                                required
                                                value={assignmentTitle}
                                                onChange={(event) =>
                                                    setAssignmentTitle(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder={t(
                                                    "Enter assignment title",
                                                    "اكتب اسم التكليف"
                                                )}
                                                className={inputClass}
                                            />
                                        </Field>

                                        <Field
                                            label={t(
                                                "Course",
                                                "الكورس"
                                            )}
                                        >
                                            <select
                                                value={assignmentCourseId}
                                                onChange={(event) =>
                                                    setAssignmentCourseId(
                                                        event.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                {courses.map((course) => (
                                                    <option
                                                        key={course.id}
                                                        value={course.id}
                                                    >
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field
                                            label={t(
                                                "Due Date",
                                                "تاريخ التسليم"
                                            )}
                                        >
                                            <input
                                                type="date"
                                                required
                                                value={assignmentDueDate}
                                                onChange={(event) =>
                                                    setAssignmentDueDate(
                                                        event.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                        </Field>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-5 rounded-xl bg-[#586FD6] px-6 py-3 text-sm font-bold text-white"
                                    >
                                        {t(
                                            "Save Assignment",
                                            "حفظ التكليف"
                                        )}
                                    </button>
                                </form>
                            )}

                            <div className="space-y-4">
                                {assignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className="rounded-2xl border border-[#ECECF5] p-5"
                                    >
                                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                            <div>
                                                <h3 className="font-bold">
                                                    {assignment.title}
                                                </h3>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    {assignment.course}
                                                </p>
                                            </div>

                                            <StatusBadge
                                                status={assignment.status}
                                                isArabic={isArabic}
                                            />
                                        </div>

                                        <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-gray-100 pt-4 text-xs text-gray-500">
                                            <span>
                                                ▦{" "}
                                                {t(
                                                    "Due:",
                                                    "موعد التسليم:"
                                                )}{" "}
                                                <span dir="ltr">
                                                    {assignment.dueDate}
                                                </span>
                                            </span>

                                            <span>
                                                ✓ {assignment.submissions}{" "}
                                                {t(
                                                    "Submissions",
                                                    "تسليم"
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {assignments.length === 0 && (
                                <EmptyState
                                    title={t(
                                        "No assignments yet",
                                        "لا توجد تكليفات حتى الآن"
                                    )}
                                    description={t(
                                        "Create your first assignment.",
                                        "أنشئ أول تكليف لك."
                                    )}
                                />
                            )}

                            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs leading-6 text-amber-700">
                                {t(
                                    "Demo mode: Assignment creation is stored in local React state only. Real submissions and grading are not connected.",
                                    "الوضع التجريبي: يتم حفظ التكليفات داخل حالة React فقط. لم يتم ربط التسليمات أو التصحيح الفعلي."
                                )}
                            </div>
                        </SectionPanel>
                    )}

                    {/* SCHEDULE */}
                    {activeSection === "schedule" && (
                        <SectionPanel
                            title={t("Schedule", "الجدول")}
                            description={t(
                                "Review your upcoming teaching sessions and workshops.",
                                "راجع المحاضرات وورش العمل القادمة."
                            )}
                        >
                            <div className="space-y-4">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex flex-col gap-4 rounded-2xl border border-[#ECECF5] p-5 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#869CFF]/15 text-2xl text-[#586FD6]">
                                            ▦
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold">
                                                {session.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {session.course}
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
                                                <span dir="ltr">
                                                    {session.date}
                                                </span>
                                                <span dir="ltr">
                                                    {session.time}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="w-fit rounded-full bg-[#869CFF]/10 px-3 py-2 text-xs font-semibold text-[#586FD6]">
                                            {session.type === "Workshop"
                                                ? t(
                                                    "Workshop",
                                                    "ورشة عمل"
                                                )
                                                : t(
                                                    "Live Session",
                                                    "محاضرة مباشرة"
                                                )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-xl bg-[#F8F8FC] p-4 text-xs leading-6 text-gray-500">
                                {t(
                                    "Your schedule is sample data. Calendar management and live session integration are not connected yet.",
                                    "الجدول المعروض تجريبي. لم يتم ربط إدارة التقويم أو المحاضرات المباشرة حتى الآن."
                                )}
                            </div>
                        </SectionPanel>
                    )}

                    {/* REVIEWS */}
                    {activeSection === "reviews" && (
                        <SectionPanel
                            title={t(
                                "Student Reviews",
                                "تقييمات الطلاب"
                            )}
                            description={t(
                                "See what your students think about your courses.",
                                "اطلع على آراء الطلاب حول كورساتك."
                            )}
                        >
                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-[#F8F8FC] p-5">
                                    <p className="text-sm text-gray-500">
                                        {t(
                                            "Average Rating",
                                            "متوسط التقييم"
                                        )}
                                    </p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-4xl font-bold text-[#586FD6]">
                                            {averageRating.toFixed(1)}
                                        </span>
                                        <div>
                                            <p className="text-amber-400">
                                                ★★★★★
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {t(
                                                    "Based on sample reviews",
                                                    "بناءً على التقييمات التجريبية"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-[#F8F8FC] p-5">
                                    <p className="text-sm text-gray-500">
                                        {t(
                                            "Total Reviews",
                                            "إجمالي التقييمات"
                                        )}
                                    </p>
                                    <p className="mt-3 text-4xl font-bold text-[#586FD6]">
                                        {reviews.length}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-[#ECECF5] p-5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#869CFF]/15 font-bold text-[#586FD6]">
                                                    {review.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold">
                                                        {review.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {review.course}
                                                    </p>
                                                </div>
                                            </div>

                                            <span
                                                dir="ltr"
                                                className="text-sm text-amber-400"
                                            >
                                                {"★".repeat(review.rating)}
                                                {"☆".repeat(
                                                    5 - review.rating
                                                )}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-sm leading-7 text-gray-600">
                                            {review.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </SectionPanel>
                    )}

                    {activeSection === "settings" && <DashboardSettings role="instructor" />}

                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <div className="space-y-6">
                            <SectionPanel
                                title={t(
                                    "My Profile",
                                    "ملفي الشخصي"
                                )}
                                description={t(
                                    "Manage your personal information and account settings.",
                                    "أدر معلوماتك الشخصية وإعدادات حسابك."
                                )}
                            >
                                <form
                                    onSubmit={saveProfile}
                                    className="space-y-6"
                                >
                                    {/* Photo */}
                                    <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#869CFF]/20 bg-[#869CFF]/10 text-3xl font-bold text-[#586FD6]">
                                            {profilePhoto ? (
                                                <Image
                                                    src={profilePhoto}
                                                    alt="Instructor profile"
                                                    width={96}
                                                    height={96}
                                                    unoptimized
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                instructorName
                                                    .charAt(0)
                                                    .toUpperCase()
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-bold">
                                                {t(
                                                    "Profile Photo",
                                                    "الصورة الشخصية"
                                                )}
                                            </h3>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {t(
                                                    "Upload a profile picture. Maximum size 5 MB.",
                                                    "ارفع صورة شخصية. الحد الأقصى للحجم 5 ميجابايت."
                                                )}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-3">
                                                <label
                                                    htmlFor="instructor-profile-photo"
                                                    className="cursor-pointer rounded-xl bg-[#586FD6] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#455BC2]"
                                                >
                                                    {t(
                                                        "Upload Photo",
                                                        "رفع صورة"
                                                    )}
                                                </label>

                                                <input
                                                    id="instructor-profile-photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePhotoUpload}
                                                    className="hidden"
                                                />

                                                {profilePhoto && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setProfilePhoto("")
                                                        }
                                                        className="rounded-xl border border-red-100 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50"
                                                    >
                                                        {t(
                                                            "Remove Photo",
                                                            "إزالة الصورة"
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="mb-5 font-bold">
                                            {t(
                                                "Personal Information",
                                                "المعلومات الشخصية"
                                            )}
                                        </h3>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <Field
                                                label={t(
                                                    "Full Name",
                                                    "الاسم بالكامل"
                                                )}
                                            >
                                                <input
                                                    required
                                                    value={instructorName}
                                                    onChange={(event) =>
                                                        setInstructorName(
                                                            event.target.value
                                                        )
                                                    }
                                                    className={inputClass}
                                                    placeholder={t(
                                                        "Enter your full name",
                                                        "اكتب اسمك بالكامل"
                                                    )}
                                                />
                                            </Field>

                                            <Field
                                                label={t(
                                                    "Email Address",
                                                    "البريد الإلكتروني"
                                                )}
                                            >
                                                <input
                                                    dir="ltr"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(event) =>
                                                        setEmail(
                                                            event.target.value
                                                        )
                                                    }
                                                    className={`${inputClass} text-left`}
                                                    placeholder="example@email.com"
                                                />
                                            </Field>

                                            <Field
                                                label={t(
                                                    "Phone Number",
                                                    "رقم الهاتف"
                                                )}
                                            >
                                                <input
                                                    dir="ltr"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(event) =>
                                                        setPhone(
                                                            event.target.value
                                                        )
                                                    }
                                                    className={`${inputClass} text-left`}
                                                    placeholder="+20 100 000 0000"
                                                />
                                            </Field>
                                        </div>
                                    </div>

                                    {saveMessage && (
                                        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                            {saveMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#586FD6] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#455BC2]"
                                    >
                                        {t(
                                            "Save Changes",
                                            "حفظ التغييرات"
                                        )}
                                    </button>
                                </form>
                            </SectionPanel>

                            {/* Password */}
                            <SectionPanel
                                title={t(
                                    "Change Password",
                                    "تغيير كلمة المرور"
                                )}
                                description={t(
                                    "Update your account password.",
                                    "قم بتحديث كلمة مرور حسابك."
                                )}
                            >
                                <form
                                    onSubmit={changePassword}
                                    className="max-w-2xl space-y-5"
                                >
                                    <Field
                                        label={t(
                                            "Current Password",
                                            "كلمة المرور الحالية"
                                        )}
                                    >
                                        <input
                                            type="password"
                                            required
                                            value={currentPassword}
                                            onChange={(event) =>
                                                setCurrentPassword(
                                                    event.target.value
                                                )
                                            }
                                            className={inputClass}
                                            placeholder={t(
                                                "Enter current password",
                                                "أدخل كلمة المرور الحالية"
                                            )}
                                        />
                                    </Field>

                                    <Field
                                        label={t(
                                            "New Password",
                                            "كلمة المرور الجديدة"
                                        )}
                                    >
                                        <input
                                            type="password"
                                            required
                                            minLength={8}
                                            value={newPassword}
                                            onChange={(event) =>
                                                setNewPassword(
                                                    event.target.value
                                                )
                                            }
                                            className={inputClass}
                                            placeholder={t(
                                                "Enter new password",
                                                "أدخل كلمة المرور الجديدة"
                                            )}
                                        />
                                    </Field>

                                    {passwordMessage && (
                                        <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-700">
                                            {passwordMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#586FD6] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#455BC2]"
                                    >
                                        {t(
                                            "Update Password",
                                            "تحديث كلمة المرور"
                                        )}
                                    </button>

                                    <p className="text-xs leading-6 text-gray-400">
                                        {t(
                                            "Demo only: password changes are not connected to a real authentication system.",
                                            "نسخة تجريبية فقط: تغيير كلمة المرور غير مرتبط بنظام تسجيل دخول حقيقي."
                                        )}
                                    </p>
                                </form>
                            </SectionPanel>
                        </div>
                    )}

                    {/* Footer */}
                    <footer className="mt-10 border-t border-[#ECECF5] py-6 text-center">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Codo Learn.{" "}
                            {t(
                                "All rights reserved.",
                                "جميع الحقوق محفوظة."
                            )}
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}

/* =========================================
   HELPER COMPONENTS
========================================= */

function translateNotification(
    value: string,
    isArabic: boolean
): string {
    if (!isArabic) return value;

    const translations: Record<string, string> = {
        "New student enrolled": "طالب جديد انضم",
        "New assignment submission": "تسليم تكليف جديد",
        "New course review": "تقييم جديد للكورس",
        "New course created": "تم إنشاء كورس جديد",
        "New lesson added": "تمت إضافة درس جديد",
    };

    const exactTranslation = translations[value];

    if (exactTranslation) return exactTranslation;

    return value
        .replace(
            " enrolled in ",
            " انضم إلى كورس "
        )
        .replace(
            "A student submitted ",
            "قام أحد الطلاب بتسليم "
        )
        .replace(
            " left a 5-star review.",
            " أضاف تقييمًا بخمس نجوم."
        )
        .replace(
            " was added to your courses.",
            " تمت إضافته إلى كورساتك."
        )
        .replace(
            " was created for ",
            " تم إنشاؤه لكورس "
        )
        .replace(
            "A new lesson ",
            "درس جديد "
        )
        .replace(
            " was added to ",
            " تمت إضافته إلى "
        );
}

function translateLessonType(
    type: string,
    isArabic: boolean
): string {
    if (!isArabic) return type;

    const translations: Record<string, string> = {
        Video: "فيديو",
        Material: "مادة تعليمية",
        Lesson: "درس",
    };

    return translations[type] ?? type;
}

function SectionPanel({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-7">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-bold sm:text-xl">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        {description}
                    </p>
                </div>

                {action}
            </div>

            {children}
        </section>
    );
}

function StatCard({
    label,
    value,
    icon,
    color,
}: {
    label: string;
    value: string | number;
    icon: string;
    color: string;
}) {
    return (
        <div className="rounded-2xl border border-[#ECECF5] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                    {label}
                </p>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${color}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-5 text-3xl font-bold text-[#20243A]">
                {value}
            </p>
        </div>
    );
}

function MiniStat({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl bg-[#F8F8FC] p-4">
            <p className="text-xs text-gray-500">
                {label}
            </p>
            <p className="mt-2 text-2xl font-bold text-[#586FD6]">
                {value}
            </p>
        </div>
    );
}

function StatusBadge({
    status,
    isArabic = false,
}: {
    status: string;
    isArabic?: boolean;
}) {
    const styles: Record<string, string> = {
        Published: "bg-emerald-50 text-emerald-700",
        Active: "bg-emerald-50 text-emerald-700",
        Open: "bg-emerald-50 text-emerald-700",
        Draft: "bg-amber-50 text-amber-700",
        Pending: "bg-amber-50 text-amber-700",
        Completed: "bg-blue-50 text-blue-700",
        Closed: "bg-gray-100 text-gray-600",
    };

    const translations: Record<string, string> = {
        Published: "منشور",
        Active: "نشط",
        Open: "مفتوح",
        Draft: "مسودة",
        Pending: "قيد الانتظار",
        Completed: "مكتمل",
        Closed: "مغلق",
    };

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold ${styles[status] ?? "bg-gray-100 text-gray-600"
                }`}
        >
            {isArabic
                ? translations[status] ?? status
                : status}
        </span>
    );
}

function CourseCard({
    course,
    onManage,
    isArabic = false,
}: {
    course: Course;
    onManage: () => void;
    isArabic?: boolean;
}) {
    const t = (english: string, arabic: string) =>
        isArabic ? arabic : english;

    const categoryTranslations: Record<string, string> = {
        "Web Development": "تطوير الويب",
        Programming: "البرمجة",
        "UI/UX Design": "تصميم واجهات المستخدم",
        "Data & AI": "البيانات والذكاء الاصطناعي",
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ECECF5] bg-white transition hover:shadow-md">
            <div
                className="h-2 w-full"
                style={{ backgroundColor: course.color }}
            />

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-[#586FD6]">
                            {isArabic
                                ? categoryTranslations[course.category] ??
                                course.category
                                : course.category}
                        </p>

                        <h3 className="mt-2 text-base font-bold">
                            {course.title}
                        </h3>
                    </div>

                    <StatusBadge
                        status={course.status}
                        isArabic={isArabic}
                    />
                </div>

                <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-lg font-bold">
                            {course.students}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            {t("Students", "الطلاب")}
                        </p>
                    </div>

                    <div>
                        <p className="text-lg font-bold">
                            {course.lessons}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            {t("Lessons", "الدروس")}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onManage}
                    className="mt-5 w-full rounded-xl border border-[#869CFF]/40 py-3 text-xs font-bold text-[#586FD6] transition hover:bg-[#869CFF]/10"
                >
                    {t("Manage Content", "إدارة المحتوى")}
                </button>
            </div>
        </div>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <label className="block space-y-2">
            <span className="block text-sm font-semibold text-[#20243A]">
                {label}
            </span>
            {children}
        </label>
    );
}

function EmptyState({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-[#DADCEB] px-5 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#869CFF]/10 text-2xl text-[#586FD6]">
                ▤
            </div>

            <h3 className="mt-4 font-bold text-[#20243A]">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
                {description}
            </p>
        </div>
    );
}