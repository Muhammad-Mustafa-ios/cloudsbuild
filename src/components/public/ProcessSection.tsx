import React, { useEffect, useRef } from 'react';

export function ProcessSection() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const STEPS = [
      ["01", "Discovery & Strategy", "#7ac943", '<circle class="t" cx="10.5" cy="10.5" r="6.5"/><circle cx="10.5" cy="10.5" r="2.2"/><path d="M15.5 15.5L21 21"/>'],
      ["02", "Design & Architecture", "#14c8a8", '<rect class="t" x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M9 9v11M13 13h5M13 16.5h3"/>'],
      ["03", "Development & AI", "#12b5d8", '<rect class="t" x="2.5" y="5" width="19" height="13" rx="2.5"/><path d="M9 9.5L6.5 11.5 9 13.5M15 9.5l2.5 2-2.5 2M12.7 9l-1.4 5M8 21.5h8M19.5 1.5v3M18 3h3"/>'],
      ["04", "Testing & Polish", "#1d6fd1", '<path class="t" d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 5-5"/>'],
      ["05", "Launch & Growth", "#7a1fd1", '<path class="t" d="M12 2c3.5 2.5 5 6 5 10l-2 3H9l-2-3c0-4 1.5-7.5 5-10z"/><circle cx="12" cy="9.5" r="1.6"/><path d="M7 13l-3 3 1 3 3-2M17 13l3 3-1 3-3-2M10 18l2 4 2-4"/>']
    ];

    const NS = "http://www.w3.org/2000/svg";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, nodes: HTMLElement[] = [], texts: HTMLElement[] = [], plane: HTMLElement, P: SVGPathElement, M: SVGPathElement, stops: number[] = [], L = 0, timeline: any[] = [], tTotal = 0, startT = 0, visible = false;

    function curve(pts: number[][]) {
      let d = `M${pts[0][0]},${pts[0][1]}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
      }
      return d;
    }

    function build() {
      cancelAnimationFrame(raf);
      stage.innerHTML = "";
      const W = stage.clientWidth || 1000, mobile = W < 760;
      let H, pts, d = mobile ? 76 : 104, tw = mobile ? 160 : 220, pos: number[][] = [];
      
      if (mobile) {
        H = STEPS.length * 150 + 40;
        pos = STEPS.map((_, i) => [W / 2, 70 + i * 150]);
        pts = [...pos, [W / 2, H - 20]];
      } else {
        H = 320;
        const stepWidth = W / 6;
        pos = [
          [stepWidth * 1, H * 0.44],
          [stepWidth * 2, H * 0.44],
          [stepWidth * 3, H * 0.44],
          [stepWidth * 4, H * 0.44],
          [stepWidth * 5, H * 0.44],
        ];
        pts = [...pos, [W - 40, H * 0.44]];
      }
      stage.style.height = H + "px";

      const svg = document.createElementNS(NS, "svg");
      svg.id = "path";
      svg.setAttribute("aria-hidden", "true");
      const dd = curve(pts);
      svg.innerHTML = `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
      ${STEPS.map((s, i) => `<stop offset="${i / 4}" stop-color="${s[2]}"/>`).join("")}</linearGradient>
      <mask id="m"><path id="solid" d="${dd}" fill="none" stroke="#fff" stroke-width="10"/></mask></defs>
      <path id="base" d="${dd}" fill="none" stroke="var(--dot)" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 12"/>
      <path d="${dd}" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 12" mask="url(#m)"/>`;
      stage.appendChild(svg);

      P = svg.querySelector("#base") as SVGPathElement;
      M = svg.querySelector("#solid") as SVGPathElement;
      if (!P || !M) return;
      L = P.getTotalLength();
      M.style.strokeDasharray = String(L);
      M.style.strokeDashoffset = String(L);

      stops = []; let last = 0;
      pos.forEach((p, i) => {
        let best = last, bd = 1e9;
        for (let l = last; l <= L; l += 2) {
          const q = P.getPointAtLength(l), dist = Math.hypot(q.x - p[0], q.y - p[1]);
          if (dist < bd) { bd = dist; best = l; }
        }
        stops.push(best); last = best;
      });

      nodes = []; texts = [];
      STEPS.forEach((s, i) => {
        const n = document.createElement("div");
        n.className = "pr-node";
        n.style.cssText = `--c:${s[2]};--d:${d}px;--r:${[200, 150, 240, 20, 90][i]}deg;left:${pos[i][0]}px;top:${pos[i][1]}px`;
        n.innerHTML = `<div class="pr-ring"></div><div class="pr-full"></div><div class="pr-disc"><svg viewBox="0 0 24 24">${s[3]}</svg></div>`;
        
        const t = document.createElement("div");
        t.className = "pr-step";
        t.style.cssText = `--c:${s[2]};--tw:${tw}px`;
        t.innerHTML = `<span style="display:inline-block;font:700 15px 'Plus Jakarta Sans',sans-serif;color:var(--mute);padding-bottom:3px;border-bottom:2px solid var(--dot);transition:.4s">${s[0]}</span><h3 style="font:700 18px/1.3 'Plus Jakarta Sans',sans-serif;margin:6px 0 0;color:var(--ink);letter-spacing:-.01em">${s[1]}</h3>`;
        stage.appendChild(n);
        stage.appendChild(t);

        if (mobile) {
          t.style.left = (W / 2 + 55) + "px";
          t.style.top = (pos[i][1] - 24) + "px";
          t.style.textAlign = "left";
        } else {
          t.style.left = (pos[i][0] - tw / 2) + "px";
          t.style.top = (pos[i][1] + d / 2 + 14) + "px";
          t.style.textAlign = "center";
        }
        nodes.push(n);
        texts.push(t);
      });

      plane = document.createElement("div");
      plane.id = "pr-plane";
      plane.innerHTML = '<svg viewBox="0 0 24 24"><path d="M2 11.5L22 3l-5.5 18-4.2-6.8L2 11.5zM22 3L12.3 14.2"/></svg>';
      stage.appendChild(plane);

      timeline = []; let t = 0;
      const legs = [[0, 0, .6, 0], ...stops.slice(1).map((s, i) => [stops[i], s, 1.5, .4]), [stops[4], L, 2.0, 0]];
      legs.forEach((g, i) => {
        timeline.push({ t0: t, l0: g[0], l1: g[1], dur: g[2], node: i < 5 ? i : -1 });
        t += g[2] + g[3];
      });
      tTotal = t + 1.2;

      if (reduce) {
        nodes.forEach(n => n.classList.add("on"));
        texts.forEach(x => x.classList.add("on"));
        M.style.strokeDashoffset = "0";
        return;
      }
      startT = performance.now();
      if (visible) raf = requestAnimationFrame(tick);
    }

    const ease = (x: number) => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

    function activate(i: number) {
      if (!nodes[i] || nodes[i].classList.contains("on")) return;
      nodes[i].classList.add("on", "pop");
      texts[i].classList.add("on");
      const n = nodes[i];
      setTimeout(() => n.classList.remove("pop"), 800);
    }

    function tick(now: number) {
      let t = (now - startT) / 1000;
      if (t >= tTotal) {
        nodes.forEach(n => n.classList.remove("on", "pop"));
        texts.forEach(x => x.classList.remove("on"));
        M.style.strokeDashoffset = String(L);
        startT = now;
        t = 0;
        plane.style.opacity = "0";
      }
      let len = 0, seg = timeline[0];
      for (const s of timeline) { if (t >= s.t0) seg = s; }
      const k = Math.min(1, Math.max(0, (t - seg.t0) / seg.dur));
      len = seg.l0 + (seg.l1 - seg.l0) * ease(k);
      if (seg.dur === .6 && t > .45) activate(0);
      for (let i = 1; i < 5; i++) {
        if (len >= stops[i] - 1 && t >= timeline[i].t0 + timeline[i].dur - .05) activate(i);
      }
      if (timeline.indexOf(seg) === 0 && t < .01) len = 0;
      const q = P.getPointAtLength(len), q2 = P.getPointAtLength(Math.min(L, len + 3)), q1 = P.getPointAtLength(Math.max(0, len - 3));
      const ang = Math.atan2(q2.y - q1.y, q2.x - q1.x) * 180 / Math.PI + 22;
      const fade = t > timeline[5].t0 + timeline[5].dur - .4 ? Math.max(0, (timeline[5].t0 + timeline[5].dur - t) / .4) : 1;
      plane.style.opacity = String(fade);
      plane.style.transform = `translate(${q.x}px,${q.y}px) rotate(${ang}deg) scale(${1 + Math.sin(t * 5) * .03})`;
      M.style.strokeDashoffset = String(L - len);
      raf = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(e => {
      visible = e[0].isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) {
        startT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: .25 });
    observer.observe(stage);

    let rt: any;
    const handleResize = () => { clearTimeout(rt); rt = setTimeout(build, 200); };
    window.addEventListener("resize", handleResize);

    build();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-white to-[#F0F6FF] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <style>{`
        #stage { position: relative; width: 100%; }
        svg#path { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .pr-node { --s:1; position: absolute; width: var(--d); height: var(--d); transform: translate(-50%, -50%) scale(var(--s)); z-index: 3; filter: drop-shadow(0 12px 18px color-mix(in srgb, var(--c) 35%, transparent)); transition: filter .5s; }
        .pr-ring, .pr-full { position: absolute; inset: 0; border-radius: 50%; -webkit-mask: radial-gradient(circle, transparent 61%, #000 62%); mask: radial-gradient(circle, transparent 61%, #000 62%); }
        .pr-ring { background: conic-gradient(var(--c) 0 58%, transparent 58% 63%, var(--c) 63% 70%, transparent 70%); transform: rotate(var(--r)); opacity: .85; }
        .pr-full { background: var(--c); opacity: 0; transition: opacity .4s; }
        .pr-disc { position: absolute; inset: 10%; border-radius: 50%; background: #ffffff; box-shadow: 0 12px 30px rgba(15,23,42,.2), inset 0 0 0 6px color-mix(in srgb, var(--c) 16%, #fff); display: grid; place-items: center; transition: box-shadow .4s; }
        .dark .pr-disc { background: #171f35; }
        .pr-disc svg { width: 56%; height: 56%; fill: none; stroke: #64748b; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: stroke .4s, opacity .4s; opacity: .75; }
        .dark .pr-disc svg { stroke: #9aa6bf; }
        .pr-disc svg .t { fill: #64748b; fill-opacity: .15; transition: .4s; }
        .dark .pr-disc svg .t { fill: #9aa6bf; }
        .pr-node.on .pr-disc svg { opacity: 1; }
        .pr-node.on .pr-disc svg .t { fill: var(--c); fill-opacity: .25; }
        .pr-node.on .pr-full { opacity: 1; }
        .pr-node.on .pr-ring { opacity: 0; }
        .pr-node.on { filter: drop-shadow(0 16px 26px color-mix(in srgb, var(--c) 60%, transparent)); }
        .pr-node.on .pr-disc { box-shadow: 0 0 0 9px color-mix(in srgb, var(--c) 24%, transparent), 0 18px 38px color-mix(in srgb, var(--c) 45%, transparent), inset 0 0 0 6px color-mix(in srgb, var(--c) 16%, #fff); }
        .pr-node.on .pr-disc svg { stroke: var(--c); }
        .pr-node.pop { animation: pr-pop .75s cubic-bezier(.2,.9,.3,1.3) forwards; }
        .pr-node.on:not(.pr-pop) { --s: 1.15; }
        @keyframes pr-pop { 0% { transform: translate(-50%, -50%) scale(.85); } 55% { transform: translate(-50%, -50%) scale(1.35); } 100% { transform: translate(-50%, -50%) scale(1.15); } }
        .pr-step { position: absolute; z-index: 2; width: var(--tw); padding: 4px 8px; opacity: 0; transition: opacity .6s, transform .6s; transform: translateY(12px); }
        .pr-step.on { opacity: 1; transform: none; }
        .pr-step.on span { color: var(--c) !important; border-color: var(--c) !important; }
        #pr-plane { position: absolute; left: 0; top: 0; width: 44px; height: 44px; margin: -22px 0 0 -22px; z-index: 4; pointer-events: none; opacity: 0; filter: drop-shadow(0 6px 8px rgba(37,99,235,.25)); }
        #pr-plane svg { width: 100%; height: 100%; fill: #ffffff; stroke: #0f172a; stroke-width: 1.5; stroke-linejoin: round; stroke-linecap: round; }
        .dark #pr-plane svg { fill: #171f35; stroke: #f1f4fb; }
        :root { --dot: #bcd0f5; --mute: #64748b; --ink: #0f172a; }
        .dark { --dot: #3a4663; --mute: #9aa6bf; --ink: #f1f4fb; }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-[#2563EB] dark:text-blue-400 text-xs font-bold tracking-wider uppercase shadow-xs mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Five steps. <span className="text-[#2563EB] block mt-1">We do almost all of it.</span>
          </h2>
        </div>
        <div ref={stageRef} id="stage"></div>
      </div>
    </section>
  );
}
