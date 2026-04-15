/**
 * Process — Local Authority skin
 *
 * Oversized editorial step numbers in Instrument Serif. Clean left-aligned layout.
 * Cream surface background — NOT a dark band.
 * Steps as horizontal blocks on desktop, vertical stack on mobile.
 */
export default function Process({ config }) {
  const { process_steps = [] } = config;
  if (process_steps.length === 0) return null;

  return (
    <section
      style={{
        background:   'var(--color-surface)',
        borderTop:    '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth:     'var(--max-width-content)',
          marginInline: 'auto',
          padding:      '80px 24px',
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontSize:      'clamp(2rem, 4vw, 3rem)',
              color:         'var(--color-text-heading)',
              lineHeight:    1.1,
              maxWidth:      '18ch',
            }}
          >
            From first call to finished job.
          </h2>
        </div>

        {/* Steps */}
        <div className="process-steps">
          {process_steps.map((step, i) => {
            const num = String((step.step ?? i + 1)).padStart(2, '0');
            return (
              <div
                key={i}
                className="process-step-item"
                style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 32,
                }}
              >
                {/* Oversized editorial step number */}
                <div
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontWeight:    400,
                    fontSize:      'clamp(3rem, 5vw, 4.5rem)',
                    lineHeight:    1,
                    color:         'var(--color-primary)',
                    opacity:       0.35,
                    marginBottom:  20,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {num}
                </div>

                <h3
                  style={{
                    fontSize:     '1.125rem',
                    fontWeight:   700,
                    color:        'var(--color-text-heading)',
                    marginBottom: 12,
                    lineHeight:   1.3,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize:   '0.9375rem',
                    color:      'var(--color-text-body)',
                    lineHeight: 1.7,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 640px) {
          .process-steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px;
          }
        }
        @media (min-width: 1024px) {
          .process-steps {
            grid-template-columns: repeat(${process_steps.length >= 4 ? 4 : process_steps.length}, 1fr);
            gap: 0 48px;
          }
        }
      `}</style>
    </section>
  );
}
