import { useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { setSEO } from "../utils/seo";
import "../styles/epaper.css";

function EPaper() {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setSEO({
      title:
        language === "te"
          ? "ఈ-పేపర్ | Pratyaksha News"
          : "E-Paper | Pratyaksha News",
      description:
        language === "te"
          ? "ఈరోజు పత్రిక చదవండి"
          : "Read today’s newspaper e-paper",
    });
  }, [language]);

  // Temporary static editions (later from DB)
  const editions = [
    {
      date: "21 Feb 2026",
      pdf: "public/Pr_July 21_01.pdf",
    },
    {
      date: "22 Feb 2026",
      pdf: "public/Pr_July 21_01.pdf",
    },
    {
      date: "23 Feb 2026",
      pdf: "public/Pr_July 21_01.pdf",
    },
    {
      date: "24 Feb 2026",
      pdf: "public/Pr_July 21_01.pdf",
    },
  ];

  return (
    <section className="epaper-container">
      <h2 style={{textAlign:"center"}}>{language === "te" ? "ఈ-పేపర్" : "E-Paper"}</h2>

      <ul className="epaper-list">
        {editions.map((item, index) => (
          <li key={index}>
            <span>{item.date}</span>

            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === "te" ? "చదవండి" : "Read"}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EPaper;
