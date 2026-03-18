import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FlowerIcon, HeartIcon, SparkleIcon } from "./Icons";

/* ─────────────────────────────────────────────
   Isi surat — ganti sesuai keinginan
───────────────────────────────────────────── */
const LETTER_DATE = "2 Maret 2026";
const LETTER_TO = "Kharisma Fauziah";
const LETTER_FROM = "Yang selalu ada";

const PARAGRAPHS = [
  "Gemas,",
  "Engga kerasa yaa sayangg, sekarang kamu udah sampai di hari ulang tahun kamu lagi. Dari semua hari yang udah lewat, akhirnya sampai juga di hari yang punya arti khusus ini. Aku cuma mau hari ini jadi hari yang baik buat kamu, hari yang tenang, hangat, dan cukup bikin kamu ngerasa kalau kamu memang layak dirayain.",
  "Kalo dari aku si harapannya sederhana. Semoga kamu selalu sehat, dijaga di mana pun kamu berada, dan semua hal yang lagi kamu jalanin bisa dimudahin. Semoga kamu juga pelan-pelan ketemu sama banyak hal baik, entah itu dalam bentuk kabar baik, orang baik, atau kesempatan baik yang datang di waktu yang tepat.",
  "Aku juga berharap semoga kamu nggak terlalu keras sama diri sendiri. Semoga di umur kamu yang sekarang, kamu bisa lebih sering bahagia, lebih banyak senyum, dan lebih sedikit capek sama hal-hal yang bikin pikiran penuh. Kamu pantas buat dapet banyak hal baik, dan aku harap tahun ini bisa ngasih itu ke kamu.",
  "Sekarang gantian kamu. Di hari ini, coba berhenti sebentar dan buat satu harapan yang benar-benar kamu pengen. Engga usah banyak-banyak, cukup satu yang paling kamu simpan. Semoga ulang tahun kali ini bukan cuma nambah umur, tapi juga bawa satu langkah lebih dekat ke hal-hal yang selama ini kamu doain.",
  "Dengan sepenuh hati,",
];

/* ─────────────────────────────────────────────
   Paragraf yang muncul satu per satu
───────────────────────────────────────────── */
function LetterParagraph({ text, index, isSignature }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.p
      ref={ref}
      className="font-serif"
      style={{
        fontSize: isSignature ? "1rem" : "clamp(0.95rem, 3.5vw, 1.08rem)",
        color: isSignature ? "var(--c-gold-d)" : "var(--c-ink2)",
        lineHeight: 2,
        fontStyle: index === 0 ? "normal" : isSignature ? "normal" : "italic",
        fontWeight: index === 0 ? 600 : isSignature ? 600 : 300,
        marginBottom: index === 0 ? 28 : isSignature ? 0 : 22,
        marginTop: isSignature ? 32 : 0,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.p>
  );
}

/* ─────────────────────────────────────────────
   Amplop SVG animasi
───────────────────────────────────────────── */
function Envelope({ open }) {
  return (
    <div
      style={{ position: "relative", width: 120, height: 80, margin: "0 auto" }}
    >
      {/* Envelope body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          background: "linear-gradient(160deg, #FFF9EC 0%, #FFF3D0 100%)",
          border: "1.5px solid rgba(200,135,10,0.35)",
          boxShadow: "0 8px 32px rgba(200,135,10,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Envelope side folds (decorative) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(to top, rgba(200,135,10,0.06), transparent)",
          }}
        />
        {/* Bottom V-fold */}
        <svg
          viewBox="0 0 120 48"
          style={{ position: "absolute", bottom: 0, width: "100%" }}
        >
          <path d="M0,48 L60,20 L120,48 Z" fill="rgba(200,135,10,0.1)" />
          <path
            d="M0,0 L60,28 L120,0"
            fill="none"
            stroke="rgba(200,135,10,0.2)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Envelope flap — rotates open */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 42,
          transformOrigin: "top center",
          perspective: 600,
        }}
        animate={{ rotateX: open ? -165 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 120 42" style={{ width: "100%", display: "block" }}>
          <path
            d="M0,0 L60,38 L120,0 Z"
            fill="url(#flapGrad)"
            stroke="rgba(200,135,10,0.3)"
            strokeWidth="1.2"
          />
          <defs>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF9EC" />
              <stop offset="100%" stopColor="#FFE9A0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Wax seal on flap */}
      <motion.div
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--c-gold), var(--c-gold-d))",
          boxShadow: "0 2px 10px rgba(200,135,10,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
          translateX: "-50%",
        }}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <HeartIcon size={11} color="#fff" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function LetterSection() {
  const [opened, setOpened] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Auto-open envelope when section scrolls into view
  const envelopeRef = useRef(null);
  const envInView = useInView(envelopeRef, { once: true, margin: "-40px 0px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg, #FFFDF5 0%, #FFF9E5 100%)",
        backgroundImage:
          "radial-gradient(circle, rgba(200,135,10,0.1) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        paddingTop: 96,
        paddingBottom: 96,
        position: "relative",
        overflow: "hidden",
        minHeight: "100svh",
      }}
    >
      {/* Ambient blobs */}
      <motion.div
        style={{
          position: "absolute",
          top: "5%",
          right: "-8%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(200,135,10,0.06)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "-6%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(200,135,10,0.07)",
          pointerEvents: "none",
          filter: "blur(36px)",
        }}
        animate={{ scale: [1, 1.12, 1], y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1 }}
      />

      <div
        className="inner"
        style={{ padding: "0 24px", position: "relative", zIndex: 1 }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 12,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <FlowerIcon size={13} color="var(--c-gold)" />
            <span className="label">kata-kata yang tersimpan lama</span>
            <FlowerIcon size={13} color="var(--c-gold)" />
          </motion.div>
          <motion.h2
            className="font-display gt"
            style={{ fontSize: "clamp(2.4rem, 10vw, 4rem)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sepucuk Surat
          </motion.h2>
          <div className="divider" />
          <motion.p
            className="font-serif italic"
            style={{ fontSize: "1rem", color: "var(--c-muted)", marginTop: 4 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            untukmu, yang selalu ada di pikiranku
          </motion.p>
        </div>

        {/* ── Envelope ── */}
        <motion.div
          ref={envelopeRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Envelope open={envInView || opened} />

          {/* Open button */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                style={{ textAlign: "center", marginTop: 20 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.button
                  onClick={() => setOpened(true)}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--c-gold), var(--c-gold-d))",
                    border: "none",
                    borderRadius: 9999,
                    color: "#fff",
                    padding: "10px 28px",
                    cursor: "pointer",
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 20px rgba(200,135,10,0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 28px rgba(200,135,10,0.4)",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <HeartIcon size={13} color="#fff" />
                  Buka suratnya
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Letter Paper ── */}
        <AnimatePresence>
          {opened && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              style={{ marginTop: 32 }}
            >
              {/* Paper card */}
              <div
                style={{
                  background: "#FFFEF9",
                  borderRadius: 24,
                  border: "1.5px solid rgba(200,135,10,0.2)",
                  boxShadow:
                    "0 16px 56px rgba(200,135,10,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                  padding: "36px 28px 40px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Paper lines -subtle */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 72 + i * 37,
                      height: 1,
                      background: "rgba(200,135,10,0.06)",
                      pointerEvents: "none",
                    }}
                  />
                ))}

                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "15%",
                    right: "15%",
                    height: 2.5,
                    background:
                      "linear-gradient(90deg, transparent, var(--c-gold), var(--c-gold-l), transparent)",
                    borderRadius: 2,
                  }}
                />

                {/* Corner decorations */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 16,
                    opacity: 0.4,
                  }}
                >
                  <SparkleIcon size={10} color="var(--c-gold)" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    opacity: 0.4,
                  }}
                >
                  <SparkleIcon size={10} color="var(--c-gold)" />
                </div>

                {/* Date + To */}
                <motion.div
                  style={{ marginBottom: 28 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--c-gold-d)",
                      marginBottom: 10,
                      opacity: 0.7,
                    }}
                  >
                    {LETTER_DATE}
                  </p>
                  <p
                    className="font-serif italic"
                    style={{ fontSize: "0.9rem", color: "var(--c-muted)" }}
                  >
                    Kepada:{" "}
                    <strong
                      style={{ color: "var(--c-gold-d)", fontStyle: "normal" }}
                    >
                      {LETTER_TO}
                    </strong>
                  </p>
                  <div
                    style={{
                      width: 32,
                      height: 1.5,
                      background:
                        "linear-gradient(90deg, var(--c-gold), transparent)",
                      marginTop: 14,
                      borderRadius: 2,
                    }}
                  />
                </motion.div>

                {/* Letter body */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {PARAGRAPHS.map((text, i) => (
                    <LetterParagraph
                      key={i}
                      text={text}
                      index={i}
                      isSignature={i === PARAGRAPHS.length - 1}
                    />
                  ))}

                  {/* Signature */}
                  <motion.div
                    style={{ marginTop: 8 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: "1.6rem",
                        color: "var(--c-gold-d)",
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {LETTER_FROM}
                    </p>
                  </motion.div>
                </div>

                {/* Bottom seal */}
                <motion.div
                  style={{ textAlign: "center", marginTop: 40 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--c-gold-l), var(--c-gold), var(--c-gold-d))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 20px rgba(200,135,10,0.35)",
                        border: "2px solid rgba(255,255,255,0.6)",
                      }}
                    >
                      <HeartIcon size={22} color="#fff" filled />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          height: 1,
                          width: 32,
                          background:
                            "linear-gradient(90deg, transparent, var(--c-gold))",
                        }}
                      />
                      <span
                        className="label"
                        style={{ fontSize: "0.52rem", opacity: 0.5 }}
                      >
                        dengan cinta
                      </span>
                      <div
                        style={{
                          height: 1,
                          width: 32,
                          background:
                            "linear-gradient(90deg, var(--c-gold), transparent)",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Close letter hint */}
              <motion.div
                style={{ textAlign: "center", marginTop: 20 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  onClick={() => setOpened(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--c-hint)",
                    opacity: 0.7,
                  }}
                >
                  tutup surat ↑
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
