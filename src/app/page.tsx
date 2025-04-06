'use client';
// src/app/page.tsx
import {
  FaWhatsapp,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';

export default function Home() {
  const cardData = {
    logo: '/logo.svg',
    name: 'Bruno Vieira',
    email: 'bruno@wbdigitalsolutions.com',
    tagline: 'WB Digital Solutions',
    website: 'https://wbdigitalsolutions.com',
    facebook: 'https://facebook.com/wb.digitalsolutions',
    instagram: 'https://instagram.com/wb.digitalsolutions',
    telefone: '+55 11 5026-4203',
    whatsapp: 'https://wa.me/5511982864581',

    vcardUrl:
      'https://wbdigitalsolutions.com/contato/bruno.vcf',
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-custom-purple p-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <img
              src={cardData.logo}
              alt="Logo WB Digital Solutions"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {cardData.name}
              </h1>
              <p className="text-sm text-gray-600">
                {cardData.tagline}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700">
              Acesse nossos serviços e entre em contato:
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={cardData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline"
              >
                <FaGlobe /> Site
              </a>
              <a
                href={cardData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href={cardData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-500 hover:underline"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href={cardData.email}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 hover:underline"
              >
                <FaEnvelope /> Email
              </a>
              <a
                href={cardData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:underline"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <a
                href={`tel:${cardData.telefone}`}
                className="flex items-center gap-2 text-gray-800 hover:underline"
              >
                <FaPhoneAlt /> {cardData.telefone}
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <a
              href={cardData.vcardUrl}
              download="bruno.vcf"
              className="mb-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Salvar Contato
            </a>

            <p className="text-gray-500 text-sm mb-2">
              Compartilhe via NFC/QR Code
            </p>
            <QRCodeCanvas
              value={cardData.website}
              size={128}
              bgColor="#ffffff"
              fgColor="#350545"
            />
          </div>

          <div className="mt-6 p-4 bg-gray-50 text-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              Serviços
            </h2>
            <ul className="list-disc list-inside">
              <li>
                Desenvolvimento de sites e e-commerces
              </li>
              <li>Automação de marketing digital</li>
              <li>Integração com IA e Data Science</li>
              <li>Suporte e manutenção de sistemas</li>
              <li>Consultoria tecnológica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
