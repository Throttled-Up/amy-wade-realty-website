/**
 * WhyChooseUs — Local Authority skin
 *
 * Numbered editorial list (01/02/03), no icon circles.
 * Left column: Instrument Serif headline + intro text.
 * Right column: numbered differentiators with horizontal rule dividers.
 * Cream surface background.
 */
export default function WhyChooseUs({ config }) {
  const items = config.differentiators ?? [];
  if (items.length === 0) return null;

  const ownerIntro = config.owner_name
    ? `${config.owner_name} and the team at ${config.business_name} built this business on one promise: do the job right, every time.`
    : `${config.business_name} was built on one promise: do the job right, every time.`;

  return (
    <section
      style={{
        background: 'var(--color-surface-2)',
      }}
    >
      <div
        style={{
          maxWidth:     'var(--max-width-content)',
          marginInline: 'auto',
          padding:      '80px 24px',
        }}
      >
        <div className="why-grid">
          {/* Left: headline column */}
          <div className="why-headline-col">
            <h2
              style={{
                fontFamily:   'var(--font-display)',
                fontWeight:   400,
                fontSize:     'clamp(2rem, 4vw, 3rem)',
                color:        'var(--color-text-heading)',
                lineHeight:   1.1,
                marginBottom: 24,
                maxWidth:     '16ch',
              }}
            >
              The {config.city ?? ''} area's most trusted choice.
            </h2>
            <p
              style={{
                fontSize:   '1rem',
                color:      'var(--color-text-body)',
                lineHeight: 1.75,
                maxWidth:   420,
              }}
            >
              {ownerIntro}
            </p>
          </div>

          {/* Right: numbered list */}
          <div>
            {items.map((item, i) => {
              const num = String(i + 1).padStart(2, '0');
              return (
                <div
                  key={i}
                  style={{
                    borderTop:    '1px solid var(--color-border)',
                    padding:      '28px 0',
                  }}
                >
                  <div
                    style={{
                      display:       'flex',
                      alignItems:    'baseline',
                      gap:           16,
                      marginBottom:  10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      '1.125rem',
                        color:         'var(--color-primary)',
                        opacity:       0.7,
                        flexShrink:    0,
                        lineHeight:    1,
                      }}
                    >
                      {num}
                    </span>
                    <h3
                      style={{
                        fontSize:   '1.0625rem',
                        fontWeight: 600,
                        color:      'var(--color-text-heading)',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize:   '0.9375rem',
                      color:      'var(--color-text-body)',
                      lineHeight: 1.7,
                      paddingLeft: 40,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
            {/* Bottom rule */}
            <div style={{ borderTop: '1px solid var(--color-border)' }} />
          </div>
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 768px) {
          .why-grid {
            grid-template-columns: 2fr 3fr;
            gap: 80px;
            align-items: start;
          }
          .why-headline-col {
            position: sticky;
            top: 32px;
          }
        }
      `}</style>
    </section>
  );
}
