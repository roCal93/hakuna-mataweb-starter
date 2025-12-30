import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-100">
      <Link href="/" prefetch>
        <h1 className="text-2xl font-bold cursor-pointer">Hakuna Mataweb</h1>
      </Link>
      <nav className="space-x-4">
        <Link href="/" prefetch>
          <Button variant="secondary">Accueil</Button>
        </Link>
        <Link href="/projets" prefetch>
          <Button variant="secondary">Projets</Button>
        </Link>
        <Link href="/contact" prefetch>
          <Button variant="secondary">Contact</Button>
        </Link>
      </nav>
    </header>
  )
}
