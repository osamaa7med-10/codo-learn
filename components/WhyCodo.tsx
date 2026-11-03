
"use client";

import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function WhyCodo() {
    const { language, direction } = useLanguage();
    const isArabic = language === "ar";

    const content = {
        label: isArabic ? "لماذا Codo Learn؟" : "Why Codo Learn",
        title: isArabic ? "أكثر من مجرد" : "More Than",
        titleHighlight: isArabic ? "كورسات." : "Just Courses.",
        description: isArabic
            ? "نؤمن أن تعلم التكنولوجيا يجب أن يكون عمليًا وممتعًا ومرتبطًا بالعالم الحقيقي."
            : "We believe learning technology should be practical, engaging, and connected to the real world.",
        cardTitle: isArabic ? "تعلم بهدف واضح" : "Learn With Purpose",
        cardDescription: isArabic
            ? "مهارات اليوم. فرص الغد."
            : "Skills today. Opportunities tomorrow.",
        features: [
            {
                number: "01",
                title: isArabic ? "مشاريع حقيقية" : "Real Projects",
                description: isArabic
                    ? "تعلم من خلال بناء مشاريع عملية تساعدك على تحويل المعرفة إلى مهارات حقيقية."
                    : "Learn by building practical projects that help you turn knowledge into real skills.",
            },
            {
                number: "02",
                title: isArabic ? "مدربون خبراء" : "Expert Mentors",
                description: isArabic
                    ? "تعلم على يد مدربين ذوي خبرة يفهمون التكنولوجيا ومتطلبات سوق العمل."
                    : "Learn from experienced instructors who understand both technology and the job market.",
            },
            {
                number: "03",
                title: isArabic ? "التركيز على المسار المهني" : "Career Focused",
                description: isArabic
                    ? "طور مهاراتك التقنية والعملية التي تحتاجها للانطلاق بثقة في حياتك المهنية."
                    : "Develop the technical and practical skills you need to move confidently into your career.",
            },
        ],
    };

    return (
        <section
            id="about"
            dir={direction}
            className="bg-white px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className={isArabic ? "text-right" : "text-left"}
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                            {content.label}
                        </p>

                        <h2 className="mt-4 text-4xl font-black leading-tight text-[#20243A] md:text-5xl">
                            {content.title}
                            <span className="block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                                {content.titleHighlight}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl leading-8 text-[#7B829D]">
                            {content.description}
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="mt-10 rounded-[30px] bg-[#F8F8FC] p-8"
                        >
                            <div className="flex items-center gap-5">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-2xl font-black text-white">
                                    CL
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-[#20243A]">
                                        {content.cardTitle}
                                    </h3>

                                    <p className="mt-1 text-sm text-[#7B829D]">
                                        {content.cardDescription}
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right */}
                    <div className="space-y-5">

                        {content.features.map((feature, index) => (
                            <motion.div
                                key={feature.number}
                                initial={{
                                    opacity: 0,
                                    x: isArabic ? -50 : 50,
                                }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                }}
                                whileHover={{ x: isArabic ? -8 : 8 }}
                                className="group flex gap-6 rounded-[28px] border border-[#E8EAF3] bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
                            >
                                <span className="text-3xl font-black text-[#E2A3FF]/60">
                                    {feature.number}
                                </span>

                                <div className={isArabic ? "text-right" : "text-left"}>
                                    <h3 className="text-xl font-black text-[#20243A]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 leading-6 text-[#7B829D]">
                                        {feature.description}
                                    </p>
                                </div>

                            </motion.div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}
