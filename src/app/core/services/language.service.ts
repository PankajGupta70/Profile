import { Injectable, computed, signal } from '@angular/core';
import { LanguageCode, SupportedLanguage } from '../models/app.model';

interface LanguageOption {
  code: LanguageCode;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly key = 'language';
  private readonly translationsKey = 'language_translations';
  private readonly translationsVersionKey = 'language_translations_version';
  private readonly translationsVersion = '2';
  readonly selected = signal<LanguageCode>('auto');

  readonly options: LanguageOption[] = [
    { code: 'auto', label: 'Auto (Browser/Country)' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' }
  ];

  private readonly translations: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      nav_about: 'About', nav_resume: 'Resume', nav_portfolio: 'Portfolio', nav_projects: 'Projects', nav_contact: 'Contact',
      label_language: 'Language', label_language_type: 'Language Type', label_theme: 'Theme', theme_dark: 'Dark', theme_light: 'Light',
      lang_auto: 'Auto (Browser/Country)', lang_en: 'English', lang_hi: 'Hindi', lang_es: 'Spanish', lang_fr: 'French', lang_de: 'German',
      admin_button: 'Admin',
      download_resume: 'Download Resume', download_resume_pdf: 'Download Resume PDF', download_resume_docx: 'Download Resume DOCX',
      download_cover_letter: 'Download Cover Letter', download_cover_pdf: 'Download Cover Letter PDF', download_cover_docx: 'Download Cover Letter DOCX',
      profile_title: 'Senior Angular Frontend Developer', show_contacts: 'Show Contacts',
      copy_text: 'Copy', copy_failed: 'Copy failed', copied_suffix: 'copied',
      contact_email: 'Email', contact_phone: 'Phone', contact_experience: 'Experience', contact_company: 'Company', contact_location: 'Location',
      company_value: 'Tata Consultancy Services (TCS)',
      experience_value: '4+ Years', location_value: 'Bengaluru, India (Open to Relocation)',
      about_title: 'About Me',
      about_p1: 'Senior Angular Frontend Developer with 4+ years of experience building high-performance, scalable Single Page Applications using Angular (v2-18+), TypeScript, and modern frontend architectures for enterprise-grade systems.',
      about_p2: 'Expertise in performance optimization, micro frontends, WCAG 2.1 accessibility, and NgRx-based state management. Delivered enterprise and government platforms adopted across 140+ countries, supporting 2,000+ concurrent users in secure mission-critical environments.',
      services_title: 'What I Am Doing',
      service_1_title: 'Angular SPA Engineering', service_1_text: 'Building modular, component-driven Angular applications with scalable architecture.',
      service_2_title: 'Performance Optimization', service_2_text: 'Improving page load speed through lazy loading, bundle reduction, and change detection tuning.',
      service_3_title: 'State Management', service_3_text: 'Implementing RxJS and NgRx patterns for robust data flow in enterprise dashboards.',
      service_4_title: 'Accessibility and UX', service_4_text: 'Delivering responsive, WCAG 2.1 compliant UI with i18n/L10n and RTL support.',
      resume_title: 'Resume', education: 'Education', experience: 'Experience', core_skills: 'Core Skills',
      edu_degree: 'Bachelor of Technology (B.Tech) - Computer Science', edu_year: '2019', edu_school: 'Amity School of Engineering and Technology, Noida.',
      exp_role: 'Tata Consultancy Services (TCS) - Software Engineer (Senior Angular Frontend Developer)',
      exp_year: 'April 2021 - Present',
      exp_text: 'Owned frontend features end-to-end for enterprise Angular SPAs (Angular 7-18+), from requirement analysis to production support.',
      skill_1: 'Angular (v2-18+), Angular CLI, Angular Material',
      skill_2: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS',
      skill_3: 'RxJS, NgRx, Angular Forms, Reactive Forms',
      skill_4: 'Performance, WCAG 2.1, i18n/L10n, Agile/Scrum',
      portfolio_title: 'Portfolio', filter_all: 'All', filter_web_design: 'Web design', filter_app: 'Applications', filter_web_dev: 'Web development', select_category: 'Select category',
      projects_title: 'Key Projects', project_1_title: 'ATITHI - CBIC (Government of India)',
      project_1_text: 'Developed secure dynamic forms and complex validations for customs workflows with responsive UI and API integrations.',
      project_2_title: 'Digital Passport System (DPS) - Hitachi Energy',
      project_2_text: 'Built reusable Angular components, implemented NgRx state management, and enabled multilingual and RTL support for global adoption.',
      contact_title: 'Contact', contact_form: 'Contact Form', send_message: 'Send Message',
      contact_send_success: 'Message sent successfully. Please check your email for FormSubmit activation on first use.',
      contact_send_error: 'Message could not be sent. Please try again.',
      placeholder_name: 'Full name', placeholder_email: 'Email address', placeholder_message: 'Your Message'
    },
    hi: {
      nav_about: 'परिचय', nav_resume: 'रिज्यूमे', nav_portfolio: 'पोर्टफोलियो', nav_projects: 'प्रोजेक्ट्स', nav_contact: 'संपर्क',
      label_language: 'भाषा', label_language_type: 'भाषा प्रकार', label_theme: 'थीम', theme_dark: 'डार्क', theme_light: 'लाइट', download_resume: 'रिज्यूमे डाउनलोड करें', download_resume_pdf: 'रिज्यूमे PDF डाउनलोड करें', download_resume_docx: 'रिज्यूमे DOCX डाउनलोड करें',
      lang_auto: 'ऑटो (ब्राउज़र/देश)', lang_en: 'अंग्रेज़ी', lang_hi: 'हिंदी', lang_es: 'स्पेनिश', lang_fr: 'फ्रेंच', lang_de: 'जर्मन',
      admin_button: 'एडमिन',
      download_cover_letter: 'कवर लेटर डाउनलोड करें', download_cover_pdf: 'कवर लेटर PDF डाउनलोड करें', download_cover_docx: 'कवर लेटर DOCX डाउनलोड करें',
      profile_title: 'सीनियर Angular फ्रंटएंड डेवलपर', show_contacts: 'संपर्क दिखाएं',
      copy_text: 'कॉपी', copy_failed: 'कॉपी विफल', copied_suffix: 'कॉपी हो गया',
      contact_email: 'ईमेल', contact_phone: 'फोन', contact_experience: 'अनुभव', contact_company: 'कंपनी', contact_location: 'स्थान', experience_value: '4+ वर्ष',
      company_value: 'टाटा कंसल्टेंसी सर्विसेज (TCS)',
      location_value: 'बेंगलुरु, भारत (स्थानांतरण के लिए तैयार)',
      about_title: 'मेरे बारे में',
      about_p1: 'मैं 4+ वर्षों के अनुभव वाला सीनियर Angular फ्रंटएंड डेवलपर हूं, जिसने Angular (v2-18+), TypeScript और आधुनिक फ्रंटएंड आर्किटेक्चर का उपयोग करके high-performance और scalable SPA एप्लिकेशन बनाए हैं।',
      about_p2: 'मेरी विशेषज्ञता performance optimization, micro frontends, WCAG 2.1 accessibility और NgRx state management में है। मैंने enterprise और government platforms डिलीवर किए हैं, जो 140+ देशों में उपयोग होते हैं और 2,000+ concurrent users को सपोर्ट करते हैं।',
      services_title: 'मैं क्या करता हूं',
      service_1_title: 'Angular SPA इंजीनियरिंग', service_1_text: 'Modular और component-driven Angular applications को scalable architecture के साथ विकसित करना।',
      service_2_title: 'परफॉर्मेंस ऑप्टिमाइजेशन', service_2_text: 'Lazy loading, bundle reduction और change detection tuning से page speed बेहतर करना।',
      service_3_title: 'स्टेट मैनेजमेंट', service_3_text: 'Enterprise dashboards के लिए RxJS और NgRx आधारित robust data flow patterns लागू करना।',
      service_4_title: 'एक्सेसिबिलिटी और UX', service_4_text: 'Responsive, WCAG 2.1 compliant UI के साथ i18n/L10n और RTL support प्रदान करना।',
      resume_title: 'रिज्यूमे', education: 'शिक्षा', experience: 'अनुभव', core_skills: 'मुख्य कौशल',
      edu_degree: 'बैचलर ऑफ टेक्नोलॉजी (B.Tech) - कंप्यूटर साइंस', edu_year: '2019', edu_school: 'एमिटी स्कूल ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, नोएडा।',
      exp_role: 'टाटा कंसल्टेंसी सर्विसेज (TCS) - सॉफ्टवेयर इंजीनियर (सीनियर Angular फ्रंटएंड डेवलपर)',
      exp_year: 'अप्रैल 2021 - वर्तमान',
      exp_text: 'Enterprise Angular SPAs (Angular 7-18+) के लिए requirement analysis से production support तक frontend features end-to-end संभाले।',
      skill_1: 'Angular (v2-18+), Angular CLI, Angular Material',
      skill_2: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS',
      skill_3: 'RxJS, NgRx, Angular Forms, Reactive Forms',
      skill_4: 'Performance, WCAG 2.1, i18n/L10n, Agile/Scrum',
      portfolio_title: 'पोर्टफोलियो', filter_all: 'सभी', filter_web_design: 'वेब डिज़ाइन', filter_app: 'एप्लिकेशंस', filter_web_dev: 'वेब डेवलपमेंट', select_category: 'श्रेणी चुनें',
      projects_title: 'मुख्य प्रोजेक्ट्स',
      project_1_title: 'ATITHI - CBIC (भारत सरकार)',
      project_1_text: 'Customs workflows के लिए secure dynamic forms और complex validations को responsive UI और API integrations के साथ विकसित किया।',
      project_2_title: 'Digital Passport System (DPS) - Hitachi Energy',
      project_2_text: 'Reusable Angular components बनाए, NgRx state management लागू किया और multilingual/RTL support सक्षम किया।',
      contact_title: 'संपर्क', contact_form: 'संपर्क फॉर्म', send_message: 'संदेश भेजें',
      contact_send_success: 'संदेश सफलतापूर्वक भेज दिया गया। पहली बार FormSubmit एक्टिवेशन ईमेल चेक करें।',
      contact_send_error: 'संदेश नहीं भेजा जा सका। कृपया दोबारा प्रयास करें।',
      placeholder_name: 'पूरा नाम', placeholder_email: 'ईमेल पता', placeholder_message: 'आपका संदेश'
    },
    es: {
      nav_about: 'Acerca de', nav_resume: 'Curriculum', nav_portfolio: 'Portafolio', nav_projects: 'Proyectos', nav_contact: 'Contacto',
      label_language: 'Idioma', label_language_type: 'Tipo de idioma', label_theme: 'Tema', theme_dark: 'Oscuro', theme_light: 'Claro', download_resume: 'Descargar CV', download_resume_pdf: 'Descargar CV en PDF', download_resume_docx: 'Descargar CV en DOCX',
      download_cover_letter: 'Descargar Carta de Presentacion', download_cover_pdf: 'Descargar Carta en PDF', download_cover_docx: 'Descargar Carta en DOCX',
      profile_title: 'Desarrollador Frontend Angular Senior', show_contacts: 'Mostrar contactos',
      contact_email: 'Correo', contact_phone: 'Telefono', contact_experience: 'Experiencia', contact_company: 'Empresa', contact_location: 'Ubicacion', experience_value: 'Mas de 4 anos',
      location_value: 'Bengaluru, India (Abierto a reubicacion)',
      about_title: 'Sobre mi',
      about_p1: 'Desarrollador Frontend Angular Senior con mas de 4 anos de experiencia construyendo aplicaciones SPA escalables y de alto rendimiento con Angular (v2-18+), TypeScript y arquitecturas frontend modernas.',
      about_p2: 'Experiencia en optimizacion de rendimiento, micro frontends, accesibilidad WCAG 2.1 y gestion de estado con NgRx. Entrego plataformas empresariales y gubernamentales usadas en mas de 140 paises con soporte para 2,000+ usuarios concurrentes.',
      services_title: 'Lo que hago',
      service_1_title: 'Ingenieria SPA con Angular', service_1_text: 'Construccion de aplicaciones Angular modulares y orientadas a componentes con arquitectura escalable.',
      service_2_title: 'Optimizacion de rendimiento', service_2_text: 'Mejora de carga de pagina con lazy loading, reduccion de bundle y ajuste de deteccion de cambios.',
      service_3_title: 'Gestion de estado', service_3_text: 'Implementacion de patrones RxJS y NgRx para flujo de datos robusto en paneles empresariales.',
      service_4_title: 'Accesibilidad y UX', service_4_text: 'Entrega de UI responsive y compatible con WCAG 2.1 con soporte i18n/L10n y RTL.',
      resume_title: 'Curriculum', education: 'Educacion', experience: 'Experiencia', core_skills: 'Habilidades clave',
      edu_degree: 'Licenciatura en Tecnologia (B.Tech) - Ciencias de la Computacion', edu_year: '2019', edu_school: 'Amity School of Engineering and Technology, Noida.',
      exp_role: 'Tata Consultancy Services (TCS) - Ingeniero de Software (Desarrollador Frontend Angular Senior)',
      exp_year: 'Abril 2021 - Presente',
      exp_text: 'Lidere funciones frontend de extremo a extremo para SPAs empresariales en Angular (Angular 7-18+), desde analisis de requisitos hasta soporte en produccion.',
      skill_1: 'Angular (v2-18+), Angular CLI, Angular Material',
      skill_2: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS',
      skill_3: 'RxJS, NgRx, Angular Forms, Reactive Forms',
      skill_4: 'Rendimiento, WCAG 2.1, i18n/L10n, Agile/Scrum',
      portfolio_title: 'Portafolio', filter_all: 'Todo', filter_web_design: 'Diseno web', filter_app: 'Aplicaciones', filter_web_dev: 'Desarrollo web', select_category: 'Seleccionar categoria',
      projects_title: 'Proyectos Clave',
      project_1_title: 'ATITHI - CBIC (Gobierno de la India)',
      project_1_text: 'Desarrolle formularios dinamicos seguros y validaciones complejas para flujos aduaneros con UI responsive e integracion de APIs.',
      project_2_title: 'Digital Passport System (DPS) - Hitachi Energy',
      project_2_text: 'Construi componentes Angular reutilizables, implemente NgRx y habilite soporte multilingue y RTL para adopcion global.',
      contact_title: 'Contacto', contact_form: 'Formulario de Contacto', send_message: 'Enviar Mensaje',
      placeholder_name: 'Nombre completo', placeholder_email: 'Correo electronico', placeholder_message: 'Tu mensaje'
    },
    fr: {
      nav_about: 'A propos', nav_resume: 'CV', nav_portfolio: 'Portfolio', nav_projects: 'Projets', nav_contact: 'Contact',
      label_language: 'Langue', label_language_type: 'Type de langue', label_theme: 'Theme', theme_dark: 'Sombre', theme_light: 'Clair', download_resume: 'Telecharger le CV', download_resume_pdf: 'Telecharger le CV PDF', download_resume_docx: 'Telecharger le CV DOCX',
      download_cover_letter: 'Telecharger la Lettre de Motivation', download_cover_pdf: 'Telecharger la Lettre PDF', download_cover_docx: 'Telecharger la Lettre DOCX',
      profile_title: 'Developpeur Frontend Angular Senior', show_contacts: 'Afficher les contacts',
      contact_email: 'E-mail', contact_phone: 'Telephone', contact_experience: 'Experience', contact_company: 'Entreprise', contact_location: 'Lieu', experience_value: '4+ ans',
      location_value: 'Bengaluru, Inde (Mobilite possible)',
      about_title: 'A Propos',
      about_p1: 'Developpeur Frontend Angular Senior avec plus de 4 ans d experience dans la creation d applications SPA performantes et evolutives avec Angular (v2-18+), TypeScript et des architectures frontend modernes.',
      about_p2: 'Expertise en optimisation des performances, micro frontends, accessibilite WCAG 2.1 et gestion d etat NgRx. Livraison de plateformes entreprise et gouvernementales adoptees dans plus de 140 pays avec 2,000+ utilisateurs concurrents.',
      services_title: 'Ce que je fais',
      service_1_title: 'Ingenierie SPA Angular', service_1_text: 'Creation d applications Angular modulaires, basees sur des composants et une architecture evolutive.',
      service_2_title: 'Optimisation des performances', service_2_text: 'Amelioration du temps de chargement via lazy loading, reduction du bundle et tuning de la detection des changements.',
      service_3_title: 'Gestion d etat', service_3_text: 'Mise en oeuvre de patterns RxJS et NgRx pour un flux de donnees robuste dans les tableaux de bord.',
      service_4_title: 'Accessibilite et UX', service_4_text: 'Livraison d une UI responsive conforme WCAG 2.1 avec support i18n/L10n et RTL.',
      resume_title: 'CV', education: 'Education', experience: 'Experience', core_skills: 'Competences',
      edu_degree: 'Licence en Technologie (B.Tech) - Informatique', edu_year: '2019', edu_school: 'Amity School of Engineering and Technology, Noida.',
      exp_role: 'Tata Consultancy Services (TCS) - Ingenieur Logiciel (Developpeur Frontend Angular Senior)',
      exp_year: 'Avril 2021 - Present',
      exp_text: 'Pilotage de fonctionnalites frontend de bout en bout pour des SPAs Angular d entreprise (Angular 7-18+), de l analyse des besoins au support de production.',
      skill_1: 'Angular (v2-18+), Angular CLI, Angular Material',
      skill_2: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS',
      skill_3: 'RxJS, NgRx, Angular Forms, Reactive Forms',
      skill_4: 'Performance, WCAG 2.1, i18n/L10n, Agile/Scrum',
      portfolio_title: 'Portfolio', filter_all: 'Tous', filter_web_design: 'Design web', filter_app: 'Applications', filter_web_dev: 'Developpement web', select_category: 'Selectionner une categorie',
      projects_title: 'Projets Clés',
      project_1_title: 'ATITHI - CBIC (Gouvernement de l Inde)',
      project_1_text: 'Developpement de formulaires dynamiques securises et de validations complexes pour des workflows douaniers avec UI responsive et integration API.',
      project_2_title: 'Digital Passport System (DPS) - Hitachi Energy',
      project_2_text: 'Creation de composants Angular reutilisables, implementation de NgRx et activation du support multilingue/RTL pour une adoption mondiale.',
      contact_title: 'Contact', contact_form: 'Formulaire de Contact', send_message: 'Envoyer le message',
      placeholder_name: 'Nom complet', placeholder_email: 'Adresse e-mail', placeholder_message: 'Votre message'
    },
    de: {
      nav_about: 'Uber mich', nav_resume: 'Lebenslauf', nav_portfolio: 'Portfolio', nav_projects: 'Projekte', nav_contact: 'Kontakt',
      label_language: 'Sprache', label_language_type: 'Sprachtyp', label_theme: 'Design', theme_dark: 'Dunkel', theme_light: 'Hell', download_resume: 'Lebenslauf herunterladen', download_resume_pdf: 'Lebenslauf als PDF herunterladen', download_resume_docx: 'Lebenslauf als DOCX herunterladen',
      download_cover_letter: 'Anschreiben herunterladen', download_cover_pdf: 'Anschreiben als PDF herunterladen', download_cover_docx: 'Anschreiben als DOCX herunterladen',
      profile_title: 'Senior Angular Frontend Entwickler', show_contacts: 'Kontakte anzeigen',
      contact_email: 'E-Mail', contact_phone: 'Telefon', contact_experience: 'Erfahrung', contact_company: 'Unternehmen', contact_location: 'Standort', experience_value: '4+ Jahre',
      location_value: 'Bengaluru, Indien (Umzug moglich)',
      about_title: 'Uber mich',
      about_p1: 'Senior Angular Frontend Entwickler mit mehr als 4 Jahren Erfahrung in der Entwicklung von performanten und skalierbaren Single-Page-Anwendungen mit Angular (v2-18+), TypeScript und modernen Frontend-Architekturen.',
      about_p2: 'Expertise in Performance-Optimierung, Micro Frontends, WCAG 2.1 Barrierefreiheit und NgRx-basiertem State Management. Bereitstellung von Enterprise- und Regierungsplattformen in uber 140 Landern mit 2,000+ gleichzeitigen Nutzern.',
      services_title: 'Was ich mache',
      service_1_title: 'Angular SPA Engineering', service_1_text: 'Entwicklung modularer, komponentenbasierter Angular Anwendungen mit skalierbarer Architektur.',
      service_2_title: 'Performance-Optimierung', service_2_text: 'Verbesserung der Ladezeiten durch Lazy Loading, Bundle-Reduktion und Change-Detection-Tuning.',
      service_3_title: 'State Management', service_3_text: 'Umsetzung von RxJS- und NgRx-Mustern fur einen robusten Datenfluss in Enterprise-Dashboards.',
      service_4_title: 'Barrierefreiheit und UX', service_4_text: 'Responsive, WCAG 2.1-konforme UI mit i18n/L10n- und RTL-Unterstutzung.',
      resume_title: 'Lebenslauf', education: 'Bildung', experience: 'Erfahrung', core_skills: 'Kernkompetenzen',
      edu_degree: 'Bachelor of Technology (B.Tech) - Informatik', edu_year: '2019', edu_school: 'Amity School of Engineering and Technology, Noida.',
      exp_role: 'Tata Consultancy Services (TCS) - Softwareingenieur (Senior Angular Frontend Entwickler)',
      exp_year: 'April 2021 - Heute',
      exp_text: 'Verantwortung fur Frontend-Features von Ende zu Ende fur Enterprise Angular SPAs (Angular 7-18+), von der Anforderungsanalyse bis zum Produktionssupport.',
      skill_1: 'Angular (v2-18+), Angular CLI, Angular Material',
      skill_2: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS',
      skill_3: 'RxJS, NgRx, Angular Forms, Reactive Forms',
      skill_4: 'Performance, WCAG 2.1, i18n/L10n, Agile/Scrum',
      portfolio_title: 'Portfolio', filter_all: 'Alle', filter_web_design: 'Webdesign', filter_app: 'Anwendungen', filter_web_dev: 'Webentwicklung', select_category: 'Kategorie auswahlen',
      projects_title: 'Wichtige Projekte',
      project_1_title: 'ATITHI - CBIC (Regierung von Indien)',
      project_1_text: 'Entwicklung sicherer dynamischer Formulare und komplexer Validierungen fur Zoll-Workflows mit responsiver UI und API-Integrationen.',
      project_2_title: 'Digital Passport System (DPS) - Hitachi Energy',
      project_2_text: 'Erstellung wiederverwendbarer Angular Komponenten, Implementierung von NgRx State Management und Aktivierung von Mehrsprachigkeit und RTL fur globale Nutzung.',
      contact_title: 'Kontakt', contact_form: 'Kontaktformular', send_message: 'Nachricht senden',
      placeholder_name: 'Vollstandiger Name', placeholder_email: 'E-Mail-Adresse', placeholder_message: 'Ihre Nachricht'
    }
  };
  private readonly translationsStore = signal<Record<SupportedLanguage, Record<string, string>>>(this.clone(this.translations));

  readonly active = computed<SupportedLanguage>(() => {
    const selected = this.selected();
    return selected === 'auto' ? this.detectFromBrowser() : selected;
  });

  init(): void {
    const stored = localStorage.getItem(this.key);
    if (stored === 'auto' || stored === 'en' || stored === 'hi' || stored === 'es' || stored === 'fr' || stored === 'de') {
      this.selected.set(stored);
    }
    const storedVersion = localStorage.getItem(this.translationsVersionKey);
    if (storedVersion !== this.translationsVersion) {
      localStorage.removeItem(this.translationsKey);
      localStorage.setItem(this.translationsVersionKey, this.translationsVersion);
    }

    const storedTranslations = localStorage.getItem(this.translationsKey);
    if (storedTranslations) {
      try {
        const parsed = JSON.parse(storedTranslations) as Record<SupportedLanguage, Record<string, string>>;
        this.translationsStore.set({
          en: { ...this.translations.en, ...(parsed.en ?? {}) },
          hi: { ...this.translations.hi, ...(parsed.hi ?? {}) },
          es: { ...this.translations.es, ...(parsed.es ?? {}) },
          fr: { ...this.translations.fr, ...(parsed.fr ?? {}) },
          de: { ...this.translations.de, ...(parsed.de ?? {}) }
        });
      } catch {
        this.translationsStore.set(this.clone(this.translations));
      }
    }
    document.documentElement.lang = this.active();
  }

  setLanguage(value: LanguageCode): void {
    this.selected.set(value);
    localStorage.setItem(this.key, value);
    document.documentElement.lang = this.active();
  }

  t(key: string): string {
    const store = this.translationsStore();
    const fallback = store.en[key] ?? key;
    return store[this.active()][key] ?? fallback;
  }

  getLanguageMap(lang: SupportedLanguage): Record<string, string> {
    return { ...this.translationsStore()[lang] };
  }

  setLanguageMap(lang: SupportedLanguage, map: Record<string, string>): void {
    const current = this.translationsStore();
    this.translationsStore.set({
      ...current,
      [lang]: { ...current[lang], ...map }
    });
    this.persistTranslations();
  }

  resetTranslations(): void {
    this.translationsStore.set(this.clone(this.translations));
    localStorage.removeItem(this.translationsKey);
  }

  private detectFromBrowser(): SupportedLanguage {
    const locale = (navigator.language || 'en-US').toLowerCase();
    const lang = locale.split('-')[0];
    const region = locale.split('-')[1]?.toUpperCase();

    if (lang === 'hi' || region === 'IN') return 'hi';
    if (lang === 'es' || region === 'ES') return 'es';
    if (lang === 'fr' || region === 'FR') return 'fr';
    if (lang === 'de' || region === 'DE') return 'de';

    return 'en';
  }

  private persistTranslations(): void {
    localStorage.setItem(this.translationsKey, JSON.stringify(this.translationsStore()));
  }

  private clone(value: Record<SupportedLanguage, Record<string, string>>): Record<SupportedLanguage, Record<string, string>> {
    return JSON.parse(JSON.stringify(value)) as Record<SupportedLanguage, Record<string, string>>;
  }
}
