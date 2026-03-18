import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlowerIcon, SparkleIcon } from './components/Icons'
import CustomCursor from './components/CustomCursor'
import HeroSection from './components/HeroSection'
import MusicSection from './components/MusicSection'
import TimelineSection from './components/TimelineSection'
import WishSection from './components/WishSection'
import LetterSection from './components/LetterSection'
import StopwatchSection from './components/StopwatchSection'
import ScatterSection from './components/ScatterSection'
import ClosingSection from './components/ClosingSection'

/* =============================================
   WAVE DIVIDER — double layer + gold shimmer
============================================= */
function WaveDivider({ fromColor, toColor, flip = false, index = 0 }) {
  const gid = `wg${index}`
  return (
    <div style={{ display: 'block', lineHeight: 0, background: flip ? toColor : fromColor }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
        style={{ width: '100%', height: 72, display: 'block', transform: flip ? 'scaleX(-1)' : 'none' }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(200,135,10,0)" />
            <stop offset="30%"  stopColor="rgba(200,135,10,0.4)" />
            <stop offset="50%"  stopColor="rgba(240,176,32,0.65)" />
            <stop offset="70%"  stopColor="rgba(200,135,10,0.4)" />
            <stop offset="100%" stopColor="rgba(200,135,10,0)" />
          </linearGradient>
        </defs>

        {/* Back wave — softer, slightly offset */}
        <path
          d="M0,40 C200,72 400,10 640,38 C800,56 1000,16 1200,42 C1320,56 1400,30 1440,38 L1440,80 L0,80 Z"
          fill={flip ? fromColor : toColor}
          opacity="0.4"
        />
        {/* Front wave — main */}
        <path
          d="M0,50 C180,80 360,18 600,44 C780,62 960,20 1140,46 C1300,62 1400,36 1440,46 L1440,80 L0,80 Z"
          fill={flip ? fromColor : toColor}
        />
        {/* Gold shimmer along wave crest */}
        <path
          d="M0,50 C180,80 360,18 600,44 C780,62 960,20 1140,46 C1300,62 1400,36 1440,46"
          fill="none" stroke={`url(#${gid})`} strokeWidth="1.8"
        />
      </svg>
    </div>
  )
}

/* =============================================
   SMOOTH LOADER
============================================= */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    let val = 0
    const id = setInterval(() => {
      const step = val < 60 ? (Math.random() * 12 + 6) : val < 85 ? (Math.random() * 5 + 2) : (Math.random() * 2 + 0.5)
      val = Math.min(val + step, 100)
      setPct(Math.round(val))
      if (val >= 100) {
        clearInterval(id)
        setTimeout(() => setPhase('out'), 350)
        setTimeout(onDone, 1050)
      }
    }, 55)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <motion.div style={{
      position: 'fixed', inset: 0, zIndex: 9990,
      background: 'var(--c-bg)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', willChange: 'opacity, transform',
    }}
      animate={phase === 'out' ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 1, 1] }}>

      {/* Dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(244,160,184,0.18) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Animated blobs */}
      <div style={{ position:'absolute', top:'10%', right:'5%', width:100, height:100, borderRadius:'50%', background:'rgba(244,160,184,0.14)', animation:'float 4s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'15%', left:'6%', width:70, height:70, borderRadius:'50%', background:'rgba(245,193,64,0.14)', animation:'float2 5s ease-in-out infinite', pointerEvents:'none' }} />

      {/* SVG corner accents */}
      <div style={{ position:'absolute', top:32, left:32, opacity:0.3 }}>
        <SparkleIcon size={16} color="var(--c-gold)" />
      </div>
      <div style={{ position:'absolute', top:32, right:32, opacity:0.3 }}>
        <FlowerIcon size={14} color="var(--c-rose)" />
      </div>
      <div style={{ position:'absolute', bottom:32, left:32, opacity:0.3 }}>
        <FlowerIcon size={14} color="var(--c-rose)" />
      </div>
      <div style={{ position:'absolute', bottom:32, right:32, opacity:0.3 }}>
        <SparkleIcon size={16} color="var(--c-gold)" />
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
        <h1 className="font-display gt"
          style={{ fontSize:'clamp(4rem, 18vw, 6.5rem)', lineHeight:1, marginBottom:32 }}>
          Gemas
        </h1>

        {/* Progress bar — CSS transition only */}
        <div style={{ width:180, height:5, borderRadius:99, background:'rgba(244,160,184,0.2)', overflow:'hidden', margin:'0 auto' }}>
          <div style={{
            height:'100%', width:`${pct}%`, borderRadius:99,
            background:'linear-gradient(90deg, var(--c-rose), var(--c-gold))',
            transition:'width 0.18s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange:'width',
          }} />
        </div>
        <p className="label" style={{ marginTop:14, opacity:0.45, letterSpacing:'0.28em' }}>
          {pct < 100 ? `memuat ${pct}%` : 'siap'}
        </p>
      </div>
    </motion.div>
  )
}

/* =============================================
   NAV DOTS
============================================= */
const LABELS = ['Pembuka','Musik','Timeline','Doa','Surat','Waktu','Momen','Penutup']

function NavDots({ active }) {
  return (
    <div style={{ position:'fixed', right:14, top:'50%', transform:'translateY(-50%)', zIndex:40, flexDirection:'column', gap:10 }} className="hidden md:flex">
      {LABELS.map((label, i) => (
        <motion.a key={i} href={`#s${i}`}
          style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end', textDecoration:'none' }}
          whileHover={{ x:-3 }}>
          <motion.div style={{ height:6, borderRadius:3 }}
            animate={{ width: active===i ? 20 : 6, background: active===i ? 'var(--c-rose)' : 'rgba(244,160,184,0.3)' }}
            transition={{ duration:0.2 }} />
        </motion.a>
      ))}
    </div>
  )
}

const SECTION_BG = [
  'var(--c-bg)',       // 0 Hero
  'var(--c-bg-alt)',   // 1 Music
  'var(--c-bg)',       // 2 Timeline
  'var(--c-peach-bg)', // 3 Wish
  'var(--c-bg-alt)',   // 4 Letter
  'var(--c-gold-bg)',  // 5 Stopwatch
  'var(--c-lav-bg)',   // 6 Scatter
  'var(--c-bg)',       // 7 Closing
]

const SECTIONS = [
  HeroSection, MusicSection, TimelineSection,
  WishSection, LetterSection,
  StopwatchSection, ScatterSection,
  ClosingSection,
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [active,  setActive]  = useState(0)

  useEffect(() => {
    if (loading) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(+e.target.dataset.s) }),
      { threshold: 0.2 }
    )
    document.querySelectorAll('[data-s]').forEach(el => obs.observe(el
      
    ))
    return () => obs.disconnect()
  }, [loading])

  return (
    <>
      <CustomCursor />
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      {!loading && (
        <>
          <NavDots active={active} />
          <main>
            {SECTIONS.map((Sec, i) => (
              <div key={i}>
                <div id={`s${i}`} data-s={i}><Sec /></div>
                {i < SECTIONS.length - 1 && (
                  <WaveDivider fromColor={SECTION_BG[i]} toColor={SECTION_BG[i+1]} flip={i%2===1} index={i} />
                )}
              </div>
            ))}
          </main>
        </>
      )}
    </>
  )
}
