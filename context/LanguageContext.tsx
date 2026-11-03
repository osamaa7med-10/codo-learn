
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    direction: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [language, setLanguageState] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("codo-language");

        if (savedLanguage === "ar" || savedLanguage === "en") {
            setLanguageState(savedLanguage);
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

        localStorage.setItem("codo-language", language);
    }, [language, mounted]);

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
    };

    const direction = language === "ar" ? "rtl" : "ltr";

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, direction }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}
