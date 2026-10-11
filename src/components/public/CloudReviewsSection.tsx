import React, { useEffect, useRef } from 'react';

export function CloudReviewsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Muhammad Ali & Ayesha Khan',
      role: 'Co-Founders, LahoreTech Solutions (Lahore, Pakistan)',
      letter: 'M',
      content: 'We were running our software business online for months but barely getting any clients or traffic. After partnering with CloudsBuilt, our digital presence skyrocketed and we are now getting 3x more clients every single week!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sophia Laurent',
      role: 'CEO, Luxe Apparel Global (Paris, France)',
      letter: 'S',
      content: 'We struggled to attract international buyers with our old slow website and had very few orders. CloudsBuilt rebuilt our e-commerce platform, and within weeks our sales and customer inquiries surged dramatically!',
      rating: 4,
    },
    {
      id: 3,
      name: 'Usman Malik',
      role: 'Director of Operations, Karachi Logistics (Karachi, Pakistan)',
      letter: 'U',
      content: 'Before CloudsBuilt, we were getting hardly any inbound leads through our web portal. Their custom development and automated workflows brought us a steady stream of new corporate clients.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Carlos Mendoza',
      role: 'Chief Technology Officer, InnovaLatam (Madrid, Spain)',
      letter: 'C',
      content: 'Our startup was stuck with low user engagement and minimal client acquisition. CloudsBuilt revamped our entire tech stack and user experience, leading to a massive influx of new paying customers.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Fatima Noor',
      role: 'Lead Product Manager, Islamabad Digital (Islamabad, Pakistan)',
      letter: 'F',
      content: 'We had a great service but our online visibility was poor, resulting in very few client sign-ups. CloudsBuilt optimized everything, and now our pipeline is constantly full of high-value clients.',
      rating: 4,
    },
    {
      id: 6,
      name: 'Hans Weber',
      role: 'Managing Director, Berlin Cloud Systems (Berlin, Germany)',
      letter: 'H',
      content: 'We were running our cloud agency without proper client conversion tools, leading to stagnant growth. CloudsBuilt delivered a high-converting platform that doubled our monthly client acquisitions.',
      rating: 5,
    },
  ];

  const THEMES = ['blue', 'white'];
  const POS = [
    { x: 20, y: 34, r: -3, z: 1 },
    { x: 160, y: 12, r: 2, z: 2 },
    { x: 300, y: 38, r: -2, z: 3 },
    { x: 440, y: 10, r: 3, z: 4 },
    { x: 580, y: 34, r: -3, z: 5 },
    { x: 720, y: 14, r: 2, z: 6 }
  ];

  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const posElements = stage.querySelectorAll<HTMLElement>('.cr-pos');
    if (!posElements.length) return;

    function set(i: number) {
      posElements.forEach((p, j) => {
        p.classList.toggle('cr-on', j === i);
      });
      stage?.classList.toggle('cr-focus', i >= 0);
    }

    posElements.forEach((p, i) => {
      p.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse') set(i);
      });
      p.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse') set(-1);
      });
      p.addEventListener('click', (e) => {
        if (e.pointerType !== 'mouse' && e.detail !== 0) {
          set(p.classList.contains('cr-on') ? -1 : i);
        }
      });
      p.addEventListener('focus', () => set(i));
      p.addEventListener('blur', () => set(-1));
    });

    const go = () => stage.classList.add('cr-go');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((es, o) => {
        if (es[0].isIntersecting) {
          o.disconnect();
          go();
        }
      }, { threshold: 0.25 });
      observer.observe(stage);
      return () => observer.disconnect();
    } else {
      go();
    }
  }, []);

  const renderStar = (k: number, off: boolean) => (
    <svg key={k} viewBox="0 0 24 24" className={off ? 'cr-off' : ''} style={{ '--k': k } as React.CSSProperties}>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.300 5.900 20.600l1.400-6.800L2.200 9.100l6.900-.8z" />
    </svg>
  );

  return (
    <section className="cr-sec" id="cr-reviews" ref={rootRef}>
      <style>{`
        .cr-sec{--cr-bg:#f6f9ff;--cr-glow:#dbe8ff;--cr-card:#fff;--cr-tint:#eaf1ff;--cr-ink:#0f172a;--cr-mut:#475569;--cr-bd:#d6e4fb;--cr-blue:#2563eb;--cr-sh:rgba(37,99,235,.4);
        position:relative;isolation:isolate;overflow:hidden;padding:72px 24px 80px;font-family:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--cr-ink);
        background:radial-gradient(ellipse 60% 50% at 50% 55%,var(--cr-glow),transparent 72%),var(--cr-bg)}
        .dark .cr-sec,[data-theme="dark"] .cr-sec,.cr-sec[data-theme="dark"]{--cr-bg:#0b1220;--cr-glow:#15305e;--cr-card:#111b2e;--cr-tint:#16284d;--cr-ink:#f1f5ff;--cr-mut:#9fb0cc;--cr-bd:#243a63;--cr-sh:rgba(59,130,246,.5)}
        .cr-sec,.cr-sec *,.cr-sec *::before,.cr-sec *::after{box-sizing:border-box}
        .cr-sec .cr-head{max-width:700px;margin:0 auto 30px;text-align:center}
        .cr-sec .cr-badge{display:inline-block;margin:0;padding:7px 18px;border-radius:99px;border:1px solid var(--cr-bd);background:var(--cr-card);color:var(--cr-blue);font-size:.7rem;font-weight:700;line-height:1.4;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 8px 20px -10px var(--cr-sh)}
        .cr-sec .cr-title{margin:20px 0 0;padding:0;font-family:inherit;font-size:clamp(1.9rem,3.8vw,2.7rem);line-height:1.1;font-weight:800;letter-spacing:-.035em;color:var(--cr-ink)}
        .cr-sec .cr-head>*{animation:cr-up .9s calc(.05s + var(--cr-i)*.12s) cubic-bezier(.2,.8,.2,1) backwards}
        @keyframes cr-up{from{transform:translateY(22px);opacity:0}}
        .cr-sec .cr-box{container-type:inline-size;max-width:1000px;margin:0 auto}
        .cr-sec .cr-stage{--u:calc(100cqw/1000);position:relative;height:calc(var(--u)*420)}
        .cr-sec .cr-stage:not(.cr-go) .cr-pos{opacity:0}
        .cr-sec .cr-pos{position:absolute;left:calc(var(--u)*var(--x));top:calc(var(--u)*var(--y));width:calc(var(--u)*260);z-index:var(--z);transform:rotate(var(--r));outline:none;cursor:pointer;
          transition:transform .6s cubic-bezier(.2,.9,.3,1.25),filter .5s,opacity .5s}
        .cr-sec .cr-go .cr-pos,.cr-sec .cr-stage.cr-go .cr-pos{animation:cr-in 1.1s calc(var(--k)*.13s + .15s) cubic-bezier(.2,.9,.3,1.2) backwards}
        @keyframes cr-in{from{opacity:0;transform:translateY(calc(var(--u)*140)) rotate(calc(var(--r) + 14deg)) scale(.75)}}
        .cr-sec .cr-fl{animation:cr-fl var(--fd,6s) ease-in-out infinite}
        @keyframes cr-fl{50%{transform:translateY(calc(var(--u)*-8))}}
        .cr-sec .cr-pos.cr-on{z-index:60;transform:rotate(0deg) scale(1.14) translateY(calc(var(--u)*-22))}
        .cr-sec .cr-pos.cr-on .cr-fl{animation-play-state:paused}
        .cr-sec .cr-stage.cr-focus .cr-pos:not(.cr-on){opacity:.55;filter:blur(1.4px) saturate(.7);transform:rotate(var(--r)) scale(.95)}
        .cr-sec .cr-card{position:relative;overflow:hidden;padding:calc(var(--u)*22) calc(var(--u)*22) calc(var(--u)*20);border-radius:calc(var(--u)*20);background:var(--bg);color:var(--fg);box-shadow:0 calc(var(--u)*22) calc(var(--u)*40) calc(var(--u)*-22) rgba(15,23,42,.45);transition:box-shadow .5s}
        .cr-sec .cr-pos.cr-on .cr-card{box-shadow:0 0 0 calc(var(--u)*3) var(--ac),0 calc(var(--u)*44) calc(var(--u)*70) calc(var(--u)*-22) var(--ac)}
        .cr-sec .cr-card::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.4) 50%,transparent 65%);transform:translateX(-120%);pointer-events:none}
        .cr-sec .cr-pos.cr-on .cr-card::after{animation:cr-sh .9s ease-out}
        @keyframes cr-sh{to{transform:translateX(120%)}}
        .cr-sec .cr-stars{display:flex;gap:calc(var(--u)*4);margin-bottom:calc(var(--u)*14)}
        .cr-sec .cr-stars svg{width:calc(var(--u)*18);height:calc(var(--u)*18);fill:#fbbf24;display:block}
        .cr-sec .cr-pos.cr-on .cr-stars svg{animation:cr-tw .6s calc(var(--k)*.09s) cubic-bezier(.3,1.6,.5,1)}
        @keyframes cr-tw{40%{transform:scale(1.5) rotate(18deg)}}
        .cr-sec .cr-q{margin:0 0 calc(var(--u)*16);padding:0;font-size:calc(var(--u)*14);line-height:1.5;font-weight:500;color:var(--fg)}
        .cr-sec .cr-stars svg.cr-off{opacity:.28}
        .cr-sec .cr-meta{display:flex;align-items:center;gap:calc(var(--u)*12);padding-top:calc(var(--u)*14);border-top:1px solid var(--ln)}
        .cr-sec .cr-av{flex:none;width:calc(var(--u)*36);height:calc(var(--u)*36);border-radius:50%;display:grid;place-items:center;background:var(--st);color:var(--bg);font-size:calc(var(--u)*15);font-weight:800}
        .cr-sec .cr-name{margin:0;font-size:calc(var(--u)*14);font-weight:800;line-height:1.3;color:var(--fg)}
        .cr-sec .cr-role{margin:calc(var(--u)*3) 0 0;font-size:calc(var(--u)*11.5);line-height:1.4;font-weight:500;color:var(--sub)}
        .cr-sec .cr-blue{--bg:#2563eb;--fg:#fff;--st:#fff;--sub:rgba(255,255,255,.78);--ln:rgba(255,255,255,.28);--ac:#93c5fd}
        .cr-sec .cr-white{--bg:var(--cr-card);--fg:var(--cr-ink);--st:#2563eb;--sub:var(--cr-mut);--ln:var(--cr-bd);--ac:#2563eb}
        .cr-sec .cr-white .cr-card{border:1px solid var(--cr-bd)}
        @media (max-width:760px){
        .cr-sec{padding:70px 0 80px}
        .cr-sec .cr-head{padding:0 18px;margin-bottom:30px}
        .cr-sec .cr-box{max-width:none}
        .cr-sec .cr-stage{--u:1px;height:auto;display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:26px 18px 46px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
        .cr-sec .cr-stage::-webkit-scrollbar{display:none}
        .cr-sec .cr-pos{position:relative;left:auto;top:auto;flex:none;width:280px;scroll-snap-align:center;transform:none;z-index:auto}
        .cr-sec .cr-pos.cr-on{transform:scale(1.04);z-index:2}
        .cr-sec .cr-stage.cr-focus .cr-pos:not(.cr-on){opacity:.7;filter:none;transform:none}
        }
        @media (prefers-reduced-motion:reduce){.cr-sec *{animation:none!important;transition:none!important}}
      `}</style>
      <div className="cr-head">
        <div style={{ '--cr-i': 0 } as React.CSSProperties}><span className="cr-badge">Rating &amp; Reviews</span></div>
        <h2 className="cr-title" style={{ '--cr-i': 1 } as React.CSSProperties}>Trusted by people</h2>
      </div>
      <div className="cr-box">
        <div className="cr-stage" id="cr-stage" ref={stageRef}>
          {testimonials.slice(0, POS.length).map((r, i) => {
            const p = POS[i];
            const th = THEMES[i % THEMES.length];
            const n = r.rating || 5;
            return (
              <div
                key={r.id}
                className={`cr-pos cr-${th}`}
                tabIndex={0}
                style={
                  {
                    '--x': p.x,
                    '--y': p.y,
                    '--r': `${p.r}deg`,
                    '--z': p.z,
                    '--k': i,
                  } as React.CSSProperties
                }
              >
                <div className="cr-fl" style={{ '--fd': `${5.5 + i * 0.7}s`, animationDelay: `-${i * 1.3}s` } as React.CSSProperties}>
                  <div className={`cr-card cr-${th}`}>
                    <div className="cr-stars">
                      {Array.from({ length: 5 }).map((_, k) => renderStar(k, k >= n))}
                    </div>
                    <p className="cr-q">{r.content}</p>
                    <div className="cr-meta">
                      <span className="cr-av">{r.letter || r.name.charAt(0)}</span>
                      <div>
                        <p className="cr-name">{r.name}</p>
                        <p className="cr-role">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
