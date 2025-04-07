'use client';
// src/app/page.tsx
import {
  FaWhatsapp,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaUserCircle,
} from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';

export default function Home() {
  const cardData = {
    logo: '/logo.svg',
    name: 'Bruno Vieira',
    email: 'bruno@wbdigitalsolutions.com',
    website: 'https://cartao-virtual-wb.vercel.app/',
    facebook: 'https://facebook.com/wb.digitalsolutions',
    instagram: 'https://instagram.com/wb.digitalsolutions',
    telefone: '(11) 5026-4203',
    whatsapp: 'https://wa.me/5511982864581',
    linkedin: 'https://linkedin.com/in/brunovieira',
    github: 'https://github.com/wbrunovieira',
    vcardUrl: 'bruno.vcf',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-custom-purple p-4">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none border-2 border-white rounded-xl"></div>
        <div className="bg-primary shadow-lg rounded-xl overflow-hidden max-w-md w-full">
          <div className="p-6">
            <div className="bg-white flex flex-col items-center gap-2 rounded-2xl">
              <Image
                src={cardData.logo}
                alt="Logo WB Digital Solutions"
                width={200}
                height={100}
                className="pt-2 rounded-full"
              />
              {/* Linha divisória moderna */}
              <div className="flex-grow w-1/2 h-0.5 rounded-3xl bg-gradient-to-r from-primary via-primary to-transparent" />
              <div className="flex  gap-2 flex-col items-center justify-center mt-4">
                <div className="flex gap-2 items-center justify-center mt-2">
                  <FaUserCircle className="text-primary text-3xl transform -translate-y-2" />
                  <h1 className="text-2xl font-bold text-primary pb-4">
                    {cardData.name}
                  </h1>
                </div>
                <div className="flex flex-col items-center mb-2 gap-1">
                  <a
                    href={cardData.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 hover:underline -mt-4"
                  >
                    <FaWhatsapp />
                    <span className="text-primary">
                      <span className="font-semibold">
                        {' '}
                        WhatsApp:{' '}
                      </span>
                      (11) 98286-4581
                    </span>
                  </a>
                  <a
                    href={`mailto:${cardData.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline mb-4"
                  >
                    <FaEnvelope />{' '}
                    <span className="font-semibold">
                      Email:{' '}
                    </span>
                    {cardData.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-2xl px-4 py-4">
              <div className="flex-grow w-1/2 h-0.5 rounded-3xl bg-gradient-to-r from-primary via-primary to-transparent my-2" />
              <div className="flex flex-col gap-2 mt-2">
                <a
                  href={cardData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellowcustom hover:underline"
                >
                  <FaGlobe />
                  <p className="text-primary">
                    <span className="font-bold">Site:</span>{' '}
                    {cardData.website}
                  </p>
                </a>
                <a
                  href={cardData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaFacebook /> Facebook:{' '}
                  <span className="text-primary">
                    @wb.digitalsolutions
                  </span>
                </a>
                <a
                  href={cardData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-500 hover:underline"
                >
                  <FaInstagram /> Instagram:{' '}
                  <span className="text-primary">
                    @wb.digitalsolutions
                  </span>
                </a>

                <a
                  href={`tel:${cardData.telefone}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <FaPhoneAlt />{' '}
                  <span className="font-semibold">
                    Telefone:{' '}
                  </span>
                  {cardData.telefone}
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <a
                href={cardData.vcardUrl}
                download="bruno.vcf"
                className="mb-4 px-4 py-2 bg-custom-purple text-white rounded-md hover:bg-opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                Salvar Contato no celular
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
    </div>
  );
}
