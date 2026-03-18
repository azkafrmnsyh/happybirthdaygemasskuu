import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  SproutIcon,
  FlowerIcon,
  HomeIcon,
  SparkleIcon,
  LeafIcon,
  StarIcon,
  CakeIcon,
  HeartIcon,
  MapPinIcon,
} from "./Icons";

const CARD_ICONS = [
  SproutIcon,
  FlowerIcon,
  HomeIcon,
  SparkleIcon,
  LeafIcon,
  StarIcon,
  CakeIcon,
  HeartIcon,
];

const CARDS = [
  {
    date: "16 Maret 2025",
    title: "Awalnya cuma iseng ngechat",
    text: "Awalnya sederhana banget. Hari itu aku pertama kali ngechat kamu di sosial media. Cuma sekadar nyapa aja sebenarnya. Kita ngobrol sebentar, kenalan dikit, terus yaudah. Waktu itu aku sama sekali nggak kepikiran kalau chat kecil itu bakal jadi awal dari cerita yang lumayan panjang.",
  },
  {
    date: "April 2025",
    title: "Kadang ngobrol, kadang hilang",
    text: "Setelah itu kita engga langsung dekat. Chat kita jarang banget. Kadang ngobrol bentar, terus hilang lagi lama. Bahkan bisa sampai sebulan baru ngobrol lagi. Tapi anehnya setiap mulai chat lagi rasanya tetap santai, engga pernah canggung.",
  },
  {
    date: "Juni 2025",
    title: "Masih biasa aja",
    text: "Di titik ini semuanya masih terasa biasa. Kita masih jarang ngobrol dan masih sibuk dengan kehidupan masing-masing. Tapi setiap ada chat lagi selalu nyambung. Rasanya kayak ngobrol sama orang yang udah cukup dikenal walaupun sebenarnya jarang komunikasi.",
  },
  {
    date: "Agustus 2025",
    title: "Mulai sering ngobrol",
    text: "Sekitar pertengahan Agustus kita mulai lebih sering chat. Engga selalu bahas hal penting, kadang cuma cerita hal random atau keseharian. Tapi dari situ aku mulai sadar satu hal. Ngobrol sama kamu ternyata selalu seru.",
  },
  {
    date: "September 2025",
    title: "Mulai nyaman",
    text: "Semakin sering ngobrol, semuanya jadi terasa lebih natural. Kita mulai sering bercanda, sering cerita, bahkan kadang cuma ngobrol nggak jelas. Dari situ aku mulai kenal kamu lebih jauh. Kamu yang kadang lucu, kadang overthinking, tapi tetap jadi diri kamu sendiri.",
  },
  {
    date: "Oktober 2025",
    title: "Gemas versi nyata",
    text: "Sebelum aku mulai kuliah, aku sempetin buat ketemu kamu. Pertemuan itu sebenarnya sederhana banget, tapi cukup berkesan. Setelah itu rasanya semuanya berubah. Kita jadi jauh lebih sering chat dibanding sebelumnya.",
  },
  {
    date: "12 Maret 2026",
    title: "Sampai di titik sekarang",
    text: "Engga kerasa ternyata sudah sejauh ini. Dari yang dulu cuma chat sesekali, sekarang hampir selalu ada cerita yang kita bagi. Kadang hal kecil, kadang hal random, tapi semuanya terasa menyenangkan.",
  },
  {
    date: "19 Maret 2026",
    title: "Hari kamu",
    text: "Jujur aku engga tahu ke mana cerita ini akan berjalan. Tapi selama kamu ada, aku ingin tetap menghargai dan merayakanmu dengan caraku yang sederhana, tapi sungguh-sungguh.",
  },
];

/* =============================================
   3D TILT WRAPPER
   Tracks mouse position relative to card center,
   applies rotateX / rotateY via spring animation.
============================================= */
function TiltCard({ children, maxTilt = 12, style = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const onMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2); // -1 to 1
      const ny = (e.clientY - cy) / (rect.height / 2); // -1 to 1
      setTilt({ x: -ny * maxTilt, y: nx * maxTilt });
      setShine({ x: 50 + nx * 30, y: 50 + ny * 30 });
    },
    [maxTilt],
  );

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: "800px", ...style }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: tilt.x || tilt.y ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "inherit",
        }}
      >
        {children}
        {/* Subtle shine layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.25) 0%, transparent 65%)`,
            pointerEvents: "none",
            transition: "background 0.08s",
          }}
        />
      </motion.div>
    </div>
  );
}

/* =============================================
   MODAL — full card detail with 3D tilt
============================================= */
function CardModal({ card, index, onClose }) {
  const CardIcon = CARD_ICONS[index] || FlowerIcon;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20,14,4,0.55)",
          backdropFilter: "blur(6px)",
          zIndex: 200,
          cursor: "pointer",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        key="modal"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "min(88vw, 380px)",
          zIndex: 201,
          cursor: "auto",
        }}
        initial={{ opacity: 0, scale: 0.88, y: "-45%", x: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, scale: 0.9, y: "-45%", x: "-50%" }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <TiltCard maxTilt={10} style={{ borderRadius: 24 }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #fff 0%, var(--c-gold-bg) 100%)",
              borderRadius: 24,
              overflow: "hidden",
              border: "1.5px solid rgba(200,135,10,0.28)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,135,10,0.1)",
            }}
          >
            {/* Top accent bar */}
            <div
              style={{
                height: 3,
                background:
                  "linear-gradient(90deg, var(--c-gold), var(--c-gold-l), var(--c-gold))",
              }}
            />

            <div style={{ padding: "28px 24px" }}>
              {/* Icon + date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(200,135,10,0.1)",
                    border: "1.5px solid rgba(200,135,10,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardIcon size={20} color="var(--c-gold)" />
                </div>
                <div>
                  <p
                    className="label"
                    style={{
                      fontSize: "0.52rem",
                      opacity: 0.55,
                      marginBottom: 3,
                    }}
                  >
                    {card.date}
                  </p>
                  <h3
                    className="font-display gt"
                    style={{
                      fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
                      lineHeight: 1.25,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1.5,
                  background:
                    "linear-gradient(90deg, var(--c-gold), var(--c-gold-l), transparent)",
                  borderRadius: 2,
                  marginBottom: 18,
                }}
              />

              {/* Full text */}
              <p
                className="font-serif italic"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--c-ink2)",
                  lineHeight: 2,
                  fontWeight: 300,
                }}
              >
                {card.text}
              </p>

              {/* Close hint */}
              <div style={{ textAlign: "center", marginTop: 22 }}>
                <button
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "1.5px solid rgba(200,135,10,0.25)",
                    borderRadius: 9999,
                    padding: "8px 22px",
                    fontSize: "0.72rem",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    color: "var(--c-gold-d)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(200,135,10,0.08)";
                    e.currentTarget.style.borderColor = "var(--c-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.borderColor = "rgba(200,135,10,0.25)";
                  }}
                >
                  tutup
                </button>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </AnimatePresence>
  );
}

/* =============================================
   CARD — shows snippet, 3D tilt, click to open modal
============================================= */
function Card({ card, index, isLeft, onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.85], [isLeft ? -28 : 28, 0]);

  const CardIcon = CARD_ICONS[index] || FlowerIcon;

  return (
    <motion.div ref={ref} style={{ opacity, x }}>
      <TiltCard maxTilt={10} style={{ borderRadius: 18, cursor: "pointer" }}>
        <div
          onClick={onOpen}
          style={{
            background: isLeft
              ? "linear-gradient(135deg,#fff,var(--c-gold-bg))"
              : "#fff",
            border: "1.5px solid rgba(200,135,10,0.2)",
            borderRadius: 18,
            padding: "14px 16px",
            boxShadow: "0 4px 20px rgba(200,135,10,0.06)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            ...(isLeft
              ? { borderRight: "3px solid var(--c-gold-l)" }
              : { borderLeft: "3px solid var(--c-gold)" }),
          }}
        >
          {/* Icon + title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 7,
              flexDirection: isLeft ? "row-reverse" : "row",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                flexShrink: 0,
                background: "rgba(200,135,10,0.1)",
                border: "1px solid rgba(200,135,10,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardIcon size={14} color="var(--c-gold)" />
            </div>
            <div style={{ textAlign: isLeft ? "right" : "left", flex: 1 }}>
              <p
                className="label"
                style={{ fontSize: "0.48rem", opacity: 0.55, marginBottom: 2 }}
              >
                {card.date}
              </p>
              <h3
                className="font-display"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--c-ink)",
                  lineHeight: 1.25,
                  fontWeight: 600,
                }}
              >
                {card.title}
              </h3>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 20,
              height: 1.5,
              background:
                "linear-gradient(90deg, var(--c-gold), var(--c-gold-l))",
              borderRadius: 2,
              marginBottom: 7,
              marginLeft: isLeft ? "auto" : 0,
            }}
          />

          {/* SNIPPET — 2 lines only */}
          <p
            className="font-serif italic"
            style={{
              fontSize: "0.76rem",
              color: "var(--c-ink2)",
              lineHeight: 1.75,
              fontWeight: 300,
              textAlign: isLeft ? "right" : "left",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {card.text}
          </p>

          {/* Read more hint */}
          <p
            style={{
              fontSize: "0.58rem",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              color: "var(--c-gold-d)",
              opacity: 0.7,
              marginTop: 8,
              textAlign: isLeft ? "right" : "left",
            }}
          >
            {isLeft ? "← baca" : "baca →"}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* =============================================
   DOT
============================================= */
function Dot({ scrollYProgress }) {
  const bg = useTransform(scrollYProgress, [0, 0.5], ["#E0D0A8", "#C8870A"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  return (
    <motion.div
      style={{
        width: 13,
        height: 13,
        borderRadius: "50%",
        background: bg,
        scale,
        border: "2.5px solid #fff",
        boxShadow: "0 2px 8px rgba(200,135,10,0.3)",
        flexShrink: 0,
        zIndex: 2,
      }}
    />
  );
}

/* =============================================
   ROW
============================================= */
function TimelineRow({ card, index, onOpen }) {
  const isLeft = index % 2 === 0;
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 90%", "start 50%"],
  });

  return (
    <div
      ref={rowRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        {isLeft && (
          <Card card={card} index={index} isLeft onOpen={() => onOpen(index)} />
        )}
      </div>
      <Dot scrollYProgress={scrollYProgress} />
      <div style={{ flex: 1 }}>
        {!isLeft && (
          <Card
            card={card}
            index={index}
            isLeft={false}
            onOpen={() => onOpen(index)}
          />
        )}
      </div>
    </div>
  );
}

/* =============================================
   MAIN
============================================= */
export default function TimelineSection() {
  const sectionRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(null);

  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(sectionScroll, [0.05, 0.92], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="pattern-cream"
      style={{ paddingTop: 96, paddingBottom: 80 }}
    >
      {/* Header */}
      <div
        className="inner"
        style={{ padding: "0 20px", textAlign: "center", marginBottom: 52 }}
      >
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
          <MapPinIcon size={14} color="var(--c-gold-d)" />
          <span className="label">perjalanan kita</span>
          <MapPinIcon size={14} color="var(--c-gold-d)" />
        </motion.div>
        <motion.h2
          className="font-display gt"
          style={{ fontSize: "clamp(2.6rem, 11vw, 4.5rem)", lineHeight: 1 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Timeline
        </motion.h2>
        <div className="divider" />
        <motion.p
          className="font-serif italic"
          style={{ fontSize: "1rem", color: "var(--c-muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          cerita kita dari awal, sampai sekarang
        </motion.p>
      </div>

      {/* Alternating layout */}
      <div className="inner" style={{ padding: "0 10px" }}>
        <div style={{ position: "relative" }}>
          {/* Skeleton line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              transform: "translateX(-50%)",
              background: "rgba(200,135,10,0.14)",
              borderRadius: 2,
              zIndex: 0,
            }}
          />
          {/* Filled line */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: 2,
              transform: "translateX(-50%)",
              background:
                "linear-gradient(to bottom, var(--c-gold), var(--c-gold-l))",
              borderRadius: 2,
              height: lineHeight,
              originY: 0,
              zIndex: 0,
            }}
          />

          {CARDS.map((card, i) => (
            <TimelineRow key={i} card={card} index={i} onOpen={setOpenIdx} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {openIdx !== null && (
        <CardModal
          card={CARDS[openIdx]}
          index={openIdx}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </section>
  );
}
