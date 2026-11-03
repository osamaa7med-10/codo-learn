
"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { language, direction } = useLanguage();
    const isArabic = language === "ar";

    const content = {
        description: isArabic
            ? "منصة تعليمية عصرية تساعد الأشخاص على اكتساب مهارات تقنية عملية والاستعداد لمستقبلهم المهني."
            : "A modern learning platform helping people build practical technology skills and prepare for their future.",

        platform: isArabic ? "المنصة" : "Platform",
        courses: isArabic ? "الكورسات" : "Courses",
        tracks: isArabic ? "المسارات التعليمية" : "Learning Tracks",
        about: isArabic ? "من نحن" : "About Us",

        contact: isArabic ? "تواصل معنا" : "Contact",
        country: isArabic ? "مصر" : "Egypt",

        copyright: isArabic
            ? "© 2026 Codo Learn. جميع الحقوق محفوظة."
            : "© 2026 Codo Learn. All rights reserved.",

        slogan: isArabic
            ? "تعلم. ابنِ. تطور."
            : "Learn. Build. Grow.",
    };

    return (
        <footer
            id="contact"
            dir={direction}
            className="bg-[#F8F8FC] px-6 pb-8 pt-16"
        >
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-10 border-b border-[#20243A]/10 pb-12 md:grid-cols-4">

                    {/* Brand */}
                    <div className="md:col-span-2">

                        <a
                            href="/"
                            className="text-2xl font-black text-[#869CFF]"
                        >
                            Codo{" "}
                            <span className="text-[#E2A3FF]">
                                Learn
                            </span>
                        </a>

                        <p className={`mt-5 max-w-md leading-7 text-[#7B829D] ${isArabic ? "text-right" : "text-left"}`}>
                            {content.description}
                        </p>

                    </div>

                    {/* Platform */}
                    <div className={isArabic ? "text-right" : "text-left"}>
                        <h3 className="font-black text-[#20243A]">
                            {content.platform}
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-[#7B829D]">
                            <a href="#courses" className="transition hover:text-[#869CFF]">
                                {content.courses}
                            </a>

                            <a href="#tracks" className="transition hover:text-[#869CFF]">
                                {content.tracks}
                            </a>

                            <a href="#about" className="transition hover:text-[#869CFF]">
                                {content.about}
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className={isArabic ? "text-right" : "text-left"}>
                        <h3 className="font-black text-[#20243A]">
                            {content.contact}
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-[#7B829D]">
                            <span dir="ltr" className="text-start">
                                hello@codolearn.com
                            </span>

                            <span>
                                {content.country}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col justify-between gap-4 py-6 text-sm text-[#8A91AA] md:flex-row">

                    <p>
                        {content.copyright}
                    </p>

                    <p>
                        {content.slogan}
                    </p>

                </div>

            </div>
        </footer>
    );
}
