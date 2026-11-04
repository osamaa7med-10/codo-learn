
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type Language = "en" | "ar";
export type Theme = "light" | "dark";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    direction: "ltr" | "rtl";
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
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
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("codo-language");

        const savedTheme = localStorage.getItem("codo-theme");
        if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);

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
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem("codo-theme", theme);
    }, [language, theme, mounted]);

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
    };

    const direction = language === "ar" ? "rtl" : "ltr";

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, direction, theme, setTheme, toggleTheme: () => setTheme((current) => current === "light" ? "dark" : "light") }}
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

export function useTheme() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useTheme must be used inside LanguageProvider");
    return { theme: context.theme, setTheme: context.setTheme, toggleTheme: context.toggleTheme };
}
