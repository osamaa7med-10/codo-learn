
"use client";

import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Reviews() {
    const { language, direction } = useLanguage();
    const isArabic = language === "ar";

    const content = {
        label: isArabic ? "آراء وتجارب" : "Testimonials",
        title: isArabic ? "ماذا يقول" : "What People",
        titleHighlight: isArabic ? "الآخرون عنا." : "Say.",
        description: isArabic
            ? "اكتشف آراء وتجارب المتعلمين والمتدربين حول رحلتهم التعليمية مع Codo Learn."
            : "Discover what our learners and interns say about their experience with Codo Learn.",
        reviews: [
            {
                name: "Ahmed Mohamed",
                role: isArabic ? "مطور واجهات أمامية" : "Frontend Developer",
                review: isArabic
                    ? "كانت تجربتي في Codo Learn رائعة. عملت على مشاريع حقيقية وطورت مهاراتي في مجال البرمجة."
                    : "The experience at Codo Learn was amazing. I worked on real projects and improved my development skills.",
                rating: 5,
                initials: "AM",
            },
            {
                name: "Sara Ahmed",
                role: isArabic ? "مصممة UI / UX" : "UI / UX Designer",
                review: isArabic
                    ? "تعلمت الكثير من خلال المشاريع العملية، وكان الفريق دائمًا داعمًا ومتعاونًا."
                    : "I learned a lot through practical projects and the team was always supportive and helpful.",
                rating: 5,
                initials: "SA",
            },
            {
                name: "Omar Ali",
                role: isArabic ? "مطور واجهات خلفية" : "Backend Developer",
                review: isArabic
                    ? "منحتني Codo Learn فرصة العمل بتقنيات حقيقية وفهم طريقة عمل فرق التطوير الاحترافية."
                    : "Codo Learn gave me the opportunity to work with real technologies and understand how professional teams work.",
                rating: 5,
                initials: "OA",
            },
            {
                name: "Mariam Hassan",
                role: isArabic ? "مطورة Full Stack" : "Full Stack Developer",
                review: isArabic
                    ? "بيئة رائعة للتعلم وبناء المشاريع واكتساب الخبرة العملية. أنصح بها بشدة."
                    : "A great environment to learn, build projects, and gain real experience. Highly recommended.",
                rating: 5,
                initials: "MH",
            },
            {
                name: "Youssef Adel",
                role: isArabic ? "مطور برمجيات" : "Software Developer",
                review: isArabic
                    ? "أحدثت الخبرة العملية فرقًا كبيرًا. أصبحت أكثر ثقة في العمل على مشاريع من العالم الحقيقي."
                    : "The practical experience made a huge difference. I became more confident working on real-world projects.",
                rating: 5,
                initials: "YA",
            },
            {
                name: "Nour Khaled",
                role: isArabic ? "مصممة منتجات رقمية" : "Product Designer",
                review: isArabic
                    ? "استمتعت جدًا بهذه الرحلة. كانت المشاريع مليئة بالتحديات وساعدتني على تطوير مهاراتي."
                    : "I really enjoyed the journey. The projects were challenging and helped me develop my skills.",
                rating: 5,
                initials: "NK",
            },
        ],
    };

    return (
        <section
            id="reviews"
            dir={direction}
            className="bg-white px-6 py-24 dark:bg-[#171B2B]"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#869CFF]">
                        {content.label}
                    </p>

                    <h2 className="text-4xl font-black leading-tight tracking-tight text-[#20243A] dark:text-[#E9ECF6] md:text-6xl">
                        {content.title}
                        <span className="bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                            {" "}{content.titleHighlight}
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#7B829D] dark:text-[#AAB2C8]">
                        {content.description}
                    </p>
                </motion.div>

                {/* Reviews Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {content.reviews.map((review) => (
                        <motion.div
                            key={review.name}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 40,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className="group rounded-[28px] border border-[#E8EAF3] bg-[#FAFAFD] p-7 transition-shadow duration-300 hover:shadow-xl dark:border-[#394158] dark:bg-[#22283B]"
                        >

                            {/* Top */}
                            <div className="flex items-center justify-between">

                                {/* Avatar */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-black text-white">
                                    {review.initials}
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1">
                                    {Array.from({ length: review.rating }).map(
                                        (_, index) => (
                                            <span
                                                key={index}
                                                className="text-lg text-[#869CFF]"
                                            >
                                                ★
                                            </span>
                                        )
                                    )}
                                </div>

                            </div>

                            {/* Review */}
                            <p className={`mt-7 min-h-[120px] text-sm leading-7 text-[#5F6785] dark:text-[#C2C9DC] ${isArabic ? "text-right" : "text-left"}`}>
                                “{review.review}”
                            </p>

                            {/* User */}
                            <div className={`mt-6 border-t border-[#E8EAF3] pt-5 dark:border-[#394158] ${isArabic ? "text-right" : "text-left"}`}>
                                <h3 className="font-black text-[#20243A] dark:text-[#E9ECF6]">
                                    {review.name}
                                </h3>

                                <p className="mt-1 text-xs font-semibold text-[#869CFF]">
                                    {review.role}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
