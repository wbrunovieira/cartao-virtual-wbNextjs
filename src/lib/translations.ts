export type Locale = 'pt' | 'en' | 'es' | 'it';

export type TranslationDict = {
  welcomeHeadline: string;
  welcomeBody: string;
  welcomeCta: string;
  role: string;
  saveContact: string;
  exchangeButton: string;
  exchangeTitle: string;
  exchangeSubtitle: string;
  exchangeName: string;
  exchangePhone: string;
  exchangeEmail: string;
  exchangeCompany: string;
  exchangeNote: string;
  exchangeSubmit: string;
  exchangeSending: string;
  exchangeSuccessTitle: string;
  exchangeSuccess: string;
  exchangeError: string;
  exchangeRequired: string;
  exchangeInvalidEmail: string;
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
      'Aqui você encontra tudo para me chamar, explorar o que faço e decidir como posso ajudar.\n\nEm tecnologia, pela WB Digital Solutions: sites, plataformas, sistemas, aplicativos, e-commerces, automações e IA.\n\nE também em estratégia comercial e marketing, pela Salto.',
    welcomeCta: 'Salve meu contato e me chame pelo app que você já usa. 👇',
    role: 'Fundador · Salto & WB Digital Solutions',
    saveContact: 'Salvar Contato',
    exchangeButton: 'Compartilhar meu contato',
    exchangeTitle: 'Compartilhe seu contato',
    exchangeSubtitle: 'Deixe seus dados e eu salvo seu contato no celular. O meu você guarda no botão “Salvar Contato” acima.',
    exchangeName: 'Nome',
    exchangePhone: 'Telefone / WhatsApp',
    exchangeEmail: 'E-mail',
    exchangeCompany: 'Empresa (opcional)',
    exchangeNote: 'Mensagem (opcional)',
    exchangeSubmit: 'Enviar contato',
    exchangeSending: 'Enviando…',
    exchangeSuccessTitle: 'Contato recebido!',
    exchangeSuccess: 'Obrigado por enviar seus dados! 🙌 Em breve entro em contato.',
    exchangeError: 'Algo deu errado. Tente novamente.',
    exchangeRequired: 'Preencha nome e telefone ou e-mail.',
    exchangeInvalidEmail: 'Digite um e-mail válido.',
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
      "Here you'll find everything to reach me, explore what I do and decide how I can help.\n\nIn technology, through WB Digital Solutions: websites, platforms, systems, apps, e-commerce, automations and AI.\n\nAnd also in sales & marketing strategy, through Salto.",
    welcomeCta: 'Save my contact and reach me through the app you already use. 👇',
    role: 'Founder · Salto & WB Digital Solutions',
    saveContact: 'Save Contact',
    exchangeButton: 'Share my contact',
    exchangeTitle: 'Share your contact',
    exchangeSubtitle: "Leave your details and I'll save your contact on my phone. Grab mine with the “Save Contact” button above.",
    exchangeName: 'Name',
    exchangePhone: 'Phone / WhatsApp',
    exchangeEmail: 'Email',
    exchangeCompany: 'Company (optional)',
    exchangeNote: 'Message (optional)',
    exchangeSubmit: 'Send contact',
    exchangeSending: 'Sending…',
    exchangeSuccessTitle: 'Contact received!',
    exchangeSuccess: "Thanks for sending your details! 🙌 I'll be in touch soon.",
    exchangeError: 'Something went wrong. Please try again.',
    exchangeRequired: 'Please fill in your name and phone or email.',
    exchangeInvalidEmail: 'Please enter a valid email.',
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
      'Aquí encuentras todo para contactarme, explorar lo que hago y decidir cómo puedo ayudarte.\n\nEn tecnología, a través de WB Digital Solutions: sitios, plataformas, sistemas, aplicaciones, e-commerce, automatizaciones e IA.\n\nY también en estrategia comercial y marketing, a través de Salto.',
    welcomeCta: 'Guarda mi contacto y escríbeme por el app que ya usas. 👇',
    role: 'Fundador · Salto & WB Digital Solutions',
    saveContact: 'Guardar Contacto',
    exchangeButton: 'Compartir mi contacto',
    exchangeTitle: 'Comparte tu contacto',
    exchangeSubtitle: 'Deja tus datos y guardo tu contacto en el móvil. El mío lo guardas con el botón “Guardar Contacto” de arriba.',
    exchangeName: 'Nombre',
    exchangePhone: 'Teléfono / WhatsApp',
    exchangeEmail: 'Correo electrónico',
    exchangeCompany: 'Empresa (opcional)',
    exchangeNote: 'Mensaje (opcional)',
    exchangeSubmit: 'Enviar contacto',
    exchangeSending: 'Enviando…',
    exchangeSuccessTitle: '¡Contacto recibido!',
    exchangeSuccess: '¡Gracias por enviar tus datos! 🙌 Pronto me pongo en contacto.',
    exchangeError: 'Algo salió mal. Inténtalo de nuevo.',
    exchangeRequired: 'Completa tu nombre y teléfono o correo.',
    exchangeInvalidEmail: 'Introduce un correo válido.',
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
      'Qui trovi tutto per contattarmi, esplorare ciò che faccio e capire come posso aiutarti.\n\nNella tecnologia, con WB Digital Solutions: siti, piattaforme, sistemi, app, e-commerce, automazioni e IA.\n\nE anche nella strategia commerciale e marketing, con Salto.',
    welcomeCta: "Salva il mio contatto e scrivimi tramite l'app che già usi. 👇",
    role: 'Fondatore · Salto & WB Digital Solutions',
    saveContact: 'Salva Contatto',
    exchangeButton: 'Condividi il mio contatto',
    exchangeTitle: 'Condividi il tuo contatto',
    exchangeSubtitle: 'Lascia i tuoi dati e salvo il tuo contatto sul telefono. Il mio lo salvi con il pulsante “Salva Contatto” qui sopra.',
    exchangeName: 'Nome',
    exchangePhone: 'Telefono / WhatsApp',
    exchangeEmail: 'Email',
    exchangeCompany: 'Azienda (opzionale)',
    exchangeNote: 'Messaggio (opzionale)',
    exchangeSubmit: 'Invia contatto',
    exchangeSending: 'Invio…',
    exchangeSuccessTitle: 'Contatto ricevuto!',
    exchangeSuccess: 'Grazie per aver inviato i tuoi dati! 🙌 Ti contatterò presto.',
    exchangeError: 'Qualcosa è andato storto. Riprova.',
    exchangeRequired: 'Inserisci nome e telefono o email.',
    exchangeInvalidEmail: 'Inserisci un’email valida.',
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
