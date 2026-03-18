import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    let ringX = 0, ringY = 0, cx = 0, cy = 0, rafId

    const onMove = (e) => {
      cx = e.clientX; cy = e.clientY
      dot.style.left = cx + 'px'
      dot.style.top  = cy + 'px'
    }
    const animate = () => {
      ringX += (cx - ringX) * 0.12
      ringY += (cy - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      rafId = requestAnimationFrame(animate)
    }
    const onEnter = () => {
      dot.style.width  = '11px'
      dot.style.height = '11px'
      ring.style.width  = '44px'
      ring.style.height = '44px'
      ring.style.borderColor = 'rgba(244,160,184,0.7)'
    }
    const onLeave = () => {
      dot.style.width   = '7px'
      dot.style.height  = '7px'
      ring.style.width  = '30px'
      ring.style.height = '30px'
      ring.style.borderColor = 'rgba(244,160,184,0.5)'
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-cursor],input,textarea').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    animate()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1)' }} />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
