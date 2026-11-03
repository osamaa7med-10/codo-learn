
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "eligibility", title: "Eligibility and Accounts" },
    { id: "platform", title: "Using Codo Learn" },
    { id: "conduct", title: "Acceptable Use" },
    { id: "courses", title: "Courses and Learning Content" },
    { id: "security", title: "Account Security" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "privacy", title: "Privacy" },
    { id: "availability", title: "Availability and Changes" },
    { id: "liability", title: "Disclaimers and Liability" },
    { id: "termination", title: "Suspension and Termination" },
    { id: "changes", title: "Changes to These Terms" },
    { id: "contact", title: "Contact Us" },
];

const translations: Record<string, string> = {
    "Acceptance of Terms": "الموافقة على الشروط",
    "Eligibility and Accounts": "الأهلية والحسابات",
    "Using Codo Learn": "استخدام Codo Learn",
    "Acceptable Use": "الاستخدام المقبول",
    "Courses and Learning Content": "الدورات والمحتوى التعليمي",
    "Account Security": "أمان الحساب",
    "Intellectual Property": "الملكية الفكرية",
    "Privacy": "الخصوصية",
    "Availability and Changes": "التوفر والتغييرات",
    "Disclaimers and Liability": "إخلاء المسؤولية والمسؤولية القانونية",
    "Suspension and Termination": "تعليق الحساب وإنهاؤه",
    "Changes to These Terms": "التعديلات على هذه الشروط",
    "Contact Us": "تواصل معنا",

    "Create Account": "إنشاء حساب",
    "Back to Home": "العودة إلى الرئيسية",
    "CODO LEARN · PLATFORM GUIDELINES": "CODO LEARN · إرشادات المنصة",
    "Terms of": "شروط",
    "Service": "الخدمة",
    "Welcome to Codo Learn. These terms explain the rules and responsibilities that apply when you access or use our learning platform. Please read them carefully.":
        "مرحبًا بك في Codo Learn. توضح هذه الشروط القواعد والمسؤوليات التي تنطبق عند الوصول إلى منصتنا التعليمية أو استخدامها. يرجى قراءتها بعناية.",
    "Last updated: October 25, 2026": "آخر تحديث: 25 أكتوبر 2026",
    "Codo Learn Platform": "منصة Codo Learn",
    "On This Page": "في هذه الصفحة",
    "Important:": "مهم:",
    "This is a general draft for the Codo Learn project, not legal advice. Review it against your actual services and applicable laws before publishing it for real users.":
        "هذه مسودة عامة لمشروع Codo Learn وليست استشارة قانونية. يجب مراجعتها بما يتوافق مع خدماتك الفعلية والقوانين المعمول بها قبل نشرها للمستخدمين.",
    "By accessing or using Codo Learn, you agree to these Terms of Service and our":
        "من خلال الوصول إلى Codo Learn أو استخدامها، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.",
    "Privacy Policy": "سياسة الخصوصية",
    "If you do not agree to these terms, please do not use the platform.":
        "إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.",

    "You must provide accurate and up-to-date information when registering. You are responsible for keeping your account information current. If you are under the age required to consent to online services in your location, a parent or legal guardian must be involved where required by law.":
        "يجب عليك تقديم معلومات صحيحة ومحدثة عند التسجيل، كما تتحمل مسؤولية تحديث بيانات حسابك. إذا كان عمرك أقل من السن القانوني المطلوب للموافقة على الخدمات عبر الإنترنت في بلدك، فيجب إشراك أحد الوالدين أو الوصي القانوني عندما يتطلب القانون ذلك.",

    "Codo Learn provides technology education, training, and related learning opportunities. Depending on your account type, features may include courses, lessons, assignments, learning progress, internship information, and instructor or administrator tools. Available features may change as the platform develops.":
        "توفر Codo Learn التعليم التكنولوجي والتدريب والفرص التعليمية ذات الصلة. وبناءً على نوع حسابك، قد تشمل الخصائص الدورات والدروس والواجبات ومتابعة التقدم التعليمي ومعلومات التدريب العملي وأدوات المدربين أو المسؤولين. وقد تتغير الخصائص المتاحة مع تطور المنصة.",

    "You agree to use Codo Learn responsibly and lawfully. You must not:":
        "توافق على استخدام Codo Learn بطريقة مسؤولة وقانونية. ويُحظر عليك القيام بما يلي:",

    "Break applicable laws or violate another person's rights.":
        "مخالفة القوانين المعمول بها أو انتهاك حقوق الآخرين.",
    "Access accounts, systems, or data without authorization.":
        "الوصول إلى الحسابات أو الأنظمة أو البيانات دون تصريح.",
    "Interfere with the platform's security or normal operation.":
        "التدخل في أمان المنصة أو التأثير على عملها الطبيعي.",
    "Upload malicious code or attempt to damage the website.":
        "رفع أكواد ضارة أو محاولة إلحاق الضرر بالموقع.",
    "Copy, sell, or redistribute protected course materials without permission.":
        "نسخ المواد التعليمية المحمية أو بيعها أو إعادة توزيعها دون إذن.",
    "Impersonate another person or submit deliberately misleading information.":
        "انتحال شخصية شخص آخر أو تقديم معلومات مضللة عمدًا.",
    "Harass, threaten, or discriminate against other users.":
        "مضايقة المستخدمين الآخرين أو تهديدهم أو التمييز ضدهم.",

    "Course descriptions, instructors, schedules, lessons, and learning resources may change. Content is provided for educational purposes. Unless explicitly stated otherwise, participation does not guarantee employment, an internship, certification, income, or a specific learning outcome. Course completion requirements may vary by course.":
        "قد تتغير أوصاف الدورات والمدربون والجداول والدروس والموارد التعليمية. يتم تقديم المحتوى لأغراض تعليمية. وما لم يُذكر خلاف ذلك صراحةً، فإن المشاركة لا تضمن الحصول على وظيفة أو تدريب عملي أو شهادة أو دخل أو نتيجة تعليمية محددة. وقد تختلف متطلبات إكمال الدورات من دورة إلى أخرى.",

    "Keep your password and sign-in credentials confidential. Do not share your account or use another person's account without permission. Notify the Codo Learn team if you suspect unauthorized access to your account.":
        "حافظ على سرية كلمة المرور وبيانات تسجيل الدخول الخاصة بك. لا تشارك حسابك مع الآخرين ولا تستخدم حساب شخص آخر دون إذن. أبلغ فريق Codo Learn إذا اشتبهت في وجود وصول غير مصرح به إلى حسابك.",

    "The Codo Learn name, logo, website design, and platform materials may be protected by intellectual-property laws. You may not reproduce, distribute, or commercially use protected materials without permission, except where applicable law allows. Users must have the necessary rights to any content they submit to the platform.":
        "قد يكون اسم Codo Learn وشعارها وتصميم الموقع ومواد المنصة محمية بموجب قوانين الملكية الفكرية. لا يجوز لك إعادة إنتاج المواد المحمية أو توزيعها أو استخدامها تجاريًا دون إذن، إلا في الحالات التي يسمح بها القانون. ويجب أن يمتلك المستخدمون الحقوق اللازمة لأي محتوى يقدمونه إلى المنصة.",

    "Our handling of personal information is described in our":
        "نوضح كيفية تعاملنا مع المعلومات الشخصية في",
    "Please review that policy to understand how information may be handled when you use the website.":
        "يرجى مراجعة هذه السياسة لفهم كيفية التعامل مع المعلومات عند استخدام الموقع.",

    "We may update, suspend, or discontinue platform features to maintain or improve the service. We aim to keep the website available but cannot guarantee uninterrupted or error-free access at all times.":
        "يجوز لنا تحديث خصائص المنصة أو تعليقها أو إيقافها للحفاظ على الخدمة أو تحسينها. ونسعى إلى إبقاء الموقع متاحًا، لكننا لا نستطيع ضمان الوصول إليه دون انقطاع أو أخطاء في جميع الأوقات.",

    'To the extent permitted by applicable law, Codo Learn and its content are provided on an "as available" basis. We do not guarantee that every feature will always be available or that all content will be free from errors. Nothing in these terms limits liability where doing so would be unlawful.':
        "إلى الحد الذي يسمح به القانون المعمول به، يتم توفير Codo Learn ومحتواها وفقًا لحالة التوفر. ولا نضمن أن تكون جميع الخصائص متاحة دائمًا أو أن يكون كل المحتوى خاليًا من الأخطاء. ولا يوجد في هذه الشروط ما يحد من المسؤولية في الحالات التي يكون فيها ذلك مخالفًا للقانون.",

    "We may restrict or suspend access when reasonably necessary to protect users, investigate suspected misuse, comply with law, or maintain platform security. Where appropriate and legally required, we will provide notice or an opportunity to address the issue. You may stop using the platform at any time.":
        "يجوز لنا تقييد الوصول أو تعليقه عندما يكون ذلك ضروريًا بشكل معقول لحماية المستخدمين أو التحقيق في إساءة الاستخدام المشتبه بها أو الامتثال للقانون أو الحفاظ على أمان المنصة. وعندما يكون ذلك مناسبًا ومطلوبًا قانونيًا، سنقدم إشعارًا أو فرصة لمعالجة المشكلة. ويمكنك التوقف عن استخدام المنصة في أي وقت.",

    "We may update these terms as Codo Learn evolves. The updated date will appear at the top of this page. Where required, we will notify users about material changes. Continued use after changes take effect will be subject to the updated terms to the extent permitted by law.":
        "قد نقوم بتحديث هذه الشروط مع تطور Codo Learn. وسيظهر تاريخ التحديث أعلى هذه الصفحة. وعندما يكون ذلك مطلوبًا، سنقوم بإخطار المستخدمين بالتغييرات الجوهرية. ويخضع استمرار استخدام المنصة بعد سريان التعديلات للشروط المحدثة، بالقدر الذي يسمح به القانون.",

    "If you have questions about these terms, contact the Codo Learn team through the official contact channel published on our website. Add your verified support email or contact page here before launch.":
        "إذا كانت لديك أسئلة حول هذه الشروط، يمكنك التواصل مع فريق Codo Learn من خلال وسيلة التواصل الرسمية المنشورة على موقعنا. يجب إضافة بريد الدعم الإلكتروني المعتمد أو صفحة التواصل قبل إطلاق الموقع.",

    "These terms are a project draft and should be reviewed before being used as a binding agreement.":
        "هذه الشروط مسودة خاصة بالمشروع ويجب مراجعتها قبل استخدامها كاتفاقية ملزمة.",

    "Questions about your personal information?":
        "هل لديك أسئلة حول معلوماتك الشخصية؟",
    "Read our Privacy Policy for more details.":
        "اقرأ سياسة الخصوصية لمعرفة المزيد.",
    "View Privacy Policy": "عرض سياسة الخصوصية",
    "© 2026 Codo Learn. All rights reserved.":
        "© 2026 Codo Learn. جميع الحقوق محفوظة.",
};

export default function TermsOfServicePage() {
    const { language, setLanguage, direction } = useLanguage();
    const isArabic = language === "ar";

    const t = (value: string) =>
        isArabic ? translations[value] ?? value : value;

    return (
        <main
            dir={direction}
            className="min-h-screen bg-[#F8F8FC] text-[#20243A]"
        >
            {/* Navbar */}
            <header className="sticky top-0 z-40 border-b border-[#E8E9F4] bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
                    <Link href="/" aria-label="Codo Learn Home">
                        <img
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn"
                            className="h-10 w-auto object-contain sm:h-12"
                        />
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setLanguage(isArabic ? "en" : "ar")}
                            className="rounded-xl border border-[#E5E7F2] px-4 py-2.5 text-sm font-bold text-[#586FD6] transition hover:bg-[#F4F5FC]"
                        >
                            {isArabic ? "English" : "العربية"}
                        </button>

                        <Link
                            href="/signup"
                            className="rounded-xl bg-[#586FD6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#465CC0]"
                        >
                            {t("Create Account")}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative isolate overflow-hidden border-b border-[#E8E9F4]">
                <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#E2A3FF]/25 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-[#869CFF]/25 blur-3xl" />

                <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#586FD6] hover:text-[#465CC0]"
                        >
                            <span aria-hidden="true">
                                {isArabic ? "→" : "←"}
                            </span>
                            {t("Back to Home")}
                        </Link>

                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#586FD6]">
                            {t("CODO LEARN · PLATFORM GUIDELINES")}
                        </p>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                            {t("Terms of")}{" "}
                            <span className="text-[#586FD6]">
                                {t("Service")}
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-[#666B80] sm:text-lg">
                            {t("Welcome to Codo Learn. These terms explain the rules and responsibilities that apply when you access or use our learning platform. Please read them carefully.")}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#777C90]">
                            <span className="rounded-full border border-[#E3E5F2] bg-white px-3 py-1.5">
                                {t("Last updated: October 25, 2026")}
                            </span>
                            <span className="rounded-full border border-[#E3E5F2] bg-white px-3 py-1.5">
                                {t("Codo Learn Platform")}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 lg:py-16">

                {/* Table of contents */}
                <aside className="h-fit rounded-2xl border border-[#E8E9F4] bg-white p-5 shadow-sm lg:sticky lg:top-28">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">
                        {t("On This Page")}
                    </h2>

                    <nav aria-label="Terms sections" className="space-y-1">
                        {sections.map((section, index) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="flex items-start gap-3 rounded-lg px-2.5 py-2 text-sm text-[#666B80] transition hover:bg-[#F3F4FF] hover:text-[#586FD6]"
                            >
                                <span className="font-semibold text-[#9298B0]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span>{t(section.title)}</span>
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Terms */}
                <div className="min-w-0 space-y-6">
                    <div className="rounded-2xl border border-[#DDE2FF] bg-[#F0F2FF] p-5 sm:p-6">
                        <p className="text-sm leading-7 text-[#4D5578]">
                            <strong>{t("Important:")}</strong>{" "}
                            {t("This is a general draft for the Codo Learn project, not legal advice. Review it against your actual services and applicable laws before publishing it for real users.")}
                        </p>
                    </div>

                    <article className="space-y-10 rounded-2xl border border-[#E8E9F4] bg-white p-6 shadow-sm sm:p-10">

                        <section id="acceptance" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                1. {t("Acceptance of Terms")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("By accessing or using Codo Learn, you agree to these Terms of Service and our")}{" "}
                                <Link
                                    href="/privacy"
                                    className="font-semibold text-[#586FD6] hover:underline"
                                >
                                    {t("Privacy Policy")}
                                </Link>
                                . {t("If you do not agree to these terms, please do not use the platform.")}
                            </p>
                        </section>

                        <section id="eligibility" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                2. {t("Eligibility and Accounts")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("You must provide accurate and up-to-date information when registering. You are responsible for keeping your account information current. If you are under the age required to consent to online services in your location, a parent or legal guardian must be involved where required by law.")}
                            </p>
                        </section>

                        <section id="platform" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                3. {t("Using Codo Learn")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("Codo Learn provides technology education, training, and related learning opportunities. Depending on your account type, features may include courses, lessons, assignments, learning progress, internship information, and instructor or administrator tools. Available features may change as the platform develops.")}
                            </p>
                        </section>

                        <section id="conduct" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                4. {t("Acceptable Use")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("You agree to use Codo Learn responsibly and lawfully. You must not:")}
                            </p>
                            <ul className="mt-3 list-disc space-y-2 ps-6 leading-7 text-[#666B80]">
                                {[
                                    "Break applicable laws or violate another person's rights.",
                                    "Access accounts, systems, or data without authorization.",
                                    "Interfere with the platform's security or normal operation.",
                                    "Upload malicious code or attempt to damage the website.",
                                    "Copy, sell, or redistribute protected course materials without permission.",
                                    "Impersonate another person or submit deliberately misleading information.",
                                    "Harass, threaten, or discriminate against other users.",
                                ].map((item) => (
                                    <li key={item}>{t(item)}</li>
                                ))}
                            </ul>
                        </section>

                        <section id="courses" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                5. {t("Courses and Learning Content")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("Course descriptions, instructors, schedules, lessons, and learning resources may change. Content is provided for educational purposes. Unless explicitly stated otherwise, participation does not guarantee employment, an internship, certification, income, or a specific learning outcome. Course completion requirements may vary by course.")}
                            </p>
                        </section>

                        <section id="security" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                6. {t("Account Security")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("Keep your password and sign-in credentials confidential. Do not share your account or use another person's account without permission. Notify the Codo Learn team if you suspect unauthorized access to your account.")}
                            </p>
                        </section>

                        <section id="intellectual-property" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                7. {t("Intellectual Property")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("The Codo Learn name, logo, website design, and platform materials may be protected by intellectual-property laws. You may not reproduce, distribute, or commercially use protected materials without permission, except where applicable law allows. Users must have the necessary rights to any content they submit to the platform.")}
                            </p>
                        </section>

                        <section id="privacy" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                8. {t("Privacy")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("Our handling of personal information is described in our")}{" "}
                                <Link
                                    href="/privacy"
                                    className="font-semibold text-[#586FD6] hover:underline"
                                >
                                    {t("Privacy Policy")}
                                </Link>
                                . {t("Please review that policy to understand how information may be handled when you use the website.")}
                            </p>
                        </section>

                        <section id="availability" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                9. {t("Availability and Changes")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("We may update, suspend, or discontinue platform features to maintain or improve the service. We aim to keep the website available but cannot guarantee uninterrupted or error-free access at all times.")}
                            </p>
                        </section>

                        <section id="liability" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                10. {t("Disclaimers and Liability")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t('To the extent permitted by applicable law, Codo Learn and its content are provided on an "as available" basis. We do not guarantee that every feature will always be available or that all content will be free from errors. Nothing in these terms limits liability where doing so would be unlawful.')}
                            </p>
                        </section>

                        <section id="termination" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                11. {t("Suspension and Termination")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("We may restrict or suspend access when reasonably necessary to protect users, investigate suspected misuse, comply with law, or maintain platform security. Where appropriate and legally required, we will provide notice or an opportunity to address the issue. You may stop using the platform at any time.")}
                            </p>
                        </section>

                        <section id="changes" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                12. {t("Changes to These Terms")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("We may update these terms as Codo Learn evolves. The updated date will appear at the top of this page. Where required, we will notify users about material changes. Continued use after changes take effect will be subject to the updated terms to the extent permitted by law.")}
                            </p>
                        </section>

                        <section id="contact" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                13. {t("Contact Us")}
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                {t("If you have questions about these terms, contact the Codo Learn team through the official contact channel published on our website. Add your verified support email or contact page here before launch.")}
                            </p>
                        </section>

                        <div className="border-t border-[#E8E9F4] pt-6 text-sm leading-7 text-[#85899B]">
                            {t("These terms are a project draft and should be reviewed before being used as a binding agreement.")}
                        </div>
                    </article>

                    {/* Privacy link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E8E9F4] bg-white p-5">
                        <div>
                            <p className="font-semibold">
                                {t("Questions about your personal information?")}
                            </p>
                            <p className="mt-1 text-sm text-[#777C90]">
                                {t("Read our Privacy Policy for more details.")}
                            </p>
                        </div>

                        <Link
                            href="/privacy"
                            className="rounded-xl border border-[#DDE2FF] bg-[#F3F4FF] px-4 py-2.5 text-sm font-semibold text-[#586FD6] transition hover:bg-[#E9ECFF]"
                        >
                            {t("View Privacy Policy")}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#E8E9F4] bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-[#85899B] sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <p>
                        {t("© 2026 Codo Learn. All rights reserved.")}
                    </p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[#586FD6]"
                        >
                            {t("Privacy Policy")}
                        </Link>
                        <Link
                            href="/signup"
                            className="transition hover:text-[#586FD6]"
                        >
                            {t("Create Account")}
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
