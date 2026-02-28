import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B5D5E 0%, #E59595 100%)',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div
          style={{
            width: 1040,
            height: 470,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 64,
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 48,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, color: '#0B5D5E', lineHeight: 1.1 }}>
            Luravie
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: '#0B5D5E', opacity: 0.8, marginTop: 18 }}>
            Women&apos;s Everyday Essentials
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: '#E59595', marginTop: 28 }}>
            Bras &bull; Lingerie &bull; Panties &bull; Socks
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#666', marginTop: 16 }}>
            Free Shipping &bull; Cash on Delivery &bull; Discreet Packaging
          </div>
        </div>
      </div>
    ),
    size
  );
}

