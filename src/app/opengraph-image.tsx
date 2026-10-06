// Link-preview image (WhatsApp, LinkedIn, iMessage…) generated at build time.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Bruno Vieira · WB Digital Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const pub = join(process.cwd(), 'public');
  const [photo, logo] = await Promise.all([
    readFile(join(pub, 'bruno.jpg'), 'base64'),
    readFile(join(pub, 'logo.svg'), 'base64'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          gap: 64,
          color: '#f5f5f5',
          background: 'linear-gradient(135deg, #0e0e0e 0%, #1a0226 45%, #350545 75%, #792990 100%)',
        }}
      >
        {/* Photo inside a purple → yellow ring, echoing the card's animated arc */}
        <div
          style={{
            display: 'flex',
            width: 360,
            height: 360,
            borderRadius: 9999,
            padding: 10,
            background: 'linear-gradient(135deg, #792990 0%, #c45fd9 50%, #ffb947 100%)',
            flexShrink: 0,
          }}
        >
          <img
            src={`data:image/jpeg;base64,${photo}`}
            alt=""
            width={340}
            height={340}
            style={{ borderRadius: 9999, border: '8px solid #0e0e0e', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>Bruno Vieira</div>
          <div style={{ fontSize: 34, color: '#ffb947', marginTop: 8 }}>Fundador · WB Digital Solutions</div>
          <div style={{ fontSize: 28, color: '#bbbbbb', marginTop: 28, lineHeight: 1.35, maxWidth: 620 }}>
            Sites, plataformas, sistemas, aplicativos, e-commerces, automações e IA sob medida.
          </div>
          <div style={{ display: 'flex', marginTop: 40 }}>
            <img
              src={`data:image/svg+xml;base64,${logo}`}
              alt=""
              width={216}
              height={61}
              style={{ borderRadius: 12 }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
