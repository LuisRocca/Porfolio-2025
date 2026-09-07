import { ImageResponse } from 'next/og'

export const alt = 'Luis Miguel Alfonzo Roca — Senior Full Stack Engineer & Tech Lead'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          // Mismo halo violeta arriba a la derecha que el hero, para que la
          // vista previa al compartir y el sitio se lean como lo mismo.
          backgroundImage:
            'radial-gradient(60% 55% at 84% 6%, rgba(124, 102, 164, 0.42), transparent 62%)',
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 22,
            color: '#B49BF0',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#B49BF0',
            }}
          />
          Disponible para proyectos
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 600,
              color: '#FAFAFA',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            Luis Miguel Alfonzo Roca
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 38,
              color: '#A1A1AA',
              letterSpacing: '-0.02em',
            }}
          >
            Senior Full Stack Engineer &amp; Tech Lead
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #242424',
            paddingTop: 32,
            fontSize: 24,
            color: '#71717A',
          }}
        >
          <div style={{ display: 'flex' }}>
            Node.js · NestJS · React · Next.js · Angular · PostgreSQL
          </div>
          <div style={{ display: 'flex', color: '#A1A1AA' }}>Bogotá, Colombia</div>
        </div>
      </div>
    ),
    size,
  )
}
