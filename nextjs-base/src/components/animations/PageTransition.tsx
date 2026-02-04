'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion()
  // isMounted will be true on client-side render, false on server
  const [isMounted] = useState(true)

  // Don't animate on initial server render for better LCP
  const initialProps = isMounted ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={initialProps}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={
        shouldReduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }
      }
    >
      {children}
    </motion.div>
  )
}
