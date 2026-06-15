import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type CSSProperties } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Babe 🎀" },
      { name: "description", content: "A little surprise made just for you 💕" },
      { property: "og:title", content: "Happy Birthday Babe 🎀" },
      { property: "og:description", content: "A little surprise made just for you 💕" },
    ],
  }),
  component: Index,
});

type Question = {
  q: string;
  yes: string;
  no: string;
  forced?: boolean;
};

const QUESTIONS: Question[] = [
  { q: "Are you the most beautiful girl in the world?", yes: "Obviously yes", no: "Nope" },
  { q: "Did you know today is going to be magical?", yes: "Yes!!", no: "No way" },
  { q: "Do you deserve all the love in the universe?", yes: "Yes I do", no: "Not really" },
  { q: "Am I the luckiest person to have you?", yes: "Yes you are", no: "Nah" },
  { q: "Ready for your birthday surprise, babe?", yes: "Yes please!!", no: "Later" },
  { q: "Will you fuck me, babe?", yes: "Yes", no: "No never", forced: true },
];

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Index() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [noStyle, setNoStyle] = useState<CSSProperties>({});
  const areaRef = useRef<HTMLDivElement>(null);

  const current = QUESTIONS[step];

  const moveNo = () => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const maxX = Math.max(rect.width - 160, 60);
    const maxY = Math.max(rect.height - 80, 60);
    const x = Math.random() * maxX - rect.width / 2 + 80;
    const y = Math.random() * maxY - rect.height / 2 + 40;
    setNoStyle({
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 28}deg)`,
      transition: "transform 220ms cubic-bezier(.34,1.56,.64,1)",
      zIndex: 20,
    });
  };

  const handleYes = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setNoStyle({});
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="party-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="bokeh" aria-hidden />
        <div className="confetti" aria-hidden>
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} style={{ left: `${(i / 60) * 100}%`, animationDelay: `${(i % 10) * 0.2}s`, animationDuration: `${3 + (i % 4)}s` }} />
          ))}
        </div>

        <div className="z-10 surprise-card">
          <div className="mb-4 flex justify-center gap-2 text-rose-400">
            <HeartIcon /> <HeartIcon /> <HeartIcon />
          </div>
          <h1 className="birthday-title text-6xl md:text-7xl">Happy Birthday</h1>
          <p className="birthday-title-serif mt-4 text-3xl md:text-4xl italic">babe</p>

          {/* Poem */}
          <div className="poem-box mt-8">
            <p className="poem-line">Roses are red, violets are blue,</p>
            <p className="poem-line">No one in this world is as beautiful as you.</p>
            <p className="poem-line">Your smile lights up my darkest days,</p>
            <p className="poem-line">And I fall for you in a million ways.</p>
            <p className="poem-line mt-4">Today is yours, my queen, my world,</p>
            <p className="poem-line">My forever girl, my precious pearl.</p>
          </div>

          <p className="mt-6 text-lg text-rose-700 font-medium">
            I love you more than words could ever say
          </p>
          <p className="mt-3 text-sm text-rose-500/80">
            Today is all about you. Get ready for the best day ever.
          </p>
          <div className="mt-8 flex justify-center"><div className="dot-trio"><span /><span /><span /></div></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={areaRef}
      className="party-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
    >
      {/* Background atmosphere */}
      <div className="bokeh" aria-hidden />

      {/* Decorative hearts */}
      <div className="heart-deco" style={{ top: "8%", left: "8%", "--r": "-15deg", "--o": "0.18" } as CSSProperties}>
        <HeartIcon className="w-14 h-14" />
      </div>
      <div className="heart-deco" style={{ bottom: "12%", right: "8%", "--r": "25deg", "--o": "0.12", animationDelay: "1s" } as CSSProperties}>
        <HeartIcon className="w-24 h-24" />
      </div>
      <div className="heart-deco" style={{ top: "18%", right: "14%", "--r": "10deg", "--o": "0.15", animationDelay: "2s" } as CSSProperties}>
        <HeartIcon className="w-8 h-8" />
      </div>
      <div className="heart-deco" style={{ bottom: "22%", left: "10%", "--r": "-20deg", "--o": "0.13", animationDelay: "1.5s" } as CSSProperties}>
        <HeartIcon className="w-10 h-10" />
      </div>

      {/* Floating sparkle emojis */}
      <div className="floaty" aria-hidden>
        {["💖","🌸","✨","🎀","🦋","💕","🌷","🎈","💞","🌟","🪻","💐"].map((e, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 9 + 4) % 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${10 + (i % 5)}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className="z-10 surprise-card">
        <span className="step-chip">Question {step + 1} of {QUESTIONS.length}</span>

        <div key={step} className="q-fade mt-7">
          <div className="mb-4 flex justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </div>

          <h1 className="birthday-title text-5xl md:text-6xl px-2">
            {current.q}
          </h1>

          <div className="relative mt-10 flex flex-col items-center gap-3">
            <button onClick={handleYes} className="btn-yes">
              <span>{current.yes}</span>
              <HeartIcon />
            </button>

            <button
              onClick={current.forced ? handleYes : undefined}
              onMouseEnter={current.forced ? undefined : moveNo}
              onMouseMove={current.forced ? undefined : moveNo}
              onTouchStart={current.forced ? undefined : moveNo}
              onFocus={current.forced ? undefined : moveNo}
              style={noStyle}
              className="btn-no"
            >
              {current.no}
            </button>
          </div>

          {current.forced && (
            <p className="mt-7 text-rose-500/80 italic text-sm">
              (psst… "no" doesn't exist on this page 😉)
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center"><div className="dot-trio"><span /><span /><span /></div></div>
      </div>
    </div>
  );
}
