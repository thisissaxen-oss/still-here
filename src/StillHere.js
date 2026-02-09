import { useState, useEffect, useCallback, useRef } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";

const sampleJourneys = [
  {
    id: 1, name: "Priya", location: "Mumbai", avatar: "🌸", started: "3 months ago",
    status: "getting-there", tag: "career",
    title: "Lost my job at 29, thought I was done",
    story: "I was a marketing manager for 4 years. One restructuring email and it was over. The first month I couldn't get out of bed. The second month I applied to 200 jobs and heard back from 3. I'm now freelancing — it's not much, but I bought groceries with money I earned myself last week. That felt like everything.",
    updates: [
      { text: "Week 1: Can't stop refreshing email for interview calls that never come", mood: "struggling" },
      { text: "Week 4: Started a small freelance project. ₹5000. It's something.", mood: "small-win" },
      { text: "Week 8: Got my second client through a referral. Starting to breathe again.", mood: "hopeful" },
      { text: "Week 12: Still not where I want to be. But I'm not where I was.", mood: "getting-there" }
    ],
    supporters: 24, messages: [
      { from: "Ravi", text: "Your week 4 update gave me hope. Thank you for sharing." },
      { from: "Anonymous", text: "I'm in month 1 right now. Knowing it gets even a little better helps." }
    ]
  },
  {
    id: 2, name: "Arjun", location: "Hyderabad", avatar: "🌊", started: "6 months ago",
    status: "struggling", tag: "mental-health",
    title: "Postgrad abroad, had to pause everything, family doesn't get it",
    story: "I went abroad for my masters thinking it would change my life. In a way it did — just not how I expected. My mental health collapsed under the pressure. I had to apply for an interruption of studies. Everyone back home asks 'so when are you finishing?' and I don't have an answer. I spend most days trying to get medical letters sorted and wondering if I'll ever feel normal again. Some days I think about what I could build. Most days I just try to get through.",
    updates: [
      { text: "Month 1: Came home. Slept for two weeks straight. Couldn't explain to anyone why.", mood: "struggling" },
      { text: "Month 3: Started seeing a therapist. It's hard but I'm showing up.", mood: "small-win" },
      { text: "Month 4: Tried applying to jobs. Got rejected everywhere. The silence is the worst part.", mood: "struggling" },
      { text: "Month 5: Built something small — a little project that felt like mine. First time I felt useful in months.", mood: "small-win" },
      { text: "Month 6: Still here. Still figuring it out. That has to count for something.", mood: "struggling" }
    ],
    supporters: 41, messages: [
      { from: "Meera", text: "\"Still here. That has to count for something.\" — Yes. It does. It really does." },
      { from: "Anonymous", text: "I paused my PhD last year. You described exactly how it feels. You're not alone in this." }
    ]
  },
  {
    id: 3, name: "Meera", location: "Bangalore", avatar: "🌿", started: "2 months ago",
    status: "hopeful", tag: "burnout",
    title: "Burnout nearly broke me, learning to start over",
    story: "5 years in tech consulting. 14-hour days. I was 'successful' by every metric. Then one morning I physically could not open my laptop. My hands wouldn't do it. I've been on a break since. The guilt of not working is almost worse than the burnout itself. But yesterday I went for a walk and actually noticed the trees. I think that's progress.",
    updates: [
      { text: "Week 2: Doctor said I need 3 months off minimum. I cried in the clinic.", mood: "struggling" },
      { text: "Week 6: Went for a walk without my phone. Noticed the sky for the first time in years.", mood: "small-win" },
      { text: "Week 8: Thinking about what I actually want to do. Not what looks good on LinkedIn.", mood: "hopeful" }
    ],
    supporters: 33, messages: [
      { from: "Priya", text: "The walk without your phone — that's not small. That's huge. Well done." }
    ]
  },
  {
    id: 4, name: "Ravi", location: "Delhi", avatar: "🔥", started: "1 month ago",
    status: "small-win", tag: "career",
    title: "30, no savings, starting completely from zero",
    story: "Bad financial decisions in my 20s. A failed startup that ate everything. I'm living with my parents again and the shame is overwhelming. Every relative has an opinion. Every festival is a reminder of where I 'should' be. But I started a small data entry job last week. It's not glamorous. It's not my dream. But it's honest work and I'm rebuilding, one day at a time.",
    updates: [
      { text: "Day 1: Swallowed my pride and moved back home. Mom didn't say anything. Just made tea.", mood: "struggling" },
      { text: "Week 2: Got a basic remote job. ₹15000/month. It's a start.", mood: "small-win" },
      { text: "Week 4: Saved ₹3000 this month. First time saving anything in 2 years.", mood: "small-win" }
    ],
    supporters: 19, messages: [
      { from: "Anonymous", text: "Your mom making tea without saying anything — that broke me. Parents understand more than we think." }
    ]
  },
  {
    id: 5, name: "Kavya", location: "Chennai", avatar: "🦋", started: "5 months ago",
    status: "hopeful", tag: "mental-health",
    title: "Anxiety took my twenties. I'm taking them back.",
    story: "I've had anxiety since I was 19. For years I called in sick, cancelled plans, and watched life happen through Instagram. At 26, I finally got help. Medication, therapy, the works. I'm not 'fixed.' I still have bad days. But last week I went to a coffee shop alone and stayed for two hours. I read a book. Nobody knew it was the bravest thing I've done in years.",
    updates: [
      { text: "Month 1: First therapy session. Couldn't stop crying. Therapist said that's okay.", mood: "struggling" },
      { text: "Month 2: Started medication. The first two weeks were rough.", mood: "struggling" },
      { text: "Month 3: Went grocery shopping without a panic attack. Cried happy tears in the car.", mood: "small-win" },
      { text: "Month 4: Reconnected with an old friend. She said 'I missed you.' I didn't know anyone noticed.", mood: "hopeful" },
      { text: "Month 5: Coffee shop alone. Two hours. A whole book. This is what freedom feels like.", mood: "hopeful" }
    ],
    supporters: 58, messages: [
      { from: "Arjun", text: "The coffee shop moment — I felt that. These small things aren't small at all." },
      { from: "Anonymous", text: "I'm at month 1. Thank you for showing me what month 5 can look like." }
    ]
  }
];

const moodConfig = {
  "struggling": { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444", label: "Struggling" },
  "small-win": { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B", label: "Small win" },
  "hopeful": { bg: "#D1FAE5", text: "#065F46", dot: "#10B981", label: "Hopeful" },
  "getting-there": { bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6", label: "Getting there" }
};

const tagLabels = { "career": "Career", "mental-health": "Mental Health", "burnout": "Burnout", "financial": "Financial", "relationship": "Relationships", "health": "Health" };

const gentleQuotes = [
  "You are not behind. You are not broken. You are mid-journey.",
  "The fact that you're here means you haven't given up. That's everything.",
  "Healing isn't linear. Neither is life. And that's okay.",
  "You don't have to be okay today. You just have to be here.",
  "Someone out there is going through exactly what you are. Right now.",
  "Rest is not giving up. It's gearing up.",
  "Your pace is valid. Your path is valid. You are valid."
];

export default function StillHere() {
  const [page, setPage] = useState("landing");
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [supportedJourneys, setSupportedJourneys] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [animateIn, setAnimateIn] = useState(false);
  const [breathePhase, setBreathePhase] = useState("in");
  const [showBreathe, setShowBreathe] = useState(false);
  const [newStory, setNewStory] = useState({ name: "", title: "", story: "", tag: "career" });
  const [userJourneys, setUserJourneys] = useState([]);
  const [toast, setToast] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [quote] = useState(gentleQuotes[Math.floor(Math.random() * gentleQuotes.length)]);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_URL; link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  useEffect(() => {
    if (showBreathe) {
      const interval = setInterval(() => setBreathePhase(p => p === "in" ? "out" : "in"), 4000);
      return () => clearInterval(interval);
    }
  }, [showBreathe]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); };

  const navigate = useCallback((p) => {
    setAnimateIn(false);
    setTimeout(() => { setPage(p); setSelectedJourney(null); setAnimateIn(true); }, 300);
  }, []);

  const toggleSupport = (id) => {
    setSupportedJourneys(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else { next.add(id); showToast("They'll know someone's walking with them 💛"); }
      return next;
    });
  };

  const submitStory = () => {
    if (!newStory.name || !newStory.title || !newStory.story) return;
    const journey = {
      id: Date.now(), name: newStory.name, location: "Somewhere", messages: [],
      avatar: ["🌱", "💫", "🦋", "🌙", "🕊️", "🍃"][Math.floor(Math.random() * 6)],
      started: "Just now", status: "struggling", title: newStory.title,
      story: newStory.story, updates: [], supporters: 0, tag: newStory.tag
    };
    setUserJourneys(prev => [journey, ...prev]);
    setNewStory({ name: "", title: "", story: "", tag: "career" });
    setShowWriteModal(false);
    showToast("Your story is live. Someone needed to hear this today. 💛");
  };

  const allJourneys = [...userJourneys, ...sampleJourneys];
  const filteredJourneys = filter === "all" ? allJourneys : allJourneys.filter(j => j.tag === filter);

  const s = {
    serif: { fontFamily: "'Fraunces', serif" },
    fade: { opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" },
    app: { fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#FFFBF5", color: "#1a1a1a", position: "relative" }
  };

  const Grain = () => <div style={{ position: "fixed", inset: 0, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 1000 }} />;

  const Blob = ({ top, left, right, bottom, color, size }) => (
    <div style={{ position: "fixed", top, left, right, bottom, width: size || "50vw", height: size || "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, pointerEvents: "none" }} />
  );

  const Toast = () => toast ? (
    <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", background: "#292524", color: "#FFFBF5", padding: "14px 28px", borderRadius: 100, fontSize: 14, zIndex: 2000, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>{toast}</div>
  ) : null;

  const Nav = ({ light }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
      <button onClick={() => navigate("landing")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: light ? "#FFFBF5" : "#292524", padding: 0 }}>
        Still <span style={{ fontStyle: "italic", color: light ? "#FCD34D" : "#B45309" }}>Here</span>
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        {page !== "about" && <button onClick={() => navigate("about")} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, background: "transparent", color: light ? "#FFFBF5" : "#57534E", border: `1px solid ${light ? "rgba(255,255,255,0.2)" : "#E7E5E4"}`, borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>Our Story</button>}
        {page !== "journeys" && <button onClick={() => navigate("journeys")} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, background: light ? "rgba(255,255,255,0.15)" : "#292524", color: "#FFFBF5", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>Read Journeys</button>}
      </div>
    </div>
  );

  const MoodBadge = ({ mood, size = "sm" }) => {
    const m = moodConfig[mood];
    const p = size === "sm" ? "4px 12px" : "6px 16px";
    const f = size === "sm" ? 11 : 13;
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: p, borderRadius: 100, fontSize: f, fontWeight: 500, background: m.bg, color: m.text }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot }} />{m.label}</span>;
  };

  // === GENTLE INTRO OVERLAY ===
  if (showIntro && page === "landing") {
    const introContent = [
      { emoji: "🕊️", text: "This is a space for people who are going through something." },
      { emoji: "🤝", text: "Not to fix. Not to advise. Just to be seen, and to see others." },
      { emoji: "💛", text: "Every story here is real. Every struggle is valid. Including yours." }
    ];

    return (
      <div style={{ ...s.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#1C1917" }}>
        <Grain />
        <div style={{ textAlign: "center", padding: 40, maxWidth: 480, ...s.fade }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>{introContent[introStep].emoji}</div>
          <div style={{ ...s.serif, fontSize: 24, fontWeight: 400, color: "#FFFBF5", lineHeight: 1.5, marginBottom: 40, fontStyle: "italic" }}>
            {introContent[introStep].text}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {introContent.map((_, i) => (
              <div key={i} style={{ width: i === introStep ? 24 : 8, height: 8, borderRadius: 100, background: i === introStep ? "#FCD34D" : "rgba(255,255,255,0.2)", transition: "all 0.4s ease" }} />
            ))}
          </div>
          <button
            onClick={() => { if (introStep < 2) setIntroStep(introStep + 1); else setShowIntro(false); }}
            style={{ padding: "14px 36px", fontSize: 15, fontWeight: 500, background: "rgba(255,255,255,0.1)", color: "#FFFBF5", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'", transition: "all 0.3s ease", backdropFilter: "blur(4px)" }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.1)"}
          >
            {introStep < 2 ? "Continue" : "Enter Still Here"}
          </button>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setShowIntro(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans'" }}>Skip intro</button>
          </div>
        </div>
      </div>
    );
  }

  // === LANDING PAGE ===
  if (page === "landing") {
    return (
      <div style={s.app}>
        <Grain /><Toast />
        <Blob top="-20%" right="-10%" color="rgba(251,191,146,0.12)" />
        <Blob bottom="-30%" left="-10%" color="rgba(196,181,253,0.08)" />
        <div style={{ maxWidth: 840, margin: "0 auto", padding: "40px 24px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1, ...s.fade }}>
          <Nav />

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32, opacity: 0.5, fontSize: 12, letterSpacing: 2.5, textTransform: "uppercase" }}>
            <span style={{ width: 28, height: 1, background: "#1a1a1a", display: "inline-block" }} />
            You're not alone in this
          </div>

          <h1 style={{ ...s.serif, fontSize: "clamp(50px, 8vw, 88px)", fontWeight: 400, lineHeight: 1.03, marginBottom: 20, letterSpacing: "-0.025em" }}>
            Still{" "}<span style={{ fontStyle: "italic", background: "linear-gradient(135deg, #D97706, #92400E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Here</span>
          </h1>
          <p style={{ ...s.serif, fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: 300, lineHeight: 1.4, color: "#78716C", fontStyle: "italic", marginBottom: 36, maxWidth: 600 }}>
            A space for people who are going through it.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "#57534E", maxWidth: 520, marginBottom: 48 }}>
            No advice. No hustle culture. No "just stay positive."
            Just real people sharing real struggles — and walking alongside
            each other. Because sometimes knowing someone <em>gets it</em> is enough.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 80 }}>
            <button onClick={() => navigate("journeys")} style={{ padding: "16px 36px", fontSize: 15, fontWeight: 500, background: "#292524", color: "#FFFBF5", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 24px rgba(0,0,0,0.12)"; }}>
              Read someone's journey
            </button>
            <button onClick={() => { navigate("journeys"); setTimeout(() => setShowWriteModal(true), 500); }} style={{ padding: "16px 36px", fontSize: 15, fontWeight: 500, background: "transparent", color: "#292524", border: "1.5px solid #D6D3D1", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = "#292524"; e.target.style.color = "#FFFBF5"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#292524"; }}>
              Share your story
            </button>
          </div>

          {/* Gentle quote */}
          <div style={{ ...s.serif, fontSize: 16, fontStyle: "italic", color: "#A8A29E", marginBottom: 48, maxWidth: 400, lineHeight: 1.6 }}>
            "{quote}"
          </div>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", borderTop: "1px solid #E7E5E4", paddingTop: 28 }}>
            {[{ n: "117", l: "people sharing their journey" }, { n: "2,400+", l: "moments of support given" }, { n: "0", l: "toxic positivity allowed" }].map((x, i) => (
              <div key={i}><div style={{ ...s.serif, fontSize: 30, fontWeight: 500 }}>{x.n}</div><div style={{ fontSize: 12, color: "#78716C", marginTop: 4 }}>{x.l}</div></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === ABOUT PAGE ===
  if (page === "about") {
    return (
      <div style={{ ...s.app, background: "#1C1917", color: "#FFFBF5" }}>
        <Grain /><Toast />
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1, ...s.fade }}>
          <Nav light />

          <div style={{ marginTop: 40, marginBottom: 60 }}>
            <div style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", opacity: 0.4, marginBottom: 16 }}>Why this exists</div>
            <h1 style={{ ...s.serif, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 32 }}>
              I built this because I was <span style={{ fontStyle: "italic", color: "#FCD34D" }}>drowning</span> and no one could tell.
            </h1>
          </div>

          <div style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: 48 }}>
            <p style={{ marginBottom: 24 }}>I'm Aditya. I'm 27. I was doing my postgrad abroad when everything fell apart — my mental health, my plans, my sense of who I was supposed to be.</p>
            <p style={{ marginBottom: 24 }}>I came home and tried to find work. Applied everywhere. Heard back from almost nobody. The silence was deafening. Every rejection felt like confirmation that I was worthless.</p>
            <p style={{ marginBottom: 24 }}>The worst part wasn't the struggle. It was feeling like I was the only one going through it. Everyone on LinkedIn was "thrilled to announce." Everyone on Instagram was living their best life. And here I was, unable to get out of bed some mornings.</p>
            <p style={{ marginBottom: 24 }}>Then I started talking. Really talking. And I discovered something: <span style={{ color: "#FFFBF5", fontWeight: 500 }}>almost everyone is going through something</span>. They're just doing it alone, in silence, behind closed doors.</p>
            <p style={{ marginBottom: 24, color: "#FCD34D", fontStyle: "italic", ...s.serif, fontSize: 20 }}>That felt wrong. So I built this.</p>
            <p style={{ marginBottom: 24 }}>Still Here isn't about fixing anyone. It's not about advice or motivation. It's about one simple, radical idea: <span style={{ color: "#FFFBF5", fontWeight: 500 }}>you shouldn't have to suffer alone</span>.</p>
            <p>If you're going through something — anything — you're welcome here. Your story matters. Your pain is real. And someone out there needs to hear exactly what you're going through, because they're going through it too.</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ ...s.serif, fontSize: 20, marginBottom: 12 }}>The rules of this space</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
              <div style={{ marginBottom: 12 }}>💛 <strong style={{ color: "rgba(255,255,255,0.9)" }}>Be real</strong> — No performance. No "I'm fine." Just truth.</div>
              <div style={{ marginBottom: 12 }}>🤝 <strong style={{ color: "rgba(255,255,255,0.9)" }}>Be gentle</strong> — Everyone here is carrying something heavy.</div>
              <div style={{ marginBottom: 12 }}>🚫 <strong style={{ color: "rgba(255,255,255,0.9)" }}>No unsolicited advice</strong> — Sometimes people need to be heard, not fixed.</div>
              <div>🕊️ <strong style={{ color: "rgba(255,255,255,0.9)" }}>Walk alongside</strong> — You can't carry someone's load. But you can let them know you see them.</div>
            </div>
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <button onClick={() => navigate("journeys")} style={{ padding: "16px 40px", fontSize: 15, fontWeight: 500, background: "#FCD34D", color: "#1C1917", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>
              Read someone's journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === JOURNEYS PAGE ===
  if (page === "journeys" && !selectedJourney) {
    return (
      <div style={s.app}>
        <Grain /><Toast />
        <Blob top="-20%" right="-10%" color="rgba(251,191,146,0.08)" />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1, ...s.fade }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <button onClick={() => navigate("landing")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: "#292524", padding: 0, marginBottom: 4 }}>
                Still <span style={{ fontStyle: "italic", color: "#B45309" }}>Here</span>
              </button>
              <div style={{ fontSize: 12, color: "#78716C" }}>{allJourneys.length} journeys shared</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowBreathe(true)} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, background: "#F5F5F4", color: "#57534E", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>🫁 Breathe</button>
              <button onClick={() => navigate("about")} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, background: "#F5F5F4", color: "#57534E", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>Our Story</button>
              <button onClick={() => setShowWriteModal(true)} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, background: "#292524", color: "#FFFBF5", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>+ Share yours</button>
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
            {["all", "career", "mental-health", "burnout"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 18px", fontSize: 12, fontWeight: 500, background: filter === f ? "#292524" : "#F5F5F4", color: filter === f ? "#FFFBF5" : "#78716C", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'", transition: "all 0.2s" }}>
                {f === "all" ? "All" : tagLabels[f]}
              </button>
            ))}
          </div>

          {/* Prompt banner */}
          <div style={{ background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", borderRadius: 18, padding: "24px 28px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(251,191,36,0.2)" }} />
            <div style={{ ...s.serif, fontSize: 18, fontWeight: 500, marginBottom: 6, color: "#78350F" }}>Before you scroll</div>
            <div style={{ fontSize: 14, color: "#92400E", lineHeight: 1.6 }}>These are real people. If something resonates, let them know — tap 💛. It means more than you think.</div>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredJourneys.map((j, i) => (
              <div key={j.id} onClick={() => { setSelectedJourney(j); setAnimateIn(false); setTimeout(() => setAnimateIn(true), 100); }}
                style={{ background: "#FFF", borderRadius: 18, padding: "24px 28px", cursor: "pointer", transition: "all 0.3s", border: "1px solid #F5F5F4", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(12px)", transitionDelay: `${i * 60}ms` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{j.avatar}</div>
                    <div><div style={{ fontWeight: 600, fontSize: 14 }}>{j.name}</div><div style={{ fontSize: 11, color: "#A8A29E" }}>{j.location} · {j.started}</div></div>
                  </div>
                  <MoodBadge mood={j.status} />
                </div>
                <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginBottom: 10, lineHeight: 1.3, color: "#1C1917" }}>{j.title}</div>
                <div style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{j.story}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #F5F5F4" }}>
                  <button onClick={e => { e.stopPropagation(); toggleSupport(j.id); }}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6, color: supportedJourneys.has(j.id) ? "#D97706" : "#A8A29E", fontFamily: "'DM Sans'", transition: "all 0.2s" }}>
                    {supportedJourneys.has(j.id) ? "💛" : "🤍"} {j.supporters + (supportedJourneys.has(j.id) ? 1 : 0)} walking alongside
                  </button>
                  <div style={{ fontSize: 12, color: "#A8A29E" }}>{j.updates.length} updates · {(j.messages||[]).length} messages →</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Write Modal */}
        {showWriteModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", zIndex: 1500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setShowWriteModal(false)}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#FFFBF5", borderRadius: 24, padding: "36px 32px", maxWidth: 540, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
              <div style={{ ...s.serif, fontSize: 26, fontWeight: 500, marginBottom: 8 }}>Share your story</div>
              <div style={{ fontSize: 14, color: "#78716C", marginBottom: 28, lineHeight: 1.6 }}>You don't have to be inspiring. Just be honest. That's enough.</div>

              {[
                { label: "What should we call you?", placeholder: "A name, initials — whatever feels safe", key: "name", type: "input" },
                { label: "Give your journey a title", placeholder: "e.g. Lost my job at 25, trying to figure it out", key: "title", type: "input" },
                { label: "What's going on?", placeholder: "Write as much or as little as you need.", key: "story", type: "textarea" }
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#57534E", display: "block", marginBottom: 6 }}>{f.label}</label>
                  {f.type === "input" ? (
                    <input value={newStory[f.key]} onChange={e => setNewStory(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                      style={{ width: "100%", padding: "12px 16px", fontSize: 14, border: "1.5px solid #E7E5E4", borderRadius: 12, background: "#FAFAF9", fontFamily: "'DM Sans'", outline: "none", boxSizing: "border-box" }}
                      onFocus={e => e.target.style.borderColor = "#D97706"} onBlur={e => e.target.style.borderColor = "#E7E5E4"} />
                  ) : (
                    <textarea value={newStory[f.key]} onChange={e => setNewStory(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={5}
                      style={{ width: "100%", padding: "12px 16px", fontSize: 14, border: "1.5px solid #E7E5E4", borderRadius: 12, background: "#FAFAF9", fontFamily: "'DM Sans'", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.7 }}
                      onFocus={e => e.target.style.borderColor = "#D97706"} onBlur={e => e.target.style.borderColor = "#E7E5E4"} />
                  )}
                </div>
              ))}

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#57534E", display: "block", marginBottom: 8 }}>What's this about?</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {Object.entries(tagLabels).map(([k, v]) => (
                    <button key={k} onClick={() => setNewStory(p => ({ ...p, tag: k }))} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 500, background: newStory.tag === k ? "#292524" : "#F5F5F4", color: newStory.tag === k ? "#FFFBF5" : "#57534E", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>{v}</button>
                  ))}
                </div>
              </div>

              <button onClick={submitStory} style={{ width: "100%", padding: "14px", fontSize: 15, fontWeight: 600, background: "#292524", color: "#FFFBF5", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'", opacity: (!newStory.name || !newStory.title || !newStory.story) ? 0.3 : 1 }}>
                Share my journey
              </button>
            </div>
          </div>
        )}

        {/* Breathe */}
        {showBreathe && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)", zIndex: 1500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onClick={() => setShowBreathe(false)}>
            <div style={{ width: breathePhase === "in" ? 180 : 100, height: breathePhase === "in" ? 180 : 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(251,191,36,0.05) 70%)", transition: "all 4s cubic-bezier(0.16, 1, 0.3, 1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
              <div style={{ width: breathePhase === "in" ? 100 : 50, height: breathePhase === "in" ? 100 : 50, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)", transition: "all 4s cubic-bezier(0.16, 1, 0.3, 1)" }} />
            </div>
            <div style={{ ...s.serif, fontSize: 28, color: "#FFFBF5", fontWeight: 300, fontStyle: "italic" }}>Breathe {breathePhase}...</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>Tap anywhere to close</div>
          </div>
        )}
      </div>
    );
  }

  // === JOURNEY DETAIL ===
  if (selectedJourney) {
    const j = selectedJourney;
    return (
      <div style={s.app}>
        <Grain /><Toast />
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1, ...s.fade }}>
          <button onClick={() => setSelectedJourney(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#78716C", fontFamily: "'DM Sans'", padding: "8px 0", marginBottom: 32 }}>
            ← All journeys
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{j.avatar}</div>
            <div><div style={{ fontWeight: 600, fontSize: 17 }}>{j.name}</div><div style={{ fontSize: 12, color: "#A8A29E" }}>{j.location} · Started {j.started}</div></div>
          </div>

          <h1 style={{ ...s.serif, fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>{j.title}</h1>
          <div style={{ marginBottom: 28 }}><MoodBadge mood={j.status} size="md" /></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: "#44403C", marginBottom: 44, paddingBottom: 28, borderBottom: "1px solid #E7E5E4" }}>{j.story}</div>

          {/* Timeline */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginBottom: 20 }}>The journey so far</div>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "#E7E5E4" }} />
              {j.updates.map((u, i) => (
                <div key={i} style={{ marginBottom: 24, position: "relative", opacity: animateIn ? 1 : 0, transform: animateIn ? "translateX(0)" : "translateX(-8px)", transition: `all 0.4s ease ${i * 120}ms` }}>
                  <div style={{ position: "absolute", left: -24, top: 6, width: 14, height: 14, borderRadius: "50%", border: `3px solid ${moodConfig[u.mood].dot}`, background: "#FFFBF5" }} />
                  <div style={{ background: "#FFF", borderRadius: 14, padding: "16px 20px", border: "1px solid #F5F5F4" }}>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: "#44403C" }}>{u.text}</div>
                    <div style={{ marginTop: 8 }}><MoodBadge mood={u.mood} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages from others */}
          {j.messages && j.messages.length > 0 && (
            <div style={{ marginBottom: 44 }}>
              <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginBottom: 20 }}>Words from others walking alongside</div>
              {j.messages.map((m, i) => (
                <div key={i} style={{ background: "#FEFCE8", borderRadius: 14, padding: "16px 20px", marginBottom: 12, borderLeft: "3px solid #FCD34D" }}>
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: "#44403C", fontStyle: "italic" }}>"{m.text}"</div>
                  <div style={{ fontSize: 12, color: "#A8A29E", marginTop: 8 }}>— {m.from}</div>
                </div>
              ))}
            </div>
          )}

          {/* Leave a message */}
          <div style={{ background: "#FFF", borderRadius: 18, padding: 28, border: "1px solid #F5F5F4", marginBottom: 32 }}>
            <div style={{ ...s.serif, fontSize: 18, fontWeight: 500, marginBottom: 6 }}>Say something to {j.name}</div>
            <div style={{ fontSize: 13, color: "#78716C", marginBottom: 16 }}>Not advice. Just let them know you see them.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder={`You're not alone, ${j.name}...`}
                style={{ flex: 1, padding: "12px 16px", fontSize: 14, border: "1.5px solid #E7E5E4", borderRadius: 12, background: "#FAFAF9", fontFamily: "'DM Sans'", outline: "none" }}
                onFocus={e => e.target.style.borderColor = "#D97706"} onBlur={e => e.target.style.borderColor = "#E7E5E4"} />
              <button onClick={() => { if (newMessage.trim()) { showToast(`Your message was sent to ${j.name} 💛`); setNewMessage(""); }}}
                style={{ padding: "12px 24px", fontSize: 14, fontWeight: 500, background: "#292524", color: "#FFFBF5", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'DM Sans'" }}>
                Send
              </button>
            </div>
          </div>

          {/* Support */}
          <div style={{ background: "#FFF", borderRadius: 18, padding: 28, border: "1px solid #F5F5F4", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>💛</div>
            <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Walk alongside {j.name}</div>
            <div style={{ fontSize: 14, color: "#78716C", marginBottom: 20, lineHeight: 1.6 }}>You can't fix someone's journey. But you can let them know they're not invisible.</div>
            <button onClick={() => toggleSupport(j.id)}
              style={{ padding: "12px 36px", fontSize: 14, fontWeight: 600, background: supportedJourneys.has(j.id) ? "#FEF3C7" : "#292524", color: supportedJourneys.has(j.id) ? "#92400E" : "#FFFBF5", border: "none", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans'" }}>
              {supportedJourneys.has(j.id) ? `You're walking alongside ${j.name} 💛` : `I'm here, ${j.name}`}
            </button>
            <div style={{ fontSize: 12, color: "#A8A29E", marginTop: 10 }}>{j.supporters + (supportedJourneys.has(j.id) ? 1 : 0)} people walking alongside</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
