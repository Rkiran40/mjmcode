import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("te"); // te = Telugu, en = English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "te" ? "en" : "te"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
