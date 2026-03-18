import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClockIcon,
  CalendarIcon,
  HeartIcon,
  LeafIcon,
  SparkleIcon,
} from "./Icons";

const START = new Date(2025, 2, 16, 0, 0, 0);
function pad(n) {
  return String(n).padStart(2, "0");
}

function getDiff() {
  const ms = Math.max(0, Date.now() - START.getTime());
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const mo = Math.floor(day / 30.436875);
  const yr = Math.floor(mo / 12);
  return {
    years: yr,
    months: mo % 12,
    days: Math.floor(day % 30.436875),
    hours: hr % 24,
    minutes: min % 60,
    seconds: sec % 60,
    totalDays: day,
  };
}

/* Flip-style unit */
function Unit({ value, label, delay, accent }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);
  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <motion.div
        style={{
          width: "clamp(60px, 14vw, 72px)",
          height: "clamp(60px, 14vw, 72px)",
          background: flipping ? `${accent}1A` : "#fff",
          border: `2px solid ${flipping ? accent : "rgba(244,160,184,0.25)"}`,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(212,96,122,0.1)",
          transition: "background 0.2s, border-color 0.2s",
        }}
        animate={flipping ? { scale: [1, 0.9, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <span
          className="font-display gt"
          style={{ fontSize: "1.5rem", fontWeight: 700 }}
        >
          {pad(value)}
        </span>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 6,
            right: 6,
            height: 1,
            background: "rgba(244,160,184,0.2)",
          }}
        />
      </motion.div>
      <span className="label" style={{ fontSize: "0.52rem", opacity: 0.6 }}>
        {label}
      </span>
    </motion.div>
  );
}

/* Blinking separator dots */
function Sep() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        paddingTop: 12,
      }}
    >
      <motion.div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--c-rose)",
        }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--c-rose)",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

const ACCENTS = [
  "#F4A0B8",
  "#F5C140",
  "#C5AFE8",
  "#80D4B0",
  "#FFB98A",
  "#F4A0B8",
];

export default function StopwatchSection() {
  const [d, setD] = useState(getDiff());
  const t = useRef();
  useEffect(() => {
    const tick = () => {
      setD(getDiff());
      t.current = setTimeout(tick, 1000);
    };
    tick();
    return () => clearTimeout(t.current);
  }, []);

  const units = [
    ...(d.years > 0 ? [{ v: d.years, l: "tahun", a: ACCENTS[0] }] : []),
    { v: d.months, l: "bulan", a: ACCENTS[1] },
    { v: d.days, l: "hari", a: ACCENTS[2] },
    { v: d.hours, l: "jam", a: ACCENTS[3] },
    { v: d.minutes, l: "menit", a: ACCENTS[4] },
    { v: d.seconds, l: "detik", a: ACCENTS[5] },
  ];

  return (
    <section
      className="pattern-gold"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circular rings */}
      {[200, 320, 440].map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: s,
            height: s,
            borderRadius: "50%",
            border: "1px solid rgba(245,193,64,0.2)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 3 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          width: "100%",
          maxWidth: 480,
        }}
      >
        {/* Header */}
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
          <ClockIcon size={16} color="var(--c-gold-d)" />
          <span className="label">sudah berapa lama</span>
          <ClockIcon size={16} color="var(--c-gold-d)" />
        </motion.div>
        <motion.h2
          className="font-display gt"
          style={{ fontSize: "clamp(2.4rem, 10vw, 4rem)", lineHeight: 1 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Bersama Kamu
        </motion.h2>
        <div className="divider" />
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            marginBottom: 48,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LeafIcon size={13} color="var(--c-mint)" />
          <p
            className="font-serif italic"
            style={{ fontSize: "1rem", color: "var(--c-muted)" }}
          >
            sejak 16 Maret 2025
          </p>
          <LeafIcon size={13} color="var(--c-mint)" />
        </motion.div>

        {/* Units */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 48,
          }}
        >
          {units.map((u, i) => (
            <div
              key={u.l}
              style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
            >
              <Unit value={u.v} label={u.l} delay={i * 0.08} accent={u.a} />
              {i < units.length - 1 && <Sep />}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginBottom: 40,
          }}
        >
          {[
            {
              n: d.totalDays,
              label: "hari bersama",
              Icon: CalendarIcon,
              ic: "var(--c-rose)",
            },
            {
              n: d.totalDays * 24 + d.hours,
              label: "jam bersama",
              Icon: ClockIcon,
              ic: "var(--c-gold-d)",
            },
            {
              n: d.totalDays * 24 * 60 + d.hours * 60 + d.minutes,
              label: "menit kita",
              Icon: HeartIcon,
              ic: "var(--c-rose)",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "14px 10px",
                textAlign: "center",
                border: "1.5px solid rgba(245,193,64,0.3)",
                boxShadow: "0 4px 16px rgba(200,136,24,0.08)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <s.Icon size={16} color={s.ic} style={{ margin: "0 auto 6px" }} />
              <p
                className="font-display gt-gold"
                style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 4 }}
              >
                {s.n.toLocaleString("id-ID")}+
              </p>
              <p
                className="label"
                style={{ fontSize: "0.48rem", opacity: 0.55 }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            textAlign: "left",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SparkleIcon
            size={14}
            color="var(--c-gold)"
            style={{ flexShrink: 0, marginTop: 4 }}
          />
          <p
            className="font-serif italic"
            style={{ fontSize: "1rem", color: "var(--c-ink2)", lineHeight: 2 }}
          >
            "Setiap detik yang kita lewati bersama adalah detik yang tidak akan
            pernah aku tukar."
          </p>
          <SparkleIcon
            size={14}
            color="var(--c-gold)"
            style={{ flexShrink: 0, marginTop: 4 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
