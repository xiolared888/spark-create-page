import { useEffect, useMemo, useRef, useState } from "react";
import "./lexie.css";

const IMG = {
  paw: "/lexie/c098c2eb-6ae3-4920-8dc4-d3e87840553e.png",
  hero: "/lexie/0aa59735-4f5b-4a59-8d2e-03c3b8815e83.png",
  portrait: "/lexie/caf6fd10-7c89-42b1-91c6-225585031180.png",
  pier: "/lexie/d001249e-f4f2-45ff-9ec4-e83a89919585.png",
  dunes: "/lexie/7cd8ab36-d61c-4a16-8ce6-d401620b5cc1.png",
  preserve: "/lexie/56f802f7-f02f-4dfb-a55a-2b2fb97bd89f.png",
  buddy: "/lexie/25493a81-ef8e-4705-8536-d17f7a10ea91.png",
};

type Pkg = "short" | "beach" | "adventure";
const PRICES: Record<Pkg, number> = { short: 12, beach: 22, adventure: 32 };
const NAMES: Record<Pkg, string> = {
  short: "Short & Sweet (30 min)",
  beach: "Beach Buddy (60 min)",
  adventure: "Big Adventure (90 min)",
};
const ALL_SLOTS = ["8:00 am", "9:30 am", "11:00 am", "1:00 pm", "2:30 pm", "4:00 pm"];
const TAKEN = new Set(["11:00 am", "2:30 pm"]);

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function LexiesWalks() {
  const [walks, setWalks] = useState(148);
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.7) setWalks((n) => n + 1);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  // Days
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 10 }, (_, i) => {
      const d = new Date(today.getTime() + i * 86400000);
      const dow = d.getDay();
      const isWeekend = dow === 0 || dow === 6;
      return {
        idx: i,
        date: d,
        dow,
        isWeekend,
        full: isWeekend && i === 1,
        label: d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        dayNum: d.getDate(),
        dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dow],
      };
    });
  }, []);

  const [selDay, setSelDay] = useState<number | null>(null);
  const [selSlot, setSelSlot] = useState<string | null>(null);
  const [pkg, setPkg] = useState<Pkg>("short");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dog, setDog] = useState("");
  const [size, setSize] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState<null | {
    name: string; phone: string; dog: string; size: string;
    pkg: Pkg; price: number; dayLabel: string; slot: string;
  }>(null);

  const [goalPct, setGoalPct] = useState(58);

  const choosePkgAndScroll = (p: Pkg) => {
    setPkg(p);
    scrollTo("book");
  };

  const submit = () => {
    const e: Record<string, boolean> = {};
    if (name.trim().length < 2) e.name = true;
    if (!/\d{3}/.test(phone)) e.phone = true;
    if (dog.trim().length < 1) e.dog = true;
    if (!size) e.size = true;
    if (selDay === null) e.day = true;
    if (!selSlot) e.slot = true;
    setErrors(e);
    if (Object.keys(e).length) return;

    const day = days.find((d) => d.idx === selDay)!;
    const price = PRICES[pkg];
    setConfirmed({
      name, phone, dog, size, pkg, price,
      dayLabel: day.label, slot: selSlot!,
    });
    setGoalPct((c) => Math.min(100, c + Math.round(price / 3)));
    setTimeout(
      () => document.getElementById("confirmPane")?.scrollIntoView({ behavior: "smooth", block: "center" }),
      50,
    );
  };

  // Testimonials carousel
  const tTrack = useRef<HTMLDivElement>(null);
  const tIdx = useRef(0);
  const tCount = 5;
  const stepT = (dir: number) => {
    if (!tTrack.current) return;
    tIdx.current = (tIdx.current + dir + tCount) % tCount;
    const card = tTrack.current.querySelector<HTMLElement>(".t-card");
    if (!card) return;
    tTrack.current.scrollTo({ left: tIdx.current * (card.offsetWidth + 18), behavior: "smooth" });
  };
  useEffect(() => {
    const t = setInterval(() => stepT(1), 6000);
    return () => clearInterval(t);
  }, []);

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert("Link copied — thank you for sharing Lexie's site with a neighbor! 🐾");
  };

  const Logo = () => (
    <div className="logo">
      <span className="paw">
        <img src={IMG.paw} alt="Lexie's Walks paw logo" />
      </span>{" "}
      Lexie's Walks
    </div>
  );

  return (
    <div className="lexie-root" data-accent="marigold">
      {/* Urgency */}
      <div className="urgency">
        <span>
          <span className="dot" /> <strong>3 weekend slots left</strong> this Saturday · Text (805) 556-5059 by Friday 6pm
        </span>
        <span>·</span>
        <span>
          Help a 6th-grader fund her art school dream — <strong>every walk counts</strong>
        </span>
        <span>·</span>
        <span>Serving Grover Beach, Arroyo Grande, Pismo, Oceano &amp; Shell Beach</span>
      </div>

      {/* Nav */}
      <nav className="top">
        <Logo />
        <ul>
          <li><a href="#about">About Lexie</a></li>
          <li><a href="#services">Walks &amp; Rates</a></li>
          <li><a href="#area">Coverage</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#book">Book</a></li>
        </ul>
        <div className="spacer" />
        <a href="tel:+18055565059" style={{ fontSize: 14, marginRight: 8, whiteSpace: "nowrap", color: "var(--ink)", textDecoration: "none", fontWeight: 600 }}>
          📞 (805) 556-5059
        </a>
        <button className="btn primary sm" onClick={() => scrollTo("book")}>Book a Walk →</button>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Weekend Dog Walking · Five Cities, CA</div>
            <h1>Your pup deserves a weekend <em>adventure.</em></h1>
            <p className="lede">
              Hi! I'm <b>Lexie Johnson</b>, a 6th grader at Fairview Elementary. On Saturdays and Sundays, I walk dogs of every size, age, and energy level all over the Five Cities — from Grover Beach to Arroyo Grande. Every dollar I earn goes toward art supplies and building my tiny business.{" "}
              <span className="hand" style={{ fontSize: 22 }}>&amp; your pup gets the best weekend ever.</span>
            </p>
            <div className="hero-ctas">
              <button className="btn primary lg" onClick={() => scrollTo("book")}>Book this weekend →</button>
              <button className="btn ghost lg" onClick={() => scrollTo("about")}>Meet Lexie</button>
            </div>
            <div className="hero-meta">
              <div className="stat"><div className="n">{walks}</div><div className="l">Happy walks &amp; counting</div></div>
              <div className="stat"><div className="n">4.9 ★</div><div className="l">From 32 local families</div></div>
              <div className="stat"><div className="n">$12</div><div className="l">30-minute walk</div></div>
            </div>
          </div>
          <div>
            <div className="hero-photo">
              <img src={IMG.hero} alt="Lexie hugging a golden retriever" />
              <div className="sticker s1">hi, I'm Lexie!</div>
              <div className="sticker s2">5 Cities covered ✦</div>
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="about" id="about">
        <div className="wrap about-grid">
          <div className="portrait">
            <img src={IMG.portrait} alt="Lexie making art at her desk — crafts funded by dog walking" />
          </div>
          <div>
            <div className="eyebrow">Meet Lexie</div>
            <h2>A 6th-grader with a leash, a sketchbook, and a big dream.</h2>
            <p>Lexie has loved two things since kindergarten: <b>dogs</b> and <b>drawing</b>. This fall she saved up for her first set of Copic markers by pet-sitting for the neighbors — and realized she could do something bigger.</p>
            <p>Every weekend Lexie walks dogs around Grover Beach, the Bob Jones Trail, and the dunes. She handles tiny seniors, bouncy puppies, shy rescues, and everyone in between. Every walk funds a sketchbook, a canvas, or a brush — and every kind neighbor becomes part of her story.</p>
            <p><b>You're not just booking a walk. You're helping a kid chase an art-school dream.</b></p>
            <div className="note">
              "I promise to bring your dog home happy, muddy (just a little), and ready for a nap. Thank you for believing in me."
              <span className="sig">— Lexie ✿</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="eyebrow">Walks &amp; rates</div>
          <h2>Pick the walk that fits your pup.</h2>
          <div className="svc-grid">
            <div className="svc">
              <h3>The Short &amp; Sweet</h3>
              <div className="duration">30-minute neighborhood loop</div>
              <div className="price">$12 <small>/ walk</small></div>
              <p className="desc">Perfect for seniors, puppies in training, or rainy-day legs. Close to home, lots of sniff breaks.</p>
              <ul>
                <li>Up to 2 dogs from same household</li>
                <li>Fresh water + treat</li>
                <li>Photo update via text</li>
              </ul>
              <button className="btn ghost sm" onClick={() => choosePkgAndScroll("short")}>Choose</button>
            </div>
            <div className="svc featured">
              <span className="tag">Most booked</span>
              <h3>The Beach Buddy</h3>
              <div className="duration">60-minute beach or trail walk</div>
              <div className="price">$22 <small>/ walk</small></div>
              <p className="desc">Grover Beach dunes, Oceano sand, or the Bob Jones Trail. Salt air, shell breaks, happy-tired dog.</p>
              <ul>
                <li>Paw rinse before home drop-off</li>
                <li>Photo &amp; video memories</li>
                <li>Loose-leash training reminders</li>
              </ul>
              <button className="btn primary sm" onClick={() => choosePkgAndScroll("beach")}>Choose</button>
            </div>
            <div className="svc">
              <h3>The Big Adventure</h3>
              <div className="duration">90 minutes · Pismo Preserve or dunes</div>
              <div className="price">$32 <small>/ walk</small></div>
              <p className="desc">High-energy dogs only please. Includes a water break, a treat bar, and a tuckered-out tail-wag at the end.</p>
              <ul>
                <li>Hill &amp; trail options</li>
                <li>Enrichment sniff stops</li>
                <li>Written journal entry per walk</li>
              </ul>
              <button className="btn ghost sm" onClick={() => choosePkgAndScroll("adventure")}>Choose</button>
            </div>
          </div>
        </div>
      </section>

      {/* Area */}
      <section className="area" id="area">
        <div className="wrap area-grid">
          <div>
            <div className="eyebrow" style={{ color: "var(--accent)" }}>Service area</div>
            <h2>All Five Cities. One kid with a leash.</h2>
            <p className="lede">I walk Saturdays &amp; Sundays in a 7-mile radius from Grover Beach. Mom drives, I walk — and your dog gets the whole coast as a backyard.</p>
            <div className="cities">
              <div className="city home"><div><div className="n">Grover Beach</div><div className="d">Home base · 10 min</div></div><div>🏠</div></div>
              <div className="city"><div><div className="n">Arroyo Grande</div><div className="d">Village &amp; hills</div></div><div>→</div></div>
              <div className="city"><div><div className="n">Pismo Beach</div><div className="d">Preserve trails</div></div><div>→</div></div>
              <div className="city"><div><div className="n">Oceano</div><div className="d">Dunes &amp; lagoon</div></div><div>→</div></div>
              <div className="city"><div><div className="n">Shell Beach</div><div className="d">Cliff walks</div></div><div>→</div></div>
              <div className="city"><div><div className="n">+ Nipomo (ask)</div><div className="d">For regulars only</div></div><div>→</div></div>
            </div>
          </div>
          <div className="map-card">
            <svg className="map-svg" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="waves" width="12" height="12" patternUnits="userSpaceOnUse">
                  <path d="M0 6 Q3 3 6 6 T12 6" fill="none" stroke="oklch(0.58 0.08 200)" strokeWidth="1" opacity=".5" />
                </pattern>
              </defs>
              <rect width="500" height="400" fill="oklch(0.3 0.035 220)" />
              <rect width="500" height="400" fill="url(#waves)" />
              <path d="M 220 0 Q 250 80 230 140 Q 210 200 260 240 Q 310 290 290 360 Q 280 400 500 400 L 500 0 Z" fill="oklch(0.33 0.03 150)" stroke="oklch(0.5 0.05 150)" strokeWidth="1" />
              <path d="M 240 20 Q 255 100 245 160 Q 240 220 285 280 Q 320 330 310 400" fill="none" stroke="oklch(0.6 0.06 80)" strokeWidth="1.4" strokeDasharray="4 4" opacity=".6" />
              <g fontFamily="ui-monospace, monospace" fontSize="10" fill="oklch(0.95 0.01 80)">
                <circle cx="255" cy="70" r="5" className="pin-ring" />
                <circle cx="255" cy="70" r="3" className="pin" />
                <text x="265" y="74">Shell Beach</text>
                <circle cx="245" cy="140" r="5" className="pin-ring" />
                <circle cx="245" cy="140" r="3" className="pin" />
                <text x="255" y="144">Pismo Beach</text>
                <circle cx="260" cy="210" r="14" fill="none" stroke="var(--accent)" strokeWidth="1" opacity=".5">
                  <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".8;.1;.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="260" cy="210" r="6" fill="var(--accent)" />
                <text x="272" y="207" fontWeight="700" fill="var(--accent)">★ Grover Beach</text>
                <text x="272" y="219" fontSize="8" opacity=".7">home base</text>
                <circle cx="280" cy="270" r="5" className="pin-ring" />
                <circle cx="280" cy="270" r="3" className="pin" />
                <text x="290" y="274">Oceano Dunes</text>
                <circle cx="340" cy="220" r="5" className="pin-ring" />
                <circle cx="340" cy="220" r="3" className="pin" />
                <text x="350" y="224">Arroyo Grande</text>
                <g transform="translate(440, 340)">
                  <circle r="20" fill="none" stroke="oklch(0.6 0.04 150)" strokeWidth="1" />
                  <text y="-24" textAnchor="middle" fontSize="9" fill="oklch(0.7 0.05 150)">N</text>
                  <path d="M 0 -14 L -4 6 L 0 2 L 4 6 Z" fill="var(--accent)" />
                </g>
                <text x="60" y="380" fontSize="9" opacity=".5">Pacific Ocean · not to scale</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery" id="gallery">
        <div className="wrap">
          <div className="eyebrow">From this weekend</div>
          <h2>Real walks. Real tail wags.</h2>
          <p className="lede">Snapshots from a regular Saturday around Grover Beach — your pup could be in next week's set.</p>
          <div className="gal-grid">
            <div className="gal"><img src={IMG.pier} alt="Lexie at Pismo Beach pier with a black lab" /><div className="cap">Pier morning · 8:30am</div></div>
            <div className="gal"><img src={IMG.dunes} alt="Lexie walking a golden retriever at Oceano Dunes" style={{ objectFit: "contain" }} /><div className="cap">Oceano Dunes</div></div>
            <div className="gal"><img src={IMG.preserve} alt="Lexie walking a terrier at Pismo Preserve" style={{ objectFit: "contain" }} /><div className="cap">Pismo Preserve</div></div>
            <div className="gal"><img src={IMG.buddy} alt="Lexie playing with a golden retriever at the park" style={{ objectFit: "contain" }} /><div className="cap">New client — Buddy!</div></div>
            <div className="gal"><div className="ph" data-teal="" style={{ height: "100%" }}><div className="label"><span>Photo — big lab getting paw rinse at home</span></div></div><div className="cap">Paw rinse stop</div></div>
            <div className="gal"><div className="ph" data-ink="" style={{ height: "100%" }}><div className="label"><span>Photo — senior dachshund resting on blanket at sunset</span></div></div><div className="cap">Shell Beach sunset</div></div>
          </div>
        </div>
      </section>

      {/* How */}
      <section className="how">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h2>Four steps. One happy dog.</h2>
          <div className="steps">
            <div className="step"><div className="num">1</div><h3>Book online</h3><p>Pick a weekend slot below. I confirm by text within an hour — usually faster.</p></div>
            <div className="step"><div className="num">2</div><h3>Meet &amp; greet</h3><p>Free 10-minute porch intro before your dog's first walk. Safety first, always.</p></div>
            <div className="step"><div className="num">3</div><h3>We hit the trail</h3><p>You get a GPS map, photos, and a little note about how your pup did.</p></div>
            <div className="step"><div className="num">4</div><h3>Happy return</h3><p>Dog back home, fresh water, paws clean. Payment via Venmo or cash — easy.</p></div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="book" id="book">
        <div className="wrap">
          <div className="eyebrow">Book a walk</div>
          <div className="book-card">
            <div>
              <h2>Reserve this weekend.</h2>
              <p className="lede">Slots fill by Thursday. Fill this in, I'll text you to confirm.</p>

              <div className="form-row">
                <div className={`field ${errors.name ? "err" : ""}`}>
                  <label>Your name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Jamie Alvarez" />
                  <div className="errmsg">Tell me your name 🙂</div>
                </div>
                <div className={`field ${errors.phone ? "err" : ""}`}>
                  <label>Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="(805) 555-0142" />
                  <div className="errmsg">I need a number to text you</div>
                </div>
              </div>

              <div className="form-row">
                <div className={`field ${errors.dog ? "err" : ""}`}>
                  <label>Dog's name</label>
                  <input value={dog} onChange={(e) => setDog(e.target.value)} type="text" placeholder="Biscuit" />
                  <div className="errmsg">Your pup needs an intro!</div>
                </div>
                <div className={`field ${errors.size ? "err" : ""}`}>
                  <label>Breed / size</label>
                  <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Choose size…</option>
                    <option>Tiny (under 15 lbs)</option>
                    <option>Small (15–30 lbs)</option>
                    <option>Medium (30–60 lbs)</option>
                    <option>Big (60–90 lbs)</option>
                    <option>Big-big (90+ lbs)</option>
                  </select>
                  <div className="errmsg">Pick a size so I pack the right gear</div>
                </div>
              </div>

              <div className="form-row full">
                <div className={`field ${errors.day ? "err" : ""}`}>
                  <label>Pick a Saturday or Sunday</label>
                  <div className="days">
                    {days.map((d) => {
                      const cls = ["day", d.isWeekend ? "weekend" : "weekday"];
                      if (d.full) cls.push("full");
                      if (selDay === d.idx) cls.push("selected");
                      const clickable = d.isWeekend && !d.full;
                      return (
                        <div
                          key={d.idx}
                          className={cls.join(" ")}
                          onClick={() => clickable && (setSelDay(d.idx), setErrors((p) => ({ ...p, day: false })))}
                        >
                          <div>{d.dayNum}</div>
                          <div className="dw">{d.dayName}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="errmsg">Pick a weekend day!</div>
                </div>
              </div>

              <div className="form-row full">
                <div className={`field ${errors.slot ? "err" : ""}`}>
                  <label>Pick a time slot</label>
                  <div className="slot-row">
                    {ALL_SLOTS.map((t) => {
                      const taken = TAKEN.has(t);
                      const cls = ["slot"];
                      if (taken) cls.push("taken");
                      if (selSlot === t) cls.push("selected");
                      return (
                        <div
                          key={t}
                          className={cls.join(" ")}
                          onClick={() => !taken && (setSelSlot(t), setErrors((p) => ({ ...p, slot: false })))}
                        >
                          {t}
                        </div>
                      );
                    })}
                  </div>
                  <div className="errmsg">Pick a time!</div>
                </div>
              </div>

              <div className="form-row full">
                <div className="field">
                  <label>Pick a walk</label>
                  <div className="package-pick">
                    {(["short", "beach", "adventure"] as Pkg[]).map((p) => (
                      <div key={p} className={`pk ${pkg === p ? "selected" : ""}`} onClick={() => setPkg(p)}>
                        <div className="pkn">
                          {p === "short" ? "Short & Sweet" : p === "beach" ? "Beach Buddy" : "Big Adventure"}
                        </div>
                        <div className="pkp">
                          {p === "short" ? "30 min · $12" : p === "beach" ? "60 min · $22" : "90 min · $32"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-row full">
                <div className="field">
                  <label>Anything I should know? (optional)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Loves squeaky balls, afraid of skateboards, reactive to other dogs, etc."
                  />
                </div>
              </div>

              <button className="btn primary lg" style={{ width: "100%" }} onClick={submit}>
                Send booking request →
              </button>

              <div id="confirmPane" className={`confirm ${confirmed ? "show" : ""}`}>
                {confirmed && (
                  <>
                    <h3><span className="check">✓</span> Booked! I'll text you in under an hour.</h3>
                    <p>Thanks {confirmed.name.split(" ")[0]}! I'll text {confirmed.phone} within an hour to confirm pickup. — Lexie</p>
                    <div className="receipt">
                      <div><div className="k">Dog</div><div className="v">{confirmed.dog} · {confirmed.size}</div></div>
                      <div><div className="k">Walk</div><div className="v">{NAMES[confirmed.pkg]}</div></div>
                      <div><div className="k">Date</div><div className="v">{confirmed.dayLabel}</div></div>
                      <div><div className="k">Time</div><div className="v">{confirmed.slot}</div></div>
                      <div><div className="k">Where</div><div className="v">Five Cities area</div></div>
                      <div><div className="k">Total</div><div className="v">${confirmed.price} · pay via Venmo or cash</div></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="book-side">
              <div>
                <h4>Why families book Lexie</h4>
                <div style={{ height: 4 }} />
              </div>
              <div className="tick"><div className="ico">✓</div><div><b>Pup-first, always.</b><p>Free meet-&amp;-greet. Water on every walk. Never more than two dogs at once.</p></div></div>
              <div className="tick"><div className="ico">✓</div><div><b>Text updates.</b><p>Photo &amp; GPS map after every walk so you know exactly where we went.</p></div></div>
              <div className="tick"><div className="ico">✓</div><div><b>Mom drives, Lexie walks.</b><p>A parent drops off &amp; picks up. You're never alone with a kid.</p></div></div>
              <div className="tick"><div className="ico">✓</div><div><b>Every dollar funds her dream.</b><p>Lexie saves for art supplies, classes, and one day — art school.</p></div></div>

              <div className="goal-bar">
                <div className="tl"><span>Art-supply fund</span><b>{goalPct}%</b></div>
                <div className="track"><div className="fill" style={{ width: `${goalPct}%` }} /></div>
                <div className="tl" style={{ marginTop: 8, color: "var(--ink-2)" }}>
                  <span>${Math.round(300 * goalPct / 100)} saved</span>
                  <span>Goal: $300 (summer class)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="wrap">
          <div className="eyebrow">Neighbors talking</div>
          <h2>What Five Cities families say.</h2>
          <div className="t-track" ref={tTrack}>
            {[
              { stars: "★★★★★", q: "Lexie is the most responsible 11-year-old we've ever met. She sent us a little drawing of our corgi after his first walk. We cried. We're booking every Saturday now.", a: "M", n: "Maricela R.", d: "Arroyo Grande · Ollie (Corgi)" },
              { stars: "★★★★★", q: "Our rescue is shy with strangers. Lexie did three free meet-&-greets before their first walk. Now Pepper sprints to the door when she hears the leash.", a: "D", n: "Dev & Priya K.", d: "Grover Beach · Pepper (Pit mix)" },
              { stars: "★★★★★", q: "Supporting a kid's dream AND getting our senior lab out for the dune walk he loves? That's a Saturday well spent. Can't recommend enough.", a: "J", n: "The Tanaka family", d: "Oceano · Buddy (13yo Lab)" },
              { stars: "★★★★★", q: "My aussiedoodle came back drained and happy. Lexie texted a photo from the Bob Jones Trail AND a little sketch. Worth every dollar.", a: "S", n: "Sam W.", d: "Pismo Beach · Kona (Aussiedoodle)" },
              { stars: "★★★★★", q: "We booked once and became weekly regulars. Lexie's reliable, polite, and our dog LOVES her. Five Cities is lucky to have her.", a: "K", n: "Kyra & Ben L.", d: "Shell Beach · Moose (Great Pyr)" },
            ].map((t, i) => (
              <div className="t-card" key={i}>
                <div className="stars">{t.stars}</div>
                <blockquote>{t.q}</blockquote>
                <div className="who">
                  <div className="ava">{t.a}</div>
                  <div><div className="wn">{t.n}</div><div className="wd">{t.d}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="t-nav">
            <button onClick={() => stepT(-1)} aria-label="Previous">←</button>
            <button onClick={() => stepT(1)} aria-label="Next">→</button>
          </div>
        </div>
      </section>

      {/* Dream */}
      <section className="dream">
        <span className="art a1">art school ✿</span>
        <span className="art a2">paintbrush!</span>
        <span className="art a3">woof woof</span>
        <span className="art a4">thank you ♥</span>
        <div className="dream-inner">
          <div className="eyebrow">Be part of her story</div>
          <h2>Book a walk. Help a neighbor <em>chase a dream.</em></h2>
          <p>
            Lexie is 11. Her plan is simple: walk your dog, save for art school, grow up and make the world a little more beautiful. Every weekend slot you book is a tube of paint, a sketchbook, a Saturday class. <b>This is what local support looks like.</b>
          </p>
          <div className="dream-ctas">
            <button className="btn primary lg" onClick={() => scrollTo("book")}>Book this weekend →</button>
            <button className="btn ghost lg" onClick={() => scrollTo("services")}>See the walks</button>
            <button className="btn lg" onClick={copyLink}>Share with a neighbor ↗</button>
          </div>
          <p style={{ marginTop: 28, fontSize: 14, color: "var(--muted)" }}>
            Can't book right now? Tell a Five Cities neighbor. Word of mouth keeps this dream running.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="f-grid">
          <div>
            <Logo />
            <p className="brand-blurb">Weekend dog walking around the Five Cities by Lexie Johnson, 6th grade, Fairview Elementary. Bookings with parent supervision. Thanks for supporting a kid's dream.</p>
          </div>
          <div>
            <h4>Service area</h4>
            <ul>
              <li>Grover Beach</li><li>Arroyo Grande</li><li>Pismo Beach</li><li>Oceano</li><li>Shell Beach</li>
            </ul>
          </div>
          <div>
            <h4>Walks</h4>
            <ul>
              <li>Short &amp; Sweet — $12</li>
              <li>Beach Buddy — $22</li>
              <li>Big Adventure — $32</li>
              <li>Free meet &amp; greet</li>
            </ul>
          </div>
          <div>
            <h4>Say hi</h4>
            <ul>
              <li><a href="tel:+18055565059" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>Call / Text: (805) 556-5059</a></li>
              <li><a href="mailto:johnson.alexis1123@gmail.com" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>johnson.alexis1123@gmail.com</a></li>
              <li>Sat &amp; Sun · 8am–6pm</li>
              <li><span className="hand" style={{ color: "var(--accent)" }}>thanks neighbor ✿</span></li>
            </ul>
          </div>
        </div>
        <div className="credits">
          <div>© 2026 Lexie's Walks · Five Cities, CA · A very small, very real business.</div>
          <div>Site made with love · parent-supervised</div>
        </div>
      </footer>
    </div>
  );
}
