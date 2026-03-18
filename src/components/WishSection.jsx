import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { MailIcon, SparkleIcon, FlowerIcon, PenIcon } from "./Icons";
import TiltCard from "./TiltCard";

const EMAILJS_SERVICE_ID = "service_pc8xhmw";
const EMAILJS_TEMPLATE_ID = "template_s6sap57";
const EMAILJS_PUBLIC_KEY = "uMDhcEw9uD3L2ywdQ";

const CHIPS = [
  "selalu bahagia",
  "terus bersinar",
  "sehat selalu",
  "penuh berkah",
  "terus berkembang",
  "dikelilingi cinta",
];

/* =============================================
   CANDLE component
============================================= */
function Candle({ blown, onClick, delay = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: blown ? "default" : "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 8,
      }}
      whileHover={!blown ? { scale: 1.08 } : {}}
      whileTap={!blown ? { scale: 0.95 } : {}}
    >
      {/* Flame */}
      {/*
        Fixed-height area for flame/smoke — no layout shift when flame leaves.
        Height is always 34px whether flame is visible or not.
      */}
      <div
        style={{ width: 22, height: 34, position: "relative", flexShrink: 0 }}
      >
        <AnimatePresence>
          {!blown && (
            <motion.div
              key="flame"
              style={{ position: "absolute", inset: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Outer flame */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  width: 16,
                  height: 24,
                  marginLeft: -8,
                  borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
                  background:
                    "linear-gradient(to top, #FFd53e, #FF8C00, #FF4500)",
                  filter: "blur(0.5px)",
                }}
                animate={{
                  scaleX: [1, 1.15, 0.9, 1.1, 1],
                  scaleY: [1, 0.95, 1.05, 0.98, 1],
                  y: [0, -2, 1, -1, 0],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Inner flame */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: "50%",
                  width: 8,
                  height: 14,
                  marginLeft: -4,
                  borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
                  background: "rgba(255,255,220,0.9)",
                }}
                animate={{ scaleX: [1, 1.2, 0.85, 1.1, 1], y: [0, -1, 1, 0] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smoke puff — absolutely positioned so it doesn't affect layout */}
        {blown && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -16, scale: 1.4 }}
            transition={{ duration: 0.7 }}
          >
            <span style={{ fontSize: "1rem" }}>〰️</span>
          </motion.div>
        )}
      </div>

      {/* Candle body */}
      <div
        style={{
          width: 18,
          height: 44,
          background: blown
            ? "linear-gradient(to bottom, #D4D4D4, #BDBDBD)"
            : "linear-gradient(to bottom, #FFB3BA, #FF8FA0)",
          borderRadius: "4px 4px 3px 3px",
          position: "relative",
          overflow: "hidden",
          boxShadow: blown ? "none" : "0 4px 12px rgba(255,100,120,0.25)",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Candle stripes */}
        {!blown &&
          [30, 55, 75].map((top, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 2,
                top: `${top}%`,
                background: "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        {/* Wick */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            marginLeft: -1,
            width: 2,
            height: 8,
            background: blown ? "#888" : "#4a2c00",
            borderRadius: 1,
          }}
        />
      </div>
    </motion.button>
  );
}

/* =============================================
   CONFETTI SPARKS
============================================= */
function Sparks() {
  const sparks = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 300,
    y: -(Math.random() * 240 + 80),
    rotate: Math.random() * 720,
    size: Math.random() * 9 + 3,
    round: Math.random() > 0.4,
    color: [
      "var(--c-rose)",
      "var(--c-gold)",
      "var(--c-rose-l)",
      "var(--c-gold-l)",
      "var(--c-lavender)",
    ][i % 5],
  }));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            width: s.size,
            height: s.round ? s.size : s.size * 0.3,
            background: s.color,
            borderRadius: s.round ? "50%" : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{
            x: s.x,
            y: s.y,
            opacity: [1, 1, 0],
            rotate: s.rotate,
            scale: [0, 1, 1],
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
============================================= */
export default function WishSection() {
  const [candlesBlown, setCandlesBlown] = useState([false, false, false]);
  const [allBlown, setAllBlown] = useState(false);
  const [wish, setWish] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sparks, setSparks] = useState(false);

  const blowCandle = (i) => {
    if (candlesBlown[i] || allBlown) return;
    const next = [...candlesBlown];
    next[i] = true;
    setCandlesBlown(next);
    if (next.every(Boolean)) {
      setTimeout(() => setAllBlown(true), 600);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { message: wish, to_name: "Kharisma" },
        EMAILJS_PUBLIC_KEY,
      );
    } catch {}
    setSent(true);
    setSparks(true);
    setTimeout(() => setSparks(false), 2200);
    setSending(false);
  };

  return (
    <section
      className="pattern-peach"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 20px",
      }}
    >
      <div className="inner" style={{ padding: "0 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <motion.p
            className="label"
            style={{ marginBottom: 12 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <MailIcon size={13} color="var(--c-rose-d)" /> ucapanmu gemas
          </motion.p>
          <motion.h2
            className="font-display gt"
            style={{ fontSize: "clamp(2.4rem, 10vw, 4rem)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Make a Wish
          </motion.h2>
          <div className="divider" />
        </div>

        {/* ============================
            CANDLE INTERACTION PHASE
        ============================ */}
        <AnimatePresence mode="wait">
          {!allBlown ? (
            <motion.div
              key="candles"
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Cake card with 3D tilt */}
              <TiltCard maxTilt={10} style={{ borderRadius: 28 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 28,
                    padding: "32px 28px",
                    border: "1.5px solid rgba(200,135,10,0.22)",
                    boxShadow: "0 8px 40px rgba(200,135,10,0.08)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <SparkleIcon size={16} color="var(--c-gold)" />
                    <motion.p
                      className="font-display"
                      style={{
                        fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
                        color: "var(--c-ink)",
                      }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Tiup dulu lilinnya!
                    </motion.p>
                  </div>
                  <p
                    className="font-serif italic"
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--c-muted)",
                      marginBottom: 28,
                      lineHeight: 1.6,
                    }}
                  >
                    Karena lilin ga boleh ditiup jadii diklik aja yaa sayangg
                  </p>

                  {/* Candles row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 24,
                      marginBottom: 20,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <Candle
                        key={i}
                        blown={candlesBlown[i]}
                        onClick={() => blowCandle(i)}
                        delay={i * 0.1}
                      />
                    ))}
                  </div>

                  {/* Progress hint */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        style={{ width: 8, height: 8, borderRadius: "50%" }}
                        animate={{
                          background: candlesBlown[i]
                            ? "var(--c-rose)"
                            : "rgba(244,160,184,0.25)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>

                  <p
                    className="label"
                    style={{ marginTop: 12, opacity: 0.5, fontSize: "0.52rem" }}
                  >
                    {candlesBlown.filter(Boolean).length}/3 padam
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ) : !sent ? (
            /* ============================
               WISH FORM PHASE
            ============================ */
            <motion.div
              key="form-wrap"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={8} style={{ borderRadius: 24 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: "28px 24px",
                    border: "1.5px solid rgba(244,160,184,0.25)",
                    boxShadow: "0 8px 32px rgba(212,96,122,0.08)",
                  }}
                >
                  <motion.p
                    className="font-serif italic"
                    style={{
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "var(--c-ink2)",
                      marginBottom: 20,
                      lineHeight: 1.7,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    sekarang, tulis ucapanmu sayang
                  </motion.p>

                  <form onSubmit={submit}>
                    <div style={{ marginBottom: 14 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 10,
                        }}
                      >
                        <PenIcon size={13} color="var(--c-rose-d)" />
                        <span className="label" style={{ opacity: 0.7 }}>
                          ucapanmu gemas
                        </span>
                      </div>
                      <textarea
                        className="input"
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                        placeholder="tulis dari hati..."
                        rows={5}
                        required
                      />
                    </div>

                    {/* Quick chips */}
                    <div style={{ marginBottom: 24 }}>
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--c-hint)",
                          marginBottom: 10,
                          fontFamily: "Inter, sans-serif",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Tambahkan kata-kata:
                      </p>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {CHIPS.map((w) => (
                          <motion.button
                            key={w}
                            type="button"
                            style={{
                              padding: "7px 14px",
                              borderRadius: 9999,
                              fontSize: "0.75rem",
                              fontFamily: "Nunito, sans-serif",
                              fontWeight: 600,
                              background: "#fff",
                              border: "1.5px solid rgba(244,160,184,0.3)",
                              color: "var(--c-muted)",
                              cursor: "pointer",
                            }}
                            whileHover={{
                              borderColor: "var(--c-rose)",
                              color: "var(--c-rose-d)",
                              scale: 1.04,
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setWish((p) =>
                                p ? `${p}, semoga ${w}` : `Semoga ${w}`,
                              )
                            }
                          >
                            {w}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                      whileTap={{ scale: 0.97 }}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <MailIcon size={15} color="#fff" /> Mengirim...
                        </>
                      ) : (
                        <>
                          <FlowerIcon size={15} color="#fff" /> Kirimkan Doa
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </TiltCard>
            </motion.div>
          ) : (
            /* ============================
               SUCCESS PHASE
            ============================ */
            <motion.div
              key="done"
              style={{
                textAlign: "center",
                paddingTop: 32,
                paddingBottom: 32,
                position: "relative",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              {sparks && <Sparks />}

              <TiltCard maxTilt={6} style={{ borderRadius: 24 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: "40px 28px",
                    border: "1.5px solid rgba(244,160,184,0.3)",
                    boxShadow: "0 8px 32px rgba(212,96,122,0.08)",
                  }}
                >
                  <motion.div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      margin: "0 auto 20px",
                      overflow: "hidden",
                      border: "3px solid rgba(244,160,184,0.5)",
                      boxShadow: "0 6px 24px rgba(212,96,122,0.18)",
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src="./public/profile.jpg"
                      alt="Kharisma"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>

                  <h3
                    className="font-display gt"
                    style={{ fontSize: "1.7rem", marginBottom: 10 }}
                  >
                    Ucapan terkirim!
                  </h3>
                  <p
                    className="font-serif italic"
                    style={{
                      color: "var(--c-muted)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}
                  >
                    Semoga harapanmu untuk Gemas terwujud. 💕
                  </p>
                  <motion.button
                    className="btn btn-outline"
                    onClick={() => {
                      setSent(false);
                      setWish("");
                      setCandlesBlown([false, false, false]);
                      setAllBlown(false);
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    Kirim lagi 💌
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
