"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage, useTheme } from "../context/LanguageContext";

const navLinks = [
    { name: { en: "Tracks", ar: "المسارات" }, href: "#tracks" },
    { name: { en: "Interns", ar: "المتدربون" }, href: "#interns" },
    { name: { en: "About Us", ar: "من نحن" }, href: "#about" },
    { name: { en: "Contact", ar: "تواصل معنا" }, href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const syncUser = () => {
            const savedUser = localStorage.getItem("codo-user-session") || sessionStorage.getItem("codo-user-session");
            setUserEmail(savedUser || "");
        };
        syncUser();
        window.addEventListener("codo-auth-change", syncUser);
        window.addEventListener("storage", syncUser);
        return () => {
            window.removeEventListener("codo-auth-change", syncUser);
            window.removeEventListener("storage", syncUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("codo-user-session");
        sessionStorage.removeItem("codo-user-session");
        setUserEmail("");
        setIsOpen(false);
        window.dispatchEvent(new Event("codo-auth-change"));
    };

    const accountLabel = userEmail.split("@")[0] || (language === "ar" ? "حسابي" : "My Account");

    const { language, setLanguage, direction } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    const isArabic = language === "ar";

    const toggleLanguage = () => {
        setLanguage(isArabic ? "en" : "ar");
        setIsOpen(false);
    };

    const loginText = isArabic ? "تسجيل الدخول" : "Log In";
    const exploreText = isArabic ? "استكشف حلولنا" : "Explore Solutions";

    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed inset-x-0 top-0 z-50 border-b shadow-sm transition-colors duration-300 ${isDark ? "border-slate-700 bg-slate-950" : "border-[#20243A]/5 bg-white"}`}
        >
            <nav
                dir={direction}
                className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
            >
                {/* Logo */}
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.03 }}
                    className="flex shrink-0 items-center"
                    aria-label="Codo Learn Home"
                >
                    <img
                        src={isDark ? "/logo-white.png" : "/logoooo-removebg-preview.png"}
                        alt="Codo Learn — For Training & Digital Solutions"
                        className="h-auto w-[190px] object-contain sm:w-[220px] lg:w-[200px]"
                    />
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex xl:gap-9">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[#20243A] transition-colors duration-200 hover:text-[#869CFF]"
                        >
                            {link.name[language]}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Light mode" : "Dark mode"} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#869CFF]/30 bg-[#F8F8FC] text-lg text-[#586FD6] transition-all hover:bg-[#869CFF]/15 dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300">
                        {isDark ? "☀️" : "🌙"}
                    </button>

                    {/* Language Switcher */}
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        aria-label={isArabic ? "Switch to English" : "التغيير إلى العربية"}
                        className="flex items-center gap-2 rounded-xl border border-[#869CFF]/30 px-4 py-2.5 text-sm font-semibold text-[#586FD6] transition-all duration-200 hover:bg-[#869CFF]/10"
                    >
                        <span>🌐</span>
                        {isArabic ? "English" : "العربية"}
                    </button>

                    {userEmail ? (
                        <div className="flex items-center gap-3">
                            <span className="max-w-[150px] truncate rounded-xl bg-[#869CFF]/10 px-4 py-2.5 text-sm font-semibold text-[#586FD6]" title={userEmail}>{accountLabel}</span>
                            <button type="button" onClick={handleLogout} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#20243A] hover:bg-red-50 hover:text-red-600">{isArabic ? "تسجيل الخروج" : "Log Out"}</button>
                        </div>
                    ) : (
                        <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#20243A] transition-colors hover:bg-[#869CFF]/10 hover:text-[#7187F3]">{loginText}</Link>
                    )}

                    <Link
                        href="#solutions"
                        className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#869CFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        {exploreText}
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#869CFF]/30 bg-[#F8F8FC] text-lg text-[#586FD6] dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300">
                        {isDark ? "☀️" : "🌙"}
                    </button>

                    {/* Mobile Language Switcher */}
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        aria-label={isArabic ? "Switch to English" : "التغيير إلى العربية"}
                        className="flex h-10 items-center gap-1.5 rounded-xl border border-[#869CFF]/30 px-3 text-sm font-semibold text-[#586FD6] transition-colors hover:bg-[#869CFF]/10"
                    >
                        <span>🌐</span>
                        {isArabic ? "EN" : "AR"}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#20243A]/10 bg-white text-[#20243A] transition-colors hover:bg-[#F8F8FC]"
                    >
                        <span className="text-2xl leading-none">
                            {isOpen ? "×" : "☰"}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-[#20243A]/5 bg-white lg:hidden"
                    >
                        <div
                            dir={direction}
                            className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8"
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-sm font-medium text-[#20243A] transition-colors hover:bg-[#869CFF]/10 hover:text-[#7187F3]"
                                    >
                                        {link.name[language]}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="mt-3 flex flex-col gap-3 border-t border-[#20243A]/5 pt-4">

                                {userEmail ? (
                                    <div className="flex flex-col gap-2">
                                        <span className="rounded-xl bg-[#869CFF]/10 px-4 py-3 text-center text-sm font-semibold text-[#586FD6]">{accountLabel}</span>
                                        <button type="button" onClick={handleLogout} className="rounded-xl border border-red-200 px-4 py-3 text-center text-sm font-semibold text-red-600 hover:bg-red-50">{isArabic ? "تسجيل الخروج" : "Log Out"}</button>
                                    </div>
                                ) : (
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="rounded-xl border border-[#869CFF]/30 px-4 py-3 text-center text-sm font-semibold text-[#20243A] transition-colors hover:bg-[#869CFF]/10">{loginText}</Link>
                                )}

                                <Link
                                    href="#solutions"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-[#869CFF]/20 transition-transform hover:scale-[1.01]"
                                >
                                    {exploreText}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
