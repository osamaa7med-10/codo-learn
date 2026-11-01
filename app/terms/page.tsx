
"use client";

import Link from "next/link";
import { motion } from "motion/react";

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

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-[#F8F8FC] text-[#20243A]">
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

                    <Link
                        href="/signup"
                        className="rounded-xl bg-[#586FD6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#465CC0]"
                    >
                        Create Account
                    </Link>
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
                            <span aria-hidden="true">←</span> Back to Home
                        </Link>

                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#586FD6]">
                            CODO LEARN · PLATFORM GUIDELINES
                        </p>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                            Terms of <span className="text-[#586FD6]">Service</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-[#666B80] sm:text-lg">
                            Welcome to Codo Learn. These terms explain the rules and
                            responsibilities that apply when you access or use our learning
                            platform. Please read them carefully.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#777C90]">
                            <span className="rounded-full border border-[#E3E5F2] bg-white px-3 py-1.5">
                                Last updated: October 25, 2026
                            </span>
                            <span className="rounded-full border border-[#E3E5F2] bg-white px-3 py-1.5">
                                Codo Learn Platform
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
                        On This Page
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
                                <span>{section.title}</span>
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Terms */}
                <div className="min-w-0 space-y-6">
                    <div className="rounded-2xl border border-[#DDE2FF] bg-[#F0F2FF] p-5 sm:p-6">
                        <p className="text-sm leading-7 text-[#4D5578]">
                            <strong>Important:</strong> This is a general draft for the
                            Codo Learn project, not legal advice. Review it against your
                            actual services and applicable laws before publishing it for
                            real users.
                        </p>
                    </div>

                    <article className="space-y-10 rounded-2xl border border-[#E8E9F4] bg-white p-6 shadow-sm sm:p-10">
                        <section id="acceptance" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                1. Acceptance of Terms
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                By accessing or using Codo Learn, you agree to these Terms
                                of Service and our{" "}
                                <Link
                                    href="/privacy"
                                    className="font-semibold text-[#586FD6] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                . If you do not agree to these terms, please do not use
                                the platform.
                            </p>
                        </section>

                        <section id="eligibility" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                2. Eligibility and Accounts
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                You must provide accurate and up-to-date information when
                                registering. You are responsible for keeping your account
                                information current. If you are under the age required to
                                consent to online services in your location, a parent or
                                legal guardian must be involved where required by law.
                            </p>
                        </section>

                        <section id="platform" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                3. Using Codo Learn
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                Codo Learn provides technology education, training, and
                                related learning opportunities. Depending on your account
                                type, features may include courses, lessons, assignments,
                                learning progress, internship information, and instructor
                                or administrator tools. Available features may change as
                                the platform develops.
                            </p>
                        </section>

                        <section id="conduct" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                4. Acceptable Use
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                You agree to use Codo Learn responsibly and lawfully. You
                                must not:
                            </p>
                            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[#666B80]">
                                <li>Break applicable laws or violate another person's rights.</li>
                                <li>Access accounts, systems, or data without authorization.</li>
                                <li>Interfere with the platform's security or normal operation.</li>
                                <li>Upload malicious code or attempt to damage the website.</li>
                                <li>Copy, sell, or redistribute protected course materials without permission.</li>
                                <li>Impersonate another person or submit deliberately misleading information.</li>
                                <li>Harass, threaten, or discriminate against other users.</li>
                            </ul>
                        </section>

                        <section id="courses" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                5. Courses and Learning Content
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                Course descriptions, instructors, schedules, lessons, and
                                learning resources may change. Content is provided for
                                educational purposes. Unless explicitly stated otherwise,
                                participation does not guarantee employment, an internship,
                                certification, income, or a specific learning outcome.
                                Course completion requirements may vary by course.
                            </p>
                        </section>

                        <section id="security" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                6. Account Security
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                Keep your password and sign-in credentials confidential.
                                Do not share your account or use another person's account
                                without permission. Notify the Codo Learn team if you
                                suspect unauthorized access to your account.
                            </p>
                        </section>

                        <section id="intellectual-property" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                7. Intellectual Property
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                The Codo Learn name, logo, website design, and platform
                                materials may be protected by intellectual-property laws.
                                You may not reproduce, distribute, or commercially use
                                protected materials without permission, except where
                                applicable law allows. Users must have the necessary rights
                                to any content they submit to the platform.
                            </p>
                        </section>

                        <section id="privacy" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                8. Privacy
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                Our handling of personal information is described in our{" "}
                                <Link
                                    href="/privacy"
                                    className="font-semibold text-[#586FD6] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                . Please review that policy to understand how information
                                may be handled when you use the website.
                            </p>
                        </section>

                        <section id="availability" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                9. Availability and Changes
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                We may update, suspend, or discontinue platform features
                                to maintain or improve the service. We aim to keep the
                                website available but cannot guarantee uninterrupted or
                                error-free access at all times.
                            </p>
                        </section>

                        <section id="liability" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                10. Disclaimers and Liability
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                To the extent permitted by applicable law, Codo Learn and
                                its content are provided on an "as available" basis. We
                                do not guarantee that every feature will always be available
                                or that all content will be free from errors. Nothing in
                                these terms limits liability where doing so would be
                                unlawful.
                            </p>
                        </section>

                        <section id="termination" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                11. Suspension and Termination
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                We may restrict or suspend access when reasonably necessary
                                to protect users, investigate suspected misuse, comply with
                                law, or maintain platform security. Where appropriate and
                                legally required, we will provide notice or an opportunity
                                to address the issue. You may stop using the platform at
                                any time.
                            </p>
                        </section>

                        <section id="changes" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                12. Changes to These Terms
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                We may update these terms as Codo Learn evolves. The
                                updated date will appear at the top of this page. Where
                                required, we will notify users about material changes.
                                Continued use after changes take effect will be subject
                                to the updated terms to the extent permitted by law.
                            </p>
                        </section>

                        <section id="contact" className="scroll-mt-28">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                13. Contact Us
                            </h2>
                            <p className="mt-4 leading-8 text-[#666B80]">
                                If you have questions about these terms, contact the
                                Codo Learn team through the official contact channel
                                published on our website. Add your verified support
                                email or contact page here before launch.
                            </p>
                        </section>

                        <div className="border-t border-[#E8E9F4] pt-6 text-sm leading-7 text-[#85899B]">
                            These terms are a project draft and should be reviewed
                            before being used as a binding agreement.
                        </div>
                    </article>

                    {/* Privacy link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E8E9F4] bg-white p-5">
                        <div>
                            <p className="font-semibold">
                                Questions about your personal information?
                            </p>
                            <p className="mt-1 text-sm text-[#777C90]">
                                Read our Privacy Policy for more details.
                            </p>
                        </div>

                        <Link
                            href="/privacy"
                            className="rounded-xl border border-[#DDE2FF] bg-[#F3F4FF] px-4 py-2.5 text-sm font-semibold text-[#586FD6] transition hover:bg-[#E9ECFF]"
                        >
                            View Privacy Policy
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#E8E9F4] bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-[#85899B] sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <p>© 2026 Codo Learn. All rights reserved.</p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[#586FD6]"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/signup"
                            className="transition hover:text-[#586FD6]"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
