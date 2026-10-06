export type Locale = 'pt' | 'en' | 'es' | 'it';

export type TranslationDict = {
  welcomeHeadline: string;
  welcomeBody: string;
  welcomeCta: string;
  role: string;
  saveContact: string;
  shareButton: string;
  shareWhatsapp: string;
  shareText: string;
  shareCopied: string;
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
      'Aqui você encontra tudo para me chamar, explorar o que faço e decidir como posso ajudar.\n\nColoco a tecnologia para trabalhar pelo seu negócio: sites, plataformas, sistemas, aplicativos, e-commerces, automações e IA sob medida.',
    welcomeCta: 'Salve meu contato e me chame pelo app que você já usa. 👇',
    role: 'Fundador · WB Digital Solutions',
    saveContact: 'Salvar Contato',
    shareButton: 'Mais Opções',
    shareWhatsapp: 'Compartilhar no WhatsApp',
    shareText: 'Dá uma olhada no cartão digital do Bruno Vieira, da WB Digital Solutions:',
    shareCopied: 'Link copiado!',
    exchangeButton: 'Enviar meus dados para o Bruno',
    exchangeTitle: 'Envie seus dados para mim',
    exchangeSubtitle: 'Preencha e envie: seus dados chegam direto para mim e eu salvo o seu contato no meu celular. O meu contato você guarda no botão “Salvar Contato” acima.',
    exchangeName: 'Nome',
    exchangePhone: 'Telefone / WhatsApp',
    exchangeEmail: 'E-mail',
    exchangeCompany: 'Empresa (opcional)',
    exchangeNote: 'Mensagem (opcional)',
    exchangeSubmit: 'Enviar meus dados para o Bruno',
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
      "Here you'll find everything to reach me, explore what I do and decide how I can help.\n\nI put technology to work for your business: custom websites, platforms, systems, apps, e-commerce, automations and AI.",
    welcomeCta: 'Save my contact and reach me through the app you already use. 👇',
    role: 'Founder · WB Digital Solutions',
    saveContact: 'Save Contact',
    shareButton: 'More Options',
    shareWhatsapp: 'Share via WhatsApp',
    shareText: "Check out Bruno Vieira's digital card, from WB Digital Solutions:",
    shareCopied: 'Link copied!',
    exchangeButton: 'Send my details to Bruno',
    exchangeTitle: 'Send me your details',
    exchangeSubtitle: "Fill in and send: your details come straight to me and I'll save your contact on my phone. Grab mine with the “Save Contact” button above.",
    exchangeName: 'Name',
    exchangePhone: 'Phone / WhatsApp',
    exchangeEmail: 'Email',
    exchangeCompany: 'Company (optional)',
    exchangeNote: 'Message (optional)',
    exchangeSubmit: 'Send my details to Bruno',
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
      'Aquí encuentras todo para contactarme, explorar lo que hago y decidir cómo puedo ayudarte.\n\nPongo la tecnología a trabajar para tu negocio: sitios, plataformas, sistemas, aplicaciones, e-commerce, automatizaciones e IA a medida.',
    welcomeCta: 'Guarda mi contacto y escríbeme por el app que ya usas. 👇',
    role: 'Fundador · WB Digital Solutions',
    saveContact: 'Guardar Contacto',
    shareButton: 'Más Opciones',
    shareWhatsapp: 'Compartir por WhatsApp',
    shareText: 'Échale un vistazo a la tarjeta digital de Bruno Vieira, de WB Digital Solutions:',
    shareCopied: '¡Enlace copiado!',
    exchangeButton: 'Enviar mis datos a Bruno',
    exchangeTitle: 'Envíame tus datos',
    exchangeSubtitle: 'Rellena y envía: tus datos me llegan directo y guardo tu contacto en mi móvil. El mío lo guardas con el botón “Guardar Contacto” de arriba.',
    exchangeName: 'Nombre',
    exchangePhone: 'Teléfono / WhatsApp',
    exchangeEmail: 'Correo electrónico',
    exchangeCompany: 'Empresa (opcional)',
    exchangeNote: 'Mensaje (opcional)',
    exchangeSubmit: 'Enviar mis datos a Bruno',
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
      'Qui trovi tutto per contattarmi, esplorare ciò che faccio e capire come posso aiutarti.\n\nMetto la tecnologia al servizio del tuo business: siti, piattaforme, sistemi, app, e-commerce, automazioni e IA su misura.',
    welcomeCta: "Salva il mio contatto e scrivimi tramite l'app che già usi. 👇",
    role: 'Fondatore · WB Digital Solutions',
    saveContact: 'Salva Contatto',
    shareButton: 'Altre Opzioni',
    shareWhatsapp: 'Condividi su WhatsApp',
    shareText: 'Dai un’occhiata al biglietto digitale di Bruno Vieira, di WB Digital Solutions:',
    shareCopied: 'Link copiato!',
    exchangeButton: 'Invia i miei dati a Bruno',
    exchangeTitle: 'Inviami i tuoi dati',
    exchangeSubtitle: 'Compila e invia: i tuoi dati arrivano dritti a me e salvo il tuo contatto sul mio telefono. Il mio lo salvi con il pulsante “Salva Contatto” qui sopra.',
    exchangeName: 'Nome',
    exchangePhone: 'Telefono / WhatsApp',
    exchangeEmail: 'Email',
    exchangeCompany: 'Azienda (opzionale)',
    exchangeNote: 'Messaggio (opzionale)',
    exchangeSubmit: 'Invia i miei dati a Bruno',
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
