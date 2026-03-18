/* ============================================
   SVG ICON COMPONENTS — cute but clean
   All icons: 24x24 viewBox by default
============================================ */

export function HeartIcon({ size = 20, color = 'var(--c-rose)', filled = true, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}
      fill={filled ? color : 'none'} stroke={filled ? 'none' : color} strokeWidth={filled ? 0 : 1.8}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function StarIcon({ size = 20, color = 'var(--c-gold)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M12 2l2.4 7.3H22l-6.2 4.5 2.4 7.3L12 16.6l-6.2 4.5 2.4-7.3L2 9.3h7.6L12 2z" />
    </svg>
  )
}

export function SparkleIcon({ size = 18, color = 'var(--c-gold)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M12 2C12 2 12.8 7 12.8 12C12.8 17 12 22 12 22C12 22 11.2 17 11.2 12C11.2 7 12 2 12 2Z" />
      <path d="M2 12C2 12 7 11.2 12 11.2C17 11.2 22 12 22 12C22 12 17 12.8 12 12.8C7 12.8 2 12 2 12Z" />
      <path d="M4.93 4.93C4.93 4.93 8.76 9.17 12 12.4C15.24 15.64 19.07 19.07 19.07 19.07C19.07 19.07 15.24 14.83 12 11.6C8.76 8.36 4.93 4.93 4.93 4.93Z" opacity="0.6" />
      <path d="M19.07 4.93C19.07 4.93 15.24 8.76 12 12C8.76 15.24 4.93 19.07 4.93 19.07C4.93 19.07 8.76 15.24 12 12C15.24 8.76 19.07 4.93 19.07 4.93Z" opacity="0.6" />
    </svg>
  )
}

export function FlowerIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <circle cx="12" cy="12" r="2.5" fill={color} />
      <ellipse cx="12" cy="6" rx="2.2" ry="3.5" fill={color} opacity="0.8" />
      <ellipse cx="12" cy="18" rx="2.2" ry="3.5" fill={color} opacity="0.8" />
      <ellipse cx="6" cy="12" ry="2.2" rx="3.5" fill={color} opacity="0.8" />
      <ellipse cx="18" cy="12" ry="2.2" rx="3.5" fill={color} opacity="0.8" />
      <ellipse cx="7.76" cy="7.76" rx="2.2" ry="3.5" fill={color} opacity="0.7" transform="rotate(45 7.76 7.76)" />
      <ellipse cx="16.24" cy="16.24" rx="2.2" ry="3.5" fill={color} opacity="0.7" transform="rotate(45 16.24 16.24)" />
      <ellipse cx="16.24" cy="7.76" rx="2.2" ry="3.5" fill={color} opacity="0.7" transform="rotate(-45 16.24 7.76)" />
      <ellipse cx="7.76" cy="16.24" rx="2.2" ry="3.5" fill={color} opacity="0.7" transform="rotate(-45 7.76 16.24)" />
      <circle cx="12" cy="12" r="2.5" fill="#fff" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  )
}

export function LeafIcon({ size = 20, color = 'var(--c-mint)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C18 20 22 12 22 6c-4 2-6 3-8 0-1-2-1-4 3-4z" />
    </svg>
  )
}

export function SproutIcon({ size = 20, color = '#80D4B0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5 4-6 4-6s-4.5 1-5 4" />
      <path d="M14 20c-5.5-2.5-4-6-4-6s4.5 1 5 4" />
      <path d="M12 14V6" />
      <path d="M12 6C12 6 9 3 6 4c0 4 3 7 6 6" />
      <path d="M12 6c0 0 3-3 6-2-1 4-4 7-6 6" />
    </svg>
  )
}

export function HomeIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )
}

export function MusicNoteIcon({ size = 20, color = 'var(--c-rose-d)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  )
}

export function ClockIcon({ size = 20, color = 'var(--c-gold)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={style}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function CalendarIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

export function MailIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function CameraIcon({ size = 20, color = 'var(--c-rose-d)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export function CompassIcon({ size = 20, color = 'var(--c-rose-d)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={style}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} opacity="0.7" />
    </svg>
  )
}

export function CakeIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v3" />
      <path d="M12 8v3" />
      <path d="M17 8v3" />
      <path d="M7 8c0-1.5 1-2 1-3.5C8 3 7 2 7 2s1 1 1 2.5C8 6 7 6.5 7 8z" />
      <path d="M12 8c0-1.5 1-2 1-3.5C13 3 12 2 12 2s1 1 1 2.5C13 6 12 6.5 12 8z" />
      <path d="M17 8c0-1.5 1-2 1-3.5C18 3 17 2 17 2s1 1 1 2.5C18 6 17 6.5 17 8z" />
    </svg>
  )
}

export function DoveIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill={color} style={style}>
      <path d="M46 10c-8 0-15 5-17 12L7 28l10 6-4 8 14-4c2 6 8 10 15 10 10 0 18-8 18-18S56 10 46 10zm0 28c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
      <circle cx="50" cy="28" r="3" fill="#fff" />
    </svg>
  )
}

export function SunIcon({ size = 20, color = 'var(--c-gold)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={style}>
      <circle cx="12" cy="12" r="5" fill={color} stroke="none" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

export function MoonIcon({ size = 20, color = 'var(--c-lavender)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function GiftIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

export function RainbowIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M22 17a10 10 0 0 0-20 0" stroke="#F4A0B8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 17a8 8 0 0 0-16 0" stroke="#F5C140" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 17a6 6 0 0 0-12 0" stroke="#C5AFE8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function HandIcon({ size = 20, color = 'var(--c-rose-d)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M18 11V7c0-.55-.45-1-1-1s-1 .45-1 1V4c0-.55-.45-1-1-1s-1 .45-1 1v3c0-.55-.45-1-1-1s-1 .45-1 1V5c0-.55-.45-1-1-1s-1 .45-1 1v8l-1.5-1.85A1 1 0 0 0 7.27 11c-.28.016-.54.133-.74.33L6 12l4 5h8l1-6h-1z" />
    </svg>
  )
}

export function PenIcon({ size = 20, color = 'var(--c-rose-d)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

export function CheckCircleIcon({ size = 20, color = 'var(--c-mint)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export function MapPinIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

export function CloudIcon({ size = 20, color = '#C5AFE8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  )
}

export function ShieldHeartIcon({ size = 20, color = 'var(--c-lavender)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={color} fillOpacity="0.15" />
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 14l-2.5-2.5c-.69-.69-.69-1.81 0-2.5.69-.69 1.81-.69 2.5 0l.07.07.07-.07c.69-.69 1.81-.69 2.5 0 .69.69.69 1.81 0 2.5L12 14z" fill={color} />
    </svg>
  )
}

export function GrowthIcon({ size = 20, color = '#80D4B0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

export function InfinityIcon({ size = 20, color = 'var(--c-rose)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={style}>
      <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z" />
      <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
    </svg>
  )
}
