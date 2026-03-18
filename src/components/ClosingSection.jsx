import { motion } from "framer-motion";
import {
  DoveIcon,
  MailIcon,
  CloudIcon,
  SproutIcon,
  HeartIcon,
  FlowerIcon,
  SparkleIcon,
} from "./Icons";
import TiltCard from "./TiltCard";

const HER_PHOTO =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face";

const ADVICE = [
  {
    Icon: MailIcon,
    ic: "var(--c-rose)",
    text: "Jaga diri kamu seperti kamu menjaga orang lain. Kamu sering memberi tapi jangan lupa mengisi dirimu sendiri.",
  },
  {
    Icon: CloudIcon,
    ic: "var(--c-lavender)",
    text: "Ketika dunia terasa berat, ingat kamu engga harus kuat setiap saat.",
  },
  {
    Icon: SproutIcon,
    ic: "var(--c-mint)",
    text: "Jangan terburu-buru. Tumbuhmu punya ritme sendiri. Dan ritme itu indah, meski kadang terasa lambat.",
  },
  {
    Icon: HeartIcon,
    ic: "var(--c-rose)",
    text: "Kita engga ngasih nama yang besar buat apa yang kita jalani, tapi kebersamaan ini terasa jujur, dan itu cukup.",
  },
];

export default function ClosingSection() {
  return (
    <section
      className="pattern-cream"
      style={{
        paddingTop: 96,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated blobs */}
      <motion.div
        style={{
          position: "absolute",
          top: "8%",
          right: "-5%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "rgba(244,160,184,0.1)",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.14, 1], y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(245,193,64,0.1)",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.12, 1], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div
        className="inner"
        style={{
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
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
            <DoveIcon size={16} color="var(--c-rose-d)" />
            <span className="label">Terakhirr</span>
            <DoveIcon size={16} color="var(--c-rose-d)" />
          </motion.div>
          <motion.h2
            className="font-display gt"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3.8rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quotes...
          </motion.h2>
          <div className="divider" />
        </div>

        {/* Advice cards with 3D tilt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 40,
          }}
        >
          {ADVICE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <TiltCard maxTilt={8} style={{ borderRadius: 18 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: "16px 20px",
                    border: "1.5px solid rgba(244,160,184,0.2)",
                    boxShadow: "0 4px 16px rgba(212,96,122,0.06)",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Icon box */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: `${item.ic}14`,
                      border: `1px solid ${item.ic}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <item.Icon size={18} color={item.ic} />
                  </div>
                  <p
                    className="font-serif italic"
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--c-ink2)",
                      lineHeight: 1.85,
                      fontWeight: 300,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Anniversary + Birthday card with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard maxTilt={10} style={{ borderRadius: 28 }}>
            <div
              style={{
                background:
                  "linear-gradient(135deg, #fff 0%, var(--c-gold-bg) 100%)",
                borderRadius: 28,
                border: "1.5px solid rgba(200,135,10,0.22)",
                padding: "32px 28px",
                boxShadow: "0 8px 40px rgba(200,135,10,0.09)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top line accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, var(--c-rose), transparent)",
                }}
              />

              {/* Bottom line accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "20%",
                  right: "20%",
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, var(--c-gold), transparent)",
                }}
              />

              {/* Corner sparkles */}
              <SparkleIcon
                size={10}
                color="var(--c-rose)"
                style={{
                  position: "absolute",
                  top: 14,
                  left: 18,
                  opacity: 0.5,
                }}
              />
              <SparkleIcon
                size={10}
                color="var(--c-gold)"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 18,
                  opacity: 0.5,
                }}
              />
              <SparkleIcon
                size={10}
                color="var(--c-gold)"
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 18,
                  opacity: 0.5,
                }}
              />
              <SparkleIcon
                size={10}
                color="var(--c-rose)"
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 18,
                  opacity: 0.5,
                }}
              />

              {/* Section badges */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 20,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    padding: "5px 14px",
                    borderRadius: 9999,
                    fontSize: "0.65rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background:
                      "linear-gradient(135deg, rgba(244,160,184,0.15), rgba(244,160,184,0.05))",
                    border: "1.5px solid rgba(244,160,184,0.35)",
                    color: "var(--c-rose-d)",
                  }}
                >
                  🎂 Selamat Ulang Tahun
                </div>
                <div
                  style={{
                    padding: "5px 14px",
                    borderRadius: 9999,
                    fontSize: "0.65rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background:
                      "linear-gradient(135deg, rgba(245,193,64,0.15), rgba(245,193,64,0.05))",
                    border: "1.5px solid rgba(200,135,10,0.3)",
                    color: "var(--c-gold-d)",
                  }}
                >
                  💛 Anniversary
                </div>
              </div>

              {/* Her photo */}
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
                  src="/profile.jpg"
                  alt="Kharisma"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>

              {/* Star row — SVG */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <FlowerIcon size={16} color="var(--c-rose)" />
                <SparkleIcon size={16} color="var(--c-gold)" />
                <FlowerIcon size={16} color="var(--c-rose)" />
              </div>

              <h3
                className="font-display gt"
                style={{
                  fontSize: "clamp(1.15rem, 4.5vw, 1.55rem)",
                  lineHeight: 1.35,
                  marginBottom: 16,
                }}
              >
                Selamat Ulang Tahun &amp; Anniversary, Gemasskuu
              </h3>

              <p
                className="font-serif italic"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--c-ink2)",
                  lineHeight: 1.95,
                }}
              >
                Terima kasih sudah hadir. Terima kasih sudah bertahan. Terima
                kasih sudah jadi kamu persis seperti yang kamu adalah sekarang.
                Kamu cukup. Kamu lebih dari cukup.
              </p>

              <div
                style={{
                  width: 50,
                  height: 1.5,
                  background:
                    "linear-gradient(90deg, transparent, var(--c-rose), var(--c-gold), transparent)",
                  margin: "20px auto",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <HeartIcon size={13} color="var(--c-rose-d)" />
                <span
                  className="label"
                  style={{ opacity: 0.55, fontSize: "0.55rem" }}
                >
                  dengan sepenuh hati
                </span>
                <HeartIcon size={13} color="var(--c-rose-d)" />
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Final name */}
        <motion.div
          style={{ textAlign: "center", marginTop: 60 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p
            className="font-display gt"
            style={{ fontSize: "clamp(4.5rem, 18vw, 8rem)", lineHeight: 1 }}
          >
            Gemas
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 14,
            }}
          >
            <div
              style={{
                height: 1,
                width: 40,
                background:
                  "linear-gradient(90deg, transparent, var(--c-rose))",
              }}
            />
            <FlowerIcon size={12} color="var(--c-rose)" />
            <span
              className="label"
              style={{ opacity: 0.4, fontSize: "0.52rem" }}
            >
              Kharisma Fauziah · 19 Maret 2026
            </span>
            <FlowerIcon size={12} color="var(--c-rose)" />
            <div
              style={{
                height: 1,
                width: 40,
                background:
                  "linear-gradient(90deg, var(--c-rose), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
