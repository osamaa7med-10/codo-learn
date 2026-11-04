"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const tracks = {
  "web-development": {
    number: "01",
    title: { en: "Web Development", ar: "تطوير الويب" },
    subtitle: { en: "Build modern websites and full-stack applications from the ground up.", ar: "تعلم بناء مواقع الويب الحديثة وتطبيقات متكاملة من البداية حتى الاحتراف." },
    level: { en: "Beginner to Advanced", ar: "من المبتدئ إلى المتقدم" },
    duration: { en: "6–9 months", ar: "٦–٩ أشهر" },
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js", "Databases", "Git & GitHub"],
    modules: [
      { en: "Web Foundations", ar: "أساسيات الويب", topics: ["How the web works", "HTML structure", "CSS & responsive layouts"] },
      { en: "JavaScript Programming", ar: "البرمجة باستخدام JavaScript", topics: ["Programming fundamentals", "DOM & events", "ES6+ and asynchronous JavaScript"] },
      { en: "Frontend Development", ar: "تطوير الواجهات الأمامية", topics: ["React components and hooks", "Routing and state", "Next.js fundamentals"] },
      { en: "Backend Development", ar: "تطوير الواجهات الخلفية", topics: ["Node.js and APIs", "Databases", "Authentication fundamentals"] },
      { en: "Professional Workflow", ar: "بيئة العمل الاحترافية", topics: ["Git and GitHub", "Deployment", "Testing and debugging"] }
    ],
    outcomes: { en: ["Create responsive websites", "Build interactive React applications", "Connect applications to APIs and databases", "Publish portfolio-ready projects"], ar: ["إنشاء مواقع متجاوبة مع جميع الشاشات", "بناء تطبيقات تفاعلية باستخدام React", "ربط التطبيقات بالـ APIs وقواعد البيانات", "نشر مشاريع عملية تضيفها إلى معرض أعمالك"] },
    projects: { en: ["Personal portfolio website", "Interactive task manager", "Full-stack graduation project"], ar: ["موقع Portfolio شخصي", "تطبيق لإدارة المهام", "مشروع تخرج متكامل Full-stack"] },
    prerequisites: { en: ["No previous professional experience is required", "Basic computer skills", "A laptop and willingness to practice"], ar: ["لا يشترط وجود خبرة سابقة", "معرفة أساسية باستخدام الكمبيوتر", "جهاز كمبيوتر والاستعداد للتطبيق العملي"] }
  },
  "ui-ux-design": {
    number: "02",
    title: { en: "UI / UX Design", ar: "تصميم UI / UX" },
    subtitle: { en: "Turn ideas into intuitive, accessible, and visually engaging digital experiences.", ar: "حوّل الأفكار إلى تجارب رقمية سهلة الاستخدام وجذابة بصريًا." },
    level: { en: "Beginner to Intermediate", ar: "من المبتدئ إلى المتوسط" },
    duration: { en: "3–5 months", ar: "٣–٥ أشهر" },
    skills: ["Design Principles", "User Research", "Wireframing", "Figma", "Prototyping", "Design Systems", "Usability Testing"],
    modules: [
      { en: "Design Foundations", ar: "أساسيات التصميم", topics: ["Visual hierarchy and color", "Typography and spacing", "Design principles"] },
      { en: "UX Research", ar: "أبحاث تجربة المستخدم", topics: ["Understanding users", "Personas and user journeys", "Information architecture"] },
      { en: "Wireframing & UI", ar: "تخطيط وتصميم الواجهات", topics: ["Low and high-fidelity wireframes", "Layouts and components", "Responsive interface design"] },
      { en: "Figma & Prototyping", ar: "Figma والنماذج التفاعلية", topics: ["Figma tools and components", "Interactive prototypes", "Design systems"] },
      { en: "Testing & Portfolio", ar: "الاختبار ومعرض الأعمال", topics: ["Usability testing", "Design iteration", "Presenting case studies"] }
    ],
    outcomes: { en: ["Understand user needs and behavior", "Design clear and consistent interfaces", "Build interactive prototypes in Figma", "Present complete UX case studies"], ar: ["فهم احتياجات المستخدم وسلوكه", "تصميم واجهات واضحة ومتناسقة", "إنشاء نماذج تفاعلية باستخدام Figma", "تقديم دراسات حالة متكاملة للتصميم"] },
    projects: { en: ["Mobile app user flow", "Responsive website prototype", "Complete UX case study"], ar: ["تجربة استخدام لتطبيق موبايل", "نموذج تفاعلي لموقع متجاوب", "دراسة حالة UX متكاملة"] },
    prerequisites: { en: ["No design experience required", "Interest in creativity and problem solving", "A computer capable of running Figma"], ar: ["لا يشترط وجود خبرة في التصميم", "الاهتمام بالإبداع وحل المشكلات", "جهاز كمبيوتر يمكنه تشغيل Figma"] }
  },
  "data-ai": {
    number: "03",
    title: { en: "Data & AI", ar: "البيانات والذكاء الاصطناعي" },
    subtitle: { en: "Discover how to turn data into insights and explore the foundations of intelligent systems.", ar: "تعلم كيف تحوّل البيانات إلى رؤى مفيدة واكتشف أساسيات الأنظمة الذكية." },
    level: { en: "Beginner to Intermediate", ar: "من المبتدئ إلى المتوسط" },
    duration: { en: "5–7 months", ar: "٥–٧ أشهر" },
    skills: ["Python", "SQL", "Data Cleaning", "Data Visualization", "Statistics", "Machine Learning", "AI Fundamentals"],
    modules: [
      { en: "Python Foundations", ar: "أساسيات Python", topics: ["Programming fundamentals", "Data structures", "Working with files and libraries"] },
      { en: "Working with Data", ar: "التعامل مع البيانات", topics: ["NumPy and Pandas", "Data cleaning", "SQL fundamentals"] },
      { en: "Statistics & Visualization", ar: "الإحصاء وعرض البيانات", topics: ["Descriptive statistics", "Charts and dashboards", "Exploratory data analysis"] },
      { en: "Machine Learning", ar: "تعلم الآلة", topics: ["Core ML concepts", "Model training and evaluation", "Supervised learning basics"] },
      { en: "AI Applications", ar: "تطبيقات الذكاء الاصطناعي", topics: ["AI concepts and use cases", "Responsible AI", "End-to-end practical project"] }
    ],
    outcomes: { en: ["Write Python code for data tasks", "Clean and explore datasets", "Communicate insights with visualizations", "Understand and build introductory ML models"], ar: ["كتابة أكواد Python لمعالجة البيانات", "تنظيف مجموعات البيانات وتحليلها", "عرض النتائج باستخدام الرسوم البيانية", "فهم وبناء نماذج أولية لتعلم الآلة"] },
    projects: { en: ["Exploratory data analysis report", "Interactive data dashboard", "Introductory machine-learning project"], ar: ["تقرير تحليل استكشافي للبيانات", "لوحة معلومات تفاعلية", "مشروع تطبيقي مبسط لتعلم الآلة"] },
    prerequisites: { en: ["Basic computer and math skills", "Curiosity and analytical thinking", "No previous AI experience required"], ar: ["مهارات أساسية في الكمبيوتر والرياضيات", "حب الاستكشاف والتفكير التحليلي", "لا يشترط وجود خبرة سابقة في الذكاء الاصطناعي"] }
  }
};

export default function LearningTrackDetailsPage() {
  const params = useParams<{ slug: string }>();
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const track = tracks[params.slug as keyof typeof tracks];

  if (!track) {
    return <main className="min-h-screen bg-[#F8F8FC]"><Navbar /><div className="mx-auto max-w-4xl px-6 py-32 text-center"><h1 className="text-3xl font-black text-[#20243A]">{isArabic ? "المسار غير موجود" : "Track not found"}</h1><Link href="/#tracks" className="mt-6 inline-block font-bold text-[#586FD6]">{isArabic ? "العودة إلى المسارات" : "Back to Learning Tracks"}</Link></div><Footer /></main>;
  }

  const t = (value: { en: string; ar: string }) => isArabic ? value.ar : value.en;
  const listTitle = (en: string, ar: string) => isArabic ? ar : en;

  return (
    <main dir={direction} className="min-h-screen bg-[#F8F8FC] text-[#20243A]">
      <Navbar />
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#E2A3FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#869CFF]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/#tracks" className="text-sm font-bold text-[#586FD6] hover:underline">{isArabic ? "← كل المسارات التعليمية" : "← All Learning Tracks"}</Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-10 max-w-4xl">
            <span className="text-sm font-bold tracking-[0.2em] text-[#869CFF]">{isArabic ? `المسار ${track.number}` : `LEARNING TRACK ${track.number}`}</span>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{t(track.title)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#7B829D]">{t(track.subtitle)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm">{isArabic ? "المستوى:" : "Level:"} {t(track.level)}</span>
              <span className="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm">{isArabic ? "المدة:" : "Duration:"} {t(track.duration)}</span>
              <span className="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm">{track.modules.length} {isArabic ? "مراحل تعليمية" : "learning modules"}</span>
            </div>
            <Link href="/signup" className="mt-9 inline-flex rounded-full bg-[#586FD6] px-8 py-4 font-bold text-white shadow-lg shadow-[#586FD6]/20 transition hover:-translate-y-1 hover:bg-[#465dc5]">{isArabic ? "ابدأ رحلتك التعليمية" : "Start Learning"} <span className="ms-3">→</span></Link>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-[#E7E8F0] bg-white p-7 md:p-10">
            <p className="text-sm font-bold tracking-[0.18em] text-[#869CFF]">{listTitle("CURRICULUM", "المنهج الدراسي")}</p>
            <h2 className="mt-3 text-3xl font-black">{listTitle("What you will learn", "ماذا ستتعلم؟")}</h2>
            <div className="mt-8 space-y-6">
              {track.modules.map((module, index) => (
                <div key={module.en} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#869CFF]/10 font-black text-[#586FD6]">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-bold">{isArabic ? module.ar : module.en}</h3><ul className="mt-2 space-y-2 text-sm leading-6 text-[#7B829D]">{module.topics.map(topic => <li key={topic} className="flex gap-2"><span className="text-[#869CFF]">•</span>{topic}</li>)}</ul></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="rounded-[32px] bg-[#20243A] p-7 text-white md:p-9">
              <p className="text-sm font-bold tracking-[0.18em] text-[#B9C5FF]">{listTitle("CORE SKILLS", "المهارات الأساسية")}</p>
              <h2 className="mt-3 text-2xl font-black">{listTitle("Tools & technologies", "الأدوات والتقنيات")}</h2>
              <div className="mt-6 flex flex-wrap gap-2">{track.skills.map(skill => <span key={skill} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm">{skill}</span>)}</div>
            </div>
            <div className="rounded-[32px] border border-[#E7E8F0] bg-white p-7 md:p-9">
              <h2 className="text-2xl font-black">{listTitle("Learning outcomes", "مخرجات التعلم")}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#7B829D]">{(isArabic ? track.outcomes.ar : track.outcomes.en).map(item => <li key={item} className="flex gap-3"><span className="font-black text-[#869CFF]">✓</span>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-[32px] border border-[#E7E8F0] bg-white p-8">
            <h2 className="text-2xl font-black">{listTitle("Practical projects", "المشاريع العملية")}</h2>
            <p className="mt-2 text-sm text-[#7B829D]">{listTitle("Build real work to demonstrate your skills.", "نفّذ مشاريع عملية تثبت المهارات التي اكتسبتها.")}</p>
            <ul className="mt-6 space-y-3">{(isArabic ? track.projects.ar : track.projects.en).map(item => <li key={item} className="rounded-2xl bg-[#F8F8FC] p-4 text-sm font-semibold">{item}</li>)}</ul>
          </div>
          <div className="rounded-[32px] border border-[#E7E8F0] bg-white p-8">
            <h2 className="text-2xl font-black">{listTitle("Before you start", "قبل أن تبدأ")}</h2>
            <p className="mt-2 text-sm text-[#7B829D]">{listTitle("Recommended prerequisites for this track.", "المتطلبات والمهارات الموصى بها قبل بدء المسار.")}</p>
            <ul className="mt-6 space-y-3">{(isArabic ? track.prerequisites.ar : track.prerequisites.en).map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-[#7B829D]"><span className="font-black text-[#869CFF]">✓</span>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-r from-[#586FD6] to-[#869CFF] px-8 py-12 text-center text-white md:px-16">
          <h2 className="text-3xl font-black md:text-4xl">{listTitle("Ready to build your future?", "جاهز تبدأ تبني مستقبلك؟")}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">{listTitle("Take the next step and start developing practical skills with Codo Learn.", "ابدأ خطوتك التالية وطور مهارات عملية مع Codo Learn.")}</p>
          <Link href="/signup" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-bold text-[#586FD6] transition hover:-translate-y-1">{listTitle("Create your account", "أنشئ حسابك الآن")} →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
