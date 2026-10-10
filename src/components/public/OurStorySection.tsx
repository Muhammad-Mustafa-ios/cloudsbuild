import React, { useEffect, useRef } from 'react';

export function OurStorySection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const picRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spans = flowRef.current ? Array.from(flowRef.current.querySelectorAll('span')) : [];

    let flowInterval: any = null;
    function startFlow() {
      let n = 0;
      flowInterval = setInterval(() => {
        spans.forEach((s, i) => {
          (s as HTMLElement).classList.toggle('on', i === n);
        });
        n = (n + 1) % spans.length;
      }, 1500);
    }

    function start() {
      stage.classList.add('go');
      setTimeout(startFlow, reduce ? 0 : 1500);

      const pic = picRef.current;
      const card = cardRef.current;
      if (!reduce && pic && card && window.matchMedia('(hover:hover)').matches) {
        const handleMouseMove = (e: MouseEvent) => {
          const r = pic.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--ry', (x * 8) + 'deg');
          card.style.setProperty('--rx', (-y * 8) + 'deg');
        };
        const handleMouseLeave = () => {
          card.style.setProperty('--ry', '0deg');
          card.style.setProperty('--rx', '0deg');
        };
        pic.addEventListener('mousemove', handleMouseMove);
        pic.addEventListener('mouseleave', handleMouseLeave);
        return () => {
          pic.removeEventListener('mousemove', handleMouseMove);
          pic.removeEventListener('mouseleave', handleMouseLeave);
          clearInterval(flowInterval);
        };
      }
      return () => {
        clearInterval(flowInterval);
      };
    }

    if (reduce || !('IntersectionObserver' in window)) {
      stage.classList.add('go');
      startFlow();
      return;
    }

    const observer = new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) {
        o.disconnect();
        start();
      }
    }, { threshold: window.matchMedia('(min-width:861px)').matches ? 0.25 : 0.08 });

    observer.observe(stage);
    return () => {
      observer.disconnect();
      clearInterval(flowInterval);
    };
  }, []);

  return (
    <section className="story relative overflow-hidden py-[110px] px-6 bg-[#f6f9ff] dark:bg-[#0b1220] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-[#0f172a] dark:text-[#f1f5ff]">
      <style>{`
        .story {
          background: radial-gradient(ellipse 60% 55% at 78% 40%, var(--glow, #d9e8ff), transparent 70%),
                      radial-gradient(ellipse 45% 40% at 5% 90%, var(--glow, #d9e8ff), transparent 70%);
        }
        .dark .story {
          background: radial-gradient(ellipse 60% 55% at 78% 40%, var(--glow, #142a52), transparent 70%),
                      radial-gradient(ellipse 45% 40% at 5% 90%, var(--glow, #142a52), transparent 70%);
        }
        .story::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--bd, #d6e4fb) 1px, transparent 1.2px);
          background-size: 26px 26px;
          opacity: .55;
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%);
        }
        .dark .story::before {
          background-image: radial-gradient(var(--bd, #243a63) 1px, transparent 1.2px);
        }
        .stage { position: relative; max-width: 1100px; margin: 0 auto; }
        .grid { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .stage:not(.go) .col { opacity: 0; }
        
        .go .txt { animation: inL 1.1s .05s cubic-bezier(.2,.85,.2,1) backwards; }
        .go .pic { animation: inR 1.2s .2s cubic-bezier(.2,.85,.2,1) backwards; }
        @keyframes inL { from { transform: translateX(-70px); opacity: 0; filter: blur(8px); } }
        @keyframes inR { from { transform: translateX(70px); opacity: 0; filter: blur(8px); } }
        
        .go .txt > * { animation: fup .9s calc(.3s + var(--i, 0) * .12s) cubic-bezier(.2,.8,.2,1) backwards; }
        @keyframes fup { from { transform: translateY(22px); opacity: 0; } }
        
        .badge { display: inline-block; padding: 7px 17px; border-radius: 99px; border: 1px solid var(--bd, #d6e4fb); background: var(--tint, #eef4ff); color: #2563eb; font-size: .72rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; }
        .dark .badge { border-color: #243a63; background: #12213f; color: #60a5fa; }
        
        .txt h2 { margin: 20px 0 22px; font-size: clamp(2rem, 3.7vw, 3.05rem); line-height: 1.12; font-weight: 800; letter-spacing: -.032em; -webkit-text-stroke: .7px currentColor; }
        .hl b { color: #2563eb; font-weight: 800; }
        .dark .hl b { color: #60a5fa; }
        
        .txt p { color: var(--mut, #475569); font-size: 1.06rem; line-height: 1.75; margin-bottom: 18px; max-width: 52ch; }
        .dark .txt p { color: #9fb0cc; }
        
        .pill { position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 12px; margin-top: 10px; padding: 14px 22px 14px 14px; border-radius: 18px; border: 1.5px solid var(--bd, #d6e4fb); background: var(--tint, #eef4ff); color: #2563eb; font-weight: 800; font-size: 1rem; }
        .dark .pill { border-color: #243a63; background: #12213f; color: #60a5fa; }
        .pill .ck { flex: none; width: 30px; height: 30px; border-radius: 50%; background: #2563eb; display: grid; place-items: center; box-shadow: 0 8px 16px -6px rgba(37,99,235,.38); }
        .pill .ck svg { width: 16px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .pill::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%); transform: translateX(-120%); animation: sw 5s 4s ease-in-out infinite; }
        @keyframes sw { 40%, 100% { transform: translateX(120%); } }
        
        .flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 26px; font-size: .78rem; font-weight: 700; color: var(--mut, #475569); }
        .dark .flow { color: #9fb0cc; }
        .flow span { padding: 6px 13px; border-radius: 99px; border: 1px solid var(--bd, #d6e4fb); background: var(--card, #fff); transition: .45s cubic-bezier(.3,1.5,.5,1); }
        .dark .flow span { border-color: #243a63; background: #111b2e; }
        .flow span.on { background: #2563eb; border-color: #2563eb; color: #fff; transform: translateY(-3px); box-shadow: 0 10px 20px -8px rgba(37,99,235,.38); }
        .flow i { width: 14px; height: 1.5px; background: var(--bd, #d6e4fb); }
        .dark .flow i { background: #243a63; }
        
        .pic { position: relative; perspective: 1000px; }
        .card { position: relative; margin: 0; transform: rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg)); transition: transform .4s ease-out; }
        .ph { aspect-ratio: 5/4.3; display: grid; place-items: center; text-align: center; color: var(--mut, #475569); font-size: .85rem; font-weight: 500; border: 1.5px dashed var(--bd, #d6e4fb); border-radius: 20px; }
        .ph svg { display: block; margin: 0 auto 8px; width: 30px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .pimg { display: block; width: 100%; height: auto; background: transparent; mix-blend-mode: multiply; animation: fl 7s ease-in-out infinite; }
        .dark .pimg { mix-blend-mode: normal; }
        @keyframes fl { 50% { transform: translateY(-10px); } }
        
        @media (max-width: 860px) {
          .story { padding: 80px 18px; }
          .grid { grid-template-columns: 1fr; gap: 56px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="stage" ref={stageRef}>
        <div className="grid">
          <div className="col txt" id="txt">
            <div style={{ '--i': 0 } as React.CSSProperties}><span className="badge">Our story</span></div>
            <h2 style={{ '--i': 1 } as React.CSSProperties}>Great technology shouldn't stand <span className="hl">between your business and <b>growth.</b></span></h2>
            <p style={{ '--i': 2 } as React.CSSProperties}>Most growing businesses struggle with the high upfront cost of building websites, custom software, mobile apps, complex integrations, AI solutions, reliable hosting, and continuous maintenance.</p>
            <p style={{ '--i': 3 } as React.CSSProperties}>That is why we founded CloudsBuilt. We remove this heavy barrier by providing world-class technology engineering as a simple ongoing partnership.</p>
            <div style={{ '--i': 4 } as React.CSSProperties}>
              <div className="pill">
                <span className="ck">
                  <svg viewBox="0 0 24 24"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg>
                </span>
                You focus on the business. We handle the technology.
              </div>
            </div>
            <div className="flow" style={{ '--i': 5 } as React.CSSProperties} ref={flowRef}>
              <span>Build</span><i></i><span>Launch</span><i></i><span>Maintain</span><i></i><span>Grow</span>
            </div>
          </div>
          <div className="col pic" id="pic" ref={picRef}>
            <figure className="card" id="card" ref={cardRef}>
              <img className="pimg" id="img" alt="Our team at work" src="https://i.postimg.cc/8zqtjyww/Privatizing-Social-Security-The-Troubling-Trade-Offs-Brookings-removebg-preview.png" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
