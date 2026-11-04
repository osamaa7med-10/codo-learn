"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";

type SolutionContent = {
    title: string;
    subtitle: string;
    description: string;
    services: string[];
    benefits: string[];
    process: string[];
    content: string[];
    deliverables: string[];
    technologies: string[];
    faqs: { question: string; answer: string }[];
};

const solutionContent: Record<string, { en: SolutionContent; ar: SolutionContent }> = {
    "web-development": {
        en: {
            title: "Web Development",
            subtitle: "Web experiences built around your business goals.",
            description: "We design and develop modern, responsive websites and web applications that help your business establish a strong online presence, serve customers, and grow with confidence.",
            services: ["Business websites", "Web applications and dashboards", "E-commerce websites", "Landing pages", "Website redesign and optimization"],
            benefits: ["Responsive across mobile, tablet, and desktop", "Fast, accessible, and user-friendly experiences", "Scalable architecture for future growth", "Clear structure focused on your business goals"],
            process: ["Discovery and requirements", "UI planning and design", "Development and integration", "Testing and launch"],
            content: ["Requirements gathering and business goals","Website structure, navigation, and page planning","Responsive UI development for desktop and mobile","Interactive frontend components and API integration","Performance, accessibility, SEO foundations, and testing"],
            deliverables: ["Responsive website or web application","Reusable page components","Agreed forms and integrations","Source code and handover"],
            technologies: ["HTML, CSS, JavaScript","TypeScript, React, Next.js","Tailwind CSS","Node.js, APIs, databases as needed"],
            faqs: [{"question":"How long does development take?","answer":"Timing depends on scope, page count, features, and integrations."},{"question":"Can you redesign an existing website?","answer":"Yes. Existing functionality can be reviewed and improved as part of the project."}],
        },
        ar: {
            title: "تطوير الويب",
            subtitle: "تجارب ويب مصممة لتحقيق أهداف أعمالك.",
            description: "نصمم ونطور مواقع إلكترونية وتطبيقات ويب حديثة ومتوافقة مع مختلف الأجهزة، لمساعدة أعمالك على بناء حضور رقمي قوي وخدمة عملائك والنمو بثقة.",
            services: ["مواقع الشركات والأعمال", "تطبيقات الويب ولوحات التحكم", "المتاجر الإلكترونية", "الصفحات التعريفية والتسويقية", "إعادة تصميم المواقع وتحسينها"],
            benefits: ["تصميم متوافق مع الهاتف والكمبيوتر", "تجربة سريعة وسهلة الاستخدام", "بنية قابلة للتوسع مستقبلًا", "تنظيم واضح يركز على أهداف نشاطك"],
            process: ["فهم المتطلبات", "تخطيط وتصميم الواجهات", "البرمجة والربط", "الاختبار والإطلاق"],
            content: ["جمع المتطلبات وأهداف النشاط","تخطيط هيكل الموقع والتنقل والصفحات","تطوير واجهات متجاوبة للكمبيوتر والموبايل","تنفيذ العناصر التفاعلية وربط APIs","تحسين الأداء وإمكانية الوصول وSEO والاختبار"],
            deliverables: ["موقع أو تطبيق ويب متجاوب","مكونات صفحات قابلة لإعادة الاستخدام","النماذج والتكاملات المتفق عليها","الكود المصدري وتسليم المشروع"],
            technologies: ["HTML وCSS وJavaScript","TypeScript وReact وNext.js","Tailwind CSS","Node.js وواجهات API وقواعد البيانات عند الحاجة"],
            faqs: [{"question":"كم يستغرق تطوير الموقع؟","answer":"تعتمد المدة على نطاق المشروع وعدد الصفحات والخصائص والتكاملات."},{"question":"هل يمكن إعادة تصميم موقع موجود؟","answer":"نعم، يمكن مراجعة الوظائف الحالية وتحسين التصميم والتجربة."}],
        },
    },
    "mobile-applications": {
        en: {
            title: "Mobile Applications",
            subtitle: "Useful mobile products for the way people live and work.",
            description: "Turn your idea into a mobile experience. We plan and build applications that make it easier for your customers and teams to connect with your services wherever they are.",
            services: ["iOS and Android applications", "Cross-platform applications", "Customer and booking apps", "Business productivity apps", "App maintenance and improvements"],
            benefits: ["Simple and intuitive user journeys", "Consistent experience across devices", "Thoughtful performance and usability", "Room to add features as your product grows"],
            process: ["Idea and feature definition", "User experience and interface design", "App development", "Quality testing and release"],
            content: ["Define target users and app features","Map screens and user journeys","Design mobile interfaces","Implement app logic and API connections","Test supported devices and prepare release"],
            deliverables: ["Mobile application for agreed platforms","Application screens and user flows","Agreed API integrations","Testing and release handover"],
            technologies: ["React Native or native technologies","TypeScript, Swift, or Kotlin as scoped","REST APIs and backend services","Mobile testing and release tools"],
            faqs: [{"question":"Can you build for iOS and Android?","answer":"Platforms are selected during planning; cross-platform development may support both."},{"question":"Can the app connect to an existing system?","answer":"Yes, supported APIs and backend services can be integrated."}],
        },
        ar: {
            title: "تطبيقات الموبايل",
            subtitle: "تطبيقات عملية تناسب طريقة حياة وعمل المستخدمين.",
            description: "حوّل فكرتك إلى تجربة على الهاتف. نخطط ونطور تطبيقات تسهّل على عملائك وفريقك الوصول إلى خدماتك والتفاعل معها من أي مكان.",
            services: ["تطبيقات iOS وAndroid", "تطبيقات متعددة المنصات", "تطبيقات العملاء والحجوزات", "تطبيقات إدارة الأعمال والإنتاجية", "صيانة التطبيقات وتطويرها"],
            benefits: ["خطوات استخدام واضحة وبسيطة", "تجربة متناسقة على الأجهزة المختلفة", "اهتمام بالأداء وسهولة الاستخدام", "إمكانية إضافة خصائص مع نمو المنتج"],
            process: ["تحديد الفكرة والخصائص", "تصميم تجربة وواجهات المستخدم", "تطوير التطبيق", "الاختبار والإطلاق"],
            content: ["تحديد المستخدمين المستهدفين وخصائص التطبيق","تخطيط الشاشات ورحلة المستخدم","تصميم واجهات الموبايل","تنفيذ وظائف التطبيق وربط APIs","اختبار الأجهزة وتجهيز الإصدار"],
            deliverables: ["تطبيق للمنصات المتفق عليها","تصميم الشاشات ومسارات الاستخدام","تكاملات APIs المتفق عليها","الاختبار وتسليم نسخة الإصدار"],
            technologies: ["React Native أو تقنيات Native","TypeScript أو Swift أو Kotlin حسب النطاق","REST APIs والخدمات الخلفية","أدوات اختبار ونشر تطبيقات الموبايل"],
            faqs: [{"question":"هل يمكن تطوير التطبيق لأندرويد وآيفون؟","answer":"يتم تحديد المنصات أثناء التخطيط، ويمكن استخدام التطوير متعدد المنصات لدعم الاثنين."},{"question":"هل يمكن ربط التطبيق بنظام موجود؟","answer":"نعم، يمكن ربط APIs والخدمات الخلفية المدعومة."}],
        },
    },
    "ui-ux-design": {
        en: {
            title: "UI / UX Design",
            subtitle: "Thoughtful interfaces. Clear and enjoyable experiences.",
            description: "We turn ideas and complex workflows into clear digital experiences. Our design process focuses on your users, your brand, and the goals each screen needs to achieve.",
            services: ["User research and journey mapping", "Wireframes and prototypes", "Website and app UI design", "Design systems", "Usability reviews"],
            benefits: ["Consistent visual identity", "Easy-to-understand navigation", "User-centered decisions", "Prototypes that help validate ideas early"],
            process: ["Understand users and goals", "Map flows and structure", "Create visual designs", "Prototype and refine"],
            content: ["Understand users, product goals, and pain points","Map user flows and information architecture","Create wireframes for key screens","Develop visual direction and reusable components","Build prototypes and refine designs from feedback"],
            deliverables: ["User flows and wireframes","High-fidelity interface designs","Reusable design components","Clickable prototype and design handoff"],
            technologies: ["Figma and FigJam","Prototyping tools","Design systems and component libraries","Usability review methods"],
            faqs: [{"question":"Do you design websites and apps?","answer":"Yes, the scope can include websites, dashboards, and mobile applications."},{"question":"Will developers receive design files?","answer":"Yes, organized design files and handoff notes can be provided."}],
        },
        ar: {
            title: "تصميم UI / UX",
            subtitle: "واجهات مدروسة وتجارب واضحة ومريحة.",
            description: "نحوّل الأفكار وخطوات العمل المعقدة إلى تجارب رقمية واضحة. تركز عملية التصميم على المستخدمين وهوية علامتك والأهداف التي يجب أن تحققها كل شاشة.",
            services: ["بحث المستخدمين ورسم رحلتهم", "المخططات الأولية والنماذج التفاعلية", "تصميم واجهات المواقع والتطبيقات", "أنظمة التصميم", "مراجعة سهولة الاستخدام"],
            benefits: ["هوية بصرية متناسقة", "تنقل سهل وواضح", "قرارات مبنية على احتياجات المستخدم", "نماذج أولية لاختبار الأفكار مبكرًا"],
            process: ["فهم المستخدمين والأهداف", "تخطيط تجربة الاستخدام", "تصميم الواجهات", "إنشاء نموذج واختباره وتحسينه"],
            content: ["فهم المستخدمين وأهداف المنتج ومشكلات الاستخدام","تخطيط مسارات المستخدم وهيكل المعلومات","إنشاء Wireframes للشاشات الأساسية","تحديد الهوية البصرية والمكونات القابلة لإعادة الاستخدام","إنشاء نماذج تفاعلية وتحسين التصميم بالملاحظات"],
            deliverables: ["مسارات المستخدم وWireframes","تصميمات واجهات عالية الدقة","مكونات تصميم قابلة لإعادة الاستخدام","نموذج تفاعلي وملفات تسليم"],
            technologies: ["Figma وFigJam","أدوات النماذج التفاعلية","أنظمة التصميم ومكتبات المكونات","طرق مراجعة سهولة الاستخدام"],
            faqs: [{"question":"هل تصممون المواقع والتطبيقات؟","answer":"نعم، يمكن أن يشمل العمل المواقع ولوحات التحكم وتطبيقات الموبايل."},{"question":"هل يستلم المطورون ملفات التصميم؟","answer":"نعم، يمكن تسليم ملفات منظمة وملاحظات للمطورين."}],
        },
    },
    "e-commerce": {
        en: {
            title: "E-Commerce",
            subtitle: "An online store designed to make buying easier.",
            description: "Launch or improve your online store with a shopping experience that presents your products clearly and helps customers move smoothly from discovery to checkout.",
            services: ["Online store development", "Product and category management", "Shopping cart and checkout flows", "Payment and delivery integrations", "Store maintenance and optimization"],
            benefits: ["Clear product presentation", "Smooth shopping journey", "Responsive storefront", "Flexible foundation for your growing catalog"],
            process: ["Store requirements and planning", "Storefront design", "Development and integrations", "Testing and launch"],
            content: ["Plan products, categories, and store requirements","Design storefront, product, cart, and checkout screens","Build product, inventory, and order management","Integrate agreed payment and delivery providers","Test purchase flows and prepare launch"],
            deliverables: ["Responsive online storefront","Product and category structure","Cart and checkout experience","Agreed admin and payment integrations","Launch handover"],
            technologies: ["Next.js or React","E-commerce platform or custom backend","Payment and shipping APIs","Database and hosting services"],
            faqs: [{"question":"Can local payment methods be integrated?","answer":"Payment options depend on provider availability and integration requirements."},{"question":"Can I manage products myself?","answer":"An admin area can be included for products, categories, and orders."}],
        },
        ar: {
            title: "التجارة الإلكترونية",
            subtitle: "متجر إلكتروني يجعل تجربة الشراء أسهل.",
            description: "أنشئ متجرك الإلكتروني أو طوّره من خلال تجربة تسوق تعرض منتجاتك بوضوح وتساعد العملاء على الانتقال بسهولة من اكتشاف المنتج حتى إتمام الطلب.",
            services: ["تطوير المتاجر الإلكترونية", "إدارة المنتجات والتصنيفات", "سلة التسوق وإتمام الطلب", "ربط بوابات الدفع والتوصيل", "صيانة المتجر وتحسينه"],
            benefits: ["عرض واضح ومنظم للمنتجات", "خطوات شراء سهلة", "متجر متوافق مع مختلف الأجهزة", "بنية مرنة قابلة للتوسع"],
            process: ["تحديد متطلبات المتجر", "تصميم واجهة المتجر", "التطوير وربط الخدمات", "الاختبار والإطلاق"],
            content: ["تخطيط المنتجات والتصنيفات ومتطلبات المتجر","تصميم صفحات المتجر والمنتج والسلة والدفع","تطوير إدارة المنتجات والمخزون والطلبات","ربط بوابات الدفع والشحن المتفق عليها","اختبار الشراء وتجهيز الإطلاق"],
            deliverables: ["واجهة متجر إلكتروني متجاوبة","هيكل المنتجات والتصنيفات","سلة التسوق وإتمام الطلب","لوحة إدارة وتكاملات متفق عليها","تسليم المشروع بعد الإطلاق"],
            technologies: ["Next.js أو React","منصة تجارة إلكترونية أو Backend مخصص","واجهات الدفع والشحن","قواعد البيانات والاستضافة"],
            faqs: [{"question":"هل يمكن ربط وسائل دفع محلية؟","answer":"تعتمد الخيارات على توفر مقدم الخدمة ومتطلبات التكامل."},{"question":"هل أستطيع إدارة المنتجات بنفسي؟","answer":"يمكن إضافة لوحة لإدارة المنتجات والتصنيفات والطلبات."}],
        },
    },
    "software-solutions": {
        en: {
            title: "Software Solutions",
            subtitle: "Custom-built systems for the way your business works.",
            description: "When off-the-shelf tools do not fit, we help shape and build software around your processes, connecting the tools and information your team needs.",
            services: ["Custom business systems", "Internal management platforms", "API development and integration", "Workflow tools", "Existing software enhancements"],
            benefits: ["Built around your actual workflow", "Less repetitive manual work", "Connected data and services", "Flexible features as requirements change"],
            process: ["Map the current workflow", "Define system requirements", "Build and integrate", "Test, deliver, and improve"],
            content: ["Analyze workflows and define system requirements","Plan roles, permissions, and data structure","Build custom modules and management screens","Connect APIs and existing business tools","Test, deploy, document, and hand over"],
            deliverables: ["Custom software for agreed requirements","Management dashboard and modules","Database and API work when scoped","Selected integrations and documentation"],
            technologies: ["React and Next.js","Node.js and TypeScript","REST APIs","SQL or NoSQL databases","Cloud and authentication services"],
            faqs: [{"question":"Can you build software for our workflow?","answer":"Yes, the scope is based on your processes and requirements."},{"question":"Can it integrate with current tools?","answer":"Supported tools can be connected through APIs or agreed methods."}],
        },
        ar: {
            title: "الحلول البرمجية",
            subtitle: "أنظمة مخصصة تناسب طريقة عمل شركتك.",
            description: "عندما لا تلبي الأدوات الجاهزة احتياجاتك، نساعدك على تصميم وتطوير برمجيات تناسب عملياتك وتربط الأدوات والمعلومات التي يحتاجها فريقك.",
            services: ["أنظمة أعمال مخصصة", "منصات الإدارة الداخلية", "تطوير وربط واجهات API", "أدوات تنظيم سير العمل", "تطوير وتحسين الأنظمة الحالية"],
            benefits: ["حلول مبنية حول طريقة عملك", "تقليل المهام اليدوية المتكررة", "ربط البيانات والخدمات", "مرونة في إضافة الخصائص وتعديلها"],
            process: ["تحليل سير العمل الحالي", "تحديد متطلبات النظام", "التطوير والربط", "الاختبار والتسليم والتحسين"],
            content: ["تحليل سير العمل وتحديد متطلبات النظام","تخطيط الصلاحيات وهيكل البيانات","تطوير وحدات وشاشات إدارة مخصصة","ربط APIs وأدوات العمل الحالية","اختبار النظام ونشره وتوثيقه وتسليمه"],
            deliverables: ["برنامج مخصص حسب المتطلبات","لوحة تحكم والوحدات المطلوبة","تنفيذ قاعدة البيانات وواجهات API عند الاتفاق","التكاملات والتوثيق المتفق عليه"],
            technologies: ["React وNext.js","Node.js وTypeScript","REST APIs","قواعد بيانات SQL أو NoSQL","خدمات السحابة والمصادقة"],
            faqs: [{"question":"هل يمكن بناء برنامج يناسب سير عملنا؟","answer":"نعم، يتم تحديد النطاق حسب عملياتكم ومتطلباتكم."},{"question":"هل يمكن ربطه بأدواتنا الحالية؟","answer":"يمكن ربط الأدوات المدعومة من خلال APIs أو طرق متفق عليها."}],
        },
    },
    "digital-transformation": {
        en: {
            title: "Digital Transformation",
            subtitle: "Make everyday operations smarter and more connected.",
            description: "We help organizations rethink manual processes and disconnected tools, then introduce practical digital solutions that support better visibility, collaboration, and efficiency.",
            services: ["Process assessment", "Workflow automation", "Cloud-based solutions", "System integration", "Digital operations planning"],
            benefits: ["More organized business processes", "Reduced repetitive tasks", "Better access to operational information", "A practical roadmap for digital growth"],
            process: ["Assess current operations", "Identify improvement opportunities", "Plan and implement solutions", "Measure and refine"],
            content: ["Assess current processes and operational challenges","Identify repetitive tasks and integration gaps","Prioritize automation and digitization opportunities","Select cloud and workflow solutions","Connect systems, support adoption, and measure outcomes"],
            deliverables: ["Current process assessment","Prioritized digital roadmap","Automation and integration plan","Agreed workflow implementation and handover"],
            technologies: ["Workflow automation platforms","Cloud services","API integrations","Business intelligence tools","Collaboration platforms"],
            faqs: [{"question":"Do we need to replace all systems?","answer":"Not necessarily. Existing tools may be improved or integrated."},{"question":"Can you automate current processes?","answer":"Suitable repetitive workflows can be assessed and automated."}],
        },
        ar: {
            title: "التحول الرقمي",
            subtitle: "اجعل عملياتك اليومية أكثر ذكاءً وترابطًا.",
            description: "نساعد المؤسسات على إعادة تنظيم العمليات اليدوية والأدوات المنفصلة، ثم تقديم حلول رقمية عملية تدعم وضوح العمل والتعاون ورفع الكفاءة.",
            services: ["تقييم العمليات الحالية", "أتمتة سير العمل", "الحلول السحابية", "تكامل الأنظمة", "تخطيط العمليات الرقمية"],
            benefits: ["عمليات عمل أكثر تنظيمًا", "تقليل المهام المتكررة", "سهولة الوصول إلى معلومات التشغيل", "خطة عملية للتطور الرقمي"],
            process: ["تقييم طريقة العمل الحالية", "تحديد فرص التحسين", "تخطيط الحلول وتنفيذها", "قياس النتائج والتحسين"],
            content: ["تقييم العمليات الحالية والتحديات التشغيلية","تحديد المهام المتكررة وفجوات التكامل","ترتيب فرص الأتمتة والتحول الرقمي","اختيار حلول السحابة وسير العمل","ربط الأنظمة ودعم الاستخدام وقياس النتائج"],
            deliverables: ["تقييم العمليات الحالية","خارطة طريق بأولويات التحسين","خطة الأتمتة والتكامل","تنفيذ مسارات العمل وتسليمها"],
            technologies: ["منصات أتمتة سير العمل","الخدمات السحابية","تكاملات API","أدوات ذكاء الأعمال","منصات التعاون"],
            faqs: [{"question":"هل يجب استبدال كل الأنظمة؟","answer":"ليس بالضرورة؛ يمكن تحسين الأنظمة الحالية أو ربطها."},{"question":"هل يمكن أتمتة العمليات الحالية؟","answer":"يمكن تقييم المهام المتكررة وأتمتة المناسب منها."}],
        },
    },
};

function FeatureList({ title, items, isArabic }: { title: string; items: string[]; isArabic: boolean }) {
    return (
        <section className="rounded-3xl border border-[#E8EAF3] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-[#20243A]">{title}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#68708D]">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#869CFF]/15 text-xs font-black text-[#586FD6]">✓</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function DigitalSolutionDetailsPage() {
    const params = useParams<{ slug: string }>();
    const { language, direction } = useLanguage();
    const isArabic = language === "ar";
    const solution = solutionContent[params.slug]?.[language];

    if (!solution) {
        return (
            <main dir={direction} className="min-h-screen bg-[#F8F8FC]">
                <Navbar />
                <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 pt-24 text-center">
                    <p className="text-sm font-bold text-[#869CFF]">404</p>
                    <h1 className="mt-3 text-3xl font-black text-[#20243A]">{isArabic ? "الخدمة غير موجودة" : "Solution Not Found"}</h1>
                    <Link href="/#solutions" className="mt-6 rounded-xl bg-[#869CFF] px-6 py-3 font-bold text-white">{isArabic ? "العودة للحلول الرقمية" : "Back to Digital Solutions"}</Link>
                </div>
                <Footer />
            </main>
        );
    }

    const labels = isArabic
        ? { overview: "وصف الخدمة بالتفصيل", content: "محتوى ونطاق الخدمة", services: "ماذا نقدم", benefits: "مميزات الحل", deliverables: "ماذا ستحصل عليه", technologies: "التقنيات والأدوات", process: "مراحل تنفيذ المشروع", faq: "الأسئلة الشائعة", contact: "هل لديك مشروع؟", contactText: "احكِ لنا عن فكرتك ودعنا نساعدك في تحويلها إلى حل رقمي.", contactButton: "اطلب الخدمة الآن", back: "العودة إلى الحلول الرقمية" }
        : { overview: "Full Service Description", content: "Service Scope & Content", services: "What We Offer", benefits: "Why Choose This Solution", deliverables: "What You Will Get", technologies: "Technologies & Tools", process: "Project Implementation Process", faq: "Frequently Asked Questions", contact: "Have a Project in Mind?", contactText: "Tell us about your idea and let’s explore how to turn it into a digital solution.", contactButton: "Request This Service", back: "Back to Digital Solutions" };

    return (
        <main dir={direction} className="min-h-screen bg-[#F8F8FC]">
            <Navbar />
            <section className="relative overflow-hidden bg-white px-6 pb-20 pt-36 sm:pt-40">
                <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#E2A3FF]/15 blur-3xl" />
                <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#869CFF]/15 blur-3xl" />
                <div className="relative mx-auto max-w-7xl">
                    <Link href="/#solutions" className="inline-flex items-center gap-2 text-sm font-bold text-[#586FD6] transition hover:gap-3">
                        <span>{isArabic ? "→" : "←"}</span>{labels.back}
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-10 max-w-4xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">{isArabic ? "حلول Codo Learn الرقمية" : "CODO LEARN DIGITAL SOLUTIONS"}</p>
                        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#20243A] sm:text-6xl">{solution.title}</h1>
                        <p className="mt-5 max-w-3xl text-xl font-semibold leading-9 text-[#586FD6]">{solution.subtitle}</p>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-[#7B829D]">{solution.description}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={"mailto:hello@codolearn.com?subject="+encodeURIComponent((isArabic ? "طلب خدمة: " : "Service Request: ")+solution.title)} className="inline-flex rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:-translate-y-1">{labels.contactButton}</a>
                            <a href="#service-content" className="inline-flex rounded-xl border border-[#869CFF]/30 bg-white px-7 py-3.5 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/10">{isArabic ? "استكشف المحتوى" : "Explore Service Content"}</a>
                        </div>
                        <Link href="/#contact" className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:-translate-y-1">
                            {labels.contactButton}
                        </Link>
                    </motion.div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl space-y-6 px-6 py-16">
                <section id="service-content" className="rounded-3xl border border-[#E8EAF3] bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-extrabold text-[#20243A]">{labels.content}</h2>
                    <ol className="mt-6 space-y-3">
                        {solution.content.map((item, index) => (
                            <li key={item} className="flex items-start gap-4 rounded-2xl bg-[#F8F8FC] p-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 text-xs font-black text-[#586FD6]">{String(index + 1).padStart(2, "0")}</span>
                                <span className="pt-1 text-sm leading-7 text-[#515A78]">{item}</span>
                            </li>
                        ))}
                    </ol>
                </section>
                <FeatureList title={labels.services} items={solution.services} isArabic={isArabic} />
                <FeatureList title={labels.benefits} items={solution.benefits} isArabic={isArabic} />
                <FeatureList title={labels.deliverables} items={solution.deliverables} isArabic={isArabic} />
                <FeatureList title={labels.technologies} items={solution.technologies} isArabic={isArabic} />
                <section className="rounded-3xl border border-[#E8EAF3] bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-extrabold text-[#20243A]">{labels.process}</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {solution.process.map((step, index) => (
                            <div key={step} className="rounded-2xl bg-[#F8F8FC] p-5">
                                <span className="text-sm font-black text-[#869CFF]">0{index + 1}</span>
                                <p className="mt-3 font-bold leading-7 text-[#343B58]">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="rounded-3xl border border-[#E8EAF3] bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-extrabold text-[#20243A]">{labels.faq}</h2>
                    <div className="mt-5 space-y-3">
                        {solution.faqs.map((item) => (
                            <details key={item.question} className="group rounded-2xl bg-[#F8F8FC] p-5">
                                <summary className="cursor-pointer list-none font-bold text-[#343B58]">{item.question}<span className="float-end text-[#869CFF] transition group-open:rotate-45">＋</span></summary>
                                <p className="mt-3 text-sm leading-7 text-[#7B829D]">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
                <section className="overflow-hidden rounded-3xl bg-[#20243A] px-6 py-10 text-center sm:px-12 sm:py-14">
                    <h2 className="text-2xl font-black text-white sm:text-3xl">{labels.contact}</h2>
                    <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/70">{labels.contactText}</p>
                    <a href="mailto:hello@codolearn.com" className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#586FD6] transition hover:-translate-y-1">{labels.contactButton}</a>
                </section>
            </div>
            <Footer />
        </main>
    );
}
