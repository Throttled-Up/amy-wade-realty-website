import Link from 'next/link';

/**
 * ServicesGrid — Local Authority skin
 *
 * Clean list-style layout. No card accent bars, no eyebrow labels.
 * Services listed as horizontal rows with border-bottom separators —
 * reads like an editorial services listing, not a SaaS feature grid.
 */
export default function ServicesGrid({ config }) {
  const { services = [] } = config;
  if (services.length === 0) return null;

  // Split into two columns on desktop if 4+ services
  const useColumns = services.length >= 4;
  const midpoint   = Math.ceil(services.length / 2);
  const col1 = useColumns ? services.slice(0, midpoint) : services;
  const col2 = useColumns ? services.slice(midpoint)    : [];

  return (
    <section
      style={{
        background:   'var(--color-surface)',
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
        {/* Header — headline only, no eyebrow */}
        <div className="services-header">
          <h2
            style={{
              fontFamily:   'var(--font-display)',
              fontWeight:   400,
              fontSize:     'clamp(2rem, 4vw, 3rem)',
              color:        'var(--color-text-heading)',
              lineHeight:   1.1,
            }}
          >
            Services
          </h2>

          <Link
            href="/services"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            6,
              fontSize:       '0.9rem',
              fontWeight:     500,
              color:          'var(--color-text-muted)',
              textDecoration: 'none',
              borderBottom:   '1px solid var(--color-border)',
              paddingBottom:  1,
              whiteSpace:     'nowrap',
            }}
          >
            View all
            <ArrowIcon />
          </Link>
        </div>

        {/* Service list — two columns on desktop */}
        <div className="services-list-grid">
          <ServiceColumn services={col1} />
          {col2.length > 0 && <ServiceColumn services={col2} />}
        </div>
      </div>

      <style>{`
        .services-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .services-list-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .services-list-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0 64px;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceColumn({ services }) {
  return (
    <div>
      {services.map(service => {
        const href = service.hub
          ? `/${service.hub}/${service.slug}`
          : `/services/${service.slug}`;

        return (
          <Link
            key={service.slug}
            href={href}
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              gap:            16,
              padding:        '20px 0',
              borderBottom:   '1px solid var(--color-border)',
              textDecoration: 'none',
              transition:     'color 0.15s',
            }}
            className="service-row"
          >
            <div>
              <div
                style={{
                  fontSize:   '1.0625rem',
                  fontWeight: 600,
                  color:      'var(--color-text-heading)',
                  lineHeight: 1.3,
                }}
              >
                {service.name}
              </div>
              {service.description && (
                <div
                  style={{
                    fontSize:   '0.875rem',
                    color:      'var(--color-text-muted)',
                    marginTop:  4,
                    lineHeight: 1.5,
                  }}
                >
                  {service.description}
                </div>
              )}
            </div>
            <span
              style={{
                color:    'var(--color-primary)',
                flexShrink: 0,
                opacity:  0.7,
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              className="service-row-arrow"
            >
              <ArrowIcon />
            </span>

            <style>{`
              .service-row:hover .service-row-arrow {
                opacity: 1;
                transform: translateX(3px);
              }
              .service-row:hover > div > div:first-child {
                color: var(--color-primary);
              }
            `}</style>
          </Link>
        );
      })}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
