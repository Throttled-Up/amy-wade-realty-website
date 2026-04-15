import Image from 'next/image';

/**
 * Hero — Local Authority skin
 *
 * Split layout: editorial headline + CTAs left, outcome photo right.
 * Instrument Serif display headline.
 * Trust signals immediately visible — no scrolling.
 * Warm cream background — zero dark overlay.
 */
export default function Hero({ config, heroImage }) {
  const { business_name, phone, city, state } = config;

  const headline    = config.hero_headline  ?? config.tagline ?? business_name;
  const sub         = config.hero_subheadline ?? `Serving ${city}, ${state} and surrounding areas`;
  const rating      = config.stats?.avg_rating;
  const reviews     = config.stats?.review_count;
  const ctaText     = config.cta_secondary_text ?? 'Get a Free Estimate';

  const trustItems = [
    config.license               && 'Licensed & Insured',
    config.stats?.years_in_business && `${config.stats.years_in_business}+ Years`,
    config.emergency_available   && 'Emergency Service',
    config.guarantee_language    && config.guarantee_language,
  ].filter(Boolean);

  return (
    <section
      style={{
        background:   'var(--color-hero-bg)',
        borderBottom: '1px solid var(--color-border)',
        overflow:     'hidden',
      }}
    >
      <div
        style={{
          maxWidth:            'var(--max-width-content)',
          marginInline:        'auto',
          display:             'grid',
          gridTemplateColumns: '1fr',
          minHeight:           560,
        }}
        className="hero-grid"
      >
        {/* ── Left: text column ─────────────────────────────────────── */}
        <div
          className="hero-text-col"
          style={{
            display:       'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding:       '60px 24px 52px',
          }}
        >
          {/* City/state — plain text, no dot indicator */}
          <span
            style={{
              display:       'block',
              fontSize:      '0.875rem',
              fontWeight:    500,
              color:         'var(--color-text-muted)',
              marginBottom:  20,
              letterSpacing: '0.01em',
            }}
          >
            {city}, {state}
          </span>

          {/* Display headline — Instrument Serif */}
          <h1
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontSize:      'clamp(2.75rem, 6vw, 5rem)',
              lineHeight:    1.08,
              letterSpacing: '-0.01em',
              color:         'var(--color-text-heading)',
              marginBottom:  24,
              maxWidth:      '14ch',
            }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize:     'clamp(1rem, 1.8vw, 1.125rem)',
              color:        'var(--color-text-body)',
              lineHeight:   1.7,
              marginBottom: 32,
              maxWidth:     480,
            }}
          >
            {sub}
          </p>

          {/* Inline trust — stars + review count */}
          {(rating || reviews) && (
            <div
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          8,
                marginBottom: 28,
              }}
            >
              <StarRow rating={rating ?? 5} />
              <span
                style={{
                  fontSize:  '0.9375rem',
                  color:     'var(--color-text-muted)',
                  fontWeight: 400,
                }}
              >
                {rating && `${Number(rating).toFixed(1)} `}
                {reviews && `· ${Number(reviews).toLocaleString()} reviews`}
              </span>
            </div>
          )}

          {/* CTAs */}
          <div
            className="hero-cta-group"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}
          >
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="btn btn-primary btn-lg"
              >
                <PhoneIcon />
                Call {phone}
              </a>
            )}
            <a
              href="/contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            8,
                padding:        '14px 28px',
                fontSize:       '1rem',
                fontWeight:     600,
                color:          'var(--color-text-heading)',
                border:         '1.5px solid var(--color-border-dark)',
                borderRadius:   'var(--btn-radius)',
                textDecoration: 'none',
                background:     'transparent',
                transition:     'border-color 0.15s, background 0.15s',
              }}
            >
              {ctaText}
              <ArrowRight />
            </a>
          </div>

          {/* Trust signals — plain text, no icons */}
          {trustItems.length > 0 && (
            <div
              style={{
                paddingTop:  20,
                borderTop:   '1px solid var(--color-border)',
              }}
            >
              <p
                style={{
                  fontSize:   '0.875rem',
                  color:      'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                {trustItems.join(' · ')}
              </p>
            </div>
          )}
        </div>

        {/* ── Right: image column ───────────────────────────────────── */}
        <div
          className="hero-image-col"
          style={{
            position:   'relative',
            minHeight:  320,
            background: 'var(--color-surface-2)',
          }}
        >
          {heroImage?.url ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt ?? `${business_name} — ${city}, ${state}`}
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'repeating-linear-gradient(45deg, var(--color-surface-2) 0px, var(--color-surface-2) 10px, var(--color-surface-3) 10px, var(--color-surface-3) 20px)',
                display:    'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                Hero image
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Hero layout CSS ──────────────────────────────────────────── */}
      <style>{`
        .hero-grid {
          grid-template-columns: 1fr;
        }
        .hero-image-col {
          min-height: 300px;
        }
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 55% 45%;
            min-height: 600px;
          }
          .hero-text-col {
            padding: 72px 56px 64px 40px;
          }
          .hero-image-col {
            min-height: unset;
          }
        }
        @media (min-width: 1024px) {
          .hero-text-col {
            padding: 88px 64px 80px 40px;
          }
        }
      `}</style>
    </section>
  );
}

function StarRow({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
