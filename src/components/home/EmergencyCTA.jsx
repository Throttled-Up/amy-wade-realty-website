/**
 * EmergencyCTA — Local Authority skin
 *
 * Dark warm band using footer background (#1c1917) — editorial, not alarmist.
 * Instrument Serif headline. Phone CTA in primary color.
 * Placed just before footer.
 */
export default function EmergencyCTA({ config }) {
  const { phone, business_name, emergency_available, city, state } = config;

  if (!phone) return null;

  const headline = emergency_available
    ? 'Emergency service, available now.'
    : `Ready to help in ${city}, ${state}.`;

  const sub = emergency_available
    ? `Call ${business_name} — we respond fast, day or night.`
    : `Call ${business_name} today for a free estimate.`;

  return (
    <section
      style={{
        background: 'var(--color-footer-bg)',
        padding:    '64px 0',
      }}
    >
      <div
        style={{
          maxWidth:     'var(--max-width-content)',
          marginInline: 'auto',
          padding:      '0 24px',
        }}
      >
        <div className="emergency-inner">
          <div>
            <h2
              style={{
                fontFamily:   'var(--font-display)',
                fontWeight:   400,
                fontSize:     'clamp(1.75rem, 4vw, 2.75rem)',
                color:        'var(--color-text-inverse)',
                lineHeight:   1.1,
                marginBottom: 12,
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontSize:   '1rem',
                color:      'rgba(250,248,244,0.65)',
                lineHeight: 1.6,
              }}
            >
              {sub}
            </p>
          </div>

          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="emergency-btn"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            10,
              background:     'var(--color-primary)',
              color:          '#fff',
              fontWeight:     700,
              fontSize:       'clamp(1rem, 2.5vw, 1.25rem)',
              padding:        '16px 36px',
              borderRadius:   'var(--btn-radius)',
              flexShrink:     0,
              textDecoration: 'none',
              transition:     'background 0.15s',
            }}
          >
            <PhoneIcon />
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}
