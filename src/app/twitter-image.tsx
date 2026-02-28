import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B5D5E',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#FFFFFF' }}>Luravie</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#E59595' }}>
            Women&apos;s Everyday Essentials
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
            Bras &bull; Lingerie &bull; Panties &bull; Socks | Egypt
          </div>
        </div>
      </div>
    ),
    size
  );
}

