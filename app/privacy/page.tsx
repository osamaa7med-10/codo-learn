
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

const sections = [
    {
        number: "01",
        title: "Information We Collect",
        paragraphs: [
            "Depending on how you use Codo Learn, information you provide may include your name, email address, phone number, country, city, education or professional details, and information you add to your profile.",
            "If you create an account, additional information may be requested based on your account type, such as your learning interests, instructor specialization, portfolio, or work details.",
        ],
    },
    {
        number: "02",
        title: "How We Use Information",
        paragraphs: [
            "Information may be used to provide and maintain platform features, personalize learning recommendations, communicate about your account, respond to support requests, and improve the user experience.",
            "We will not describe a use as active unless the relevant feature has been implemented and enabled.",
        ],
    },
    {
        number: "03",
        title: "Accounts and Registration",
        paragraphs: [
            "Please provide accurate information when completing registration forms and keep your sign-in credentials confidential. Do not share your password with other people.",
            "The current Codo Learn signup page is a frontend demonstration and is not connected to a production authentication service. Submitting that form does not currently create a real account or send your details to a Codo Learn server.",
        ],
    },
    {
        number: "04",
        title: "Storage and Security",
        paragraphs: [
            "Some demonstration features may store preferences or profile data in your browser using localStorage. This information generally remains on that browser and device unless it is cleared, and it is not automatically shared with other devices.",
            "Browser-local storage is not a substitute for server-side security or a production account system. Do not enter sensitive personal information into a demonstration form.",
        ],
    },
    {
        number: "05",
        title: "Sharing of Information",
        paragraphs: [
            "Codo Learn should only share personal information when necessary to operate a feature, comply with applicable legal requirements, protect users or the platform, or when the user has otherwise authorized the sharing.",
            "No third-party service integrations or data-sharing practices are confirmed by this demo page. This section must be reviewed and updated before launch to reflect the services actually used.",
        ],
    },
    {
        number: "06",
        title: "Cookies and Similar Technologies",
        paragraphs: [
            "The website may use browser storage or similar technologies to support interface preferences and demo functionality. This is distinct from a full cookie-consent or analytics system.",
            "If analytics, advertising, or additional tracking tools are added, this policy should identify them and explain the choices available to users.",
        ],
    },
    {
        number: "07",
        title: "Your Choices and Rights",
        paragraphs: [
            "You can choose what information to provide in optional fields. You may also clear browser storage through your browser settings, although doing so can remove locally saved demo preferences.",
            "Once real accounts and server-side storage are introduced, Codo Learn should provide a process for users to request access to, correction of, or deletion of their personal information, subject to applicable law.",
        ],
    },
    {
        number: "08",
        title: "Children and Young Users",
        paragraphs: [
            "Codo Learn is intended to be used responsibly by learners and professionals. If the platform is made available to children, the company must establish appropriate age-related safeguards and comply with applicable privacy requirements.",
        ],
    },
    {
        number: "09",
        title: "Changes to This Policy",
        paragraphs: [
            "This policy may be updated as Codo Learn develops. Any published version should show its effective date and explain material changes in an appropriate way.",
        ],
    },
    {
        number: "10",
        title: "Contact Us",
        paragraphs: [
            "For privacy questions, contact the Codo Learn team using the official support contact published on the platform. Add a verified support email address here before the website goes live.",
        ],
    },
];

const arabicSections: Record<string, { title: string; paragraphs: string[] }> = {
    "01": {
        title: "المعلومات التي نجمعها",
        paragraphs: [
            "بناءً على طريقة استخدامك لـ Codo Learn، قد تشمل المعلومات التي تقدمها اسمك، وبريدك الإلكتروني، ورقم هاتفك، وبلدك، ومدينتك، وتفاصيلك التعليمية أو المهنية، والمعلومات التي تضيفها إلى ملفك الشخصي.",
            "عند إنشاء حساب، قد يُطلب منك تقديم معلومات إضافية بناءً على نوع حسابك، مثل اهتماماتك التعليمية، أو تخصصك كمدرب، أو معرض أعمالك، أو تفاصيل عملك.",
        ],
    },
    "02": {
        title: "كيفية استخدام المعلومات",
        paragraphs: [
            "قد تُستخدم المعلومات لتوفير خصائص المنصة وصيانتها، وتخصيص التوصيات التعليمية، والتواصل معك بشأن حسابك، والرد على طلبات الدعم، وتحسين تجربة المستخدم.",
            "لن نذكر أن أي استخدام للمعلومات يتم بشكل فعلي إلا إذا كانت الخاصية المرتبطة به قد تم تنفيذها وتفعيلها.",
        ],
    },
    "03": {
        title: "الحسابات والتسجيل",
        paragraphs: [
            "يرجى تقديم معلومات صحيحة عند ملء نماذج التسجيل، والحفاظ على سرية بيانات تسجيل الدخول الخاصة بك. لا تشارك كلمة المرور مع الآخرين.",
            "صفحة التسجيل الحالية في Codo Learn هي نسخة تجريبية للواجهة الأمامية، وليست متصلة بنظام مصادقة فعلي. إرسال النموذج لا ينشئ حاليًا حسابًا حقيقيًا ولا يرسل بياناتك إلى خادم Codo Learn.",
        ],
    },
    "04": {
        title: "تخزين المعلومات وأمانها",
        paragraphs: [
            "قد تقوم بعض الخصائص التجريبية بحفظ التفضيلات أو بيانات الملف الشخصي داخل المتصفح باستخدام localStorage. تظل هذه المعلومات عادةً على المتصفح والجهاز نفسه ما لم يتم مسحها، ولا تتم مشاركتها تلقائيًا مع الأجهزة الأخرى.",
            "التخزين المحلي في المتصفح ليس بديلًا عن أمان الخوادم أو نظام الحسابات الفعلي. لا تدخل معلومات شخصية حساسة في النماذج التجريبية.",
        ],
    },
    "05": {
        title: "مشاركة المعلومات",
        paragraphs: [
            "ينبغي ألا تتم مشاركة المعلومات الشخصية بواسطة Codo Learn إلا عند الضرورة لتشغيل إحدى الخصائص، أو الامتثال للمتطلبات القانونية المعمول بها، أو حماية المستخدمين والمنصة، أو بناءً على موافقة المستخدم.",
            "لا توجد حاليًا تكاملات مؤكدة مع خدمات خارجية أو ممارسات مشاركة بيانات موثقة في هذه النسخة التجريبية. يجب مراجعة هذا القسم وتحديثه قبل الإطلاق ليعكس الخدمات المستخدمة فعليًا.",
        ],
    },
    "06": {
        title: "ملفات تعريف الارتباط والتقنيات المشابهة",
        paragraphs: [
            "قد يستخدم الموقع مساحة التخزين في المتصفح أو تقنيات مشابهة لدعم تفضيلات واجهة المستخدم والخصائص التجريبية. ويختلف ذلك عن نظام متكامل للموافقة على ملفات تعريف الارتباط أو تحليلات الاستخدام.",
            "إذا تمت إضافة أدوات التحليلات أو الإعلانات أو تقنيات التتبع الأخرى، فيجب تحديدها في هذه السياسة وشرح الخيارات المتاحة للمستخدمين.",
        ],
    },
    "07": {
        title: "اختياراتك وحقوقك",
        paragraphs: [
            "يمكنك اختيار المعلومات التي تقدمها في الحقول الاختيارية. كما يمكنك مسح مساحة التخزين في المتصفح من خلال إعداداته، مع العلم أن ذلك قد يؤدي إلى حذف التفضيلات التجريبية المحفوظة محليًا.",
            "بعد إضافة الحسابات الحقيقية والتخزين على الخوادم، ينبغي أن توفر Codo Learn آلية تتيح للمستخدمين طلب الوصول إلى معلوماتهم الشخصية أو تصحيحها أو حذفها، وفقًا للقوانين المعمول بها.",
        ],
    },
    "08": {
        title: "الأطفال والمستخدمون صغار السن",
        paragraphs: [
            "تهدف Codo Learn إلى أن يستخدمها المتعلمون والمهنيون بطريقة مسؤولة. وإذا أصبحت المنصة متاحة للأطفال، فيجب على الشركة وضع إجراءات حماية مناسبة لأعمارهم والالتزام بمتطلبات الخصوصية المعمول بها.",
        ],
    },
    "09": {
        title: "التعديلات على سياسة الخصوصية",
        paragraphs: [
            "قد يتم تحديث هذه السياسة مع تطور Codo Learn. وينبغي أن تتضمن أي نسخة منشورة تاريخ سريانها، وأن توضح التغييرات الجوهرية بطريقة مناسبة.",
        ],
    },
    "10": {
        title: "تواصل معنا",
        paragraphs: [
            "للاستفسارات المتعلقة بالخصوصية، يمكنك التواصل مع فريق Codo Learn من خلال وسيلة الدعم الرسمية المنشورة على المنصة. يجب إضافة بريد إلكتروني رسمي تم التحقق منه قبل إطلاق الموقع.",
        ],
    },
};

export default function PrivacyPolicyPage() {
    const { language, setLanguage, direction } = useLanguage();
    const isArabic = language === "ar";

    const t = (english: string, arabic: string) =>
        isArabic ? arabic : english;

    return (
        <main
            dir={direction}
            className="relative min-h-screen overflow-hidden bg-[#F8F8FC] text-[#20243A]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[#869CFF]/20 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-[35rem] h-96 w-96 rounded-full bg-[#E2A3FF]/20 blur-3xl"
            />

            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-[#ECECF5] bg-white/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
                    <Link
                        href="/"
                        aria-label="Codo Learn home"
                        className="flex items-center"
                    >
                        <img
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn"
                            className="h-auto w-[150px] object-contain"
                        />
                    </Link>

                    <nav className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setLanguage(isArabic ? "en" : "ar")}
                            className="rounded-xl border border-[#E5E7F2] px-4 py-2.5 text-sm font-bold text-[#586FD6] transition hover:bg-[#F4F5FC]"
                        >
                            {isArabic ? "English" : "العربية"}
                        </button>

                        <Link
                            href="/"
                            className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-[#68708D] transition hover:bg-[#F4F5FC] sm:inline-flex"
                        >
                            {t("Home", "الرئيسية")}
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-[#869CFF]/20 transition hover:-translate-y-0.5"
                        >
                            {t("Create account", "إنشاء حساب")}
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#869CFF]/25 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#687CE0] shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-[#869CFF]" />
                        {t(
                            "Codo Learn · Your Privacy Matters",
                            "Codo Learn · خصوصيتك تهمنا"
                        )}
                    </span>

                    <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                        {t("Privacy", "سياسة")}{" "}
                        <span className="bg-gradient-to-r from-[#7587E8] to-[#B77AD8] bg-clip-text text-transparent">
                            {t("Policy", "الخصوصية")}
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#747B96] sm:text-lg">
                        {t(
                            "Learn how information is handled when you explore Codo Learn, create a profile, or use our learning and professional services.",
                            "تعرّف على كيفية التعامل مع المعلومات عند تصفح Codo Learn أو إنشاء ملف شخصي أو استخدام خدماتنا التعليمية والمهنية."
                        )}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-[#858BA3]">
                        {[
                            ["Clear information", "معلومات واضحة"],
                            ["Responsible use", "استخدام مسؤول"],
                            ["Frontend demo notice", "تنويه النسخة التجريبية"],
                        ].map(([english, arabic]) => (
                            <span
                                key={english}
                                className="rounded-full border border-[#E6E8F4] bg-white/80 px-3 py-2"
                            >
                                {t(english, arabic)}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Content */}
                <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

                    {/* Sidebar */}
                    <aside className="h-fit rounded-2xl border border-[#E9EAF5] bg-white/85 p-5 shadow-lg shadow-[#869CFF]/5 lg:sticky lg:top-24">
                        <h2 className="text-sm font-extrabold text-[#20243A]">
                            {t("On this page", "في هذه الصفحة")}
                        </h2>

                        <nav className="mt-4 space-y-1.5">
                            {sections.map((section) => {
                                const translated = arabicSections[section.number];

                                return (
                                    <a
                                        key={section.number}
                                        href={`#section-${section.number}`}
                                        className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-[#747B96] transition hover:bg-[#F4F5FC] hover:text-[#687CE0]"
                                    >
                                        <span className="text-[10px] font-bold text-[#9AA3D9]">
                                            {section.number}
                                        </span>
                                        <span>
                                            {t(section.title, translated.title)}
                                        </span>
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="mt-6 rounded-xl bg-[#F3F4FF] p-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#7587E8] shadow-sm">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="m9 12 2 2 4-4"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <p className="mt-3 text-xs font-bold text-[#343B58]">
                                {t("Privacy-first mindset", "الخصوصية أولويتنا")}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#858BA3]">
                                {t(
                                    "We aim to be transparent about the information our platform uses.",
                                    "نسعى إلى توضيح المعلومات التي تستخدمها منصتنا بشفافية."
                                )}
                            </p>
                        </div>
                    </aside>

                    {/* Main sections */}
                    <div className="space-y-5">
                        <div className="rounded-2xl border border-[#869CFF]/25 bg-white p-5 shadow-sm sm:p-6">
                            <p className="text-sm leading-7 text-[#626B89]">
                                <strong className="text-[#343B58]">
                                    {t("Important:", "مهم:")}
                                </strong>{" "}
                                {t(
                                    "Codo Learn registration is currently a frontend demo. Before publishing this policy, review it against the final product, actual data flows, applicable law, and verified company contact details.",
                                    "التسجيل في Codo Learn حاليًا عبارة عن نسخة تجريبية للواجهة الأمامية. قبل نشر هذه السياسة، يجب مراجعتها بما يتوافق مع المنتج النهائي وتدفقات البيانات الفعلية والقوانين المعمول بها وبيانات التواصل الرسمية للشركة."
                                )}
                            </p>
                        </div>

                        {sections.map((section, index) => {
                            const translated = arabicSections[section.number];

                            return (
                                <motion.section
                                    key={section.number}
                                    id={`section-${section.number}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: Math.min(index * 0.025, 0.2),
                                    }}
                                    className="scroll-mt-28 rounded-2xl border border-[#E9EAF5] bg-white/90 p-6 shadow-sm shadow-[#869CFF]/5 transition hover:shadow-md sm:p-8"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 text-sm font-black text-[#687CE0]">
                                            {section.number}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h2 className="text-xl font-extrabold tracking-tight text-[#20243A] sm:text-2xl">
                                                {t(section.title, translated.title)}
                                            </h2>

                                            <div className="mt-4 space-y-3">
                                                {section.paragraphs.map(
                                                    (paragraph, paragraphIndex) => (
                                                        <p
                                                            key={paragraphIndex}
                                                            className="text-sm leading-7 text-[#747B96] sm:text-[15px]"
                                                        >
                                                            {t(
                                                                paragraph,
                                                                translated.paragraphs[paragraphIndex]
                                                            )}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.section>
                            );
                        })}

                        {/* Contact CTA */}
                        <div className="rounded-2xl bg-gradient-to-r from-[#869CFF] to-[#B99AEF] p-[1px]">
                            <div className="rounded-2xl bg-white p-6 sm:p-8">
                                <h2 className="text-xl font-extrabold text-[#20243A]">
                                    {t(
                                        "Questions about privacy?",
                                        "هل لديك أسئلة عن الخصوصية؟"
                                    )}
                                </h2>

                                <p className="mt-2 text-sm leading-7 text-[#747B96]">
                                    {t(
                                        "Contact the Codo Learn team through the official support channel published on our website.",
                                        "تواصل مع فريق Codo Learn من خلال قناة الدعم الرسمية المنشورة على موقعنا."
                                    )}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center justify-center rounded-xl border border-[#E5E7F2] px-5 py-3 text-sm font-bold text-[#626B89] transition hover:bg-[#F7F8FD]"
                                    >
                                        {t("Back to home", "العودة للرئيسية")}
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#869CFF]/20 transition hover:-translate-y-0.5"
                                    >
                                        {t("Create account", "إنشاء حساب")}
                                        <span
                                            className="ml-2"
                                            aria-hidden="true"
                                        >
                                            {isArabic ? "←" : "→"}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-[#E8E9F3] bg-white/70">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-[#858BA3] sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <p>
                        {t(
                            "© 2026 Codo Learn. Training & Digital Solutions.",
                            "© 2026 Codo Learn. التدريب والحلول الرقمية."
                        )}
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/terms"
                            className="transition hover:text-[#687CE0]"
                        >
                            {t("Terms of Service", "شروط الاستخدام")}
                        </Link>

                        <Link
                            href="/signup"
                            className="transition hover:text-[#687CE0]"
                        >
                            {t("Sign up", "إنشاء حساب")}
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
