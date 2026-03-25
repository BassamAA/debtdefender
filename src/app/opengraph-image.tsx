import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DebtDispute — Stop Debt Collectors in Their Tracks';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #060f20 0%, #102b52 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Orange left bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: 630, background: '#f97316', display: 'flex' }} />

        {/* Large faint shield decoration — right side */}
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: 80,
            width: 300,
            height: 370,
            border: '3px solid #f97316',
            borderRadius: '50% 50% 50% 50% / 10% 10% 40% 40%',
            opacity: 0.15,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: 80,
            width: 300,
            height: 370,
            border: '3px solid #f97316',
            borderRadius: '50% 50% 50% 50% / 10% 10% 40% 40%',
            opacity: 0.08,
            transform: 'scale(1.15)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '80px 100px', flex: 1 }}>
          {/* Brand name */}
          <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>
            DebtDispute
          </div>

          {/* Orange underline */}
          <div style={{ width: 520, height: 5, background: '#f97316', borderRadius: 3, marginTop: 16, display: 'flex' }} />

          {/* Subheadline */}
          <div style={{ display: 'flex', fontSize: 36, color: '#94a3b8', marginTop: 28, fontWeight: 400 }}>
            Stop Debt Collectors in Their Tracks
          </div>

          {/* Pills row */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: 20, marginTop: 48 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 24px', borderRadius: 24,
              background: '#163869', border: '1.5px solid #f97316',
              color: '#f97316', fontSize: 17, fontWeight: 600,
            }}>
              ✓ SOL Checker — Free
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 24px', borderRadius: 24,
              background: '#163869', border: '1.5px solid #4682b4',
              color: '#7bafd4', fontSize: 17, fontWeight: 600,
            }}>
              ✓ FDCPA Letter Generator
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 24px', borderRadius: 24,
              background: '#163869', border: '1.5px solid #22c55e',
              color: '#4ade80', fontSize: 17, fontWeight: 600,
            }}>
              ✓ Know Your Rights
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          paddingBottom: 40,
          fontSize: 22, color: '#475569',
        }}>
          US &amp; Canada · FDCPA · Provincial Law · Instant PDF Letters
        </div>
      </div>
    ),
    { ...size }
  );
}
