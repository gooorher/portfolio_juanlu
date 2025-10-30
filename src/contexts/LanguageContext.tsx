import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  ReactNode,
} from "react";

type Language = "es" | "en";

// Tipos específicos para cada tipo de datos traducible
type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string | ReactNode;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

type TranslationType = {
  [key in Language]: {
    nav: {
      about: string;
      experience: string;
      education: string;
      projects: string;
      contact: string;
    };
    hero: {
      greeting: string;
      role: string;
      description: string;
    };
    about: {
      title: string;
      description: string[];
    };
    experience: {
      title: string;
      experiences_data: Array<{
        company: string;
        title: string;
        range: string;
        responsibilities: string[];
      }>;
    };
    education: {
      title: string;
      educations_data: Array<{
        institution: string;
        degree: string;
        range: string;
        details: string[];
      }>;
    };
    projects: {
      title: string;
      projects_data: Array<{
        title: string;
        description: string;
        tech: string[];
        github?: string;
        external?: string;
      }>;
    };
    contact: {
      title: string;
      description: string;
      button: string;
    };
    footer: {
      designed: string;
      rights: string;
    };
  };
};

export const translations: TranslationType = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      education: "Educación",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, mi nombre es",
      role: "Construyo cosas para la web.",
      description:
        "Soy un desarrollador de software especializado en crear experiencias digitales 👨🏼‍💻",
      contactButton: "Contactar",
      projectsButton: "Ver Proyectos",
    },
    about: {
      title: "Sobre mí",
      description: [
        "Mi interés en el desarrollo web comenzó en 2012 cuando decidí intentar clonar Habbo Hotel para jugar con amigos con créditos ilimitados 🥸. Mi enfoque principal estos días es construir productos digitales accesibles e inclusivos.",
        "Aquí hay algunas tecnologías con las que he estado trabajando recientemente:",
      ],
      technologiesTitle: "Tecnologías que he estado trabajando recientemente:",
    },
    experience: {
      title: "Dónde he trabajado",
      experiences_data: [
        {
          company: "EY - Santander",
          title: "Ingeniero de Sistemas Financieros",
          range: "Marzo 2025 - Presente",
          responsibilities: [
            "Plataformas de Fraude y Cumplimiento para Banco Santander. Lideré el análisis y optimización del rendimiento del servidor para la plataforma OFSAA, logrando ahorros anuales de €350,000 en costes (Redimensionamiento).",
            "Desarrollé y ajusté consultas SQL complejas y procesos batch para mejorar la detección de fraude y las velocidades de procesamiento de datos.",
            "Automatizé flujos de trabajo críticos de datos usando scripts Shell y Python, mejorando significativamente la eficiencia y reduciendo errores manuales.",
            "Aseguré la alta fiabilidad de la plataforma resolviendo incidentes críticos de L3 mediante análisis profundo de causas raíz.",
            "Utilicé Dynatrace y Kibana (Elasticsearch) para monitoreo en tiempo real, análisis de logs y detección proactiva de anomalías.",
            "Colaboré con el equipo de DevOps para mejorar la integración del pipeline CI/CD y la automatización de despliegues.",
          ],
        },
        {
          company: "EY - Santander",
          title: "Ingeniero Full Stack",
          range: "Junio 2024 - Marzo 2025",
          responsibilities: [
            "Plataformas Regulatorias y de Datos para Banco Santander. Desarrollé una aplicación full-stack para soportar el Test de Estrés EBA de Santander, procesando y gestionando conjuntos de datos a gran escala para reportes regulatorios.",
            "Ingeniería de pipelines robustos de ingesta de datos usando Python para procesar archivos Excel complejos y cargarlos en una base de datos Oracle SQL.",
            "Construí la API backend y la lógica de negocio con Django, proporcionando acceso de alto rendimiento a los datos estructurados.",
            "Diseñé una interfaz de usuario intuitiva y responsiva con Angular, permitiendo a los analistas consumir e interactuar eficazmente con los datos del test de estrés.",
            "Arquitecté la infraestructura de la aplicación en AWS, utilizando servicios como EC2 para computación, RDS para hosting de base de datos y S3 para staging escalable de datos, asegurando una solución fiable y escalable.",
          ],
        },
        {
          company: "Santander",
          title: "Cajero",
          range: "Julio 2022 - Septiembre 2022 // Julio 2023 - Septiembre 2023",
          responsibilities: [
            "Atención al cliente",
            "Responsabilidad en el cuadre de la caja de la sucursal",
            "Arqueo de caja y gestión de efectivo",
            "Gestión de operaciones bancarias diarias",
            "Resolución de consultas y problemas de clientes",
          ],
        },
      ],
    },
    education: {
      title: "Dónde he estudiado",
      educations_data: [
        {
          institution: "Universidad de Málaga / Khaos Research",
          degree: "Master en Big Data y AI",
          range: "2023 - 2025",
          details: [
            "Especialización en Inteligencia Artificial y Machine Learning",
            "Tesis sobre el desarrollo de una aplicación Flask para visualizar y dashboard datos almacenados en una base de datos MongoDB, con los datos ingeridos a través de una pipeline de big data sobre el conflicto Ucraniano.",
            "GPA: 3.7/4.0",
          ],
        },
        {
          institution: "Universidad de Málaga",
          degree: "Grado en Ingeniería de Telecomunicaciones (Telemática)",
          range: "2018 - 2023",
          details: [
            "Especialización en protocolos de red, ciberseguridad y transmisión de datos.",
            "Tesis sobre MLOPS y pipelines CI/CD para un dataset de ciberseguridad big data.",
            "GPA: 3.3/4.0",
          ],
        },
      ],
    },
    projects: {
      title: "Algunos proyectos que he hecho",
      projects_data: [
        {
          title: "Mapa de Crisis de Ucrania",
          description:
            "Aplicación web Flask que extrae datos de tweets acerca del conflicto de una base de datos MongoDB y muestra dashboards interactivos con gráficos y mapas de interés.",
          tech: ["Flask", "MongoDB", "Docker", "Python"],
          github: "https://github.com/gooorher/Ukraine-Crisis-Tweets-Analysis",
        },
        {
          title: "Detección de Ciberataques con el uso de una pipeline MLOPS",
          description:
            "Generación de CSVs provinientes de capturas de tráfico de red, preprocesamiento de datos y entrenamiento de modelos de machine learning para detectar ataques de seguridad. Se automatizó el proceso de entrenamiento y evaluación de modelos usando un workflow MLOps.",
          tech: [
            "Streamlit",
            "DVC",
            "Python",
            "Evidently AI",
            "S3",
            "EC2",
            "Docker",
            "MLflow",
            "FastAPI",
          ],
          github: "https://github.com/gooorher/mlops-cybersecurity-project",
        },
      ],
    },
    contact: {
      title: "¿Hablamos?",
      description:
        "Mi bandeja de entrada está siempre abierta. Ya sea que tengas una pregunta o simplemente quieras saludar 🫡, ¡contáctame por correo con el botón de abajo o por cualquiera de mis redes sociales!",
      button: "Contactar",
    },
    footer: {
      designed: "Diseñado y construido por",
      rights: "Todos los derechos reservados",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      projects: "Work",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      role: "I build things for the web.",
      description:
        "I'm a software developer specializing in building exceptional digital experiences 👨🏼‍💻",
      contactButton: "Contact Me",
      projectsButton: "View Projects",
    },
    about: {
      title: "About Me",
      description: [
        "My interest in web development started back in 2012 when I decided to try cloning Habbo Hotel to play with friends with unlimited credits 🥸. My main focus these days is building accessible, inclusive digital products.",
        "Here are a few technologies I've been working with recently:",
      ],
      technologiesTitle: "Technologies I've been working with recently:",
    },
    experience: {
      title: "Where I've Worked",
      experiences_data: [
        {
          company: "EY - Santander",
          title: "Financial Systems Engineer",
          range: "March 2025 - Present",
          responsibilities: [
            "Fraud & Compliance Platforms for Santander Bank. Led server performance analysis and optimization for the OFSAA platform, achieving €350,000 in annual cost savings (Resizing).",
            "Developed and tuned complex SQL queries and batch processes to enhance fraud detection and data processing speeds.",
            "Automated critical data workflows using Shell scripting and Python, significantly improving efficiency and reducing manual errors.",
            "Ensured high platform reliability by resolving critical L3 incidents through in-depth root cause analysis.",
            "Utilized Dynatrace and Kibana (Elasticsearch) for real-time system monitoring, log analysis, and proactive anomaly detection.",
            "Partnered with the DevOps team to improve CI/CD pipeline integration and deployment automation.",
          ],
        },
        {
          company: "EY - Santander",
          title: "Full Stack Engineer",
          range: "June 2024 - March 2025",
          responsibilities: [
            "Regulatory & Data Platforms for Santander Bank. Developed a full-stack application to support Santander's EBA Stress Test, processing and managing large-scale datasets for regulatory reporting.",
            "Engineered robust data ingestion pipelines using Python to process complex Excel files and load them into an Oracle SQL database.",
            "Built the backend API and business logic with Django, providing high-performance access to the structured data.",
            "Designed a responsive and intuitive user interface with Angular, enabling analysts to consume and interact with the stress test data effectively.",
            "Architected the application's infrastructure on AWS, leveraging services like EC2 for compute, RDS for database hosting, and S3 for scalable data staging, ensuring a reliable and scalable solution.",
          ],
        },
        {
          company: "Santander",
          title: "Cashier",
          range: "July 2022 - September 2022 // July 2023 - September 2023",
          responsibilities: [
            "Customer service",
            "Responsibility for balancing the branch's cash register",
            "Cash count and cash management",
            "Management of daily banking operations",
            "Resolution of customer inquiries and issues",
          ],
        },
      ],
    },
    education: {
      title: "Where I've Studied",
      educations_data: [
        {
          institution: "University of Málaga / Khaos Research",
          degree: "MsC in Big Data and AI",
          range: "2023 - 2025",
          details: [
            "Specialized in Artificial Intelligence and Machine Learning",
            "Thesis on developing a Flask app to visualize and dashboard data stored in a MongoDB database, with the data ingested through a big data pipeline about the Ukrainian conflict.",
            "GPA: 3.7/4.0",
          ],
        },
        {
          institution: "University of Málaga",
          degree: "Bachelor of Telecommunications Engineering (Telematics)",
          range: "2018 - 2023",
          details: [
            "Focus on network protocols, cybersecurity, and data transmission.",
            "Thesis on MLOPS and CI/CD pipelines for a big data cybersecurity dataset.",
            "GPA: 3.3/4.0",
          ],
        },
      ],
    },
    projects: {
      title: "Some Things I've Built",
      projects_data: [
        {
          title: "Ukraine Crisis Map",
          description:
            "Flask web application that extracts tweet data about the conflict from a MongoDB database and displays interactive dashboards with charts and maps of interest.",
          tech: ["Flask", "MongoDB", "Docker", "Python"],
          github: "https://github.com/gooorher/Ukraine-Crisis-Tweets-Analysis",
        },
        {
          title: "Cyberattacks Detection usintg a MLOPS Pipeline",
          description:
            "Generation of CSVs from network traffic captures, data preprocessing, and training of machine learning models to detect security attacks. The process of training and evaluating models was automated using an MLOps workflow.",
          tech: [
            "Streamlit",
            "DVC",
            "Python",
            "Evidently AI",
            "S3",
            "EC2",
            "Docker",
            "MLflow",
            "FastAPI",
          ],
          github: "https://github.com/gooorher/mlops-cybersecurity-project",
        },
      ],
    },
    contact: {
      title: "What's Next?",
      description:
        "I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to  🫡, I'll try my best to get back to you!",
      button: "Get In Touch",
    },
    footer: {
      designed: "Designed & Built by",
      rights: "All rights reserved",
    },
  },
};

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "es";
  });

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string | ReactNode => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value as string | ReactNode;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
