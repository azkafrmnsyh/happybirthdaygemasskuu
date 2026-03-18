import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FlowerIcon,
  HeartIcon,
  SparkleIcon,
  StarIcon,
  LeafIcon,
} from "./Icons";

/* Floating SVG shapes instead of emoji */
function FloatingShapes() {
  const shapes = [
    { id: 0, Icon: FlowerIcon, color: "var(--c-rose)", op: 0.35, size: 16 },
    { id: 1, Icon: SparkleIcon, color: "var(--c-gold)", op: 0.4, size: 12 },
    { id: 2, Icon: HeartIcon, color: "var(--c-rose-l)", op: 0.3, size: 13 },
    { id: 3, Icon: StarIcon, color: "var(--c-gold)", op: 0.35, size: 11 },
    { id: 4, Icon: FlowerIcon, color: "var(--c-lavender)", op: 0.3, size: 14 },
    { id: 5, Icon: HeartIcon, color: "var(--c-rose)", op: 0.25, size: 10 },
    { id: 6, Icon: SparkleIcon, color: "var(--c-rose)", op: 0.35, size: 13 },
    { id: 7, Icon: LeafIcon, color: "var(--c-mint)", op: 0.3, size: 15 },
    { id: 8, Icon: StarIcon, color: "var(--c-rose)", op: 0.25, size: 10 },
    { id: 9, Icon: FlowerIcon, color: "var(--c-gold)", op: 0.3, size: 12 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {shapes.map((s, i) => {
        const x = 8 + ((i * 9) % 84);
        const delay = i * 1.4;
        const dur = 12 + i * 1.2;
        const drift = (i % 2 === 0 ? 1 : -1) * (20 + i * 8);
        return (
          <motion.div
            key={s.id}
            style={{
              position: "absolute",
              bottom: -20,
              left: `${x}%`,
              opacity: s.op,
            }}
            animate={{ y: [0, -(window.innerHeight * 1.5)], x: [0, drift] }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <s.Icon size={s.size} color={s.color} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* Corner sparkle decoration */
function CornerSpark({ style }) {
  return (
    <motion.div
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <SparkleIcon size={14} color="var(--c-gold)" />
    </motion.div>
  );
}

export default function HeroSection() {
  const [phase, setPhase] = useState(0);
  const mouseRef = useRef(null);
  const sectionRef = useRef(null);

  /* Entry animation phases */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Mouse parallax on glow orb */
  useEffect(() => {
    if (!mouseRef.current) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      mouseRef.current.style.setProperty("--px", `${x}px`);
      mouseRef.current.style.setProperty("--py", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Scroll parallax */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]); // dot pattern moves slower
  const orbY = useTransform(scrollY, [0, 600], [0, 80]); // orb moves medium
  const textY = useTransform(scrollY, [0, 600], [0, -60]); // text moves up (faster)
  const textOp = useTransform(scrollY, [0, 300], [1, 0]); // text fades out

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100svh",
        background: "var(--c-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parallax dot pattern */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(244,160,184,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          y: bgY,
        }}
      />

      <FloatingShapes />

      {/* Parallax glow orb */}
      <motion.div
        ref={mouseRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          width: "70vw",
          height: "70vw",
          maxWidth: 360,
          maxHeight: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,160,184,0.2) 0%, rgba(245,193,64,0.07) 50%, transparent 70%)",
          filter: "blur(48px)",
          left: "50%",
          top: "45%",
          x: "-50%",
          y: orbY,
          transform:
            "translate(calc(-50% + var(--px,0)), calc(-50% + var(--py,0)))",
          transition: "transform 0.12s ease",
        }}
      />

      {/* Corner sparkles */}
      <CornerSpark style={{ top: "18%", left: "12%", opacity: 0.45 }} />
      <CornerSpark style={{ top: "20%", right: "14%", opacity: 0.35 }} />
      <CornerSpark style={{ bottom: "25%", left: "8%", opacity: 0.3 }} />
      <CornerSpark style={{ bottom: "22%", right: "10%", opacity: 0.3 }} />

      {/* Content with parallax — absolutely centered so y-offset works from center */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          y: textY,
          opacity: textOp,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "90vw",
          maxWidth: 640,
          padding: "0 24px",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FlowerIcon size={13} color="var(--c-rose)" />
          <span className="label" style={{ opacity: 0.7 }}>
            untuk seseorang yang istimewa
          </span>
          <FlowerIcon size={13} color="var(--c-rose)" />
        </motion.div>

        {phase >= 1 && (
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="font-display gt"
              style={{
                fontSize: "clamp(5rem, 24vw, 10rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Gemas
            </motion.h1>
          </div>
        )}

        <AnimatePresence>
          {phase >= 2 && (
            <>
              <motion.div
                style={{
                  width: 56,
                  height: 2.5,
                  borderRadius: 99,
                  margin: "20px auto",
                  background:
                    "linear-gradient(90deg, var(--c-rose), var(--c-gold))",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />

              <motion.p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)",
                  color: "var(--c-ink2)",
                  lineHeight: 1.4,
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Kharisma Fauziah
              </motion.p>

              <motion.div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 20,
                  padding: "9px 20px",
                  borderRadius: 9999,
                  background: "rgba(244,160,184,0.1)",
                  border: "1.5px solid rgba(244,160,184,0.3)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div
                  className="anim-pulse-dot"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--c-rose)",
                  }}
                />
                <span
                  className="label"
                  style={{
                    color: "var(--c-rose-d)",
                    opacity: 1,
                    letterSpacing: "0.22em",
                  }}
                >
                  19 Maret 2026
                </span>
                <div
                  className="anim-pulse-dot"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--c-gold)",
                    animationDelay: "0.4s",
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll indicator */}
      {phase >= 2 && (
        <motion.div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            zIndex: 10,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div
            style={{
              width: 28,
              height: 44,
              borderRadius: 14,
              border: "2px solid rgba(244,160,184,0.45)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 6,
            }}
          >
            <motion.div
              style={{
                width: 4,
                height: 8,
                borderRadius: 4,
                background: "var(--c-rose)",
              }}
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="label" style={{ fontSize: "0.52rem", opacity: 0.5 }}>
            scroll
          </span>
        </motion.div>
      )}
    </section>
  );
}
