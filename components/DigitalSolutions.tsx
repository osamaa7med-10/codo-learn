
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function DigitalSolutions() {
    const { language, direction } = useLanguage();
    const isArabic = language === "ar";

    const solutions = [
        {
            number: "01",
            slug: "web-development",
            title: isArabic ? "تطوير الويب" : "Web Development",
            description: isArabic
                ? "مواقع إلكترونية حديثة وسريعة وقابلة للتوسع، مصممة لتحقيق أهداف أعمالك."
                : "Modern, fast, and scalable websites built around your business goals.",
            tags: isArabic
                ? ["المواقع", "تطبيقات الويب", "Next.js"]
                : ["Websites", "Web Apps", "Next.js"],
            icon: "</>",
        },
        {
            number: "02",
            slug: "mobile-applications",
            title: isArabic ? "تطبيقات الموبايل" : "Mobile Applications",
            description: isArabic
                ? "تطبيقات موبايل قوية توفر تجارب رقمية سهلة وسلسة للمستخدمين."
                : "Powerful mobile applications designed to deliver seamless digital experiences.",
            tags: isArabic
                ? ["iOS", "Android", "متعدد المنصات"]
                : ["iOS", "Android", "Cross Platform"],
            icon: "⌁",
        },
        {
            number: "03",
            slug: "ui-ux-design",
            title: isArabic ? "تصميم UI / UX" : "UI / UX Design",
            description: isArabic
                ? "واجهات جذابة وسهلة الاستخدام تحول الأفكار المعقدة إلى تجارب بسيطة."
                : "Beautiful and intuitive interfaces that turn complex ideas into simple experiences.",
            tags: isArabic
                ? ["تصميم الواجهات", "تجربة المستخدم", "النماذج الأولية"]
                : ["UI Design", "UX", "Prototyping"],
            icon: "✦",
        },
        {
            number: "04",
            slug: "e-commerce",
            title: isArabic ? "التجارة الإلكترونية" : "E-Commerce",
            description: isArabic
                ? "متاجر إلكترونية متكاملة تساعد أعمالك على البيع والنمو."
                : "Complete online stores designed to help your business sell and grow.",
            tags: isArabic
                ? ["المتاجر", "المدفوعات", "الإدارة"]
                : ["Stores", "Payments", "Management"],
            icon: "◈",
        },
        {
            number: "05",
            slug: "software-solutions",
            title: isArabic ? "الحلول البرمجية" : "Software Solutions",
            description: isArabic
                ? "برمجيات مخصصة مصممة لحل التحديات والاحتياجات الخاصة بأعمالك."
                : "Custom software built to solve your unique business challenges.",
            tags: isArabic
                ? ["برمجيات مخصصة", "واجهات API", "الأنظمة"]
                : ["Custom Software", "APIs", "Systems"],
            icon: "⚙",
        },
        {
            number: "06",
            slug: "digital-transformation",
            title: isArabic ? "التحول الرقمي" : "Digital Transformation",
            description: isArabic
                ? "حوّل العمليات التقليدية إلى حلول رقمية أكثر ذكاءً وسرعة وكفاءة."
                : "Turn traditional processes into smarter, faster, and more efficient digital solutions.",
            tags: isArabic
                ? ["الأتمتة", "الحوسبة السحابية", "التكامل"]
                : ["Automation", "Cloud", "Integration"],
            icon: "↗",
        },
    ];

    return (
        <section
            id="solutions"
            dir={direction}
            className="bg-white px-6 py-24 dark:bg-[#171B2B]"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end"
                >
                    <div className="max-w-3xl">
                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#869CFF]">
                            {isArabic ? "الحلول الرقمية" : "Digital Solutions"}
                        </p>

                        <h2 className="text-4xl font-black leading-[1.3] tracking-tight text-[#20243A] dark:text-[#E9ECF6] sm:text-5xl lg:text-6xl">
                            {isArabic
                                ? "نبني حلولاً رقمية"
                                : "We Build Digital Solutions"}

                            <span className="mt-2 block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                                {isArabic
                                    ? "تدفع أعمالك نحو المستقبل."
                                    : "That Move Your Business Forward."}
                            </span>
                        </h2>
                    </div>

                    <div className="md:pb-2">
                        <div className="mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-[#869CFF] to-[#E2A3FF]" />

                        <p className="max-w-md text-base leading-8 text-[#7B829D] dark:text-[#AAB2C8] sm:text-lg">
                            {isArabic
                                ? "من الأفكار إلى المنتجات الرقمية، نصنع حلولاً تكنولوجية تساعد الشركات على النمو والتواصل مع العملاء والعمل بذكاء أكبر."
                                : "From ideas to digital products, we create technology solutions that help businesses grow, connect with customers, and work smarter."}
                        </p>
                    </div>
                </motion.div>

                {/* Solutions Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.12,
                            },
                        },
                    }}
                    className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {solutions.map((solution) => (
                        <motion.div
                            key={solution.number}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className="group relative h-full overflow-hidden rounded-[30px] border border-[#E8EAF3] bg-[#FAFAFD] p-7 transition-shadow duration-300 hover:shadow-2xl dark:border-[#394158] dark:bg-[#22283B]"
                        >
                            {/* Entire Card Link */}
                            <Link
                                href={`/digital-solutions/${solution.slug}`}
                                aria-label={`${isArabic ? "اعرف المزيد عن" : "Learn more about"} ${solution.title}`}
                                className="absolute inset-0 z-10 rounded-[30px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#869CFF]"
                            />

                            {/* Background Glow */}
                            <motion.div
                                className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E2A3FF]/10 blur-2xl"
                                whileHover={{ scale: 1.5 }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* Top */}
                            <div className="relative flex items-center justify-between">
                                <span className="text-sm font-black text-[#E2A3FF]">
                                    {solution.number}
                                </span>

                                <motion.div
                                    whileHover={{ rotate: 12, scale: 1.1 }}
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-lg font-black text-white shadow-lg shadow-[#869CFF]/10"
                                >
                                    {solution.icon}
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <h3 className="mt-10 text-2xl font-black text-[#20243A] dark:text-[#E9ECF6]">
                                    {solution.title}
                                </h3>

                                <p className="mt-4 min-h-[72px] text-sm leading-7 text-[#7B829D] dark:text-[#AAB2C8]">
                                    {solution.description}
                                </p>

                                {/* Tags */}
                                <div className="mt-7 flex flex-wrap gap-2">
                                    {solution.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            whileHover={{ scale: 1.05 }}
                                            className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#5F6785] shadow-sm dark:bg-[#293047] dark:text-[#D4D9E8]"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Bottom */}
                                <div className="mt-8 flex items-center justify-between border-t border-[#E8EAF3] pt-5 dark:border-[#394158]">
                                    <span className="text-sm font-semibold text-[#869CFF]">
                                        {isArabic ? "اعرف المزيد" : "Learn More"}
                                    </span>

                                    <motion.span
                                        whileHover={{ x: isArabic ? -6 : 6 }}
                                        className="text-xl text-[#869CFF]"
                                    >
                                        {isArabic ? "←" : "→"}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
