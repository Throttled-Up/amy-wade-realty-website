/**
 * Testimonials — Local Authority skin
 *
 * Featured first testimonial as a large editorial pull quote in Instrument Serif.
 * Remaining testimonials as a compact card grid.
 * Warm cream background.
 */
export default function Testimonials({ config }) {
  const { testimonials = [] } = config;
  if (testimonials.length === 0) return null;

  const [featured, ...rest] = testimonials;

  return (
    <section
      style={{
        background: 'var(--color-surface)',
        borderTop:  '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth:     'var(--max-width-content)',
          marginInline: 'auto',
          padding:      '80px 24px',
        }}
      >
        {/* Review count — factual, not a label */}
        {config.stats?.review_count && (
          <p
            style={{
              fontSize:     '0.9375rem',
              color:        'var(--color-text-muted)',
              marginBottom: 40,
              fontWeight:   400,
            }}
          >
            {Number(config.stats.review_count).toLocaleString()} verified reviews on Google
            {config.stats.avg_rating && (
              <span style={{ color: '#f59e0b', marginLeft: 8, fontWeight: 600 }}>
                ★ {Number(config.stats.avg_rating).toFixed(1)}
              </span>
            )}
          </p>
        )}

        {/* Featured pull quote */}
        <div
          style={{
            maxWidth:    760,
            marginBottom: rest.length > 0 ? 72 : 0,
          }}
        >
          {/* Giant quotation mark */}
          <div
            style={{
              fontFamily:   'var(--font-display)',
              fontSize:     '6rem',
              lineHeight:   0.7,
              color:        'var(--color-primary)',
              opacity:      0.4,
              marginBottom: 8,
              userSelect:   'none',
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Quote text — Instrument Serif italic */}
          <blockquote
            style={{
              fontFamily:   'var(--font-display)',
              fontStyle:    'italic',
              fontWeight:   400,
              fontSize:     'clamp(1.375rem, 3vw, 2rem)',
              lineHeight:   1.45,
              color:        'var(--color-text-heading)',
              margin:       0,
              marginBottom: 28,
            }}
          >
            {featured.quote}
          </blockquote>

          {/* Attribution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <StarRow rating={featured.rating ?? 5} />
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>
              {featured.name}
            </span>
            {featured.city && (
              <>
                <span style={{ color: 'var(--color-border-dark)' }}>·</span>
                <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
                  {featured.city}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Secondary reviews grid */}
        {rest.length > 0 && (
          <div className="testimonials-grid">
            {rest.slice(0, 3).map((t, i) => (
              <ReviewCard key={i} t={t} />
            ))}
          </div>
        )}

        {/* Google CTA */}
        {config.social?.google && (
          <div style={{ marginTop: 40 }}>
            <a
              href={config.social.google}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           8,
                fontSize:      '0.9375rem',
                fontWeight:    600,
                color:         'var(--color-text-heading)',
                borderBottom:  '1.5px solid var(--color-border-dark)',
                paddingBottom: 2,
                textDecoration: 'none',
              }}
            >
              Read all reviews on Google
              <ArrowRight />
            </a>
          </div>
        )}
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          border-top: 1px solid var(--color-border);
          padding-top: 48px;
        }
        @media (min-width: 640px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ t }) {
  return (
    <div
      style={{
        background:   'var(--color-surface-2)',
        border:       '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding:      '24px',
      }}
    >
      <StarRow rating={t.rating ?? 5} />
      <p
        style={{
          fontSize:    '0.9375rem',
          color:       'var(--color-text-body)',
          lineHeight:  1.7,
          margin:      '14px 0',
          fontStyle:   'italic',
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>
        {t.name}
        {t.city && (
          <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: 6 }}>
            · {t.city}
          </span>
        )}
      </div>
    </div>
  );
}

function StarRow({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
