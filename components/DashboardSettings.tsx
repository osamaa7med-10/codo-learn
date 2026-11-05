"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage, useTheme } from "../context/LanguageContext";

type DashboardSettingsProps = { role: string };

export default function DashboardSettings({ role }: DashboardSettingsProps) {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const isArabic = language === "ar";
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [productUpdates, setProductUpdates] = useState(true);
    const [twoStepReminder, setTwoStepReminder] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(`codo-${role}-settings`);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            setEmailNotifications(parsed.emailNotifications ?? true);
            setProductUpdates(parsed.productUpdates ?? true);
            setTwoStepReminder(parsed.twoStepReminder ?? false);
        } catch {
            // Keep safe defaults if saved demo preferences are unavailable.
        }
    }, [role]);

    function saveSettings() {
        localStorage.setItem(`codo-${role}-settings`, JSON.stringify({
            emailNotifications,
            productUpdates,
            twoStepReminder,
        }));
        setSaved(true);
    }

    const text = (en: string, ar: string) => isArabic ? ar : en;
    const rowClass = "flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4";

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 pb-10">
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-white to-[#869CFF]/10 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#869CFF]/15 text-2xl text-[#586FD6]">⚙</span>
                    <div>
                        <p className="text-xs font-bold tracking-widest text-[#586FD6]">{text("ACCOUNT CONTROL CENTER", "مركز إعدادات الحساب")}</p>
                        <h2 className="mt-1 text-2xl font-extrabold text-[#20243A]">{text("Settings", "الإعدادات")}</h2>
                    </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
                    {text("Manage your preferences, appearance, notifications and account access.", "تحكم في تفضيلاتك والمظهر والإشعارات وإعدادات الوصول إلى حسابك.")}
                </p>
            </div>

            <section className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 sm:p-7">
                <div>
                    <h3 className="text-lg font-bold text-[#20243A]">{text("General preferences", "التفضيلات العامة")}</h3>
                    <p className="mt-1 text-sm text-gray-500">{text("Choose your dashboard language and appearance.", "اختار لغة ومظهر لوحة التحكم.")}</p>
                </div>
                <div className={rowClass}>
                    <div><p className="font-semibold text-[#20243A]">{text("Appearance", "المظهر")}</p><p className="text-sm text-gray-500">{text("Current theme:", "المظهر الحالي:")} {theme === "dark" ? text("Dark", "داكن") : text("Light", "فاتح")}</p></div>
                    <button type="button" onClick={toggleTheme} className="rounded-xl border border-[#869CFF]/40 px-4 py-2 text-sm font-bold text-[#586FD6]">{theme === "dark" ? text("Switch to light", "الوضع الفاتح") : text("Switch to dark", "الوضع الداكن")}</button>
                </div>
                <div className={rowClass}>
                    <div><p className="font-semibold text-[#20243A]">{text("Language", "اللغة")}</p><p className="text-sm text-gray-500">{text("Change dashboard language.", "تغيير لغة لوحة التحكم.")}</p></div>
                    <button type="button" onClick={() => setLanguage(isArabic ? "en" : "ar")} className="rounded-xl border border-[#869CFF]/40 px-4 py-2 text-sm font-bold text-[#586FD6]">{isArabic ? "English" : "العربية"}</button>
                </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 sm:p-7">
                <div><h3 className="text-lg font-bold text-[#20243A]">{text("Notifications", "الإشعارات")}</h3><p className="mt-1 text-sm text-gray-500">{text("Choose which updates you want to receive.", "حدد التحديثات التي تريد استقبالها.")}</p></div>
                {[
                    { label: text("Email notifications", "إشعارات البريد الإلكتروني"), description: text("Receive important account notifications.", "استقبل إشعارات الحساب المهمة."), value: emailNotifications, change: setEmailNotifications },
                    { label: text("Platform updates", "تحديثات المنصة"), description: text("Receive news about courses and services.", "استقبل أخبار الكورسات والخدمات."), value: productUpdates, change: setProductUpdates },
                    { label: text("Security reminders", "تذكيرات الأمان"), description: text("Receive account security reminders.", "استقبل تذكيرات أمان الحساب."), value: twoStepReminder, change: setTwoStepReminder },
                ].map((item) => (
                    <label key={item.label} className={rowClass}>
                        <span><span className="block font-semibold text-[#20243A]">{item.label}</span><span className="mt-1 block text-sm text-gray-500">{item.description}</span></span>
                        <input type="checkbox" checked={item.value} onChange={(event) => item.change(event.target.checked)} className="h-5 w-5 accent-[#586FD6]" />
                    </label>
                ))}
                <div className="flex flex-wrap items-center gap-3">
                    <button type="button" onClick={saveSettings} className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#465dc4]">{text("Save settings", "حفظ الإعدادات")}</button>
                    {saved && <span className="text-sm font-medium text-emerald-600">{text("Preferences saved on this device.", "تم حفظ التفضيلات على هذا الجهاز.")}</span>}
                </div>
            </section>

            <section className="flex flex-col justify-between gap-4 rounded-3xl border border-red-200 bg-red-50/60 p-5 sm:flex-row sm:items-center sm:p-7">
                <div><h3 className="font-bold text-red-700">{text("Sign out", "تسجيل الخروج")}</h3><p className="mt-1 text-sm text-red-600/80">{text("Leave your dashboard and return to the login page.", "الخروج من لوحة التحكم والعودة لصفحة تسجيل الدخول.")}</p></div>
                <Link href="/login" className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">{text("Log out", "تسجيل الخروج")} ↗</Link>
            </section>
            <p className="text-xs text-gray-400">{text("Demo note: preferences are stored locally in this browser. Real account security and server-side logout require backend authentication.", "ملاحظة: يتم حفظ التفضيلات محليًا في هذا المتصفح. تسجيل الخروج الفعلي وتأمين الحساب يتطلبان ربط Backend.")}</p>
        </div>
    );
}
