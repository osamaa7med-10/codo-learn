
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage, useTheme } from "../../context/LanguageContext";

const translations: Record<string, string> = {
    "Your next chapter in tech starts here.": "رحلتك القادمة في عالم التكنولوجيا تبدأ هنا.",
    "Learn new skills, build real projects, and move forward with the Codo Learn community.":
        "تعلم مهارات جديدة، وأنشئ مشروعات حقيقية، وتقدم مع مجتمع Codo Learn.",
    "Learn. Build. Grow.": "اتعلم. ابنِ. اتطور.",
    "Welcome back": "مرحبًا بعودتك",
    "Log in to your account": "سجل الدخول إلى حسابك",
    "Enter your details to continue your learning journey.":
        "أدخل بياناتك لمتابعة رحلتك التعليمية.",
    "Back to home": "العودة إلى الرئيسية",
    "Email address": "البريد الإلكتروني",
    Password: "كلمة المرور",
    "Forgot password?": "هل نسيت كلمة المرور؟",
    "Enter your password": "أدخل كلمة المرور",
    "Remember me": "تذكرني",
    Hide: "إخفاء",
    Show: "إظهار",
    "Hide password": "إخفاء كلمة المرور",
    "Show password": "إظهار كلمة المرور",
    "Log In": "تسجيل الدخول",
    "Don't have an account?": "ليس لديك حساب؟",
    "Sign up": "إنشاء حساب",
    "Are you an administrator?": "هل أنت مسؤول النظام؟",
    "Admin Login": "دخول المسؤول",
    "By continuing, you agree to the Codo Learn terms and privacy policy.":
        "بالمتابعة، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بـ Codo Learn.",
    "Please enter your email and password.":
        "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    "Please enter a valid email address.":
        "يرجى إدخال بريد إلكتروني صحيح.",
    "Your password must contain at least 6 characters.":
        "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
    "Your form is valid. Backend authentication is not connected yet.":
        "البيانات المدخلة صحيحة. لم يتم ربط تسجيل الدخول بالخادم حتى الآن.",
};

export default function LoginPage() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, direction } = useLanguage();
    const isArabic = language === "ar";

    const t = (value: string) =>
        isArabic ? translations[value] ?? value : value;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Your password must contain at least 6 characters.");
            return;
        }

        // Demo session only; connect this to backend authentication later.
        const targetStorage = rememberMe ? localStorage : sessionStorage;
        targetStorage.setItem("codo-user-session", email.trim());
        (rememberMe ? sessionStorage : localStorage).removeItem("codo-user-session");
        window.dispatchEvent(new Event("codo-auth-change"));
        router.push("/");
    }

    return (
        <main
            dir={direction}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F8FC] px-4 py-12 sm:px-6"
        >
            <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light mode" : "Soft dark mode"} className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-[#869CFF]/30 bg-white/90 text-lg text-[#586FD6] shadow-lg backdrop-blur transition hover:bg-[#869CFF]/15 dark:border-slate-600 dark:bg-slate-800/90 dark:text-amber-300">{theme === "dark" ? "☀️" : "🌙"}</button>

            {/* Animated background */}
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

            <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-2xl shadow-[#869CFF]/10 backdrop-blur-xl lg:grid-cols-2">

                {/* Left branding panel */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] p-10 text-white lg:flex xl:p-14">

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/30"
                    />

                    <motion.div
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
                        className="relative z-10 flex shrink-0 items-center"
                        aria-label="Codo Learn Home"
                    >
                        <img
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn — For Training & Digital Solutions"
                            className="h-auto w-[190px] object-contain sm:w-[220px] lg:w-[270px]"
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

                        <h1 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                            {t("Your next chapter in tech starts here.")}
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-8 text-white/90">
                            {t(
                                "Learn new skills, build real projects, and move forward with the Codo Learn community."
                            )}
                        </p>
                    </motion.div>

                    <p className="relative z-10 text-sm text-white/80">
                        {t("Learn. Build. Grow.")}
                    </p>
                </section>

                {/* Login form */}
                <section className="p-6 sm:p-10 lg:p-12 xl:p-14">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-full max-w-md"
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
                            <span aria-hidden="true">
                                {isArabic ? "→" : "←"}
                            </span>
                            {t("Back to home")}
                        </Link>

                        <div className="mb-8 mt-5 lg:mt-0">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                                {t("Welcome back")}
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#20243A] sm:text-4xl">
                                {t("Log in to your account")}
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#7B829D]">
                                {t(
                                    "Enter your details to continue your learning journey."
                                )}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>

                            {/* Email */}
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-[#343B58]"
                                >
                                    {t("Email address")}
                                </label>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="14"
                                            rx="3"
                                        />
                                        <path d="m4 7 8 6 8-6" />
                                    </svg>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        dir="ltr"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-left text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-semibold text-[#343B58]"
                                    >
                                        {t("Password")}
                                    </label>

                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-[#7587E8] transition hover:text-[#596CCB]"
                                    >
                                        {t("Forgot password?")}
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <rect
                                            x="4"
                                            y="10"
                                            width="16"
                                            height="11"
                                            rx="2"
                                        />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        dir="ltr"
                                        placeholder={t("Enter your password")}
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-left text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((current) => !current)
                                        }
                                        aria-label={t(
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        )}
                                        className="shrink-0 text-xs font-semibold text-[#7587E8] hover:text-[#596CCB]"
                                    >
                                        {showPassword ? t("Hide") : t("Show")}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <label className="mb-6 flex cursor-pointer items-center gap-2.5 text-sm text-[#68708D]">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) =>
                                        setRememberMe(event.target.checked)
                                    }
                                    className="h-4 w-4 accent-[#869CFF]"
                                />
                                {t("Remember me")}
                            </label>

                            {/* Feedback */}
                            {error && (
                                <p
                                    role="alert"
                                    className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {t(error)}
                                </p>
                            )}

                            {message && (
                                <p
                                    role="status"
                                    className="mb-4 rounded-xl border border-[#869CFF]/30 bg-[#869CFF]/10 px-4 py-3 text-sm leading-6 text-[#454F85]"
                                >
                                    {t(message)}
                                </p>
                            )}

                            {/* Submit */}
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-5 py-4 font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:shadow-xl hover:shadow-[#869CFF]/30"
                            >
                                {t("Log In")}
                                <span aria-hidden="true">
                                    {isArabic ? "←" : "→"}
                                </span>
                            </motion.button>
                        </form>

                        <p className="mt-7 text-center text-sm text-[#7B829D]">
                            {t("Don't have an account?")}{" "}
                            <Link
                                href="/signup"
                                className="font-bold text-[#7587E8] transition hover:text-[#596CCB]"
                            >
                                {t("Sign up")}
                            </Link>
                        </p>

                        {/* Separate Admin Login */}
                        <div className="flex w-full flex-col items-center gap-4">
                            <div className="w-full border-t border-gray-100 pt-3 text-center text-xs text-gray-500">
                                {t("Are you an administrator?")}{" "}
                                <Link
                                    href="/admin/login"
                                    className="font-medium text-[#7587E8] underline underline-offset-2 transition-colors hover:text-[#596CCB]"
                                >
                                    {t("Admin Login")}
                                </Link>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-xs leading-5 text-[#9A9FB3]">
                            {t(
                                "By continuing, you agree to the Codo Learn terms and privacy policy."
                            )}
                        </p>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
