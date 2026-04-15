'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Stats — Local Authority skin
 *
 * Featured stat (years in business, or first available) displayed large
 * in Instrument Serif. Supporting stats shown smaller in a warm rule strip below.
 * Cream surface-2 background — signals editorial, not SaaS dashboard.
 */
export default function Stats({ config }) {
  const { stats = {}, city } = config;

  const all = [
    stats.years_in_business && {
      value:  stats.years_in_business,
      suffix: '+',
      label:  `Years Serving ${city ?? 'the Area'}`,
      format: 'integer',
    },
    stats.jobs_completed && {
      value:  stats.jobs_completed,
      suffix: '+',
      label:  'Jobs Completed',
      format: 'integer',
    },
    stats.avg_rating && {
      value:  stats.avg_rating,
      suffix: '★',
      label:  `Avg Rating${stats.review_count ? ` · ${Number(stats.review_count).toLocaleString()} Reviews` : ''}`,
      format: 'decimal',
    },
    stats.response_time && {
      value:     null,
      textValue: stats.response_time,
      label:     'Response Time',
      format:    'text',
    },
  ].filter(Boolean);

  if (all.length === 0) return null;

  const [featured, ...supporting] = all;

  return (
    <section
      style={{
        background:   'var(--color-surface-2)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth:     'var(--max-width-content)',
          marginInline: 'auto',
          padding:      '56px 24px',
        }}
      >
        {/* Featured stat — Instrument Serif, editorial scale */}
        <div style={{ textAlign: 'center', marginBottom: supporting.length ? 40 : 0 }}>
          <FeaturedStat item={featured} />
        </div>

        {/* Supporting stats — smaller horizontal strip */}
        {supporting.length > 0 && (
          <>
            <div
              style={{
                width:     48,
                height:    1,
                background: 'var(--color-border-dark)',
                margin:    '0 auto 32px',
              }}
            />
            <div className="supporting-stats">
              {supporting.map((item, i) => (
                <SupportingStat key={i} item={item} last={i === supporting.length - 1} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .supporting-stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px 0;
        }
        @media (min-width: 640px) {
          .supporting-stats { gap: 0; }
        }
      `}</style>
    </section>
  );
}

function FeaturedStat({ item }) {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted]     = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (item.format === 'text' || item.value == null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animateCount(item.value, setDisplayed, item.format);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item, started]);

  const formatted =
    item.format === 'text'
      ? item.textValue
      : item.format === 'decimal'
      ? displayed.toFixed(1)
      : displayed.toLocaleString();

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    400,
          fontSize:      'clamp(4rem, 10vw, 7rem)',
          lineHeight:    1,
          color:         'var(--color-text-heading)',
          letterSpacing: '-0.02em',
          marginBottom:  8,
        }}
      >
        {formatted}
        {item.suffix && (
          <span style={{ fontSize: '0.5em', color: 'var(--color-primary)', marginLeft: 4 }}>
            {item.suffix}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize:   '0.8125rem',
          fontWeight: 500,
          color:      'var(--color-text-muted)',
        }}
      >
        {item.label}
      </div>
    </div>
  );
}

function SupportingStat({ item, last }) {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted]     = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (item.format === 'text' || item.value == null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animateCount(item.value, setDisplayed, item.format);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item, started]);

  const formatted =
    item.format === 'text'
      ? item.textValue
      : item.format === 'decimal'
      ? displayed.toFixed(1)
      : displayed.toLocaleString();

  return (
    <div
      ref={ref}
      style={{
        padding:     '0 32px',
        textAlign:   'center',
        borderRight: last ? 'none' : '1px solid var(--color-border)',
        flexShrink:  0,
      }}
    >
      <div
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    400,
          fontSize:      'clamp(1.5rem, 3vw, 2rem)',
          color:         'var(--color-text-heading)',
          lineHeight:    1,
          marginBottom:  4,
        }}
      >
        {formatted}
        {item.suffix && (
          <span style={{ color: 'var(--color-primary)', marginLeft: 2 }}>{item.suffix}</span>
        )}
      </div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
        {item.label}
      </div>
    </div>
  );
}

function animateCount(target, setter, format) {
  const duration = 1400;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = target * eased;
    setter(format === 'decimal' ? current : Math.round(current));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
