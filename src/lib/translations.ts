export type Locale = 'pt' | 'en' | 'es' | 'it';

export type TranslationDict = {
  welcomeHeadline: string;
  welcomeBody: string;
  welcomeCta: string;
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
    welcomeHeadline: 'Bom ter você aqui.',
    welcomeBody:
      'Aqui você encontra tudo para me chamar, explorar o que faço e decidir como posso ajudar — seja em estratégia comercial e marketing pela Salto ou em tecnologia pela WB Digital Solutions.',
    welcomeCta: 'Salve meu contato e me chame pelo app que você já usa. 👇',
    role: 'Fundador · Salto & WB Digital Solutions',
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
    welcomeHeadline: 'Good to have you here.',
    welcomeBody:
      "Here you'll find everything to reach me, explore what I do and decide how I can help — whether in sales & marketing strategy through Salto or in technology through WB Digital Solutions.",
    welcomeCta: 'Save my contact and reach me through the app you already use. 👇',
    role: 'Founder · Salto & WB Digital Solutions',
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
    welcomeHeadline: 'Qué bueno tenerte aquí.',
    welcomeBody:
      'Aquí encuentras todo para contactarme, explorar lo que hago y decidir cómo puedo ayudarte — ya sea en estrategia comercial y marketing a través de Salto o en tecnología a través de WB Digital Solutions.',
    welcomeCta: 'Guarda mi contacto y escríbeme por el app que ya usas. 👇',
    role: 'Fundador · Salto & WB Digital Solutions',
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
    welcomeHeadline: 'Che piacere averti qui.',
    welcomeBody:
      'Qui trovi tutto per contattarmi, esplorare ciò che faccio e capire come posso aiutarti — sia in strategia commerciale e marketing con Salto che in tecnologia con WB Digital Solutions.',
    welcomeCta: "Salva il mio contatto e scrivimi tramite l'app che già usi. 👇",
    role: 'Fondatore · Salto & WB Digital Solutions',
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
