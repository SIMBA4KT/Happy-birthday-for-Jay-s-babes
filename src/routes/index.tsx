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
  { q: "Are you the most beautiful girl in the world? 🌸", yes: "Obviously yes 💖", no: "Nope" },
  { q: "Did you know today is going to be magical? ✨", yes: "Yes!! 🎉", no: "No way" },
  { q: "Do you deserve all the love in the universe? 💕", yes: "Yes I do 👑", no: "Not really" },
  { q: "Am I the luckiest person to have you? 🍀", yes: "Yes you are 🥰", no: "Nah" },
  { q: "Ready for your birthday surprise, babe? 🎂", yes: "Yes please!! 🎁", no: "Later" },
  { q: "Will you fuck me, babe? 😘", yes: "Yes 💋", no: "No never", forced: true },
];

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
    const maxX = Math.max(rect.width - 140, 50);
    const maxY = Math.max(rect.height - 60, 50);
    const x = Math.random() * maxX - rect.width / 2 + 70;
    const y = Math.random() * maxY - rect.height / 2 + 30;
    setNoStyle({
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 30}deg)`,
      transition: "transform 200ms cubic-bezier(.34,1.56,.64,1)",
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
      <div className="party-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="confetti" aria-hidden>
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} style={{ left: `${(i / 40) * 100}%`, animationDelay: `${(i % 10) * 0.2}s` }} />
          ))}
        </div>
        <h1 className="birthday-title text-6xl md:text-8xl">Happy Birthday 🎂</h1>
        <p className="mt-6 text-2xl md:text-3xl font-semibold text-white drop-shadow">
          I love you more than words, baby 💖
        </p>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl">
          Today is all about you. Get ready for the best day ever 🥂🌹
        </p>
      </div>
    );
  }

  return (
    <div ref={areaRef} className="party-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="floaty" aria-hidden>
        {["💖","🌸","✨","🎀","🦋","💕","🌷","🎈","💞","🌟"].map((e, i) => (
          <span key={i} style={{ left: `${(i * 11) % 100}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${8 + (i % 5)}s` }}>{e}</span>
        ))}
      </div>

      <div className="z-10 max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-white/90">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <h1 className="birthday-title text-4xl md:text-6xl leading-tight">
          {current.q}
        </h1>

        <div className="relative mt-12 flex items-center justify-center gap-6">
          <button onClick={handleYes} className="btn-yes">
            {current.yes}
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
          <p className="mt-8 text-white/90 italic">
            (psst… "no" doesn't exist on this page 😉)
          </p>
        )}
      </div>
    </div>
  );
}
