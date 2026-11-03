
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

type AccountRole = "student" | "instructor" | "employee" | "client";

const inputClass =
    "w-full rounded-xl border border-[#E5E7F2] bg-white px-4 py-3.5 text-sm text-[#20243A] outline-none transition placeholder:text-[#A3A8BC] focus:border-[#869CFF] focus:ring-4 focus:ring-[#869CFF]/10";

const labelClass = "mb-2 block text-sm font-semibold text-[#343B58]";

const translations: Record<string, string> = {
    "Learn. Build. Grow.": "اتعلم. ابنِ. اتطور.",
    "Your next chapter starts here.": "رحلتك الجديدة تبدأ من هنا.",
    "Build your profile, tell us what you want to achieve, and find the learning or professional path that fits your goals.":
        "أنشئ ملفك الشخصي، وأخبرنا بأهدافك، واكتشف المسار التعليمي أو المهني المناسب لك.",
    "A profile tailored to your account type": "ملف شخصي مناسب لنوع حسابك",
    "Learning and career preferences in one place": "اهتماماتك التعليمية والمهنية في مكان واحد",
    "One community for skills, projects, and growth": "مجتمع واحد للمهارات والمشروعات والتطور",
    "Codo Learn · Training & Digital Solutions": "Codo Learn · التدريب والحلول الرقمية",
    "Back to home": "العودة للرئيسية",
    "Join Codo Learn": "انضم إلى Codo Learn",
    "Create your account": "أنشئ حسابك",
    "Add a few details so we can tailor your Codo Learn experience. Fields marked with":
        "أضف بعض البيانات لنخصص تجربتك في Codo Learn. الحقول التي تحمل علامة",
    "are required.": "مطلوبة.",
    "Account type": "نوع الحساب",
    "Choose the profile that fits you.": "اختر نوع الحساب المناسب لك.",
    Student: "طالب",
    Instructor: "مدرب",
    Employee: "موظف",
    Client: "عميل",
    "Learn skills": "تعلم مهارات جديدة",
    "Teach courses": "تقديم الدورات",
    "Team member": "عضو بالفريق",
    "Request services": "طلب خدمات",
    "Personal information": "البيانات الشخصية",
    "How we can identify and contact you.": "بيانات تساعدنا على التعرف عليك والتواصل معك.",
    "Full name": "الاسم بالكامل",
    "e.g. Alex Morgan": "مثال: أحمد محمد",
    "Email address": "البريد الإلكتروني",
    "Phone number": "رقم الهاتف",
    Country: "الدولة",
    "Select country": "اختر الدولة",
    Egypt: "مصر",
    "Saudi Arabia": "المملكة العربية السعودية",
    "United Arab Emirates": "الإمارات العربية المتحدة",
    Jordan: "الأردن",
    Morocco: "المغرب",
    Other: "أخرى",
    City: "المدينة",
    "Your city": "مدينتك",
    "LinkedIn profile": "حساب LinkedIn",
    optional: "اختياري",
    "Education & learning goals": "التعليم والأهداف التعليمية",
    "Help us recommend the right learning path.": "ساعدنا في ترشيح المسار التعليمي المناسب لك.",
    "University / Institution": "الجامعة / المؤسسة التعليمية",
    "University or school name": "اسم الجامعة أو المدرسة",
    "Education level": "المستوى التعليمي",
    "Select level": "اختر المستوى التعليمي",
    "High school": "المرحلة الثانوية",
    "University student": "طالب جامعي",
    Graduate: "خريج",
    Postgraduate: "دراسات عليا",
    "Self-taught": "تعلم ذاتي",
    "Major / Field of study": "التخصص / مجال الدراسة",
    "e.g. Computer Science": "مثال: علوم الحاسب",
    "Interested track": "المسار المهتم به",
    "Choose a track": "اختر المسار",
    "Frontend Development": "تطوير الواجهات الأمامية",
    "Backend Development": "تطوير الواجهات الخلفية",
    "Full-Stack Development": "تطوير الويب المتكامل",
    "Mobile App Development": "تطوير تطبيقات الهاتف",
    "UI/UX Design": "تصميم واجهات وتجربة المستخدم",
    "Data Science & AI": "علوم البيانات والذكاء الاصطناعي",
    Cybersecurity: "الأمن السيبراني",
    "Digital Marketing": "التسويق الرقمي",
    "Not sure yet": "لم أحدد بعد",
    "Instructor profile": "الملف الشخصي للمدرب",
    "Share your expertise and teaching background.": "شاركنا خبراتك ومعلوماتك في مجال التدريب.",
    Specialization: "التخصص",
    "e.g. React, UI/UX, Data Science": "مثال: React أو UI/UX أو علوم البيانات",
    "Teaching / work experience": "الخبرة في التدريس / العمل",
    "Select experience": "اختر سنوات الخبرة",
    "Less than 1 year": "أقل من سنة",
    "1–2 years": "من سنة إلى سنتين",
    "3–5 years": "من 3 إلى 5 سنوات",
    "6–10 years": "من 6 إلى 10 سنوات",
    "10+ years": "أكثر من 10 سنوات",
    "Portfolio / personal website": "معرض الأعمال / الموقع الشخصي",
    "Work information": "بيانات العمل",
    "Details to help identify your team profile.": "بيانات تساعدنا في تحديد ملفك داخل فريق العمل.",
    "Job title": "المسمى الوظيفي",
    "e.g. Training Coordinator": "مثال: منسق تدريب",
    Department: "القسم",
    "e.g. Operations": "مثال: العمليات",
    "Work email": "البريد الإلكتروني للعمل",
    "Company & Project Information": "بيانات الشركة والمشروع",
    "Tell us about your company and the digital services you need.":
        "أخبرنا عن شركتك والخدمات الرقمية التي تحتاج إليها.",
    "Company / Organization Name": "اسم الشركة / المؤسسة",
    "e.g. Tech Solutions": "مثال: Tech Solutions",
    "Company Website": "موقع الشركة",
    Industry: "مجال العمل",
    "Select industry": "اختر مجال العمل",
    "Technology & IT": "التكنولوجيا وتقنية المعلومات",
    Education: "التعليم",
    Healthcare: "الرعاية الصحية",
    "E-Commerce & Retail": "التجارة الإلكترونية والتجزئة",
    "Finance & Banking": "التمويل والبنوك",
    "Real Estate": "العقارات",
    "Marketing & Advertising": "التسويق والإعلان",
    Manufacturing: "التصنيع",
    "Company Size": "حجم الشركة",
    "Select company size": "اختر حجم الشركة",
    "Just me": "فرد واحد",
    "2–10 employees": "من 2 إلى 10 موظفين",
    "11–50 employees": "من 11 إلى 50 موظفًا",
    "51–200 employees": "من 51 إلى 200 موظف",
    "201–500 employees": "من 201 إلى 500 موظف",
    "500+ employees": "أكثر من 500 موظف",
    "Service Required": "الخدمة المطلوبة",
    "Choose a service": "اختر الخدمة",
    "Web Development": "تطوير المواقع",
    "Mobile Applications": "تطبيقات الهاتف",
    "E-Commerce Solutions": "حلول التجارة الإلكترونية",
    "Software Solutions": "الحلول البرمجية",
    "Digital Transformation": "التحول الرقمي",
    "Multiple Services": "أكثر من خدمة",
    "Not Sure Yet": "لم أحدد بعد",
    "Project Description": "وصف المشروع",
    "Tell us about your project, goals, requirements, and what you want to achieve...":
        "أخبرنا عن مشروعك وأهدافك ومتطلباتك والنتائج التي ترغب في تحقيقها...",
    "Secure your account": "تأمين حسابك",
    "Create a strong password for your account.": "أنشئ كلمة مرور قوية لحسابك.",
    Password: "كلمة المرور",
    "Create a strong password": "أنشئ كلمة مرور قوية",
    Hide: "إخفاء",
    Show: "إظهار",
    "At least 8 characters, uppercase, lowercase, and a number.":
        "8 أحرف على الأقل، مع حرف كبير وحرف صغير ورقم.",
    "Confirm password": "تأكيد كلمة المرور",
    "Enter password again": "أدخل كلمة المرور مرة أخرى",
    "I agree to the": "أوافق على",
    "Terms of Service": "شروط الخدمة",
    and: "و",
    "Privacy Policy": "سياسة الخصوصية",
    "You must accept both policies to create an account.":
        "يجب الموافقة على كلتا السياستين لإنشاء الحساب.",
    "Create Account": "إنشاء الحساب",
    "Already have an account?": "لديك حساب بالفعل؟",
    "Log in": "تسجيل الدخول",
    "Your details help personalize your experience. Account creation is currently a frontend demo.":
        "تساعدنا بياناتك في تخصيص تجربتك. إنشاء الحساب حاليًا مجرد نموذج تجريبي للواجهة الأمامية.",
    "Please complete all required personal and account details.":
        "يرجى إكمال جميع البيانات الشخصية وبيانات الحساب المطلوبة.",
    "Please enter a valid email address.": "يرجى إدخال بريد إلكتروني صحيح.",
    "Please enter a valid phone number.": "يرجى إدخال رقم هاتف صحيح.",
    "Use at least 8 characters, including uppercase and lowercase letters and a number.":
        "استخدم 8 أحرف على الأقل، تشمل حرفًا كبيرًا وحرفًا صغيرًا ورقمًا.",
    "Passwords do not match. Please try again.":
        "كلمتا المرور غير متطابقتين. حاول مرة أخرى.",
    "Please enter a valid LinkedIn URL starting with https://.":
        "يرجى إدخال رابط LinkedIn صحيح يبدأ بـ https://.",
    "Please complete the required student education and learning details.":
        "يرجى إكمال بيانات التعليم والمسار التعليمي المطلوبة للطالب.",
    "Please complete your instructor specialization and experience.":
        "يرجى إكمال بيانات تخصص المدرب وخبرته.",
    "Please enter a valid portfolio URL starting with https://.":
        "يرجى إدخال رابط معرض أعمال صحيح يبدأ بـ https://.",
    "Please complete your employee job details.":
        "يرجى إكمال بيانات الوظيفة الخاصة بالموظف.",
    "Please enter a valid work email address.":
        "يرجى إدخال بريد إلكتروني صحيح خاص بالعمل.",
    "Please complete all required company and project information.":
        "يرجى إكمال جميع بيانات الشركة والمشروع المطلوبة.",
    "Please enter a valid company website URL starting with https://.":
        "يرجى إدخال رابط موقع الشركة بشكل صحيح ويبدأ بـ https://.",
    "Please agree to the Terms of Service and Privacy Policy.":
        "يرجى الموافقة على شروط الخدمة وسياسة الخصوصية.",
};

export default function SignupPage() {
    const { language, setLanguage, direction } = useLanguage();
    const isArabic = language === "ar";

    const t = (value: string) =>
        isArabic ? translations[value] ?? value : value;

    const [role, setRole] = useState<AccountRole>("student");

    // Personal information
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("Egypt");
    const [city, setCity] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");

    // Password
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Student information
    const [university, setUniversity] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [major, setMajor] = useState("");
    const [learningTrack, setLearningTrack] = useState("");

    // Instructor information
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");

    // Employee information
    const [jobTitle, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [workEmail, setWorkEmail] = useState("");

    // Client information
    const [companyName, setCompanyName] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [industry, setIndustry] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [serviceRequired, setServiceRequired] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    // Feedback
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function clearFeedback() {
        setError("");
        setMessage("");
    }

    function handleRoleChange(nextRole: AccountRole) {
        setRole(nextRole);
        clearFeedback();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearFeedback();

        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !country ||
            !city.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please complete all required personal and account details.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlPattern = /^https?:\/\/.+\..+/i;

        if (!emailPattern.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (phone.replace(/\D/g, "").length < 8) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/\d/.test(password)
        ) {
            setError(
                "Use at least 8 characters, including uppercase and lowercase letters and a number."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        if (linkedinUrl.trim() && !urlPattern.test(linkedinUrl.trim())) {
            setError("Please enter a valid LinkedIn URL starting with https://.");
            return;
        }

        if (
            role === "student" &&
            (!university.trim() ||
                !educationLevel ||
                !major.trim() ||
                !learningTrack)
        ) {
            setError(
                "Please complete the required student education and learning details."
            );
            return;
        }

        if (role === "instructor" && (!specialization.trim() || !experience)) {
            setError(
                "Please complete your instructor specialization and experience."
            );
            return;
        }

        if (
            role === "instructor" &&
            portfolioUrl.trim() &&
            !urlPattern.test(portfolioUrl.trim())
        ) {
            setError("Please enter a valid portfolio URL starting with https://.");
            return;
        }

        if (
            role === "employee" &&
            (!jobTitle.trim() || !department.trim() || !workEmail.trim())
        ) {
            setError("Please complete your employee job details.");
            return;
        }

        if (role === "employee" && !emailPattern.test(workEmail.trim())) {
            setError("Please enter a valid work email address.");
            return;
        }

        if (
            role === "client" &&
            (!companyName.trim() ||
                !industry ||
                !companySize ||
                !serviceRequired ||
                !projectDescription.trim())
        ) {
            setError(
                "Please complete all required company and project information."
            );
            return;
        }

        if (
            role === "client" &&
            companyWebsite.trim() &&
            !urlPattern.test(companyWebsite.trim())
        ) {
            setError(
                "Please enter a valid company website URL starting with https://."
            );
            return;
        }

        if (!acceptTerms) {
            setError("Please agree to the Terms of Service and Privacy Policy.");
            return;
        }

        setMessage(
            `Your ${role} registration details are valid. Account creation is not connected to a backend yet.`
        );
    }

    const renderInput = (
        id: string,
        label: string,
        value: string,
        setter: (value: string) => void,
        options?: {
            placeholder?: string;
            type?: string;
            autoComplete?: string;
            optional?: boolean;
            dir?: "ltr" | "rtl";
        }
    ) => (
        <div>
            <label className={labelClass} htmlFor={id}>
                {t(label)}{" "}
                {options?.optional ? (
                    <span className="font-normal text-[#9299B1]">
                        ({t("optional")})
                    </span>
                ) : (
                    <span className="text-rose-500">*</span>
                )}
            </label>
            <input
                id={id}
                name={id}
                type={options?.type ?? "text"}
                autoComplete={options?.autoComplete}
                dir={options?.dir}
                className={inputClass}
                placeholder={options?.placeholder ? t(options.placeholder) : ""}
                value={value}
                onChange={(event) => {
                    setter(event.target.value);
                    clearFeedback();
                }}
            />
        </div>
    );

    const renderSelect = (
        id: string,
        label: string,
        value: string,
        setter: (value: string) => void,
        placeholder: string,
        options: string[]
    ) => (
        <div>
            <label className={labelClass} htmlFor={id}>
                {t(label)} <span className="text-rose-500">*</span>
            </label>
            <select
                id={id}
                name={id}
                className={inputClass}
                value={value}
                onChange={(event) => {
                    setter(event.target.value);
                    clearFeedback();
                }}
            >
                <option value="">{t(placeholder)}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {t(option)}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderSectionHeading = (
        number: string,
        title: string,
        description: string,
        purple = false
    ) => (
        <div className="mb-4 flex items-center gap-3">
            <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold ${purple
                        ? "bg-[#E2A3FF]/20 text-[#9B65C5]"
                        : "bg-[#869CFF]/12 text-[#687CE0]"
                    }`}
            >
                {number}
            </span>
            <div>
                <h3 className="font-bold text-[#20243A]">{t(title)}</h3>
                <p className="text-xs text-[#9299B1]">{t(description)}</p>
            </div>
        </div>
    );

    const roleOptions: {
        value: AccountRole;
        label: string;
        detail: string;
    }[] = [
            { value: "student", label: "Student", detail: "Learn skills" },
            { value: "instructor", label: "Instructor", detail: "Teach courses" },
            { value: "employee", label: "Employee", detail: "Team member" },
            { value: "client", label: "Client", detail: "Request services" },
        ];

    return (
        <main
            dir={direction}
            className="relative min-h-screen overflow-hidden bg-[#F8F8FC] px-4 py-10 sm:px-6 lg:py-14"
        >
            {/* Animated Background */}
            <motion.div
                aria-hidden="true"
                animate={{
                    x: [0, 25, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.12, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#869CFF]/25 blur-3xl"
            />

            <motion.div
                aria-hidden="true"
                animate={{
                    x: [0, -20, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#E2A3FF]/30 blur-3xl"
            />

            <div className="relative z-10 mx-auto grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/80 bg-white/85 shadow-2xl shadow-[#869CFF]/10 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr]">
                {/* Left Branding Section */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] p-10 text-white lg:flex xl:p-12">
                    <motion.div
                        aria-hidden="true"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/30"
                    />

                    <motion.div
                        aria-hidden="true"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-white/20"
                    />

                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.03 }}
                        className="relative z-10 flex w-fit items-center"
                        aria-label="Codo Learn Home"
                    >
                        <img
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn"
                            className="h-auto w-[210px] object-contain"
                        />
                    </motion.a>

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative z-10 my-12"
                    >
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-3xl shadow-lg backdrop-blur">
                            {"</>"}
                        </div>

                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                            {t("Learn. Build. Grow.")}
                        </p>

                        <h1 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                            {t("Your next chapter starts here.")}
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-8 text-white/90">
                            {t(
                                "Build your profile, tell us what you want to achieve, and find the learning or professional path that fits your goals."
                            )}
                        </p>

                        <div className="mt-8 space-y-4 text-sm text-white/90">
                            {[
                                "A profile tailored to your account type",
                                "Learning and career preferences in one place",
                                "One community for skills, projects, and growth",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                                        ✓
                                    </span>
                                    {t(item)}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <p className="relative z-10 text-sm text-white/80">
                        {t("Codo Learn · Training & Digital Solutions")}
                    </p>
                </section>

                {/* Registration Section */}
                <section className="p-6 sm:p-9 lg:p-10 xl:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-full max-w-2xl"
                    >
                        {/* Language Switch */}
                        <div className={`mb-5 flex ${isArabic ? "justify-start" : "justify-end"}`}>
                            <button
                                type="button"
                                onClick={() => setLanguage(isArabic ? "en" : "ar")}
                                className="rounded-xl border border-[#E5E7F2] bg-white px-4 py-2 text-sm font-bold text-[#687CE0] transition hover:bg-[#869CFF]/10"
                            >
                                {isArabic ? "English" : "العربية"}
                            </button>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#68708D] transition hover:text-[#7587E8] lg:hidden"
                        >
                            <span aria-hidden="true">{isArabic ? "→" : "←"}</span>
                            {t("Back to home")}
                        </Link>

                        <div className="mb-8 mt-5 lg:mt-0">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                                {t("Join Codo Learn")}
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#20243A] sm:text-4xl">
                                {t("Create your account")}
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#7B829D]">
                                {t(
                                    "Add a few details so we can tailor your Codo Learn experience. Fields marked with"
                                )}{" "}
                                <span className="text-rose-500">*</span>{" "}
                                {t("are required.")}
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-8"
                        >
                            {/* 01 - Account Type */}
                            <section>
                                {renderSectionHeading(
                                    "01",
                                    "Account type",
                                    "Choose the profile that fits you."
                                )}

                                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F1F2FA] p-1.5 sm:grid-cols-4">
                                    {roleOptions.map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => handleRoleChange(item.value)}
                                            aria-pressed={role === item.value}
                                            className={`rounded-xl px-2 py-3 transition-all ${role === item.value
                                                    ? "bg-white text-[#687CE0] shadow-sm ring-1 ring-[#869CFF]/25"
                                                    : "text-[#7B829D] hover:bg-white/60"
                                                } ${isArabic ? "text-right" : "text-left"}`}
                                        >
                                            <span className="block text-sm font-bold">
                                                {t(item.label)}
                                            </span>
                                            <span className="mt-1 block text-[11px]">
                                                {t(item.detail)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* 02 - Personal Information */}
                            <section>
                                {renderSectionHeading(
                                    "02",
                                    "Personal information",
                                    "How we can identify and contact you."
                                )}

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        {renderInput(
                                            "fullName",
                                            "Full name",
                                            fullName,
                                            setFullName,
                                            {
                                                placeholder: "e.g. Alex Morgan",
                                                autoComplete: "name",
                                            }
                                        )}
                                    </div>

                                    {renderInput(
                                        "email",
                                        "Email address",
                                        email,
                                        setEmail,
                                        {
                                            placeholder: "you@example.com",
                                            type: "email",
                                            autoComplete: "email",
                                            dir: "ltr",
                                        }
                                    )}

                                    {renderInput(
                                        "phone",
                                        "Phone number",
                                        phone,
                                        setPhone,
                                        {
                                            placeholder: "+20 1XX XXX XXXX",
                                            type: "tel",
                                            autoComplete: "tel",
                                            dir: "ltr",
                                        }
                                    )}

                                    <div>
                                        <label className={labelClass} htmlFor="country">
                                            {t("Country")}{" "}
                                            <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            className={inputClass}
                                            value={country}
                                            onChange={(event) => {
                                                setCountry(event.target.value);
                                                clearFeedback();
                                            }}
                                        >
                                            <option value="">{t("Select country")}</option>
                                            {[
                                                "Egypt",
                                                "Saudi Arabia",
                                                "United Arab Emirates",
                                                "Jordan",
                                                "Morocco",
                                                "Other",
                                            ].map((item) => (
                                                <option key={item} value={item}>
                                                    {t(item)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {renderInput("city", "City", city, setCity, {
                                        placeholder: "Your city",
                                        autoComplete: "address-level2",
                                    })}

                                    <div className="sm:col-span-2">
                                        {renderInput(
                                            "linkedinUrl",
                                            "LinkedIn profile",
                                            linkedinUrl,
                                            setLinkedinUrl,
                                            {
                                                placeholder: "https://linkedin.com/in/your-profile",
                                                type: "url",
                                                optional: true,
                                                dir: "ltr",
                                            }
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* 03 - Student Information */}
                            {role === "student" && (
                                <section>
                                    {renderSectionHeading(
                                        "03",
                                        "Education & learning goals",
                                        "Help us recommend the right learning path.",
                                        true
                                    )}

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        {renderInput(
                                            "university",
                                            "University / Institution",
                                            university,
                                            setUniversity,
                                            {
                                                placeholder: "University or school name",
                                            }
                                        )}

                                        {renderSelect(
                                            "educationLevel",
                                            "Education level",
                                            educationLevel,
                                            setEducationLevel,
                                            "Select level",
                                            [
                                                "High school",
                                                "University student",
                                                "Graduate",
                                                "Postgraduate",
                                                "Self-taught",
                                                "Other",
                                            ]
                                        )}

                                        {renderInput(
                                            "major",
                                            "Major / Field of study",
                                            major,
                                            setMajor,
                                            {
                                                placeholder: "e.g. Computer Science",
                                            }
                                        )}

                                        {renderSelect(
                                            "learningTrack",
                                            "Interested track",
                                            learningTrack,
                                            setLearningTrack,
                                            "Choose a track",
                                            [
                                                "Frontend Development",
                                                "Backend Development",
                                                "Full-Stack Development",
                                                "Mobile App Development",
                                                "UI/UX Design",
                                                "Data Science & AI",
                                                "Cybersecurity",
                                                "Digital Marketing",
                                                "Not sure yet",
                                            ]
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* 03 - Instructor Information */}
                            {role === "instructor" && (
                                <section>
                                    {renderSectionHeading(
                                        "03",
                                        "Instructor profile",
                                        "Share your expertise and teaching background.",
                                        true
                                    )}

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        {renderInput(
                                            "specialization",
                                            "Specialization",
                                            specialization,
                                            setSpecialization,
                                            {
                                                placeholder: "e.g. React, UI/UX, Data Science",
                                            }
                                        )}

                                        {renderSelect(
                                            "experience",
                                            "Teaching / work experience",
                                            experience,
                                            setExperience,
                                            "Select experience",
                                            [
                                                "Less than 1 year",
                                                "1–2 years",
                                                "3–5 years",
                                                "6–10 years",
                                                "10+ years",
                                            ]
                                        )}

                                        <div className="sm:col-span-2">
                                            {renderInput(
                                                "portfolioUrl",
                                                "Portfolio / personal website",
                                                portfolioUrl,
                                                setPortfolioUrl,
                                                {
                                                    placeholder: "https://your-portfolio.com",
                                                    type: "url",
                                                    optional: true,
                                                    dir: "ltr",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 03 - Employee Information */}
                            {role === "employee" && (
                                <section>
                                    {renderSectionHeading(
                                        "03",
                                        "Work information",
                                        "Details to help identify your team profile.",
                                        true
                                    )}

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        {renderInput(
                                            "jobTitle",
                                            "Job title",
                                            jobTitle,
                                            setJobTitle,
                                            {
                                                placeholder: "e.g. Training Coordinator",
                                            }
                                        )}

                                        {renderInput(
                                            "department",
                                            "Department",
                                            department,
                                            setDepartment,
                                            {
                                                placeholder: "e.g. Operations",
                                            }
                                        )}

                                        <div className="sm:col-span-2">
                                            {renderInput(
                                                "workEmail",
                                                "Work email",
                                                workEmail,
                                                setWorkEmail,
                                                {
                                                    placeholder: "name@company.com",
                                                    type: "email",
                                                    autoComplete: "work email",
                                                    dir: "ltr",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 03 - Client Information */}
                            {role === "client" && (
                                <section>
                                    {renderSectionHeading(
                                        "03",
                                        "Company & Project Information",
                                        "Tell us about your company and the digital services you need.",
                                        true
                                    )}

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            {renderInput(
                                                "companyName",
                                                "Company / Organization Name",
                                                companyName,
                                                setCompanyName,
                                                {
                                                    placeholder: "e.g. Tech Solutions",
                                                }
                                            )}
                                        </div>

                                        <div className="sm:col-span-2">
                                            {renderInput(
                                                "companyWebsite",
                                                "Company Website",
                                                companyWebsite,
                                                setCompanyWebsite,
                                                {
                                                    placeholder: "https://www.example.com",
                                                    type: "url",
                                                    optional: true,
                                                    dir: "ltr",
                                                }
                                            )}
                                        </div>

                                        {renderSelect(
                                            "industry",
                                            "Industry",
                                            industry,
                                            setIndustry,
                                            "Select industry",
                                            [
                                                "Technology & IT",
                                                "Education",
                                                "Healthcare",
                                                "E-Commerce & Retail",
                                                "Finance & Banking",
                                                "Real Estate",
                                                "Marketing & Advertising",
                                                "Manufacturing",
                                                "Other",
                                            ]
                                        )}

                                        {renderSelect(
                                            "companySize",
                                            "Company Size",
                                            companySize,
                                            setCompanySize,
                                            "Select company size",
                                            [
                                                "Just me",
                                                "2–10 employees",
                                                "11–50 employees",
                                                "51–200 employees",
                                                "201–500 employees",
                                                "500+ employees",
                                            ]
                                        )}

                                        <div className="sm:col-span-2">
                                            {renderSelect(
                                                "serviceRequired",
                                                "Service Required",
                                                serviceRequired,
                                                setServiceRequired,
                                                "Choose a service",
                                                [
                                                    "Web Development",
                                                    "Mobile Applications",
                                                    "UI/UX Design",
                                                    "E-Commerce Solutions",
                                                    "Software Solutions",
                                                    "Digital Transformation",
                                                    "Multiple Services",
                                                    "Not Sure Yet",
                                                ]
                                            )}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                className={labelClass}
                                                htmlFor="projectDescription"
                                            >
                                                {t("Project Description")}{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <textarea
                                                id="projectDescription"
                                                name="projectDescription"
                                                rows={5}
                                                className={`${inputClass} resize-none`}
                                                placeholder={t(
                                                    "Tell us about your project, goals, requirements, and what you want to achieve..."
                                                )}
                                                value={projectDescription}
                                                onChange={(event) => {
                                                    setProjectDescription(event.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 04 - Secure Account */}
                            <section>
                                {renderSectionHeading(
                                    "04",
                                    "Secure your account",
                                    "Create a strong password for your account."
                                )}

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className={labelClass} htmlFor="password">
                                            {t("Password")}{" "}
                                            <span className="text-rose-500">*</span>
                                        </label>

                                        <div className="flex items-center rounded-xl border border-[#E5E7F2] bg-white px-3 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                dir="ltr"
                                                className="min-w-0 flex-1 bg-transparent px-1 py-3.5 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                                placeholder={t("Create a strong password")}
                                                value={password}
                                                onChange={(event) => {
                                                    setPassword(event.target.value);
                                                    clearFeedback();
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword((value) => !value)
                                                }
                                                className="shrink-0 text-xs font-bold text-[#7587E8] hover:text-[#596CCB]"
                                            >
                                                {showPassword ? t("Hide") : t("Show")}
                                            </button>
                                        </div>

                                        <p className="mt-2 text-xs leading-5 text-[#9299B1]">
                                            {t(
                                                "At least 8 characters, uppercase, lowercase, and a number."
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            className={labelClass}
                                            htmlFor="confirmPassword"
                                        >
                                            {t("Confirm password")}{" "}
                                            <span className="text-rose-500">*</span>
                                        </label>

                                        <div className="flex items-center rounded-xl border border-[#E5E7F2] bg-white px-3 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={
                                                    showConfirmPassword ? "text" : "password"
                                                }
                                                autoComplete="new-password"
                                                dir="ltr"
                                                className="min-w-0 flex-1 bg-transparent px-1 py-3.5 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                                placeholder={t("Enter password again")}
                                                value={confirmPassword}
                                                onChange={(event) => {
                                                    setConfirmPassword(event.target.value);
                                                    clearFeedback();
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword((value) => !value)
                                                }
                                                className="shrink-0 text-xs font-bold text-[#7587E8] hover:text-[#596CCB]"
                                            >
                                                {showConfirmPassword
                                                    ? t("Hide")
                                                    : t("Show")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Terms & Privacy Agreement */}
                            <div className="flex items-start gap-3 rounded-xl border border-[#E5E7F2] bg-[#F8F8FC] p-4">
                                <input
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(event) => {
                                        setAcceptTerms(event.target.checked);
                                        clearFeedback();
                                    }}
                                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#869CFF]"
                                    aria-describedby="terms-description"
                                />

                                <div
                                    id="terms-description"
                                    className="text-sm leading-6 text-[#68708D]"
                                >
                                    <label
                                        htmlFor="acceptTerms"
                                        className="cursor-pointer"
                                    >
                                        {t("I agree to the")}{" "}
                                    </label>

                                    <Link
                                        href="/terms"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#687CE0] underline underline-offset-2 hover:text-[#596CCB]"
                                    >
                                        {t("Terms of Service")}
                                    </Link>

                                    {" "}{t("and")}{" "}

                                    <Link
                                        href="/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#687CE0] underline underline-offset-2 hover:text-[#596CCB]"
                                    >
                                        {t("Privacy Policy")}
                                    </Link>

                                    <span>.</span>

                                    <p className="mt-1 text-xs text-[#9299B1]">
                                        {t(
                                            "You must accept both policies to create an account."
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                                >
                                    {t(error)}
                                </p>
                            )}

                            {/* Success Message */}
                            {message && (
                                <p
                                    role="status"
                                    className="rounded-xl border border-[#869CFF]/30 bg-[#869CFF]/10 px-4 py-3 text-sm leading-6 text-[#454F85]"
                                >
                                    {isArabic
                                        ? `بيانات تسجيل ${role === "student" ? "الطالب" : role === "instructor" ? "المدرب" : role === "employee" ? "الموظف" : "العميل"} صحيحة. إنشاء الحساب غير متصل بقاعدة بيانات حاليًا.`
                                        : message}
                                </p>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.985 }}
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-5 py-4 font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:shadow-xl hover:shadow-[#869CFF]/30"
                            >
                                {t("Create Account")}
                                <span aria-hidden="true">
                                    {isArabic ? "←" : "→"}
                                </span>
                            </motion.button>
                        </form>

                        <p className="mt-7 text-center text-sm text-[#7B829D]">
                            {t("Already have an account?")}{" "}
                            <Link
                                href="/login"
                                className="font-bold text-[#7587E8] transition hover:text-[#596CCB]"
                            >
                                {t("Log in")}
                            </Link>
                        </p>

                        <p className="mt-6 text-center text-xs leading-5 text-[#9A9FB3]">
                            {t(
                                "Your details help personalize your experience. Account creation is currently a frontend demo."
                            )}
                        </p>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
