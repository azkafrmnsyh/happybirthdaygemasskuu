import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * TiltCard — mouse-reactive 3D perspective tilt with shine overlay.
 *
 * Props:
 *   maxTilt  : max rotation degrees (default 12)
 *   style    : extra styles on the outer perspective div
 *   children : card content
 */
export default function TiltCard({ children, maxTilt = 12, style = {} }) {
  const ref = useRef(null)
  const [tilt,  setTilt]  = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })

  const onMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2) // -1..1
    const ny = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2) // -1..1
    setTilt({ x: -ny * maxTilt, y: nx * maxTilt })
    setShine({ x: 50 + nx * 30, y: 50 + ny * 30 })
  }, [maxTilt])

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setShine({ x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: '900px', ...style }}>
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: (tilt.x || tilt.y) ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
        style={{ transformStyle: 'preserve-3d', borderRadius: 'inherit', position: 'relative' }}>
        {children}
        {/* Moving shine reflection */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`,
          transition: 'background 0.06s',
        }} />
      </motion.div>
    </div>
  )
}
