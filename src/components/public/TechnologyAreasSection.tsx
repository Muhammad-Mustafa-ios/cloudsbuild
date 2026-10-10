import React, { useEffect, useRef } from 'react';

export function TechnologyAreasSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rbRef = useRef<HTMLDivElement>(null);
  const rzRef = useRef<HTMLDivElement>(null);
  const ripRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const hubimgRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const nameElRef = useRef<HTMLHeadingElement>(null);
  const tagElRef = useRef<HTMLSpanElement>(null);
  const descElRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cntRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rb = rbRef.current;
    const rz = rzRef.current;
    const rip = ripRef.current;
    const beam = beamRef.current;
    const hubimg = hubimgRef.current;
    const detail = detailRef.current;
    const nameEl = nameElRef.current;
    const tagEl = tagElRef.current;
    const descEl = descElRef.current;
    const nav = navRef.current;
    const cnt = cntRef.current;

    if (!rb || !rz || !rip || !beam || !hubimg || !detail || !nameEl || !tagEl || !descEl || !nav || !cnt) return;

    const HUB_IMAGE = "https://i.pinimg.com/736x/18/40/27/1840275e513ddace38ec9981b80b73be.jpg";
    const TILE_IMAGES = [
      "https://i.pinimg.com/736x/69/16/e2/6916e2b11f37661b5ba69a422c49460c.jpg",   // 1  Websites
      "https://i.pinimg.com/736x/8e/95/d1/8e95d181e61908ab4d1d793ea7ca24bd.jpg",   // 2  Web Applications
      "https://i.pinimg.com/736x/c1/65/1f/c1651f598d212acdfe551f103548e495.jpg",   // 3  Mobile Applications
      "https://i.pinimg.com/736x/c2/eb/9e/c2eb9e5d7ebcc57a38bc44bbf1edc309.jpg",   // 4  E-commerce
      "https://i.pinimg.com/736x/a2/4b/88/a24b8832c7294c2cbb86679f82add936.jpg",   // 5  Custom Software
      "https://i.pinimg.com/736x/da/ac/40/daac407263d76a3d40f0e160027b191c.jpg",   // 6  AI Solutions
      "https://i.pinimg.com/1200x/3f/23/a5/3f23a5dfffcd19c6c3e22fd934e0142c.jpg",   // 7  Business Automation
      "https://i.pinimg.com/736x/68/e8/c2/68e8c26a4f0b11e8e03744e6c5b9e513.jpg",   // 8  API Integrations
      "https://i.pinimg.com/736x/09/3f/6e/093f6ed3ff0b96f50686bd538383ad9c.jpg",   // 9  Cloud Solutions
      "https://i.pinimg.com/1200x/0a/db/09/0adb09b6580d9c13a6fd4af026649940.jpg",   // 10 Meta & TikTok Ads
      "https://i.pinimg.com/736x/a4/d2/64/a4d2644939576bc99acf68831bef0bea.jpg"    // 11 Maintenance & Support
    ];

    const T: Array<{ n: string; g: string; c: string; d: string; ic: string; img?: string }> = [
      { n: "Websites", g: "Web", c: "#2563eb", d: "Fast, polished websites that present your brand and turn visitors into customers.", ic: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>' },
      { n: "Web Applications", g: "Web", c: "#4f46e5", d: "Custom web apps and dashboards that streamline how your business runs.", ic: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>' },
      { n: "Mobile Applications", g: "Mobile", c: "#0891b2", d: "iOS and Android apps that keep your customers connected on the go.", ic: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>' },
      { n: "E-commerce", g: "Commerce", c: "#f59e0b", d: "Online stores with smooth checkout, payments and inventory built to sell.", ic: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.700 13.400a2 2 0 0 0 2 1.600h9.700a2 2 0 0 0 2-1.600L23 6H6"/>' },
      { n: "Custom Software", g: "Software", c: "#7c3aed", d: "Tailor-made software built around your processes, not the other way round.", ic: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>' },
      { n: "AI Solutions", g: "Intelligence", c: "#db2777", d: "Chatbots, smart assistants and AI features that save time and add insight.", ic: '<path d="M11 3l1.900 5.800L18.500 10l-5.600 1.200L11 17l-1.900-5.800L3.500 10l5.600-1.200z"/><path d="M19 15l.8 2.200L22 18l-2.200.8L19 21l-.8-2.200L16 18l2.200-.8z"/>' },
      { n: "Business Automation", g: "Efficiency", c: "#ea580c", d: "Automated workflows that remove repetitive tasks and reduce manual errors.", ic: '<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>' },
      { n: "API Integrations", g: "Connectivity", c: "#059669", d: "Connect your tools and systems so data flows without manual work.", ic: '<path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/>' },
      { n: "Cloud Solutions", g: "Infrastructure", c: "#0284c7", d: "Secure, scalable cloud hosting and infrastructure that grows with you.", ic: '<path d="M17.500 19H9a7 7 0 1 1 6.710-9h1.790a4.500 4.500 0 1 1 0 9z"/>' },
      { n: "Meta & TikTok Ads", g: "Marketing", c: "#e11d48", d: "Targeted ad campaigns that reach the right audience and track real results.", ic: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.500 8.500a5 5 0 0 1 0 7M18.500 5.500a9 9 0 0 1 0 13"/>' },
      { n: "Maintenance & Support", g: "Support", c: "#0d9488", d: "Updates, fixes, monitoring and security from a team that stays on call.", ic: '<path d="M14.700 6.300a1 1 0 0 0 0 1.400l1.600 1.600a1 1 0 0 0 1.400 0l3.770-3.770a6 6 0 0 1-7.940 7.940l-6.910 6.910a2.120 2.120 0 0 1-3-3l6.910-6.910a6 6 0 0 1 7.940-7.940z"/>' }
    ];

    T.forEach((t, i) => { t.img = TILE_IMAGES[i] || ''; });

    let N = T.length;
    let ST = 360 / N;
    let CX = 300;
    let CY = 300;
    let RR = 215;
    let pad = (n: number) => (n < 10 ? '0' : '') + n;

    let tiles: HTMLDivElement[] = [];
    let dots: HTMLButtonElement[] = [];
    let k = 0;
    let cur = -1;
    let rot = 0;
    let rs = 0;
    let rt = 0;
    let rt0 = -1e9;
    let t0 = 0;
    let ready = false;
    let timer: any;
    let tapT: any;
    let animId: number;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dwell = 3400;
    let dur = 1000;

    const idx = () => ((k % N) + N) % N;

    // Clear previous
    rz.querySelectorAll('.tile').forEach(el => el.remove());
    nav.querySelectorAll('.dot').forEach(el => el.remove());

    T.forEach((t, i) => {
      let e = document.createElement('div');
      e.className = 'tile';
      e.tabIndex = 0;
      e.setAttribute('role', 'button');
      e.setAttribute('aria-label', t.n);
      e.style.setProperty('--tc', t.c);
      e.innerHTML = '<div class="ti"></div>';
      fill(e.firstChild as HTMLElement, t.img, t.n, '<svg viewBox="0 0 24 24">' + t.ic + '</svg>');
      rz.appendChild(e);
      tiles.push(e);
      e.addEventListener('click', () => jump(i));
      e.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          jump(i);
        }
      });

      let d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', t.n);
      nav.insertBefore(d, cnt);
      dots.push(d);
      d.addEventListener('click', () => jump(i));
    });

    function fill(box: HTMLElement, url: string, alt: string, fallback: string) {
      box.innerHTML = fallback;
      box.classList.remove('pic');
      if (!url) return;
      let im = new Image();
      im.alt = alt;
      im.referrerPolicy = 'no-referrer';
      im.onload = () => {
        box.innerHTML = '';
        box.appendChild(im);
        box.classList.add('pic');
      };
      im.src = url;
    }

    fill(hubimg, HUB_IMAGE, 'CloudsBuilt', '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.500" cy="8.500" r="1.500"/><path d="M21 15l-5-5L5 21"/></svg>');

    function retrig(el: HTMLElement, c: string) {
      el.classList.remove(c);
      void el.offsetWidth;
      el.classList.add(c);
    }

    function show(i: number) {
      let t = T[i];
      let n = 0;
      detail.classList.remove('out');
      nameEl.innerHTML = t.n.split(' ').map((w) => '<span class="w">' + w.split('').map((ch) => '<span style="--i:' + (n++) + '">' + ch + '</span>').join('') + '</span>').join(' ');
      tagEl.textContent = t.g;
      descEl.textContent = t.d;
      detail.style.setProperty('--tc', t.c);
      detail.classList.remove('in');
      void detail.offsetWidth;
      detail.classList.add('in');
    }

    function tap() {
      let i = idx();
      let t = T[i];
      cur = i;
      tiles.forEach((e, j) => e.classList.toggle('on', j === i));
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      cnt.textContent = pad(i + 1) + ' / ' + pad(N);
      rz.style.setProperty('--ac', t.c);
      show(i);
      if (!reduce) {
        retrig(rip, 'go');
        retrig(beam, 'go');
      } else {
        beam.style.transform = 'none';
      }
      clearTimeout(timer);
      if (!reduce) timer = setTimeout(() => go(1), dwell);
    }

    function go(d: number) {
      clearTimeout(timer);
      clearTimeout(tapT);
      k += d;
      rs = rot;
      rt = -k * ST;
      rt0 = performance.now();
      tiles.forEach((e) => e.classList.remove('on'));
      dots.forEach((x) => x.classList.remove('on'));
      detail.classList.add('out');
      beam.classList.remove('go');
      beam.style.transform = '';
      tapT = setTimeout(tap, reduce ? 0 : dur - 80);
    }

    function jump(i: number) {
      if (!ready) return;
      let m = (i - idx() + N) % N;
      if (m > N / 2) m -= N;
      if (m === 0) {
        if (cur !== i) tap();
        return;
      }
      go(m);
    }

    function eob(p: number) {
      let a = 1.70158;
      let b = a + 1;
      return 1 + b * Math.pow(p - 1, 3) + a * Math.pow(p - 1, 2);
    }

    function frame(now: number) {
      let t = (now - t0) / 1000;
      let q = Math.min(1, Math.max(0, (now - rt0) / (reduce ? 1 : dur)));
      let e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      rot = rs + (rt - rs) * e;

      tiles.forEach((el, i) => {
        let p = Math.min(1, Math.max(0, (t - 0.7 - 0.1 * i) / 0.8));
        let r_val = RR * eob(p);
        let a = ((-90 + i * ST + rot - (1 - p) * 140) * Math.PI) / 180;
        el.style.left = ((CX + r_val * Math.cos(a)) / 600) * 100 + '%';
        el.style.top = ((CY + r_val * Math.sin(a)) / 600) * 100 + '%';
        el.style.opacity = String(Math.min(1, p * 2));
      });

      animId = requestAnimationFrame(frame);
    }

    function start() {
      rb.classList.add('go');
      t0 = performance.now() - (reduce ? 10000 : 0);
      animId = requestAnimationFrame(frame);
      setTimeout(() => {
        ready = true;
        tap();
      }, reduce ? 50 : 2300);
    }

    const observer = new IntersectionObserver(
      (es, o) => {
        if (es[0].isIntersecting) {
          o.disconnect();
          start();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(rb);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(tapT);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-slate-950 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]" ref={containerRef}>
      <style>{`
        .tac-wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }
        .tac-grid { display: grid; grid-template-columns: 45% 55%; align-items: center; min-height: 640px; }
        .tac-left { display: flex; flex-direction: column; gap: 30px; padding-right: 24px; }
        .tac-badge { display: inline-block; padding: 7px 18px; border-radius: 99px; border: 1px solid #d6e4fb; background: #fff; color: #2563eb; font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; box-shadow: 0 6px 18px -8px rgba(37,99,235,.4); }
        .dark .tac-badge { background: #111b2e; border-color: #243a63; color: #60a5fa; }
        .tac-head h2 { margin-top: 18px; font-size: clamp(2rem, 4vw, 3.1rem); line-height: 1.07; font-weight: 800; letter-spacing: -.03em; color: #0f172a; }
        .dark .tac-head h2 { color: #f1f5ff; }
        .tac-head h2 span { display: block; }
        .tac-head h2 span + span { color: #2563eb; }
        .dark .tac-head h2 span + span { color: #60a5fa; }
        .tac-head p { margin-top: 14px; color: #475569; font-size: 1.05rem; max-width: 38ch; }
        .dark .tac-head p { color: #9fb0cc; }
        .tac-detail { min-height: 250px; padding: 24px 26px; border-radius: 24px; background: #fff; border: 1.5px solid #d6e4fb; box-shadow: 0 24px 44px -26px rgba(37,99,235,.4); transition: opacity .25s; }
        .dark .tac-detail { background: #111b2e; border-color: #243a63; box-shadow: 0 24px 44px -26px rgba(59,130,246,.5); }
        .tac-detail.out { opacity: 0; }
        .tac-tag { display: inline-flex; align-items: center; gap: 9px; padding: 5px 14px; border-radius: 99px; border: 1px solid #d6e4fb; font-size: .82rem; font-weight: 500; color: #475569; }
        .dark .tac-tag { border-color: #243a63; color: #9fb0cc; }
        .tac-tag i { width: 9px; height: 9px; border-radius: 50%; background: var(--tc, #2563eb); box-shadow: 0 0 10px var(--tc, #2563eb); }
        .tac-name { margin: 16px 0 12px; font-size: clamp(1.9rem, 3.8vw, 2.8rem); line-height: 1.06; font-weight: 800; letter-spacing: -.03em; min-height: 1.1em; color: #0f172a; }
        .dark .tac-name { color: #f1f5ff; }
        .tac-name .w { display: inline-block; white-space: nowrap; }
        .tac-name .w span { display: inline-block; }
        .tac-desc { font-size: 1.05rem; line-height: 1.6; color: #475569; max-width: 40ch; }
        .dark .tac-desc { color: #9fb0cc; }
        .tac-detail.in .tac-name .w span { animation: tac-up .7s calc(var(--i)*.03s) cubic-bezier(.2,.8,.2,1) backwards; }
        .tac-detail.in .tac-tag, .tac-detail.in .tac-desc { animation: tac-fup .8s .2s cubic-bezier(.2,.8,.2,1) backwards; }
        @keyframes tac-up { from { transform: translateY(70%); opacity: 0; filter: blur(6px); } }
        @keyframes tac-fup { from { transform: translateY(14px); opacity: 0; } }
        .tac-nav { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
        .dot { position: relative; width: 9px; height: 9px; border: 0; padding: 0; border-radius: 9px; background: #d6e4fb; overflow: hidden; cursor: pointer; transition: width .5s; }
        .dark .dot { background: #243a63; }
        .dot.on { width: 44px; }
        .dot.on::after { content: ""; position: absolute; inset: 0; background: #2563eb; transform: scaleX(0); transform-origin: left; animation: tac-fill 3.4s linear forwards; }
        @keyframes tac-fill { to { transform: none; } }
        .cnt { margin-left: 8px; font-size: .85rem; font-weight: 500; color: #475569; font-variant-numeric: tabular-nums; }
        .dark .cnt { color: #9fb0cc; }
        /* ring */
        .rb { container-type: inline-size; position: relative; aspect-ratio: 1; width: 100%; max-width: 620px; margin-left: auto; }
        .rb:not(.go) .rz { opacity: 0; }
        .rz { position: absolute; inset: 0; --u: calc(100cqw/600); --ac: #2563eb; transition: opacity .6s; }
        .tac-glow { position: absolute; left: calc(var(--u)*300); top: calc(var(--u)*300); width: calc(var(--u)*560); height: calc(var(--u)*560); margin: calc(var(--u)*-280) 0 0 calc(var(--u)*-280); border-radius: 50%; background: radial-gradient(circle, rgba(37,99,235,.18), transparent 65%); animation: tac-breathe 5s ease-in-out infinite; }
        @keyframes tac-breathe { 50% { transform: scale(1.12); opacity: .6; } }
        .track { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; overflow: visible; }
        .track circle { stroke: #d6e4fb; stroke-width: 2; }
        .dark .track circle { stroke: #243a63; }
        .track .arc { stroke: #2563eb; stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 150 1201; transform-origin: 300px 300px; animation: tac-orb 7s linear infinite; filter: drop-shadow(0 0 6px #2563eb); }
        .track .in2 { stroke-dasharray: 3 9; stroke-width: 1.5; transform-origin: 300px 300px; animation: tac-orb 60s linear infinite reverse; }
        @keyframes tac-orb { to { transform: rotate(360deg); } }
        .hub { position: absolute; z-index: 1; left: calc(var(--u)*300); top: calc(var(--u)*300); width: calc(var(--u)*156); height: calc(var(--u)*156); margin: calc(var(--u)*-78) 0 0 calc(var(--u)*-78); border-radius: 50%; background: #fff; border: 1.5px solid #d6e4fb; box-shadow: 0 calc(var(--u)*22) calc(var(--u)*44) calc(var(--u)*-18) rgba(37,99,235,.4); display: grid; place-content: center; justify-items: center; gap: calc(var(--u)*4); }
        .dark .hub { background: #111b2e; border-color: #243a63; box-shadow: 0 calc(var(--u)*22) calc(var(--u)*44) calc(var(--u)*-18) rgba(59,130,246,.5); }
        .hub::before { content: ""; position: absolute; inset: calc(var(--u)*-8); border-radius: 50%; border: 2px solid var(--ac); opacity: 0; animation: tac-pulse 2.4s ease-out infinite; }
        @keyframes tac-pulse { from { opacity: .55; transform: scale(.95); } to { opacity: 0; transform: scale(1.3); } }
        .hubimg { position: absolute; inset: calc(var(--u)*7); border-radius: 50%; overflow: hidden; display: grid; place-items: center; background: #fff; }
        .dark .hubimg { background: #111b2e; }
        .hubimg img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hubimg svg { width: 34%; fill: none; stroke: #d6e4fb; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .beam { position: absolute; z-index: 1; left: calc(var(--u)*298.5); top: calc(var(--u)*140); width: calc(var(--u)*3); height: calc(var(--u)*84); border-radius: 3px; background: linear-gradient(var(--ac), transparent); transform: scaleY(0); transform-origin: bottom; }
        .beam.go { animation: tac-bm .8s .5s ease-out forwards; }
        @keyframes tac-bm { to { transform: none; } }
        .tile { position: absolute; z-index: 2; width: calc(var(--u)*80); height: calc(var(--u)*80); margin: calc(var(--u)*-40) 0 0 calc(var(--u)*-40); opacity: 0; cursor: pointer; border-radius: 50%; outline-offset: 5px; }
        .ti { width: 100%; height: 100%; border-radius: 50%; display: grid; place-items: center; color: #fff; border: calc(var(--u)*3) solid #fff; background: radial-gradient(circle at 30% 24%, color-mix(in srgb, var(--tc) 55%, #fff), var(--tc) 55%, color-mix(in srgb, var(--tc) 70%, #000)); box-shadow: 0 calc(var(--u)*10) calc(var(--u)*20) calc(var(--u)*-8) var(--tc); transform: scale(.88); filter: saturate(.85); opacity: .82; transition: transform .6s cubic-bezier(.3,1.5,.5,1), opacity .5s, filter .5s, box-shadow .5s; }
        .ti.pic { background: #fff; }
        .ti img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
        .ti svg { width: 46%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .tile:hover .ti { opacity: 1; filter: none; }
        .tile.on .ti { transform: scale(1.32); opacity: 1; filter: none; box-shadow: 0 0 0 calc(var(--u)*8) color-mix(in srgb, var(--tc) 25%, transparent), 0 0 calc(var(--u)*46) var(--tc); }
        .rip { position: absolute; z-index: 1; left: calc(var(--u)*300); top: calc(var(--u)*85); width: calc(var(--u)*80); height: calc(var(--u)*80); margin: calc(var(--u)*-40) 0 0 calc(var(--u)*-40); border-radius: 50%; border: 2px solid var(--ac); opacity: 0; }
        .rip.go { animation: tac-rip .9s ease-out; }
        @keyframes tac-rip { from { opacity: .9; transform: scale(1.2); } to { opacity: 0; transform: scale(2.6); } }
        @media (max-width: 900px) {
          .tac-grid { grid-template-columns: 1fr; gap: 8px; min-height: 0; }
          .tac-left { display: contents; }
          .tac-head { order: 1; text-align: center; }
          .tac-head p { margin: 12px auto 0; }
          .rb { order: 2; margin: 0 auto; }
          .tac-detail { order: 3; text-align: center; min-height: 240px; padding: 20px; }
          .tac-desc { margin: 0 auto; }
          .tac-nav { order: 4; justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="tac-wrap">
        <div className="tac-grid">
          <div className="tac-left">
            <div className="tac-head">
              <span className="tac-badge">What we cover</span>
              <h2><span>Technology Areas</span><span>We Cover</span></h2>
              <p>Full-spectrum technical capabilities under one unified partnership.</p>
            </div>
            <div className="tac-detail in out" ref={detailRef}>
              <span className="tac-tag"><i></i><b ref={tagElRef} style={{ fontWeight: 500 }}></b></span>
              <h3 className="tac-name" ref={nameElRef}></h3>
              <p className="tac-desc" ref={descElRef}></p>
            </div>
            <div className="tac-nav" ref={navRef}>
              <span className="cnt" ref={cntRef}></span>
            </div>
          </div>
          <div className="rb" ref={rbRef}>
            <div className="rz" ref={rzRef}>
              <div className="tac-glow"></div>
              <svg className="track" viewBox="0 0 600 600" aria-hidden="true">
                <circle cx="300" cy="300" r="215" />
                <circle className="in2" cx="300" cy="300" r="150" />
                <circle className="arc" cx="300" cy="300" r="215" />
              </svg>
              <div className="beam" ref={beamRef}></div>
              <div className="rip" ref={ripRef}></div>
              <div className="hub"><div className="hubimg" ref={hubimgRef}></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
