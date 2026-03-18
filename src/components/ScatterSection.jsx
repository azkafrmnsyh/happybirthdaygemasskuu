import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import {
  SparkleIcon,
  HeartIcon,
  FlowerIcon,
  StarIcon,
  LeafIcon,
  MoonIcon,
  SunIcon,
  CameraIcon,
} from "./Icons";

/* =============================================
   10 SCATTER PHOTOS
   initX / initY = small offsets from center (photos cluster at start)
============================================= */
const SCATTER_PHOTOS = [
  {
    id: 1,
    src: "/scatter10.png",
    initX: -14,
    initY: -20,
    initR: -7,
  },
  {
    id: 2,
    src: "/scatter9.jpg",
    initX: 18,
    initY: -16,
    initR: 9,
  },
  {
    id: 3,
    src: "/scatter8.jpg",
    initX: -22,
    initY: 14,
    initR: -12,
  },
  {
    id: 4,
    src: "/scatter7.jpg",
    initX: 24,
    initY: 20,
    initR: 6,
  },
  {
    id: 5,
    src: "/scatter6.jpg",
    initX: -8,
    initY: 26,
    initR: 14,
  },
  {
    id: 6,
    src: "scatter5.jpg",
    initX: 10,
    initY: -26,
    initR: -5,
  },
  {
    id: 7,
    src: "scatter4.jpg",
    initX: -20,
    initY: -8,
    initR: 10,
  },
  {
    id: 8,
    src: "/scatter3.jpg",
    initX: 16,
    initY: 6,
    initR: -8,
  },
  {
    id: 9,
    src: "/scatter2.jpg",
    initX: -4,
    initY: 18,
    initR: 4,
  },
  {
    id: 10,
    src: "/scatter1.jpg",
    initX: 6,
    initY: -12,
    initR: -11,
  },
];

const ICON_MAP = [
  { Icon: FlowerIcon, color: "#C8870A" },
  { Icon: SparkleIcon, color: "#D4A017" },
  { Icon: HeartIcon, color: "#C8870A" },
  { Icon: StarIcon, color: "#D4A017" },
  { Icon: LeafIcon, color: "#9A7210" },
  { Icon: FlowerIcon, color: "#C8870A" },
  { Icon: SunIcon, color: "#D4A017" },
  { Icon: MoonIcon, color: "#C8870A" },
  { Icon: HeartIcon, color: "#D4A017" },
  { Icon: StarIcon, color: "#9A7210" },
];

const PIN_COLORS = [
  "#C8870A",
  "#D4A017",
  "#B07008",
  "#C8870A",
  "#D4A017",
  "#9A6A05",
  "#C8870A",
  "#B07008",
  "#D4A017",
  "#C8870A",
];

const LABELS = [
  "Hehehe",
  "Lucuu kaya bocill",
  "Ini jugaa gemess",
  "Ini gemessinn",
  "Senyumnya lucuu",
  "Lucuu di wc",
  "Gemassnyaa",
  "Nakes kesayangan",
  "Ini kamu",
  "Paling gemass",
];

/* Card dimensions – used to offset so photos center correctly */
const CARD_W = 158;
const CARD_H = 210; // image 185 + caption ~25

/* =============================================
   DRAGGABLE SCATTER PHOTO
   Uses marginLeft/marginTop to offset element
   so its center aligns with the container's center,
   then initX/initY nudge it slightly from that center.
============================================= */
function ScatterPhoto({ photo, index, isTop, onBringToTop }) {
  const [dragging, setDragging] = useState(false);
  const { Icon, color } = ICON_MAP[index];

  // z-index: currently dragging (100) > last touched (50) > normal (index+1)
  const zIndex = dragging ? 100 : isTop ? 50 : index + 1;

  const handleInteract = useCallback(() => {
    onBringToTop(photo.id);
  }, [photo.id, onBringToTop]);

  return (
    <motion.div
      onPointerDown={handleInteract}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -(CARD_W / 2),
        marginTop: -(CARD_H / 2),
        x: photo.initX,
        y: photo.initY,
        rotate: photo.initR,
        zIndex,
        cursor: "grab",
        width: CARD_W,
        userSelect: "none",
        willChange: "transform",
      }}
      drag
      dragMomentum={false}
      dragElastic={0.06}
      whileDrag={{ scale: 1.08, cursor: "grabbing" }}
      onDragStart={() => {
        setDragging(true);
        handleInteract();
      }}
      onDragEnd={() => setDragging(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
    >
      {/* Pushpin */}
      <div
        style={{
          position: "absolute",
          top: -9,
          left: "50%",
          transform: "translateX(-50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: PIN_COLORS[index],
          boxShadow: `0 2px 8px ${PIN_COLORS[index]}70`,
          border: "2.5px solid rgba(255,255,255,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Icon size={7} color="#fff" />
      </div>

      {/* Card */}
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
          boxShadow:
            dragging || isTop
              ? "0 22px 55px rgba(0,0,0,0.2), 0 0 0 2px rgba(200,135,10,0.4)"
              : "0 5px 20px rgba(0,0,0,0.13)",
          transition: "box-shadow 0.22s ease",
        }}
      >
        <img
          src={photo.src}
          alt={LABELS[index]}
          style={{
            width: "100%",
            height: 185,
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            padding: "7px 11px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon size={12} color={color} />
          <span
            style={{
              fontSize: "0.68rem",
              color: "var(--c-muted)",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 600,
            }}
          >
            {LABELS[index]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   VELOCITY MARQUEE STRIP
   
   defaultDir:  1 = rightward base,  -1 = leftward base
   Scroll down (vel > 0) → pushes rightward
   Scroll up   (vel < 0) → pushes leftward
   
   So row1 (defaultDir=1): naturally drifts right,
   speeds up rightward on scroll-down, reverses on scroll-up.
   Row2 (defaultDir=-1): naturally drifts left,
   speeds up leftward on scroll-down, reverses on scroll-up.
============================================= */
const MARQUEE_PHOTOS = [
  "/flow1.jpg",
  "/flow2.jpg",
  "/flow3.jpg",
  "/flow4.jpg",
  "/flow5.jpg",
  "/flow6.jpg",
  "/flow7.jpg",
  "/flow8.jpg",
  "/flow9.jpg",
  "/flow10.jpg",
];

const ITEM_W = 140;
const ITEM_GAP = 8;

function VelocityStrip({ photos, baseSpeed = 52, defaultDir = 1 }) {
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);

  const TOTAL = photos.length * (ITEM_W + ITEM_GAP);
  const posX = useRef(defaultDir > 0 ? -TOTAL : 0);
  const momentum = useRef(0);
  const stripRef = useRef(null);
  const containerRef = useRef(null);

  // Drag tracking (refs = no re-render)
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const flickPx = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  /* ── Mouse handlers (desktop) ── */
  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    flickPx.current = 0;
    momentum.current = 0;
    setGrabbing(true);
  }, []);
  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = now - lastT.current;
    if (dt > 0) flickPx.current = dx / dt;
    posX.current += dx;
    lastX.current = e.clientX;
    lastT.current = now;
  }, []);
  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setGrabbing(false);
    momentum.current = flickPx.current * 220;
  }, []);

  /* ── Non-passive touch listeners ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0,
      startY = 0,
      trackH = false;

    function onTouchStart(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      lastX.current = startX;
      lastT.current = performance.now();
      flickPx.current = 0;
      momentum.current = 0;
      trackH = false;
      dragging.current = true;
    }
    function onTouchMove(e) {
      if (!dragging.current) return;
      const cx = e.touches[0].clientX;
      const cy = e.touches[0].clientY;
      if (!trackH) {
        if (Math.abs(cx - startX) < 5 && Math.abs(cy - startY) < 5) return;
        trackH = Math.abs(cx - startX) >= Math.abs(cy - startY);
        if (!trackH) {
          dragging.current = false;
          return;
        }
      }
      e.preventDefault(); // block page scroll — works because passive:false
      const now = performance.now();
      const dx = cx - lastX.current;
      const dt = now - lastT.current;
      if (dt > 0) flickPx.current = dx / dt;
      posX.current += dx;
      lastX.current = cx;
      lastT.current = now;
    }
    function onTouchEnd() {
      if (!dragging.current) return;
      dragging.current = false;
      if (trackH) momentum.current = flickPx.current * 220;
    }
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  /* ── Animation loop ── */
  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 50) / 1000;
    const vel = rawVelocity.get();

    if (!dragging.current) {
      // Auto-scroll with scroll-velocity influence
      const targetSpeed = defaultDir * (baseSpeed + vel * 0.7);
      posX.current -= targetSpeed * dt;

      // Decay user drag momentum
      if (Math.abs(momentum.current) > 0.5) {
        posX.current += momentum.current * dt;
        momentum.current *= Math.pow(0.94, delta / 16);
      } else {
        momentum.current = 0;
      }
    }

    // Seamless wrap
    while (posX.current > 0) posX.current -= TOTAL;
    while (posX.current < -TOTAL) posX.current += TOTAL;

    if (stripRef.current) {
      const skewDeg = Math.max(-5, Math.min(5, vel * 0.002));
      stripRef.current.style.transform = `translateX(${posX.current}px) skewX(${skewDeg}deg)`;
    }
  });

  const doubled = [...photos, ...photos];

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100%",
        cursor: grabbing ? "grabbing" : "grab",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        ref={stripRef}
        style={{
          display: "flex",
          gap: ITEM_GAP,
          width: "max-content",
          willChange: "transform",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            style={{
              width: ITEM_W,
              flexShrink: 0,
              borderRadius: 14,
              overflow: "hidden",
              border: "1.5px solid rgba(200,135,10,0.14)",
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: 175,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
============================================= */
export default function ScatterSection() {
  // Track which photo was last interacted with — it stays on top
  const [topId, setTopId] = useState(null);

  const bringToTop = useCallback((id) => {
    setTopId(id);
  }, []);

  return (
    <section
      className="pattern-lav"
      style={{ overflow: "hidden", position: "relative" }}
    >
      {/* ── SCATTER PART ── */}
      <div style={{ paddingTop: 72, paddingBottom: 32 }}>
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: 24, padding: "0 20px" }}
        >
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 10,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CameraIcon size={14} color="var(--c-gold-d)" />
            <span className="label">geser-geser fotonya</span>
            <CameraIcon size={14} color="var(--c-gold-d)" />
          </motion.div>
          <motion.h2
            className="font-display gt"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3.5rem)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pap random kamuu
          </motion.h2>
          <div className="divider" />
          <motion.p
            className="font-serif italic"
            style={{
              fontSize: "0.9rem",
              color: "var(--c-muted)",
              marginTop: 4,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* foto mulai di tengah — sebarkan sendiri! */}
          </motion.p>
        </div>

        {/* Photo canvas — container must have explicit dimensions */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 420,
            height: 430,
            margin: "0 auto",
          }}
        >
          {SCATTER_PHOTOS.map((photo, i) => (
            <ScatterPhoto
              key={photo.id}
              photo={photo}
              index={i}
              isTop={topId === photo.id}
              onBringToTop={bringToTop}
            />
          ))}

          {/* Center hint text behind photos */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <motion.p
              className="font-serif italic"
              style={{
                fontSize: "0.8rem",
                color: "rgba(140,100,20,0.3)",
                lineHeight: 1.7,
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              tarik untuk menyebar
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── VELOCITY SCROLL PART ── */}
      <div style={{ paddingTop: 64, paddingBottom: 96, position: "relative" }}>
        {/* Side vignettes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "linear-gradient(to right, var(--c-lav-bg) 0%, transparent 8%, transparent 92%, var(--c-lav-bg) 100%)",
          }}
        />

        <div
          style={{
            width: 48,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--c-gold), transparent)",
            margin: "0 auto 28px",
          }}
        />

        {/* Row 1: drifts right by default */}
        <div style={{ marginBottom: 10, position: "relative", zIndex: 0 }}>
          <VelocityStrip
            photos={MARQUEE_PHOTOS}
            baseSpeed={52}
            defaultDir={1}
          />
        </div>

        {/* Row 2: drifts left by default */}
        <div style={{ position: "relative", zIndex: 0 }}>
          <VelocityStrip
            photos={[...MARQUEE_PHOTOS].reverse()}
            baseSpeed={44}
            defaultDir={-1}
          />
        </div>
      </div>
    </section>
  );
}
