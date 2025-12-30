import React from 'react'
import Image from 'next/image'
import { cleanImageUrl } from '@/lib/strapi'

type CardProps = {
  title: string
  description: string
  image?: string
}

export const Card = ({ title, description, image }: CardProps) => {
  const cleanImage = cleanImageUrl(image)
  
  return (
    <div className="border rounded-lg overflow-hidden shadow p-4 bg-white">
      {cleanImage && (
        <div className="relative w-full h-40 mb-4">
          <Image 
            src={cleanImage} 
            alt={title} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  )
}
