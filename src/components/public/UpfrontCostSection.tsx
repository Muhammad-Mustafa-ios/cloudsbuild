import React, { useEffect, useRef } from 'react';

export function UpfrontCostSection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const steps = [].slice.call(wrap.querySelectorAll('.up-step')) as HTMLElement[];
    const dwell = 3200;
    let t: any = 0;
    let started = false;

    wrap.style.setProperty('--dwell', dwell + 'ms');

    function paint(k: number) {
      steps.forEach((s, i) => {
        s.classList.toggle('done', i < k);
        s.classList.toggle('active', i === k);
      });
    }

    function run(k: number) {
      clearTimeout(t);
      if (k >= steps.length) {
        paint(k);
        wrap.classList.add('complete');
        t = setTimeout(() => {
          wrap.classList.remove('complete');
          paint(-1);
          t = setTimeout(() => { run(0); }, 700);
        }, 2400);
        return;
      }
      wrap.classList.remove('complete');
      paint(-1);
      void wrap.offsetWidth;
      paint(k);
      t = setTimeout(() => { run(k + 1); }, dwell);
    }

    steps.forEach((s, i) => {
      s.addEventListener('click', () => {
        steps.forEach((x, j) => {
          x.classList.toggle('done', j < i);
          x.classList.remove('active');
        });
        void wrap.offsetWidth;
        run(i);
      });
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(steps.length);
      return;
    }

    function start() {
      if (started) return;
      started = true;
      run(0);
    }

    const stepsEl = wrap.querySelector('#up-steps-container');
    if (stepsEl && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((es, o) => {
        if (es[0].isIntersecting) {
          start();
          o.disconnect();
        }
      }, { threshold: 0.35 });
      observer.observe(stepsEl);
      return () => observer.disconnect();
    } else {
      start();
    }

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <section 
      ref={wrapRef} 
      className="upfront-section py-24 bg-[#F8FAFC] dark:bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      <style>{`
        .upfront-section {
          --bg: #f8fafd;
          --card: #ffffff;
          --ink: #0f172a;
          --mut: #475569;
          --bd: #cfe0fb;
          --bd2: #d9e6fb;
          --tile: #eaf1ff;
          --num: #b8cdf7;
          --blue: #2563eb;
          --blue2: #60a5fa;
          --track: #dbe7fb;
          --idle: #8aa0c4;
          --sh: rgba(37,99,235,.45);
        }
        .dark .upfront-section {
          --bg: #0b1220;
          --card: #111b2e;
          --ink: #f1f5ff;
          --mut: #9fb0cc;
          --bd: #243a63;
          --bd2: #1f3358;
          --tile: #16284d;
          --num: #2c4478;
          --track: #1f3358;
          --idle: #6f86ad;
          --sh: rgba(59,130,246,.5);
        }
        .upfront-section .up-wrap {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .upfront-section .up-head {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 56px;
        }
        .upfront-section .up-head h2 {
          font-size: clamp(2rem, 4.6vw, 3rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -.025em;
          color: var(--ink);
        }
        .upfront-section .up-head p {
          margin-top: 16px;
          color: var(--mut);
          font-size: 1.05rem;
        }
        .upfront-section .up-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .upfront-section .up-step {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 12px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .upfront-section .up-seg {
          position: absolute;
          z-index: 0;
          top: 29px;
          left: 50%;
          width: 100%;
          height: 3px;
          border-radius: 3px;
          background: var(--track);
          overflow: hidden;
        }
        .upfront-section .up-seg i {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--blue), var(--blue2));
          box-shadow: 0 0 10px var(--blue);
          transform: scaleX(0);
          transform-origin: left;
        }
        .upfront-section .up-step:last-child .up-seg {
          display: none;
        }
        .upfront-section .up-step.done .up-seg i {
          transform: scaleX(1);
        }
        .upfront-section .up-step.active .up-seg i {
          animation: up-fillx var(--dwell) linear forwards;
        }
        @keyframes up-fillx {
          to { transform: scaleX(1); }
        }
        @keyframes up-filly {
          to { transform: scaleY(1); }
        }
        .upfront-section .up-node {
          position: relative;
          z-index: 2;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--card);
          display: grid;
          place-items: center;
          transition: background .45s, transform .45s cubic-bezier(.3,1.5,.5,1), box-shadow .45s;
        }
        .upfront-section .up-node svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          fill: none;
          overflow: visible;
        }
        .upfront-section .up-ring {
          transform: rotate(-90deg);
        }
        .upfront-section .up-ring circle {
          stroke-width: 2.5;
          transition: stroke .4s;
        }
        .upfront-section .up-ring .up-bg {
          stroke: var(--bd);
        }
        .upfront-section .up-ring .up-pr {
          stroke: var(--blue);
          stroke-linecap: round;
          stroke-dasharray: 179.1;
          stroke-dashoffset: 179.1;
        }
        .upfront-section .up-node .up-ic,
        .upfront-section .up-node .up-ck {
          width: 26px;
          height: 26px;
          inset: 17px;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .upfront-section .up-node .up-ic {
          stroke: var(--idle);
          transition: stroke .4s;
        }
        .upfront-section .up-node .up-ck {
          stroke: #fff;
          stroke-width: 3;
          stroke-dasharray: 26;
          stroke-dashoffset: 26;
          transition: stroke-dashoffset .5s .1s;
        }
        .upfront-section .up-node::before {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid var(--blue);
          opacity: 0;
        }
        .upfront-section .up-step.active .up-node {
          transform: scale(1.12);
          box-shadow: 0 0 0 6px rgba(37,99,235,.12);
        }
        .upfront-section .up-step.active .up-node .up-ic {
          stroke: var(--blue);
        }
        .upfront-section .up-step.active .up-ring .up-pr {
          animation: up-ringfill var(--dwell) linear forwards;
        }
        .upfront-section .up-step.active .up-node::before {
          animation: up-halo 1.5s ease-out infinite;
        }
        @keyframes up-ringfill {
          to { stroke-dashoffset: 0; }
        }
        @keyframes up-halo {
          from { opacity: .7; transform: scale(1); }
          to { opacity: 0; transform: scale(1.5); }
        }
        .upfront-section .up-step.done .up-node {
          background: var(--blue);
          box-shadow: 0 8px 20px -6px var(--sh);
        }
        .upfront-section .up-step.done .up-ring .up-bg,
        .upfront-section .up-step.done .up-ring .up-pr {
          stroke: var(--blue);
          stroke-dashoffset: 0;
        }
        .upfront-section .up-step.done .up-node .up-ic {
          opacity: 0;
        }
        .upfront-section .up-step.done .up-node .up-ck {
          stroke-dashoffset: 0;
        }
        .upfront-section .up-stem {
          position: relative;
          width: 2px;
          height: 30px;
          background: repeating-linear-gradient(var(--bd) 0 4px, transparent 4px 8px);
        }
        .upfront-section .up-stem::after {
          content: "";
          position: absolute;
          left: -3px;
          top: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--blue);
          opacity: 0;
        }
        .upfront-section .up-step.active .up-stem {
          background: linear-gradient(var(--blue), var(--blue2));
        }
        .upfront-section .up-step.active .up-stem::after {
          animation: up-travel .9s ease-in infinite;
        }
        @keyframes up-travel {
          0% { top: -4px; opacity: 1; }
          100% { top: 26px; opacity: 0; }
        }
        .upfront-section .up-step.done .up-stem {
          background: var(--blue);
        }
        .upfront-section .up-card {
          position: relative;
          flex: 1;
          width: 100%;
          background: var(--card);
          border: 1.5px solid var(--bd);
          border-radius: 20px;
          padding: 22px 20px 24px;
          overflow: hidden;
          transition: transform .5s cubic-bezier(.3,1.4,.5,1), border-color .4s, box-shadow .5s;
        }
        .upfront-section .up-card:hover {
          border-color: var(--blue);
        }
        .upfront-section .up-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .upfront-section .up-tile {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: var(--tile);
          border: 1px solid var(--bd2);
          display: grid;
          place-items: center;
          transition: background .4s, border-color .4s;
        }
        .upfront-section .up-tile svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: var(--blue);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke .4s;
        }
        .upfront-section .up-num {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--num);
          transition: color .4s;
        }
        .upfront-section .up-card h3 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--ink);
        }
        .upfront-section .up-card p {
          font-size: .88rem;
          color: var(--mut);
        }
        .upfront-section .up-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--blue), var(--blue2));
          transform: scaleX(0);
          transform-origin: left;
        }
        .upfront-section .up-step.active .up-card {
          transform: translateY(-10px);
          border-color: var(--blue);
          box-shadow: 0 24px 44px -18px var(--sh);
        }
        .upfront-section .up-step.active .up-card::after {
          animation: up-fillx var(--dwell) linear forwards;
        }
        .upfront-section .up-step.active .up-tile {
          background: var(--blue);
          border-color: var(--blue);
        }
        .upfront-section .up-step.active .up-tile svg {
          stroke: #fff;
          animation: up-wob 1.6s ease-in-out infinite;
        }
        @keyframes up-wob {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-9deg) scale(1.1); }
          75% { transform: rotate(9deg) scale(1.1); }
        }
        .upfront-section .up-step.active .up-num,
        .upfront-section .up-step.done .up-num {
          color: var(--blue);
        }
        .upfront-section .up-step.done .up-card {
          border-color: color-mix(in srgb, var(--blue) 55%, var(--bd));
        }
        .upfront-section .up-step.done .up-card::after {
          transform: scaleX(1);
        }
        .upfront-section .up-banner {
          position: relative;
          overflow: hidden;
          margin-top: 44px;
          border-radius: 24px;
          padding: 34px 24px;
          text-align: center;
          color: #fff;
          background: linear-gradient(120deg, #1d4ed8, #2563eb 55%, #3b82f6);
          transition: transform .6s cubic-bezier(.3,1.5,.5,1), box-shadow .6s;
        }
        .upfront-section .up-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.28) 50%, transparent 65%);
          transform: translateX(-100%);
          animation: up-sweep 4.5s ease-in-out infinite;
        }
        @keyframes up-sweep {
          60%, 100% { transform: translateX(100%); }
        }
        .upfront-section.complete .up-banner {
          transform: scale(1.02);
          box-shadow: 0 26px 60px -18px var(--sh);
        }
        @media (max-width: 760px) {
          .upfront-section .up-wrap { padding: 0 18px; }
          .upfront-section .up-head { margin-bottom: 40px; }
          .upfront-section .up-steps { grid-template-columns: 1fr; }
          .upfront-section .up-step { align-items: stretch; padding: 0 0 26px 80px; }
          .upfront-section .up-step:last-child { padding-bottom: 0; }
          .upfront-section .up-node { position: absolute; left: 0; top: 0; }
          .upfront-section .up-seg { left: 28.5px; top: 30px; width: 3px; height: 100%; }
          .upfront-section .up-seg i { transform: scaleY(0); transform-origin: top; }
          .upfront-section .up-step.done .up-seg i { transform: scaleY(1); }
          .upfront-section .up-step.active .up-seg i { animation: up-filly var(--dwell) linear forwards; }
          .upfront-section .up-stem { display: none; }
          .upfront-section .up-step.active .up-card { transform: translateX(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .upfront-section *, .upfront-section *::before, .upfront-section *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="up-wrap">
        <div className="up-head">
          <h2>Technology without the massive upfront cost.</h2>
          <p>One ongoing partnership. Everything your business needs to build, launch and grow.</p>
        </div>

        <div className="up-steps" id="up-steps-container">
          <div className="up-step">
            <div className="up-seg"><i></i></div>
            <div className="up-node">
              <svg className="up-ring" viewBox="0 0 60 60"><circle className="up-bg" cx="30" cy="30" r="28.5"/><circle className="up-pr" cx="30" cy="30" r="28.5"/></svg>
              <svg className="up-ic" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              <svg className="up-ck" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
            </div>
            <div className="up-stem"></div>
            <div className="up-card">
              <div className="up-top">
                <div className="up-tile">
                  <svg viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                </div>
                <span className="up-num">01</span>
              </div>
              <h3>Build</h3>
              <p>Websites, web apps, software, e-commerce platforms and digital products engineered for performance.</p>
            </div>
          </div>

          <div className="up-step">
            <div className="up-seg"><i></i></div>
            <div className="up-node">
              <svg className="up-ring" viewBox="0 0 60 60"><circle className="up-bg" cx="30" cy="30" r="28.5"/><circle className="up-pr" cx="30" cy="30" r="28.5"/></svg>
              <svg className="up-ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
              <svg className="up-ck" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
            </div>
            <div className="up-stem"></div>
            <div className="up-card">
              <div className="up-top">
                <div className="up-tile">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
                </div>
                <span className="up-num">02</span>
              </div>
              <h3>Launch</h3>
              <p>Deployment, integrations, configuration and everything needed to go live smoothly.</p>
            </div>
          </div>

          <div className="up-step">
            <div className="up-seg"><i></i></div>
            <div className="up-node">
              <svg className="up-ring" viewBox="0 0 60 60"><circle className="up-bg" cx="30" cy="30" r="28.5"/><circle className="up-pr" cx="30" cy="30" r="28.5"/></svg>
              <svg className="up-ic" viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/></svg>
              <svg className="up-ck" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
            </div>
            <div className="up-stem"></div>
            <div className="up-card">
              <div className="up-top">
                <div className="up-tile">
                  <svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span className="up-num">03</span>
              </div>
              <h3>Maintain</h3>
              <p>Updates, fixes, monitoring, security and dedicated ongoing technical support.</p>
            </div>
          </div>

          <div className="up-step">
            <div className="up-seg"><i></i></div>
            <div className="up-node">
              <svg className="up-ring" viewBox="0 0 60 60"><circle className="up-bg" cx="30" cy="30" r="28.5"/><circle className="up-pr" cx="30" cy="30" r="28.5"/></svg>
              <svg className="up-ic" viewBox="0 0 24 24"><path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>
              <svg className="up-ck" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
            </div>
            <div className="up-stem"></div>
            <div className="up-card">
              <div className="up-top">
                <div className="up-tile">
                  <svg viewBox="0 0 24 24"><path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>
                </div>
                <span className="up-num">04</span>
              </div>
              <h3>Grow</h3>
              <p>Continuous improvements, new features, automation and AI solutions that scale with you.</p>
            </div>
          </div>
        </div>

        <div className="up-banner">
          <h4>No large upfront development bill. No need to build your own technical department.</h4>
          <p>Partner with CloudsBuilt and scale your technology effortlessly.</p>
        </div>
      </div>
    </section>
  );
}
