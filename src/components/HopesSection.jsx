import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, StarIcon, LeafIcon, FlowerIcon, ShieldHeartIcon, GrowthIcon } from './Icons'
import TiltCard from './TiltCard'

/* From creator to Kharisma — heartfelt wish cards */
const WISHES = [
  {
    Icon: FlowerIcon,
    iconColor: 'var(--c-gold)',
    color: '#FFFFFF', border: 'rgba(200,135,10,0.2)',
    title: 'Semoga kamu selalu bahagia',
    text: 'Bukan bahagia yang harus terus sempurna, tapi bahagia yang jujur — yang tumbuh dari hal-hal kecil: secangkir teh hangat, langit sore yang cantik, atau percakapan yang membuatmu tertawa tanpa alasan.',
  },
  {
    Icon: StarIcon,
    iconColor: 'var(--c-gold)',
    color: '#FFFBEA', border: 'rgba(200,135,10,0.22)',
    title: 'Semoga kamu tahu betapa berharganya kamu',
    text: 'Kadang aku ingin bilang ini lebih sering: kamu cukup. Kamu lebih dari cukup. Cara kamu hadir, cara kamu peduli, cara kamu menjadi dirimu sendiri — itu semua sesuatu yang langka dan indah.',
  },
  {
    Icon: ShieldHeartIcon,
    iconColor: 'var(--c-gold-d)',
    color: '#FFFFFF', border: 'rgba(200,135,10,0.18)',
    title: 'Semoga kamu dijaga selalu',
    text: 'Di setiap langkah yang kamu ambil, semoga kamu selalu diberi jalan yang lembut. Dan di hari-hari yang terasa berat, semoga kamu tahu bahwa ada yang selalu mendoakanmu dari sini.',
  },
  {
    Icon: GrowthIcon,
    iconColor: 'var(--c-gold)',
    color: '#FFFBEA', border: 'rgba(200,135,10,0.22)',
    title: 'Semoga kamu terus tumbuh',
    text: 'Setiap versi dirimu — kemarin, hari ini, dan besok — semuanya berharga. Tumbuh tidak harus cepat. Yang penting kamu bergerak, dan aku akan terus melihat proses indah itu dengan bangga.',
  },
]

export default function HopesSection() {
  return (
    <section className="pattern-mint" style={{ paddingTop: 96, paddingBottom: 80 }}>
      <div className="inner" style={{ padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <HeartIcon size={14} color="var(--c-rose-d)" />
            <span className="label">dari hati yang paling dalam</span>
            <HeartIcon size={14} color="var(--c-rose-d)" />
          </motion.div>
          <motion.h2 className="font-display gt"
            style={{ fontSize: 'clamp(2.4rem, 10vw, 4rem)', lineHeight: 1 }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Harapanku
          </motion.h2>
          <div className="divider" />
          <motion.p className="font-serif italic" style={{ fontSize: '1rem', color: 'var(--c-muted)', marginTop: 4 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            doa-doaku yang disimpan setiap hari, khusus buat kamu
          </motion.p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {WISHES.map((w, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16,1,0.3,1] }}>
              <TiltCard maxTilt={10} style={{ borderRadius: 22 }}>
                <div style={{ background: w.color, border: `1.5px solid ${w.border}`, borderRadius: 22, padding: '22px 22px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {/* Icon box */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(255,255,255,0.7)',
                  border: `1px solid ${w.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity }}>
                    <w.Icon size={20} color={w.iconColor} />
                  </motion.div>
                </div>

                <div style={{ flex: 1 }}>
                  <h3 className="font-nunito" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: 8, lineHeight: 1.3 }}>
                    {w.title}
                  </h3>
                  <div style={{ width: 26, height: 2, background: 'linear-gradient(90deg, var(--c-rose), var(--c-gold))', borderRadius: 2, marginBottom: 10 }} />
                  <p className="font-serif italic" style={{ fontSize: '0.9rem', color: 'var(--c-ink2)', lineHeight: 1.85, fontWeight: 300 }}>
                    {w.text}
                  </p>
                </div>
              </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div style={{ textAlign: 'center', marginTop: 44 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, var(--c-rose), transparent)', margin: '0 auto 18px' }} />
          <p className="font-serif italic" style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', color: 'var(--c-ink2)', lineHeight: 1.9 }}>
            "Selamat ulang tahun, Gemas. Semua harapan ini, aku titipkan pada waktu."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
            <LeafIcon size={12} color="var(--c-mint)" />
            <span className="label" style={{ opacity: 0.45, fontSize: '0.55rem' }}>dengan sepenuh hati</span>
            <LeafIcon size={12} color="var(--c-mint)" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
