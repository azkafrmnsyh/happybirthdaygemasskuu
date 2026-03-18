import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, MusicNoteIcon } from "./Icons";
import TiltCard from "./TiltCard";

const TRACK = {
  title: "Monokrom",
  artist: "Tulus",
  src: "/SpotiDown.App - Monokrom - Tulus.mp3",
  cover: "/cover.jpg",
};

/* Lyric lines to show */
const LYRIC = [
  "Kamu ada di sini bukan karena kebetulan ",
  "kamu adalah warna",
  "di hari-hariku yang abu-abu.",
];

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

const ICONS = {
  prev: "M6 6h2v12H6zm3.5 6 8.5 6V6z",
  next: "M6 18l8.5-6L6 6v12zm2-8.14 4.96 2.14L8 14.14V9.86zM16 6h2v12h-2z",
  play: "M8 5v14l11-7z",
  pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
};

/* Waveform */
function BarWave({ playing, n = 28 }) {
  const bars = Array.from({ length: n }, (_, i) => ({
    h: Math.sin(i * 0.7) * 7 + 10,
    d: (i * 0.09) % 0.8,
  }));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2.5px",
        height: 32,
        justifyContent: "center",
      }}
    >
      {bars.map((b, i) => (
        <motion.div
          key={i}
          style={{
            width: 2.5,
            borderRadius: 2,
            background:
              "linear-gradient(to top, var(--c-rose-d), var(--c-rose))",
          }}
          animate={
            playing
              ? {
                  height: [
                    `${b.h}px`,
                    `${b.h * 2.4}px`,
                    `${b.h * 0.4}px`,
                    `${b.h}px`,
                  ],
                }
              : { height: "3px" }
          }
          transition={{
            duration: 0.7,
            repeat: playing ? Infinity : 0,
            delay: b.d,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicSection() {
  const audioRef = useRef(null);
  const barRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [lyricIdx, setLyricIdx] = useState(0);

  /* Cycle lyric lines */
  useEffect(() => {
    if (!playing) return;
    const ic = setInterval(
      () => setLyricIdx((i) => (i + 1) % LYRIC.length),
      3200,
    );
    return () => clearInterval(ic);
  }, [playing]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurTime(a.currentTime);
      if (a.duration) {
        setDur(a.duration);
        setProgress(a.currentTime / a.duration);
      }
    };
    const onReady = () => setLoading(false);
    const onWait = () => setLoading(true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("canplay", onReady);
    a.addEventListener("waiting", onWait);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("canplay", onReady);
      a.removeEventListener("waiting", onWait);
    };
  }, []);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        setLoading(true);
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !barRef.current || !a.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const ratio = Math.max(0, Math.min(1, x / r.width));
    a.currentTime = a.duration * ratio;
    setProgress(ratio);
  };

  return (
    <section
      className="pattern-rose"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 20px",
      }}
    >
      <audio ref={audioRef} preload="auto">
        <source src={TRACK.src} type="audio/mpeg" />
      </audio>

      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Label */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 40,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <MusicNoteIcon size={13} color="var(--c-rose-d)" />
          <span className="label">lagu yang cocok buat kamu </span>
          <MusicNoteIcon size={13} color="var(--c-rose-d)" />
        </motion.div>

        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard maxTilt={8} style={{ borderRadius: 28 }}>
            <div
              className="card"
              style={{
                padding: 0,
                overflow: "hidden",
                borderRadius: 28,
                border: "1.5px solid rgba(200,135,10,0.22)",
              }}
            >
              {/* Cover image + overlay */}
              <div
                style={{
                  position: "relative",
                  height: 350,
                  overflow: "hidden",
                }}
              >
                <img
                  src={TRACK.cover}
                  alt="Album cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: playing
                      ? "brightness(1)"
                      : "brightness(0.9) saturate(0.9)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(255,245,248,0) 40%, rgba(255,245,248,1) 100%)",
                  }}
                />
                {/* Playing badge */}
                {playing && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      padding: "5px 12px",
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      border: "1px solid rgba(244,160,184,0.3)",
                    }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div
                      className="anim-pulse-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--c-rose)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="label"
                      style={{
                        fontSize: "0.55rem",
                        color: "var(--c-rose-d)",
                        opacity: 1,
                      }}
                    >
                      NOW PLAYING
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Controls block */}
              <div style={{ padding: "0 24px 28px" }}>
                {/* Track info */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "1.3rem",
                        color: "var(--c-ink)",
                        lineHeight: 1.2,
                      }}
                    >
                      {TRACK.title}
                    </p>
                    <p
                      className="font-nunito"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--c-muted)",
                        fontWeight: 500,
                        marginTop: 3,
                      }}
                    >
                      {TRACK.artist}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setLiked((l) => !l)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 6,
                      marginTop: 2,
                    }}
                    whileTap={{ scale: 0.8 }}
                    animate={liked ? { scale: [1, 1.4, 1] } : {}}
                  >
                    <HeartIcon
                      size={20}
                      color={liked ? "var(--c-rose)" : undefined}
                      filled={liked}
                      style={{ display: "block" }}
                    />
                  </motion.button>
                </div>

                {/* Lyric snippet */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(244,160,184,0.1), rgba(245,193,64,0.08))",
                    borderRadius: 14,
                    padding: "14px 16px",
                    marginBottom: 18,
                    border: "1px solid rgba(244,160,184,0.2)",
                    minHeight: 72,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={lyricIdx}
                      className="font-serif italic"
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--c-ink2)",
                        lineHeight: 1.65,
                        textAlign: "center",
                        width: "100%",
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5 }}
                    >
                      {LYRIC[lyricIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Waveform */}
                <div style={{ marginBottom: 16 }}>
                  <BarWave playing={playing} />
                </div>

                {/* Progress bar */}
                <div
                  ref={barRef}
                  onClick={seek}
                  onTouchStart={seek}
                  style={{ cursor: "pointer", marginBottom: 6 }}
                >
                  <div
                    style={{
                      height: 4,
                      borderRadius: 4,
                      background: "rgba(244,160,184,0.2)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress * 100}%`,
                        borderRadius: 4,
                        background:
                          "linear-gradient(90deg, var(--c-rose), var(--c-gold))",
                        transition: "width 0.1s linear",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: `${progress * 100}%`,
                        transform: "translate(-50%,-50%)",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "var(--c-rose-d)",
                        boxShadow: "0 0 8px rgba(212,96,122,0.5)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--c-muted)",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {fmt(curTime)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--c-muted)",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {fmt(dur)}
                    </span>
                  </div>
                </div>

                {/* Playback controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                    marginTop: 8,
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 6,
                    }}
                  >
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                      fill="var(--c-muted)"
                    >
                      <path d={ICONS.prev} />
                    </svg>
                  </button>

                  {/* Play button */}
                  <motion.button
                    onClick={togglePlay}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      flexShrink: 0,
                      background:
                        "linear-gradient(135deg, var(--c-rose), var(--c-rose-d))",
                      boxShadow: "0 6px 24px rgba(212,96,122,0.4)",
                    }}
                    whileTap={{ scale: 0.88 }}
                    whileHover={{ scale: 1.07 }}
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="l"
                          style={{
                            width: 20,
                            height: 20,
                            border: "2.5px solid rgba(255,255,255,0.4)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : playing ? (
                        <motion.svg
                          key="p"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="#fff"
                          initial={{ scale: 0.7 }}
                          animate={{ scale: 1 }}
                        >
                          <path d={ICONS.pause} />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="pl"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="#fff"
                          style={{ marginLeft: 2 }}
                          initial={{ scale: 0.7 }}
                          animate={{ scale: 1 }}
                        >
                          <path d={ICONS.play} />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 6,
                    }}
                  >
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                      fill="var(--c-muted)"
                    >
                      <path d={ICONS.next} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Song attribution */}
        <motion.p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: "0.78rem",
            color: "var(--c-muted)",
            fontFamily: "Inter, sans-serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Monokrom - Tulus
        </motion.p>
      </div>
    </section>
  );
}
