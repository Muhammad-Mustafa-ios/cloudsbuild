import React, { useEffect, useRef } from 'react';

interface WhyUsHeroProps {
  onOpenContact: (plan?: any) => void;
}

export function WhyUsHero({ onOpenContact }: WhyUsHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    /* ============ PASTE YOUR ICON IMAGE LINKS HERE ============
       Each line = one mini icon. Put the full image URL (https://...) between the quotes.
       Leave "" to show a default icon. Add or delete lines to change how many icons orbit.   */
    const OUTER_ICONS = [          // BIG circle  - rotates clockwise (14 icons)
      "", "", "", "", "", "", "", "", "", "", "", "", "", ""
    ];
    const INNER_ICONS = [          // SMALL circle - rotates counter-clockwise (9 icons)
      "", "", "", "", "", "", "", "", ""
    ];
    const OUTER_SECONDS = 70;      // time for one full turn (bigger = slower)
    const INNER_SECONDS = 50;
    /* ========================================================== */

    const DEF: [string, string][] = [
      ["#2563eb",'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>'],
      ["#7c5cf0",'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'],
      ["#f59e0b",'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>'],
      ["#0891b2",'<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>'],
      ["#db2777",'<path d="M11 3l1.9 5.8L18.500 10l-5.6 1.2L11 17l-1.9-5.8L3.500 10l5.6-1.2z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>'],
      ["#ea580c",'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>'],
      ["#0284c7",'<path d="M17.5 19H9a7 7 0 1 1 6.710-9h1.790a4.500 4.500 0 1 1 0 9z"/>'],
      ["#059669",'<path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/>'],
      ["#e11d48",'<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'],
      ["#0d9488",'<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>'],
      ["#4f46e5",'<path d="M12 2l10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5"/>'],
      ["#2563eb",'<path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'],
      ["#475569",'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3"/>'],
      ["#7c3aed",'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>']
    ];

    stage.innerHTML = '';
    const TAU = Math.PI * 2;
    let t = 0;
    let last = 0;
    let raf = 0;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    function build(list: string[], off: number) {
      return list.map((url, i) => {
        const d = DEF[(i + off) % DEF.length];
        const el = document.createElement('div');
        el.className = 'cb-oi';
        el.innerHTML = `<div class="cb-in" style="--cb-d:${0.4 + i * 0.08}s"><span class="cb-fb" style="color:${d[0]}"><svg viewBox="0 0 24 24">${d[1]}</svg></span></div>`;
        stage.appendChild(el);
        if (url) {
          const im = new Image();
          im.alt = '';
          im.referrerPolicy = 'no-referrer';
          im.onload = () => {
            (el.firstChild as HTMLElement).innerHTML = '';
            (el.firstChild as HTMLElement).appendChild(im);
          };
          im.src = url;
        }
        return el;
      });
    }

    const outer = build(OUTER_ICONS, 0);
    const inner = build(INNER_ICONS, 5);

    function place(list: HTMLDivElement[], cx: number, cy: number, r: number, ang: number, size: number) {
      const n = list.length;
      list.forEach((el, i) => {
        const a = ang + (i * TAU) / n;
        el.style.width = el.style.height = size + 'px';
        el.style.transform = `translate(${(cx + r * Math.cos(a) - size / 2).toFixed(1)}px,${(cy + r * Math.sin(a) - size / 2).toFixed(1)}px)`;
      });
    }

    function frame(now: number) {
      if (last && !reduce) t += Math.min(0.1, (now - last) / 1000);
      last = now;
      const H = root.getBoundingClientRect();
      const W = H.width;
      const Hh = H.height;
      const cx = W / 2;
      const cy = Hh / 2;
      const R = (Math.sqrt(W * W + Hh * Hh) / 2) * 0.8;
      const r = R * 0.62;
      const small = W < 700;

      place(outer, cx, cy, R, (TAU * t) / OUTER_SECONDS, small ? 28 : 38);
      place(inner, cx, cy, r, (-TAU * t) / INNER_SECONDS + Math.PI / inner.length, small ? 26 : 32);
      raf = requestAnimationFrame(frame);
    }

    function run() {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((es) => {
        es[0].isIntersecting ? run() : stop();
      });
      observer.observe(root);
      return () => {
        observer.disconnect();
        stop();
      };
    } else {
      run();
      return () => stop();
    }
  }, []);

  return (
    <section className="cb-hero relative isolate overflow-hidden flex items-center justify-center min-h-[680px] pt-[140px] pb-[120px] px-6 text-center font-['Plus_Jakarta_Sans',system-ui,-apple-system,'Segoe_UI',sans-serif] text-[var(--cb-ink)] bg-[var(--cb-bg)]" ref={rootRef}>
      <style>{`
        .cb-hero {
          --cb-bg: #f6f9ff;
          --cb-glow: #d6e6ff;
          --cb-card: #fff;
          --cb-ink: #0f172a;
          --cb-mut: #475569;
          --cb-bd: #d3e1fa;
          --cb-blue: #2563eb;
          --cb-sh: rgba(37,99,235,.35);
          background: radial-gradient(ellipse 55% 45% at 50% 50%, var(--cb-glow), transparent 72%), var(--cb-bg);
        }
        .dark .cb-hero {
          --cb-bg: #0b1220;
          --cb-glow: #15305e;
          --cb-card: #111b2e;
          --cb-ink: #f1f5ff;
          --cb-mut: #9fb0cc;
          --cb-bd: #243a63;
          --cb-sh: rgba(59,130,246,.45);
        }
        .cb-hero, .cb-hero *, .cb-hero *::before, .cb-hero *::after { box-sizing: border-box; }
        .cb-hero .cb-stage { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .cb-hero .cb-oi { position: absolute; left: 0; top: 0; width: 38px; height: 38px; will-change: transform; }
        .cb-hero .cb-in { width: 100%; height: 100%; animation: cb-pop .9s var(--cb-d,.4s) cubic-bezier(.3,1.6,.5,1) backwards; }
        @keyframes cb-pop { from { transform: scale(0); opacity: 0; } }
        .cb-hero .cb-fb { width: 100%; height: 100%; border-radius: 50%; background: #fff; border: 1px solid var(--cb-bd); display: grid; place-items: center; box-shadow: 0 6px 14px -6px rgba(15,23,42,.3); }
        .dark .cb-hero .cb-fb { background: #111b2e; border-color: #243a63; }
        .cb-hero .cb-fb svg { width: 56%; height: 56%; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .cb-hero .cb-oi img { width: 100%; height: 100%; max-width: none; object-fit: cover; display: block; border-radius: 50%; background: #fff; border: 1px solid var(--cb-bd); box-shadow: 0 6px 14px -6px rgba(15,23,42,.3); }
        .cb-hero .cb-content { position: relative; z-index: 2; width: 100%; max-width: 760px; margin: 0 auto; }
        .cb-hero .cb-content > * { animation: cb-up .9s calc(.1s + var(--cb-i)*.12s) cubic-bezier(.2,.8,.2,1) backwards; }
        @keyframes cb-up { from { transform: translateY(24px); opacity: 0; } }
        .cb-hero .cb-badge { display: inline-block; margin: 0; padding: 7px 18px; border-radius: 99px; border: 1px solid var(--cb-bd); background: var(--cb-card); color: var(--cb-blue); font-size: .7rem; font-weight: 700; line-height: 1.4; letter-spacing: .09em; text-transform: uppercase; box-shadow: 0 8px 20px -10px var(--cb-sh); }
        .dark .cb-hero .cb-badge { border-color: #243a63; background: #111b2e; color: #60a5fa; }
        .cb-hero .cb-title { display: block; margin: 24px 0 22px; padding: 0; text-align: center; font-family: inherit; font-size: clamp(2.3rem, 4.9vw, 3.6rem); line-height: 1.12; font-weight: 800; letter-spacing: -.03em; color: var(--cb-ink); }
        .cb-hero .cb-title span { display: block; color: var(--cb-blue); }
        .dark .cb-hero .cb-title span { color: #60a5fa; }
        .cb-hero .cb-lead { max-width: 600px; margin: 0 auto 32px; padding: 0; color: var(--cb-mut); font-size: 1.08rem; line-height: 1.7; font-weight: 400; }
        .cb-hero .cb-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .cb-hero .cb-btn { display: inline-flex; align-items: center; gap: 9px; padding: 15px 28px; border-radius: 99px; background: var(--cb-blue); color: #fff; font: 700 .95rem/1 "Plus Jakarta Sans", system-ui, sans-serif; text-decoration: none; border: 0; box-shadow: 0 12px 24px -10px var(--cb-sh); transition: transform .25s, box-shadow .25s; cursor: pointer; }
        .cb-hero .cb-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 28px -10px var(--cb-sh); background-color: #1d4ed8; }
        .cb-hero .cb-btn svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
        .cb-hero .cb-btn.cb-alt { background: var(--cb-card); color: var(--cb-ink); box-shadow: 0 12px 26px -14px rgba(15,23,42,.4), 0 0 0 1px var(--cb-bd); }
        .dark .cb-hero .cb-btn.cb-alt { background: #111b2e; color: #f1f5ff; border-color: #243a63; }
        .cb-hero .cb-btn.cb-alt:hover { background-color: #1e293b; }
        @media (max-width: 860px) {
          .cb-hero { padding: 110px 18px 90px; min-height: 620px; }
          .cb-hero .cb-lead { font-size: 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cb-hero * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="cb-stage" aria-hidden="true" ref={stageRef}></div>
      <div className="cb-content">
        <div style={{ '--cb-i': 0 } as React.CSSProperties}><span className="cb-badge">Why CloudsBuilt</span></div>
        <h1 className="cb-title" style={{ '--cb-i': 1 } as React.CSSProperties}>A technology team,<span>without hiring one.</span></h1>
        <p className="cb-lead" style={{ '--cb-i': 2 } as React.CSSProperties}>“Most businesses don't need another developer on payroll. They need someone who can build the right technology, keep it running, and be there when something breaks. That's what we do.”</p>
        <div className="cb-cta" style={{ '--cb-i': 3 } as React.CSSProperties}>
          <button onClick={() => onOpenContact()} className="cb-btn">
            Start a Project <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          <button onClick={() => onOpenContact()} className="cb-btn cb-alt">
            Talk to Us
          </button>
        </div>
      </div>
    </section>
  );
}
