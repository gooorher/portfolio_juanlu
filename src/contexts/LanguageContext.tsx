import { createContext, useContext, useState, PropsWithChildren } from 'react';

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
    };
    education: {
      title: string;
    };
    projects: {
      title: string;
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
      about: 'Sobre mí',
      experience: 'Experiencia',
      education: 'Educación',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, mi nombre es',
      role: 'Construyo cosas para la web.',
      description: 'Soy un desarrollador de software especializado en crear experiencias digitales excepcionales.',
    },
    about: {
      title: 'Sobre mí',
      description: [
        'Mi interés en el desarrollo web comenzó en [año] cuando decidí intentar personalizar temas de WordPress — resultó que hackear juntos temas personalizados me enseñó mucho sobre HTML y CSS.',
        'Avanzando rápidamente hasta hoy, he tenido el privilegio de trabajar en [experiencia relevante]. Mi enfoque principal estos días es construir productos digitales accesibles e inclusivos.',
        'Aquí hay algunas tecnologías con las que he estado trabajando recientemente:',
      ],
    },
    experience: {
      title: 'Dónde he trabajado',
    },
    education: {
      title: 'Dónde he estudiado',
    },
    projects: {
      title: 'Algunos proyectos que he construido',
    },
    contact: {
      title: '¿Hablamos?',
      description: 'Actualmente estoy buscando nuevas oportunidades, y mi bandeja de entrada está siempre abierta. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré mi mejor esfuerzo para responderte!',
      button: 'Contactar',
    },
    footer: {
      designed: 'Diseñado y construido por',
      rights: 'Todos los derechos reservados',
    },
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      projects: 'Work',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      role: 'I build things for the web.',
      description: "I'm a software developer specializing in building exceptional digital experiences.",
    },
    about: {
      title: 'About Me',
      description: [
        'My interest in web development started back in [year] when I decided to try customizing WordPress themes — turns out hacking together custom themes taught me a lot about HTML & CSS.',
        "Fast-forward to today, I've had the privilege of working at [relevant experience]. My main focus these days is building accessible, inclusive digital products.",
        "Here are a few technologies I've been working with recently:",
      ],
    },
    experience: {
      title: "Where I've Worked",
    },
    education: {
      title: "Where I've Studied",
    },
    projects: {
      title: "Some Things I've Built",
    },
    contact: {
      title: "What's Next?",
      description: "I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
      button: 'Get In Touch',
    },
    footer: {
      designed: 'Designed & Built by',
      rights: 'All rights reserved',
    },
  },
};

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es';
  });

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value?.[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    return value;
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};