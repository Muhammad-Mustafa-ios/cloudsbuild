import React, { useEffect, useRef } from 'react';

export function WhyChooseUsVisualSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizRef = useRef<HTMLDivElement>(null);
  const vzRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gimgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viz = vizRef.current;
    const vz = vzRef.current;
    const rowsEl = rowsRef.current;
    const line = lineRef.current;
    const gimg = gimgRef.current;

    if (!viz || !vz || !rowsEl || !line || !gimg) return;

    var GREY_IMAGE = "https://i.pinimg.com/736x/4b/81/36/4b8136586d5b4d7d83ce973644ece62f.jpg";
    var NODE_IMAGES = [
      "https://i.pinimg.com/1200x/9c/cd/f4/9ccdf407da26990d4adf00e319f01e75.jpg",   // 1  Idea to Reality
      "https://i.pinimg.com/736x/2e/6d/52/2e6d5220fcb4470dc3de30cb628e7680.jpg",   // 2  No Technical Team Required
      "https://i.pinimg.com/1200x/14/d9/75/14d97588701a009070ba5dd8f07d2d00.jpg",   // 3  One Technology Partner
      "https://i.pinimg.com/1200x/3c/72/b6/3c72b6b8e924267a9f6490d55616f4fb.jpg",   // 4  Transparent Pricing
      "https://i.pinimg.com/736x/46/db/9e/46db9ee3d4b3323457222bb8db7f3b42.jpg",   // 5  We Stay
      "https://i.pinimg.com/736x/b5/be/0a/b5be0a18971627a61e7cf34a34e9466c.jpg"    // 6  Built for Growth
    ];

    var R = [
     {n:"Idea to Reality",c:"#7c5cf0",d:"From the first conversation to a working product, we handle the entire technical journey.",ic:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.700V17h8v-2.300A7 7 0 0 0 12 2z"/>'},
     {n:"No Technical Team Required",c:"#2563eb",d:"You don't need to hire developers, designers, DevOps engineers or other specialists.",ic:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M16 3.100a4 4 0 0 1 0 7.800M22 21v-2a4 4 0 0 0-3-3.900"/>'},
     {n:"One Technology Partner",c:"#0aa5b8",d:"Websites, apps, software, AI, automation, integrations and support under one roof.",ic:'<path d="M12 2l10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5"/>'},
     {n:"Transparent Pricing",c:"#4f46e5",d:"Clear pricing with no confusing technical surprises or unnecessary costs.",ic:'<circle cx="12" cy="12" r="10"/><path d="M15 9.500c-.5-1-1.600-1.500-3-1.500-1.700 0-3 .8-3 2s1.200 1.700 3 2 3 .8 3 2-1.300 2-3 2c-1.400 0-2.500-.5-3-1.500M12 6v2m0 8v2"/>'},
     {n:"We Stay",c:"#0284c7",d:"We don't disappear after launch. We continue supporting and improving what we build.",ic:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M4.900 4.900l4.200 4.200M14.900 14.900l4.200 4.200M14.900 9.100l4.200-4.200M4.900 19.100l4.200-4.200"/>'},
     {n:"Built for Growth",c:"#5b6b8c",d:"Our solutions are designed to be reliable, secure, scalable and ready for your next stage.",ic:'<path d="M22 7l-8.500 8.500-5-5L2 17"/><path d="M16 7h6v6"/>'}
    ];

    R.forEach(function(r, i){ (r as any).img = NODE_IMAGES[i] || ''; });
    var N = R.length, ST = 360 / N;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, dwell = 3800, dur = 1200;
    var nodes: HTMLDivElement[] = [], rows: HTMLDivElement[] = [], k = 0, jv = N, rot = 0, rs = 0, rt = 0, rt0 = 0, t0 = 0, ready = false, timer: any, animId: number;

    function fill(box: HTMLElement, url: string, alt: string, fallback: string){
      box.innerHTML = fallback;
      box.classList.remove('pic');
      if(!url) return;
      var im = new Image(); im.alt = alt; im.referrerPolicy = 'no-referrer';
      im.onload = function(){ box.innerHTML = ''; box.appendChild(im); box.classList.add('pic'); };
      im.src = url;
    }

    fill(gimg, GREY_IMAGE, 'Why choose us', '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.500" cy="8.500" r="1.500"/><path d="M21 15l-5-5L5 21"/></svg>');

    vz.querySelectorAll('.node').forEach(el => el.remove());
    rowsEl.innerHTML = '';

    R.forEach(function(r, i){
      var n = document.createElement('div');
      n.className = 'node';
      n.tabIndex = 0;
      n.setAttribute('role', 'button');
      n.setAttribute('aria-label', r.n);
      n.style.setProperty('--c', r.c);
      n.innerHTML = '<div class="nd"></div>';
      fill(n.firstChild as HTMLElement, (r as any).img, r.n, '<svg viewBox="0 0 24 24">'+r.ic+'</svg>');
      vz.appendChild(n);
      nodes.push(n);
      n.addEventListener('click', function(){ jump(i); });
      n.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); jump(i); } });
    });

    for(var c=0; c<3; c++) {
      R.forEach(function(r, i){
        var d = document.createElement('div');
        d.className = 'row' + (c ? ' cp' : '');
        d.style.setProperty('--c', r.c);
        d.dataset.r = String(i);
        d.innerHTML = '<div class="cd"><div class="ch"><span class="chip"><svg viewBox="0 0 24 24">'+r.ic+'</svg></span><h3>'+r.n+'</h3></div><div class="dsc"><p>'+r.d+'</p></div></div>';
        d.addEventListener('click', function(){ jump(i); });
        rowsEl.appendChild(d);
        rows.push(d);
      });
    }

    rowsEl.style.setProperty('--j', String(jv));

    function apply(){
      var r = k % N;
      nodes.forEach(function(n, i){ n.classList.toggle('on', i === r); });
      rows.forEach(function(d){ d.classList.toggle('on', Number(d.dataset.r) === r); });
      vz.style.setProperty('--ac', R[r].c);
      line.classList.remove('show');
      void vz.offsetWidth;
      line.classList.add('show');
      rowsEl.style.setProperty('--j', String(jv));
      setTimeout(function(){
        if(jv >= 2 * N){
          rowsEl.style.transition = 'none';
          jv -= N;
          rowsEl.style.setProperty('--j', String(jv));
          void rowsEl.offsetWidth;
          rowsEl.style.transition = '';
        }
      }, 1200);
    }

    function schedule(){
      clearTimeout(timer);
      if(!reduce) {
        timer = setTimeout(function(){ go(1); }, dwell);
      }
    }

    function go(m: number){
      k += m;
      jv += m;
      rs = rot;
      rt = -k * ST;
      rt0 = performance.now();
      apply();
      schedule();
    }

    function jump(i: number){
      if(!ready) return;
      var m = (i - (k % N) + N) % N;
      if(m) go(m);
    }

    function eob(p: number){
      var a = 1.70158, b = a + 1;
      return 1 + b * Math.pow(p - 1, 3) + a * Math.pow(p - 1, 2);
    }

    function frame(now: number){
      var t = (now - t0) / 1000;
      var q = Math.min(1, Math.max(0, (now - rt0) / (reduce ? 1 : dur)));
      var e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      rot = rs + (rt - rs) * e;

      nodes.forEach(function(n, i){
        var p = Math.min(1, Math.max(0, (t - 2.1 - 0.15 * i) / 0.9));
        var r_val = 200 * eob(p);
        var a = ((i * ST + rot - (1 - p) * 130) * Math.PI) / 180;
        n.style.left = ((330 + r_val * Math.cos(a)) / 620) * 100 + '%';
        n.style.top = ((280 + r_val * Math.sin(a)) / 560) * 100 + '%';
        n.style.opacity = String(Math.min(1, p * 2));
      });

      animId = requestAnimationFrame(frame);
    }

    function start(){
      viz.classList.add('go');
      t0 = performance.now() - (reduce ? 10000 : 0);
      animId = requestAnimationFrame(frame);
      setTimeout(function(){
        ready = true;
        apply();
        schedule();
      }, reduce ? 50 : 3300);
    }

    const observer = new IntersectionObserver(function(es, o){
      if(es[0].isIntersecting){
        o.disconnect();
        start();
      }
    }, { threshold: 0.3 });

    observer.observe(viz);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="wcus-section py-20 bg-[#f8fafd] dark:bg-[#0b1220] font-['Plus_Jakarta_Sans',system-ui,sans-serif]" ref={containerRef}>
      <style>{`
        .wcus-section {
          --bg: #f8fafd;
          --ink: #0f172a;
          --mut: #5b6b85;
          --g1: #f6f7fa;
          --g2: #dfe3ea;
          --rim: rgba(37,99,235,.3);
          --card: #fff;
          --bd: #d6e4fb;
          --dw: 3.8s;
        }
        .dark .wcus-section {
          --bg: #0b1220;
          --ink: #f1f5ff;
          --mut: #9fb0cc;
          --g1: #223049;
          --g2: #141d2f;
          --rim: rgba(96,165,250,.35);
          --card: #111b2e;
          --bd: #243a63;
        }
        .wcus-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .wcus-head { text-align: center; max-width: 700px; margin: 0 auto 34px; }
        .wcus-head h2 { font-size: clamp(2rem, 4.6vw, 3rem); line-height: 1.1; font-weight: 800; letter-spacing: -.025em; color: var(--ink); }
        .wcus-head p { margin-top: 14px; color: var(--mut); font-size: 1.05rem; }
        .wcus-grid { display: grid; grid-template-columns: 58% 42%; align-items: stretch; gap: 2rem; }
        .wcus-viz { container-type: inline-size; position: relative; aspect-ratio: 620/560; width: 100%; }
        .wcus-viz:not(.go) .wcus-vz { opacity: 0; }
        .wcus-vz { position: absolute; inset: 0; --u: calc(100cqw/620); --ac: #7c5cf0; }
        .wcus-grey { position: absolute; z-index: 1; left: calc(var(--u)*130); top: calc(var(--u)*80); width: calc(var(--u)*400); height: calc(var(--u)*400); border-radius: 50%; background: radial-gradient(circle at 35% 28%, var(--g1), var(--g2)); box-shadow: 0 calc(var(--u)*26) calc(var(--u)*50) calc(var(--u)*-22) rgba(15,23,42,.35); }
        .wcus-rim { position: absolute; inset: 0; border-radius: 50%; border: 2px dashed var(--rim); animation: wcus-spin 70s linear infinite; }
        @keyframes wcus-spin { to { transform: rotate(360deg); } }
        .wcus-viz.go .wcus-grey { animation: wcus-emerge 1.6s .7s cubic-bezier(.3,.9,.3,1) backwards; }
        @keyframes wcus-emerge { from { transform: translateX(calc(var(--u)*-220)) scale(.5); } }
        .wcus-gimg { position: absolute; left: calc(var(--u)*100); top: calc(var(--u)*100); width: calc(var(--u)*200); height: calc(var(--u)*200); border-radius: 50%; overflow: hidden; display: grid; place-items: center; background: var(--card); border: calc(var(--u)*6) solid var(--card); box-shadow: 0 calc(var(--u)*18) calc(var(--u)*36) calc(var(--u)*-14) rgba(15,23,42,.4), 0 0 0 calc(var(--u)*10) rgba(37,99,235,.1); opacity: 0; transform: scale(.7); transition: opacity .9s 2.4s, transform .9s 2.4s cubic-bezier(.3,1.5,.5,1); }
        .wcus-viz.go .wcus-gimg { opacity: 1; transform: none; }
        .wcus-gimg img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .wcus-gimg svg { width: 30%; fill: none; stroke: var(--bd); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .wcus-purple { position: absolute; z-index: 4; left: calc(var(--u)*10); top: calc(var(--u)*180); width: calc(var(--u)*200); height: calc(var(--u)*200); border-radius: 50%; background: linear-gradient(150deg,#a285ff,#5b4fe6 55%,#2f5fe8); display: grid; place-content: center; text-align: center; color: #fff; box-shadow: 0 calc(var(--u)*22) calc(var(--u)*44) calc(var(--u)*-10) rgba(91,79,230,.6); }
        .wcus-viz.go .wcus-purple { animation: wcus-pop .9s cubic-bezier(.3,1.5,.5,1) backwards; }
        @keyframes wcus-pop { from { transform: scale(.4); opacity: 0; } }
        .wcus-purple::after { content: ""; position: absolute; inset: calc(var(--u)*-10); border-radius: 50%; border: 2px solid rgba(124,92,240,.55); animation: wcus-glow 2.6s ease-out infinite; }
        @keyframes wcus-glow { from { transform: scale(.96); opacity: .9; } to { transform: scale(1.28); opacity: 0; } }
        .wcus-purple span { display: block; line-height: 1.12; font-weight: 700; font-size: calc(var(--u)*31); }
        .wcus-purple span:first-child { font-size: calc(var(--u)*40); font-weight: 800; letter-spacing: .05em; }
        .node { position: absolute; z-index: 3; width: calc(var(--u)*64); height: calc(var(--u)*64); margin: calc(var(--u)*-32) 0 0 calc(var(--u)*-32); opacity: 0; cursor: pointer; border-radius: 50%; outline-offset: 4px; }
        .nd { width: 100%; height: 100%; border-radius: 50%; background: var(--c); display: grid; place-items: center; opacity: .38; transform: scale(.82); box-shadow: 0 calc(var(--u)*10) calc(var(--u)*20) calc(var(--u)*-8) var(--c); transition: transform .7s cubic-bezier(.3,1.5,.5,1), opacity .6s; }
        .nd.pic { background: #fff; border: calc(var(--u)*3) solid #fff; }
        .nd img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
        .nd svg { width: 44%; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .node.on .nd { opacity: 1; transform: scale(1.28); }
        .node::after { content: ""; position: absolute; inset: calc(var(--u)*-8); border-radius: 50%; border: 2px solid var(--c); opacity: 0; }
        .node.on::after { animation: wcus-glow 1.6s ease-out infinite; }
        .wcus-line { position: absolute; z-index: 2; left: calc(var(--u)*573); top: calc(var(--u)*279); width: calc(var(--u)*70); height: 2px; background: var(--ac); transform: scaleX(0); transform-origin: left; }
        .wcus-line::after { content: ""; position: absolute; right: -4px; top: -3px; width: 8px; height: 8px; border-radius: 50%; background: var(--ac); }
        .wcus-line.show { animation: wcus-ln .7s .6s cubic-bezier(.3,.9,.3,1) forwards; }
        @keyframes wcus-ln { to { transform: none; } }
        /* list */
        .wcus-list { position: relative; --rh: 158px; }
        .wcus-slot { position: absolute; inset: 0; overflow: hidden; -webkit-mask-image: linear-gradient(transparent,#000 22%,#000 78%,transparent); mask-image: linear-gradient(transparent,#000 22%,#000 78%,transparent); }
        .wcus-rows { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(calc(var(--j,4)*var(--rh)*-1 - var(--rh)/2)); transition: transform 1.1s cubic-bezier(.65,0,.35,1); }
        .row { position: relative; height: var(--rh); padding: 6px 0 6px 26px; opacity: 0; transition: opacity .6s; cursor: pointer; }
        .row.on { opacity: 1; }
        .cd { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 16px 22px 18px 26px; border-radius: 22px; background: var(--card); border: 1.5px solid color-mix(in srgb,var(--c) 45%,var(--bd)); box-shadow: 0 24px 44px -24px var(--c); overflow: hidden; transform: translateX(-16px) scale(.96); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
        .row.on .cd { transform: none; }
        .cd::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: var(--c); }
        .cd::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: var(--c); transform: scaleX(0); transform-origin: left; }
        .row.on .cd::after { animation: wcus-fy var(--dw) linear forwards; }
        .ch { display: flex; align-items: center; gap: 12px; }
        .chip { flex: none; width: 36px; height: 36px; border-radius: 50%; background: var(--c); display: grid; place-items: center; box-shadow: 0 8px 16px -6px var(--c); }
        .chip svg { width: 56%; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        @keyframes wcus-fy { to { transform: none; } }
        .row h3 { font-size: clamp(1.15rem, 2.1vw, 1.55rem); font-weight: 800; color: var(--ink); line-height: 1.2; transition: color .5s; }
        .dsc { opacity: 0; transition: opacity .6s .2s; }
        .row.on .dsc { opacity: 1; }
        .dsc p { margin-top: 10px; font-size: clamp(.88rem, 1.35vw, 1rem); line-height: 1.55; color: var(--mut); max-width: 36ch; }
        @media (max-width: 900px) {
          .wcus-grid { grid-template-columns: 1fr; }
          .wcus-viz { max-width: 560px; margin: 0 auto; }
          .wcus-line { display: none; }
          .wcus-slot { position: static; overflow: visible; -webkit-mask-image: none; mask-image: none; }
          .wcus-rows { position: static; transform: none; margin-top: 10px; }
          .row { height: auto; max-height: 0; overflow: hidden; padding: 0; opacity: 0; transition: max-height .7s, padding .7s, opacity .6s; }
          .row.on { max-height: 280px; padding: 6px 0; opacity: 1; }
          .cd { height: auto; }
          .cp { display: none; }
          .dsc { opacity: 1; }
          .dsc p { max-width: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="wcus-wrap">
        <header className="wcus-head">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            WHY CLOUDSBUILT
          </div>
          <h2>Why Businesses Choose Us</h2>
          <p>Designed specifically for growing companies that want senior engineering without the overhead.</p>
        </header>

        <div className="wcus-grid">
          <div className="wcus-viz" ref={vizRef}>
            <div className="wcus-vz" ref={vzRef}>
              <div className="wcus-grey">
                <div className="wcus-rim"></div>
                <div className="wcus-gimg" ref={gimgRef}></div>
              </div>
              <div className="wcus-line" ref={lineRef}></div>
              <div className="wcus-purple">
                <span>WHY</span>
                <span>CHOOSE</span>
                <span>US</span>
              </div>
            </div>
          </div>

          <div className="wcus-list">
            <div className="wcus-slot">
              <div className="wcus-rows" ref={rowsRef}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
