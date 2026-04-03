export type Locale = 'pt' | 'en' | 'es' | 'it';

export type TranslationDict = {
  welcomeHeadline: string;
  welcomeBodyBefore: string;
  welcomeBodyHighlight: string;
  welcomeSaveHint: string;
  welcomeBodyAfter: string;
  role: string;
  saveContact: string;
  sectionContact: string;
  sectionSocial: string;
  sectionServices: string;
  sectionQr: string;
  labelPhone: string;
  labelSite: string;
  labelInstagramPersonal: string;
  services: [string, string, string, string];
};

export const translations: Record<Locale, TranslationDict> = {
  pt: {
    welcomeHeadline: 'Obrigado por estar aqui.',
    welcomeBodyBefore: 'Compartilhei esse link com você porque ',
    welcomeBodyHighlight: 'reconheço a sua importância',
    welcomeSaveHint: 'Clique em Salvar Contato para me adicionar na agenda do seu celular.',
    welcomeBodyAfter: 'Depois explore os links abaixo e me chame pelo app que você já usa.',
    role: 'Fundador',
    saveContact: 'Salvar Contato',
    sectionContact: 'Contato direto',
    sectionSocial: 'Redes & Web',
    sectionServices: 'Principais Serviços',
    sectionQr: 'Escaneie para visitar',
    labelPhone: 'Telefone',
    labelSite: 'Site',
    labelInstagramPersonal: 'Instagram Pessoal',
    services: ['Sites & E-commerces', 'Automações', 'IA & Data Science', 'Consultoria Tech'],
  },
  en: {
    welcomeHeadline: 'Thank you for being here.',
    welcomeBodyBefore: 'I shared this link with you because ',
    welcomeBodyHighlight: 'I recognize your importance',
    welcomeSaveHint: 'Tap Save Contact to add me to your phone contacts.',
    welcomeBodyAfter: 'Then explore the links below and reach me through the app you already use.',
    role: 'Founder',
    saveContact: 'Save Contact',
    sectionContact: 'Direct contact',
    sectionSocial: 'Social & Web',
    sectionServices: 'Main Services',
    sectionQr: 'Scan to visit',
    labelPhone: 'Phone',
    labelSite: 'Website',
    labelInstagramPersonal: 'Personal Instagram',
    services: ['Websites & E-commerce', 'Automations', 'AI & Data Science', 'Tech Consulting'],
  },
  es: {
    welcomeHeadline: 'Gracias por estar aquí.',
    welcomeBodyBefore: 'Compartí este enlace contigo porque ',
    welcomeBodyHighlight: 'reconozco tu importancia',
    welcomeSaveHint: 'Toca en Guardar Contacto para agregarme a la agenda de tu celular.',
    welcomeBodyAfter: 'Luego explora los enlaces y escríbeme por el app que ya usas.',
    role: 'Fundador',
    saveContact: 'Guardar Contacto',
    sectionContact: 'Contacto directo',
    sectionSocial: 'Redes & Web',
    sectionServices: 'Servicios Principales',
    sectionQr: 'Escanea para visitar',
    labelPhone: 'Teléfono',
    labelSite: 'Sitio Web',
    labelInstagramPersonal: 'Instagram Personal',
    services: ['Sitios & E-commerce', 'Automatizaciones', 'IA & Data Science', 'Consultoría Tech'],
  },
  it: {
    welcomeHeadline: 'Grazie per essere qui.',
    welcomeBodyBefore: 'Ho condiviso questo link con te perché ',
    welcomeBodyHighlight: 'riconosco la tua importanza',
    welcomeSaveHint: 'Tocca Salva Contatto per aggiungermi alla rubrica del tuo telefono.',
    welcomeBodyAfter: "Poi esplora i link qui sotto e scrivimi tramite l'app che già usi.",
    role: 'Fondatore',
    saveContact: 'Salva Contatto',
    sectionContact: 'Contatto diretto',
    sectionSocial: 'Social & Web',
    sectionServices: 'Servizi Principali',
    sectionQr: 'Scansiona per visitare',
    labelPhone: 'Telefono',
    labelSite: 'Sito Web',
    labelInstagramPersonal: 'Instagram Personale',
    services: ['Siti & E-commerce', 'Automazioni', 'IA & Data Science', 'Consulenza Tech'],
  },
};
