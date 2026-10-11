import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface OurWorkPageProps {
  onOpenContact: () => void;
  onBackToHome: () => void;
}

export function OurWorkPage({ onOpenContact, onBackToHome }: OurWorkPageProps) {
  const HERO_IMAGE = "https://i.postimg.cc/HxqJqkDt/Bigimmense-IT-Company-removebg-preview.png";
  const LIVE_PREVIEW = true;

  const projects = [
    {
      title: "Lavish Men's Saloon",
      category: "Website & Booking Platform",
      desc: "A luxury barbershop website with a filterable services and pricing menu (haircuts, beard, facials and spa packages), an online booking form and an admin portal, styled around the brand's black-and-gold identity.",
      tags: ["Services & Pricing", "Booking Form", "Admin Portal", "Responsive Design"],
      url: "https://lavish-grooming-hub.vercel.app/",
      image: "https://lavish-grooming-hub.vercel.app/assets/hero-TcftImpL.jpg",
      accent: "#2563eb"
    },
    {
      title: "DELULU Fast Food",
      category: "Restaurant Website",
      desc: "A bold, mobile-first website for an Islamabad fast-food brand, with a categorised menu, a featured combo offer, one-tap call ordering and an embedded map to the H-13 outlet.",
      tags: ["Menu Showcase", "Click-to-Call", "Google Maps", "Responsive Design"],
      url: "https://delulu-wesbite.vercel.app/",
      image: "https://delulu-wesbite.vercel.app/assets/hero-burger-BJBPlrJi.jpg",
      accent: "#4f46e5"
    },
    {
      title: "SM Properties",
      category: "Real Estate Website",
      desc: "A real estate website for a Faisal Town agency, with buy and rent search by property type and budget, featured listings, individual property pages, saved favourites and a viewing-booking contact page.",
      tags: ["Property Search", "Listings", "Favourites", "Responsive Design"],
      url: "https://sm-property-and-loges.vercel.app/",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=75",
      accent: "#0284c7"
    },
    {
      title: "Axiom Technical & Vocational Training Institute",
      category: "Education Website",
      desc: "A professional website for a technical and vocational training institute in Rawalpindi, presenting its IT, web development, graphic design and AutoCAD training programmes with its 4.9/5 rating.",
      tags: ["Education", "Course Showcase", "SEO-Ready", "Responsive Design"],
      url: "https://aximon.netlify.app/",
      image: "",
      accent: "#0891b2"
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Our Work | CloudsBuilt";
  }, []);

  return (
    <div className="cwp min-h-screen bg-[#f6f9ff] dark:bg-[#0b1220] text-[#0f172a] dark:text-[#f1f5ff]" ref={containerRef}>
      <style>{`
        .cwp{--cw-top:96px;--cw-bg:#f6f9ff;--cw-glow:#dbe8ff;--cw-card:#fff;--cw-tint:#eef4ff;--cw-ink:#0f172a;--cw-mut:#475569;--cw-bd:#d6e4fb;--cw-blue:#2563eb;--cw-sh:rgba(37,99,235,.38);
        position:relative;overflow:hidden;font-family:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--cw-ink);background:var(--cw-bg)}
        .dark .cwp,.cwp[data-theme="dark"]{--cw-bg:#0b1220;--cw-glow:#15305e;--cw-card:#111b2e;--cw-tint:#16284d;--cw-ink:#f1f5ff;--cw-mut:#9fb0cc;--cw-bd:#243a63;--cw-sh:rgba(59,130,246,.5)}
        .cwp,.cwp *,.cwp *::before,.cwp *::after{box-sizing:border-box}
        .cwp a{text-decoration:none}
        .cwp .cw-badge{display:inline-block;margin:0;padding:7px 18px;border-radius:99px;border:1px solid var(--cw-bd);background:var(--cw-card);color:var(--cw-blue);font-size:.7rem;font-weight:700;line-height:1.4;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 8px 20px -10px var(--cw-sh)}
        .cwp .cw-btn{display:inline-flex;align-items:center;gap:9px;padding:15px 28px;border-radius:99px;background:var(--cw-blue);color:#fff;font:700 .95rem/1 "Plus Jakarta Sans",system-ui,sans-serif;border:0;box-shadow:0 14px 26px -12px var(--cw-sh);transition:transform .25s,box-shadow .25s;cursor:pointer}
        .cwp .cw-btn:hover{transform:translateY(-2px)}
        .cwp .cw-btn svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
        .cwp .cw-btn.cw-alt{background:var(--cw-card);color:var(--cw-ink);box-shadow:0 12px 26px -14px rgba(15,23,42,.4),0 0 0 1px var(--cw-bd)}
        .dark .cwp .cw-btn.cw-alt{background:var(--cw-card);color:var(--cw-ink)}
        /* ---------- hero ---------- */
        .cwp .cw-hero{position:relative;padding:calc(var(--cw-top) + 50px) clamp(20px,5vw,72px) 90px;background:radial-gradient(ellipse 55% 60% at 75% 45%,var(--cw-glow),transparent 72%)}
        .cwp .cw-hero-in{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center;min-height:520px}
        .cwp .cw-h1{margin:22px 0 20px;padding:0;font-family:inherit;font-size:clamp(2.2rem,4.8vw,3.7rem);line-height:1.08;font-weight:800;letter-spacing:-.035em;color:var(--cw-ink)}
        .cwp .cw-h1 span{display:block;color:var(--cw-blue)}
        .cwp .cw-lead{max-width:50ch;margin:0 0 32px;padding:0;color:var(--cw-mut);font-size:1.1rem;line-height:1.7}
        .cwp .cw-cta{display:flex;gap:14px;flex-wrap:wrap}
        .cwp .cw-hero-i{position:relative;display:grid;place-items:center;min-height:380px}
        .cwp .cw-hero-i img{display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:0;background:transparent;box-shadow:none;animation:cw-float 7s ease-in-out infinite}
        @keyframes cw-float{50%{transform:translateY(-14px)}}
        .cwp .cw-hph{position:relative;width:min(100%,520px);aspect-ratio:1.1;animation:cw-float 7s ease-in-out infinite}
        .cwp .cw-hph>*{position:absolute;background:var(--cw-card);border-radius:18px;box-shadow:0 30px 60px -26px var(--cw-sh)}
        .cwp .cw-hph .a{inset:8% 14% 28% 0;background:linear-gradient(135deg,var(--cw-blue),#60a5fa)}
        .cwp .cw-hph .a::before,.cwp .cw-hph .a::after{content:"";position:absolute;left:10%;height:7%;border-radius:99px;background:rgba(255,255,255,.9)}
        .cwp .cw-hph .a::before{top:22%;width:52%}.cwp .cw-hph .a::after{top:36%;width:34%;opacity:.7}
        .cwp .cw-hph .b{right:0;top:30%;width:34%;aspect-ratio:1;display:grid;place-items:center;animation:cw-float 5s -2s ease-in-out infinite}
        .cwp .cw-hph .b::before{content:"";width:46%;height:46%;border-radius:50%;background:conic-gradient(var(--cw-blue) 0 70%,var(--cw-bd) 0)}
        .cwp .cw-hph .c{left:10%;bottom:4%;width:48%;height:26%;animation:cw-float 6s -1s ease-in-out infinite;background:repeating-linear-gradient(90deg,var(--cw-blue) 0 9%,transparent 9% 16%) bottom/100% 55% no-repeat,var(--cw-card)}
        .cwp .cw-hph .d{right:6%;bottom:12%;width:26%;aspect-ratio:2.4;border-radius:99px;animation:cw-float 4.6s -3s ease-in-out infinite}
        .cwp .cw-hph .d::before{content:"";position:absolute;left:12%;top:50%;width:76%;height:20%;margin-top:-10%;border-radius:99px;background:var(--cw-bd)}
        /* ---------- project sections ---------- */
        .cwp .cw-proj{position:relative;min-height:92vh;display:flex;align-items:center;padding:90px clamp(20px,5vw,72px);--pac:#2563eb;--dir:-1;
          background:radial-gradient(ellipse 45% 55% at 72% 50%,color-mix(in srgb,var(--pac) 13%,transparent),transparent 72%)}
        .cwp .cw-proj:nth-of-type(even){background-color:var(--cw-tint)}
        .cwp .cw-proj.cw-flip{--dir:1;background:radial-gradient(ellipse 45% 55% at 28% 50%,color-mix(in srgb,var(--pac) 13%,transparent),transparent 72%)}
        .cwp .cw-proj.cw-flip:nth-of-type(even){background-color:var(--cw-tint)}
        .cwp .cw-orb{position:absolute;width:420px;height:420px;border-radius:50%;background:var(--pac);opacity:.1;filter:blur(70px);right:6%;top:50%;margin-top:-210px;pointer-events:none}
        .cwp .cw-flip .cw-orb{right:auto;left:6%}
        .cwp .cw-in{position:relative;z-index:1;width:100%;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;gap:64px;align-items:center}
        .cwp .cw-flip .cw-in{grid-template-columns:1.1fr .9fr}
        .cwp .cw-flip .cw-txt{order:2}
        .cwp .cw-txt{display:flex;flex-direction:column;align-items:flex-start;gap:16px;min-width:0}
        .cwp .cw-cat{display:inline-block;margin:0;padding:6px 14px;border-radius:99px;border:1px solid var(--cw-bd);background:var(--cw-card);color:var(--pac);font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
        .cwp .cw-name{margin:0;padding:0;font-family:inherit;font-size:clamp(1.8rem,3.5vw,2.8rem);line-height:1.1;font-weight:800;letter-spacing:-.03em;color:var(--cw-ink)}
        .cwp .cw-desc{margin:0;padding:0;max-width:44ch;font-size:1.05rem;line-height:1.7;color:var(--cw-mut)}
        .cwp .cw-tags{display:flex;flex-wrap:wrap;gap:8px}
        .cwp .cw-tags span{padding:5px 12px;border-radius:99px;background:var(--cw-card);border:1px solid var(--cw-bd);font-size:.78rem;font-weight:500;color:var(--cw-ink)}
        .cwp .cw-fr{width:100%;max-width:640px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;border-radius:18px;background:var(--cw-card);border:1px solid var(--cw-bd);box-shadow:0 50px 90px -40px var(--pac),0 24px 44px -28px rgba(15,23,42,.4);aspect-ratio:16/11}
        .cwp .cw-bar{flex:none;display:flex;align-items:center;gap:7px;padding:11px 14px;background:var(--cw-tint);border-bottom:1px solid var(--cw-bd)}
        .cwp .cw-bar i{width:10px;height:10px;border-radius:50%}
        .cwp .cw-bar i:nth-child(1){background:#f87171}.cwp .cw-bar i:nth-child(2){background:#fbbf24}.cwp .cw-bar i:nth-child(3){background:#34d399}
        .cwp .cw-url{flex:1;min-width:0;margin-left:10px;padding:5px 12px;border-radius:99px;background:var(--cw-card);border:1px solid var(--cw-bd);font-size:.72rem;font-weight:500;color:var(--cw-mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .cwp .cw-body{position:relative;flex:1;min-height:0;overflow:hidden;background:var(--cw-card)}
        .cwp .cw-shot{position:absolute;left:0;top:0;width:100%}
        .cwp .cw-shot img{display:block;width:100%;height:auto;max-width:none}
        .cwp .cw-ph{width:100%;aspect-ratio:10/21;padding:5%;display:flex;flex-direction:column;gap:3.4%;background:var(--cw-card)}
        .cwp .w-nav{display:flex;align-items:center;gap:3%}
        .cwp .w-nav i{width:12%;aspect-ratio:3/1;border-radius:6px;background:var(--pac)}
        .cwp .w-nav span{width:9%;aspect-ratio:3/.8;border-radius:4px;background:var(--cw-bd)}
        .cwp .w-nav span:nth-of-type(1){margin-left:auto}
        .cwp .w-hero{aspect-ratio:16/6.6;border-radius:10px;padding:5%;display:flex;flex-direction:column;gap:6%;justify-content:center;background:linear-gradient(135deg,var(--pac),color-mix(in srgb,var(--pac) 45%,#fff))}
        .cwp .w-hero b{display:block;width:55%;height:11%;border-radius:4px;background:rgba(255,255,255,.92)}
        .cwp .w-hero b+b{width:38%;opacity:.7}
        .cwp .w-hero u{display:block;width:16%;height:13%;margin-top:2%;border-radius:99px;background:#fff}
        .cwp .cw-cover{position:absolute;inset:0;z-index:3;display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;background:linear-gradient(transparent 55%,rgba(15,23,42,.38));opacity:0;transition:opacity .3s}
        .cwp .cw-cover span{padding:8px 16px;border-radius:99px;background:#fff;color:#0f172a;font-size:.8rem;font-weight:700;box-shadow:0 10px 24px -10px rgba(0,0,0,.45)}
        .cwp .cw-body:hover .cw-cover{opacity:1}
        .cwp .cw-live-tag{flex:none;display:inline-flex;align-items:center;gap:6px;margin-left:10px;padding:4px 10px;border-radius:99px;background:#dcfce7;color:#15803d;font-size:.62rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
        .cwp .cw-live-tag::before{content:"";width:7px;height:7px;border-radius:50%;background:#22c55e}
        /* ---------- closing call to action + footer ---------- */
        .cwp .cw-end{padding:90px clamp(20px,5vw,72px)}
        .cwp .cw-band{position:relative;overflow:hidden;max-width:1080px;margin:0 auto;padding:64px 32px;border-radius:32px;text-align:center;color:#fff;background:linear-gradient(120deg,#1d4ed8,#2563eb 55%,#3b82f6);box-shadow:0 40px 80px -40px var(--cw-sh)}
        .cwp .cw-band h2{position:relative;margin:0 0 12px;font-family:inherit;font-size:clamp(1.7rem,3.6vw,2.7rem);line-height:1.12;font-weight:800;letter-spacing:-.03em;color:#fff}
        .cwp .cw-band p{position:relative;max-width:52ch;margin:0 auto 28px;color:rgba(255,255,255,.88);font-size:1.05rem;line-height:1.65}
        .cwp .cw-band .cw-cta{position:relative;justify-content:center}
        .cwp .cw-band .cw-btn{background:#fff;color:#1d4ed8;box-shadow:0 14px 26px -12px rgba(0,0,0,.4)}
        .cwp .cw-band .cw-btn.cw-alt{background:transparent;color:#fff;box-shadow:0 0 0 1.5px rgba(255,255,255,.7)}
        .cwp .cw-foot{padding:26px 20px 34px;text-align:center;color:var(--cw-mut);font-size:.85rem;border-top:1px solid var(--cw-bd)}
        @media (max-width:900px){
        .cwp{--cw-top:72px}
        .cwp .cw-hero{padding-bottom:60px}
        .cwp .cw-hero-in{grid-template-columns:1fr;gap:20px;min-height:0}
        .cwp .cw-hero-i{min-height:0;order:2}
        .cwp .cw-hero-i img{max-width:420px}
        .cwp .cw-proj{min-height:0;padding:64px 20px}
        .cwp .cw-in,.cwp .cw-flip .cw-in{grid-template-columns:1fr;gap:34px}
        .cwp .cw-flip .cw-txt{order:0}
        .cwp .cw-orb{width:260px;height:260px;margin-top:-130px}
        .cwp .cw-end{padding:60px 20px}
        .cwp .cw-band{padding:46px 22px;border-radius:26px}
        }
      `}</style>

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-700 dark:text-blue-400 cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      {/* ===== HERO ===== */}
      <section className="cw-hero">
        <div className="cw-hero-in">
          <div className="cw-hero-t">
            <div style={{ '--i': 0 } as React.CSSProperties}><span className="cw-badge">Our Work</span></div>
            <h1 className="cw-h1" style={{ '--i': 1 } as React.CSSProperties}>Technology we've built,<span>for businesses that grow.</span></h1>
            <p className="cw-lead" style={{ '--i': 2 } as React.CSSProperties}>From websites and e-commerce stores to custom software and automation, here is a look at what we deliver as your complete technology partner.</p>
            <div className="cw-cta" style={{ '--i': 3 } as React.CSSProperties}>
              <button onClick={onOpenContact} className="cw-btn">Start a Project <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
              <a className="cw-btn cw-alt" href="#cw-list">See Our Projects</a>
            </div>
          </div>
          <div className="cw-hero-i">
            {HERO_IMAGE ? (
              <img src={HERO_IMAGE} alt="CloudsBuilt IT" referrerPolicy="no-referrer" />
            ) : (
              <div className="cw-hph" id="cw-hph"><span className="a"></span><span className="b"></span><span className="c"></span><span className="d"></span></div>
            )}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <div id="cw-list">
        {projects.map((p, i) => {
          const link = p.url || '#';
          const shown = p.url ? new URL(p.url).hostname.replace(/^www\./, '') : 'your-website-link.com';
          const isFlip = i % 2 === 1;

          return (
            <section key={i} className={`cw-proj ${isFlip ? 'cw-flip' : ''}`} style={{ '--pac': p.accent || '#2563eb' } as React.CSSProperties}>
              <div className="cw-orb"></div>
              <div className="cw-in">
                <div className="cw-txt">
                  <span className="cw-cat">{p.category}</span>
                  <h2 className="cw-name">{p.title}</h2>
                  <p className="cw-desc">{p.desc}</p>
                  <div className="cw-tags">
                    {p.tags.map((t, tIdx) => (
                      <span key={tIdx}>{t}</span>
                    ))}
                  </div>
                  <a className="cw-btn" href={link} target="_blank" rel="noopener noreferrer" style={{ background: p.accent || '#2563eb' }}>
                    Visit website <ArrowRight className="w-4 h-4 inline ml-1" />
                  </a>
                </div>
                <div className="cw-mockw">
                  <div className="cw-fr">
                    <div className="cw-bar">
                      <i></i><i></i><i></i>
                      <span className="cw-live-tag">Live</span>
                      <a className="cw-url" href={link} target="_blank" rel="noopener noreferrer">{shown}</a>
                    </div>
                    <div className="cw-body">
                      <div className="cw-shot relative w-full h-full min-h-[300px]">
                        {LIVE_PREVIEW && p.url ? (
                          <iframe
                            src={p.url}
                            title={p.title}
                            className="w-full h-[360px] border-0 bg-white"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            referrerPolicy="no-referrer"
                          />
                        ) : p.image ? (
                          <img src={p.image} alt={p.title} referrerPolicy="no-referrer" className="w-full h-auto object-cover" />
                        ) : (
                          <div className="cw-ph">
                            <div className="w-nav"><i></i><span></span><span></span><span></span></div>
                            <div className="w-hero"><b></b><b></b><u></u></div>
                          </div>
                        )}
                      </div>
                      <a className="cw-cover" href={link} target="_blank" rel="noopener noreferrer">
                        <span>Open live site ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===== CLOSING CALL TO ACTION ===== */}
      <section className="cw-end">
        <div className="cw-band">
          <h2>Have a project in mind?</h2>
          <p>Tell us what you want to build. We'll handle the technology, from first idea to launch and beyond.</p>
          <div className="cw-cta">
            <button onClick={onOpenContact} className="cw-btn">Start a Project <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
            <button onClick={onOpenContact} className="cw-btn cw-alt">Talk to Us</button>
          </div>
        </div>
      </section>
      <footer className="cw-foot">&copy; CloudsBuilt. All rights reserved.</footer>
    </div>
  );
}
