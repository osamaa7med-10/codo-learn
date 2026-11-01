
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";

type AccountRole = "student" | "instructor" | "employee" | "client";

const inputClass =
    "w-full rounded-xl border border-[#E5E7F2] bg-white px-4 py-3.5 text-sm text-[#20243A] outline-none transition placeholder:text-[#A3A8BC] focus:border-[#869CFF] focus:ring-4 focus:ring-[#869CFF]/10";

const labelClass = "mb-2 block text-sm font-semibold text-[#343B58]";

export default function SignupPage() {
    const [role, setRole] = useState<AccountRole>("student");

    // Personal information
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("Egypt");
    const [city, setCity] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");

    // Password
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Student-specific details
    const [university, setUniversity] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [major, setMajor] = useState("");
    const [learningTrack, setLearningTrack] = useState("");

    // Instructor-specific details
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");

    // Employee-specific details
    const [jobTitle, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [workEmail, setWorkEmail] = useState("");

    // Client-specific details
    const [companyName, setCompanyName] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [industry, setIndustry] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [serviceRequired, setServiceRequired] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    // Feedback
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function clearFeedback() {
        setError("");
        setMessage("");
    }

    function handleRoleChange(nextRole: AccountRole) {
        setRole(nextRole);
        clearFeedback();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearFeedback();

        // General validation
        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !country ||
            !city.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please complete all required personal and account details.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlPattern = /^https?:\/\/.+\..+/i;

        if (!emailPattern.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (phone.replace(/\D/g, "").length < 8) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/\d/.test(password)
        ) {
            setError(
                "Use at least 8 characters, including uppercase and lowercase letters and a number."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        if (linkedinUrl.trim() && !urlPattern.test(linkedinUrl.trim())) {
            setError("Please enter a valid LinkedIn URL starting with https://.");
            return;
        }

        // Student validation
        if (
            role === "student" &&
            (!university.trim() ||
                !educationLevel ||
                !major.trim() ||
                !learningTrack)
        ) {
            setError(
                "Please complete the required student education and learning details."
            );
            return;
        }

        // Instructor validation
        if (role === "instructor" && (!specialization.trim() || !experience)) {
            setError(
                "Please complete your instructor specialization and experience."
            );
            return;
        }

        if (
            role === "instructor" &&
            portfolioUrl.trim() &&
            !urlPattern.test(portfolioUrl.trim())
        ) {
            setError("Please enter a valid portfolio URL starting with https://.");
            return;
        }

        // Employee validation
        if (
            role === "employee" &&
            (!jobTitle.trim() || !department.trim() || !workEmail.trim())
        ) {
            setError("Please complete your employee job details.");
            return;
        }

        if (role === "employee" && !emailPattern.test(workEmail.trim())) {
            setError("Please enter a valid work email address.");
            return;
        }

        // Client validation
        if (
            role === "client" &&
            (!companyName.trim() ||
                !industry ||
                !companySize ||
                !serviceRequired ||
                !projectDescription.trim())
        ) {
            setError(
                "Please complete all required company and project information."
            );
            return;
        }

        if (
            role === "client" &&
            companyWebsite.trim() &&
            !urlPattern.test(companyWebsite.trim())
        ) {
            setError(
                "Please enter a valid company website URL starting with https://."
            );
            return;
        }

        // Terms validation
        if (!acceptTerms) {
            setError("Please agree to the Terms of Service and Privacy Policy.");
            return;
        }

        setMessage(
            `Your ${role} registration details are valid. Account creation is not connected to a backend yet.`
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#F8F8FC] px-4 py-10 sm:px-6 lg:py-14">
            {/* Animated Background */}
            <motion.div
                aria-hidden="true"
                animate={{
                    x: [0, 25, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.12, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#869CFF]/25 blur-3xl"
            />

            <motion.div
                aria-hidden="true"
                animate={{
                    x: [0, -20, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#E2A3FF]/30 blur-3xl"
            />

            <div className="relative z-10 mx-auto grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/80 bg-white/85 shadow-2xl shadow-[#869CFF]/10 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr]">

                {/* Left Branding Section */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] p-10 text-white lg:flex xl:p-12">
                    <motion.div
                        aria-hidden="true"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/30"
                    />

                    <motion.div
                        aria-hidden="true"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-white/20"
                    />

                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.03 }}
                        className="relative z-10 flex w-fit items-center"
                        aria-label="Codo Learn Home"
                    >
                        <img
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn"
                            className="h-auto w-[210px] object-contain"
                        />
                    </motion.a>

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative z-10 my-12"
                    >
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-3xl shadow-lg backdrop-blur">
                            {"</>"}
                        </div>

                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                            Learn. Build. Grow.
                        </p>

                        <h1 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                            Your next chapter starts here.
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-8 text-white/90">
                            Build your profile, tell us what you want to achieve,
                            and find the learning or professional path that fits
                            your goals.
                        </p>

                        <div className="mt-8 space-y-4 text-sm text-white/90">
                            {[
                                "A profile tailored to your account type",
                                "Learning and career preferences in one place",
                                "One community for skills, projects, and growth",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                                        ✓
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <p className="relative z-10 text-sm text-white/80">
                        Codo Learn · Training & Digital Solutions
                    </p>
                </section>

                {/* Registration Section */}
                <section className="p-6 sm:p-9 lg:p-10 xl:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-full max-w-2xl"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#68708D] transition hover:text-[#7587E8] lg:hidden"
                        >
                            <span aria-hidden="true">←</span> Back to home
                        </Link>

                        <div className="mb-8 mt-5 lg:mt-0">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                                Join Codo Learn
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#20243A] sm:text-4xl">
                                Create your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#7B829D]">
                                Add a few details so we can tailor your Codo Learn
                                experience. Fields marked with{" "}
                                <span className="text-rose-500">*</span> are required.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-8"
                        >
                            {/* 01 - Account Type */}
                            <section>
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#869CFF]/12 font-bold text-[#687CE0]">
                                        01
                                    </span>

                                    <div>
                                        <h3 className="font-bold text-[#20243A]">
                                            Account type
                                        </h3>
                                        <p className="text-xs text-[#9299B1]">
                                            Choose the profile that fits you.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F1F2FA] p-1.5 sm:grid-cols-4">
                                    {([
                                        {
                                            value: "student",
                                            label: "Student",
                                            detail: "Learn skills",
                                        },
                                        {
                                            value: "instructor",
                                            label: "Instructor",
                                            detail: "Teach courses",
                                        },
                                        {
                                            value: "employee",
                                            label: "Employee",
                                            detail: "Team member",
                                        },
                                        {
                                            value: "client",
                                            label: "Client",
                                            detail: "Request services",
                                        },
                                    ] as const).map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => handleRoleChange(item.value)}
                                            aria-pressed={role === item.value}
                                            className={`rounded-xl px-2 py-3 text-left transition-all ${role === item.value
                                                    ? "bg-white text-[#687CE0] shadow-sm ring-1 ring-[#869CFF]/25"
                                                    : "text-[#7B829D] hover:bg-white/60"
                                                }`}
                                        >
                                            <span className="block text-sm font-bold">
                                                {item.label}
                                            </span>
                                            <span className="mt-1 block text-[11px]">
                                                {item.detail}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* 02 - Personal Information */}
                            <section>
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#869CFF]/12 font-bold text-[#687CE0]">
                                        02
                                    </span>

                                    <div>
                                        <h3 className="font-bold text-[#20243A]">
                                            Personal information
                                        </h3>
                                        <p className="text-xs text-[#9299B1]">
                                            How we can identify and contact you.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass} htmlFor="fullName">
                                            Full name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            autoComplete="name"
                                            className={inputClass}
                                            placeholder="e.g. Alex Morgan"
                                            value={fullName}
                                            onChange={(e) => {
                                                setFullName(e.target.value);
                                                clearFeedback();
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="email">
                                            Email address <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className={inputClass}
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                clearFeedback();
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="phone">
                                            Phone number <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            className={inputClass}
                                            placeholder="+20 1XX XXX XXXX"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                                clearFeedback();
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="country">
                                            Country <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            className={inputClass}
                                            value={country}
                                            onChange={(e) => {
                                                setCountry(e.target.value);
                                                clearFeedback();
                                            }}
                                        >
                                            <option value="">Select country</option>
                                            <option>Egypt</option>
                                            <option>Saudi Arabia</option>
                                            <option>United Arab Emirates</option>
                                            <option>Jordan</option>
                                            <option>Morocco</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="city">
                                            City <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="city"
                                            name="city"
                                            autoComplete="address-level2"
                                            className={inputClass}
                                            placeholder="Your city"
                                            value={city}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                                clearFeedback();
                                            }}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className={labelClass} htmlFor="linkedinUrl">
                                            LinkedIn profile{" "}
                                            <span className="font-normal text-[#9299B1]">
                                                (optional)
                                            </span>
                                        </label>
                                        <input
                                            id="linkedinUrl"
                                            name="linkedinUrl"
                                            type="url"
                                            className={inputClass}
                                            placeholder="https://linkedin.com/in/your-profile"
                                            value={linkedinUrl}
                                            onChange={(e) => {
                                                setLinkedinUrl(e.target.value);
                                                clearFeedback();
                                            }}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 03 - Student Information */}
                            {role === "student" && (
                                <section>
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9B65C5]">
                                            03
                                        </span>

                                        <div>
                                            <h3 className="font-bold text-[#20243A]">
                                                Education & learning goals
                                            </h3>
                                            <p className="text-xs text-[#9299B1]">
                                                Help us recommend the right learning path.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className={labelClass} htmlFor="university">
                                                University / Institution{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="university"
                                                className={inputClass}
                                                placeholder="University or school name"
                                                value={university}
                                                onChange={(e) => {
                                                    setUniversity(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="educationLevel">
                                                Education level{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="educationLevel"
                                                className={inputClass}
                                                value={educationLevel}
                                                onChange={(e) => {
                                                    setEducationLevel(e.target.value);
                                                    clearFeedback();
                                                }}
                                            >
                                                <option value="">Select level</option>
                                                <option>High school</option>
                                                <option>University student</option>
                                                <option>Graduate</option>
                                                <option>Postgraduate</option>
                                                <option>Self-taught</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="major">
                                                Major / Field of study{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="major"
                                                className={inputClass}
                                                placeholder="e.g. Computer Science"
                                                value={major}
                                                onChange={(e) => {
                                                    setMajor(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="learningTrack">
                                                Interested track{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="learningTrack"
                                                className={inputClass}
                                                value={learningTrack}
                                                onChange={(e) => {
                                                    setLearningTrack(e.target.value);
                                                    clearFeedback();
                                                }}
                                            >
                                                <option value="">Choose a track</option>
                                                <option>Frontend Development</option>
                                                <option>Backend Development</option>
                                                <option>Full-Stack Development</option>
                                                <option>Mobile App Development</option>
                                                <option>UI/UX Design</option>
                                                <option>Data Science & AI</option>
                                                <option>Cybersecurity</option>
                                                <option>Digital Marketing</option>
                                                <option>Not sure yet</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 03 - Instructor Information */}
                            {role === "instructor" && (
                                <section>
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9B65C5]">
                                            03
                                        </span>

                                        <div>
                                            <h3 className="font-bold text-[#20243A]">
                                                Instructor profile
                                            </h3>
                                            <p className="text-xs text-[#9299B1]">
                                                Share your expertise and teaching background.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className={labelClass} htmlFor="specialization">
                                                Specialization{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="specialization"
                                                className={inputClass}
                                                placeholder="e.g. React, UI/UX, Data Science"
                                                value={specialization}
                                                onChange={(e) => {
                                                    setSpecialization(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="experience">
                                                Teaching / work experience{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="experience"
                                                className={inputClass}
                                                value={experience}
                                                onChange={(e) => {
                                                    setExperience(e.target.value);
                                                    clearFeedback();
                                                }}
                                            >
                                                <option value="">Select experience</option>
                                                <option>Less than 1 year</option>
                                                <option>1–2 years</option>
                                                <option>3–5 years</option>
                                                <option>6–10 years</option>
                                                <option>10+ years</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass} htmlFor="portfolioUrl">
                                                Portfolio / personal website{" "}
                                                <span className="font-normal text-[#9299B1]">
                                                    (optional)
                                                </span>
                                            </label>
                                            <input
                                                id="portfolioUrl"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://your-portfolio.com"
                                                value={portfolioUrl}
                                                onChange={(e) => {
                                                    setPortfolioUrl(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 03 - Employee Information */}
                            {role === "employee" && (
                                <section>
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9B65C5]">
                                            03
                                        </span>

                                        <div>
                                            <h3 className="font-bold text-[#20243A]">
                                                Work information
                                            </h3>
                                            <p className="text-xs text-[#9299B1]">
                                                Details to help identify your team profile.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className={labelClass} htmlFor="jobTitle">
                                                Job title <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="jobTitle"
                                                className={inputClass}
                                                placeholder="e.g. Training Coordinator"
                                                value={jobTitle}
                                                onChange={(e) => {
                                                    setJobTitle(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="department">
                                                Department <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="department"
                                                className={inputClass}
                                                placeholder="e.g. Operations"
                                                value={department}
                                                onChange={(e) => {
                                                    setDepartment(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass} htmlFor="workEmail">
                                                Work email <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="workEmail"
                                                type="email"
                                                autoComplete="work email"
                                                className={inputClass}
                                                placeholder="name@company.com"
                                                value={workEmail}
                                                onChange={(e) => {
                                                    setWorkEmail(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 03 - Client Information */}
                            {role === "client" && (
                                <section>
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2A3FF]/20 font-bold text-[#9B65C5]">
                                            03
                                        </span>

                                        <div>
                                            <h3 className="font-bold text-[#20243A]">
                                                Company & Project Information
                                            </h3>
                                            <p className="text-xs text-[#9299B1]">
                                                Tell us about your company and the digital services you need.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className={labelClass} htmlFor="companyName">
                                                Company / Organization Name{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="companyName"
                                                className={inputClass}
                                                placeholder="e.g. Tech Solutions"
                                                value={companyName}
                                                onChange={(e) => {
                                                    setCompanyName(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass} htmlFor="companyWebsite">
                                                Company Website{" "}
                                                <span className="font-normal text-[#9299B1]">
                                                    (Optional)
                                                </span>
                                            </label>
                                            <input
                                                id="companyWebsite"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://www.example.com"
                                                value={companyWebsite}
                                                onChange={(e) => {
                                                    setCompanyWebsite(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="industry">
                                                Industry <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="industry"
                                                className={inputClass}
                                                value={industry}
                                                onChange={(e) => {
                                                    setIndustry(e.target.value);
                                                    clearFeedback();
                                                }}
                                            >
                                                <option value="">Select industry</option>
                                                <option>Technology & IT</option>
                                                <option>Education</option>
                                                <option>Healthcare</option>
                                                <option>E-Commerce & Retail</option>
                                                <option>Finance & Banking</option>
                                                <option>Real Estate</option>
                                                <option>Marketing & Advertising</option>
                                                <option>Manufacturing</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="companySize">
                                                Company Size{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="companySize"
                                                className={inputClass}
                                                value={companySize}
                                                onChange={(e) => {
                                                    setCompanySize(e.target.value);
                                                    clearFeedback();
                                                }}
                                            >
                                                <option value="">Select company size</option>
                                                <option>Just me</option>
                                                <option>2–10 employees</option>
                                                <option>11–50 employees</option>
                                                <option>51–200 employees</option>
                                                <option>201–500 employees</option>
                                                <option>500+ employees</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass} htmlFor="serviceRequired">
                                                Service Required{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="serviceRequired"
                                                className={inputClass}
                                                value={serviceRequired}
                                                onChange={(e) => {
                                                    setServiceRequired(e.target.value);
                                                    clearFeedback();
                                                }}
                                            >
                                                <option value="">Choose a service</option>
                                                <option>Web Development</option>
                                                <option>Mobile Applications</option>
                                                <option>UI / UX Design</option>
                                                <option>E-Commerce Solutions</option>
                                                <option>Software Solutions</option>
                                                <option>Digital Transformation</option>
                                                <option>Multiple Services</option>
                                                <option>Not Sure Yet</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                className={labelClass}
                                                htmlFor="projectDescription"
                                            >
                                                Project Description{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <textarea
                                                id="projectDescription"
                                                rows={5}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Tell us about your project, goals, requirements, and what you want to achieve..."
                                                value={projectDescription}
                                                onChange={(e) => {
                                                    setProjectDescription(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 04 - Secure Account */}
                            <section>
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#869CFF]/12 font-bold text-[#687CE0]">
                                        04
                                    </span>

                                    <div>
                                        <h3 className="font-bold text-[#20243A]">
                                            Secure your account
                                        </h3>
                                        <p className="text-xs text-[#9299B1]">
                                            Create a strong password for your account.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className={labelClass} htmlFor="password">
                                            Password <span className="text-rose-500">*</span>
                                        </label>

                                        <div className="flex items-center rounded-xl border border-[#E5E7F2] bg-white pr-3 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                                placeholder="Create a strong password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword((value) => !value)
                                                }
                                                className="text-xs font-bold text-[#7587E8] hover:text-[#596CCB]"
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>

                                        <p className="mt-2 text-xs leading-5 text-[#9299B1]">
                                            At least 8 characters, uppercase, lowercase, and a number.
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            className={labelClass}
                                            htmlFor="confirmPassword"
                                        >
                                            Confirm password{" "}
                                            <span className="text-rose-500">*</span>
                                        </label>

                                        <div className="flex items-center rounded-xl border border-[#E5E7F2] bg-white pr-3 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={
                                                    showConfirmPassword ? "text" : "password"
                                                }
                                                autoComplete="new-password"
                                                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                                placeholder="Enter password again"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    clearFeedback();
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword((value) => !value)
                                                }
                                                className="text-xs font-bold text-[#7587E8] hover:text-[#596CCB]"
                                            >
                                                {showConfirmPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Terms & Privacy Agreement */}
                            <div className="flex items-start gap-3 rounded-xl border border-[#E5E7F2] bg-[#F8F8FC] p-4">
                                <input
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => {
                                        setAcceptTerms(e.target.checked);
                                        clearFeedback();
                                    }}
                                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#869CFF]"
                                    aria-describedby="terms-description"
                                />

                                <div
                                    id="terms-description"
                                    className="text-sm leading-6 text-[#68708D]"
                                >
                                    <label
                                        htmlFor="acceptTerms"
                                        className="cursor-pointer"
                                    >
                                        I agree to the{" "}
                                    </label>

                                    <Link
                                        href="/terms"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#687CE0] underline underline-offset-2 hover:text-[#596CCB]"
                                    >
                                        Terms of Service
                                    </Link>

                                    {" "}and{" "}

                                    <Link
                                        href="/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#687CE0] underline underline-offset-2 hover:text-[#596CCB]"
                                    >
                                        Privacy Policy
                                    </Link>

                                    <span>.</span>

                                    <p className="mt-1 text-xs text-[#9299B1]">
                                        You must accept both policies to create an account.
                                    </p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                                >
                                    {error}
                                </p>
                            )}

                            {/* Success Message */}
                            {message && (
                                <p
                                    role="status"
                                    className="rounded-xl border border-[#869CFF]/30 bg-[#869CFF]/10 px-4 py-3 text-sm leading-6 text-[#454F85]"
                                >
                                    {message}
                                </p>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.985 }}
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-5 py-4 font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:shadow-xl hover:shadow-[#869CFF]/30"
                            >
                                Create Account{" "}
                                <span aria-hidden="true">→</span>
                            </motion.button>
                        </form>

                        <p className="mt-7 text-center text-sm text-[#7B829D]">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-[#7587E8] transition hover:text-[#596CCB]"
                            >
                                Log in
                            </Link>
                        </p>

                        <p className="mt-6 text-center text-xs leading-5 text-[#9A9FB3]">
                            Your details help personalize your experience. Account
                            creation is currently a frontend demo.
                        </p>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
