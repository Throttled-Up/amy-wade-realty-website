import Link from 'next/link';

/**
 * ServiceAreas — Local Authority skin
 *
 * No pill badges. Cities listed as plain text links separated by slashes —
 * reads as geographic coverage, not a SaaS tag cloud.
 */
export default function ServiceAreas({ config }) {
  const { service_areas = [], city, state } = config;
  if (service_areas.length === 0) return null;

  return (
    <section
      style={{
        background:   'var(--color-footer-bg)',
        padding:      '48px 0',
      }}
    >
      <div
        style={{
          maxWidth:     'var(--max-width-content)',
          marginInline: 'auto',
          padding:      '0 24px',
        }}
      >
        <div className="areas-inner">
          {/* Label */}
          <span
            style={{
              fontSize:   '0.875rem',
              color:      'rgba(255,255,255,0.4)',
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            Serving {state}
          </span>

          {/* City links — plain text, slash-separated */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 0' }}>
            {service_areas.map((area, i) => {
              const slug  = area.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const isLast = i === service_areas.length - 1;

              return (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Link
                    href={`/locations/${slug}`}
                    style={{
                      fontSize:       '0.9375rem',
                      fontWeight:     area === city ? 600 : 400,
                      color:          area === city ? '#fff' : 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      padding:        '2px 0',
                      borderBottom:   area === city ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
                      transition:     'color 0.15s, border-color 0.15s',
                    }}
                    className="area-link"
                  >
                    {area}
                  </Link>
                  {!isLast && (
                    <span
                      style={{
                        color:   'rgba(255,255,255,0.2)',
                        margin:  '0 10px',
                        fontSize: '0.75rem',
                      }}
                    >
                      /
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .areas-inner {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .area-link:hover {
          color: #fff !important;
          border-bottom-color: rgba(255,255,255,0.4) !important;
        }
        @media (min-width: 640px) {
          .areas-inner {
            flex-direction: row;
            align-items: baseline;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
