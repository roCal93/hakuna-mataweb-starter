'use client'

import React from 'react'
import Image from 'next/image'
import { WorkItem, StrapiEntity } from '@/types/strapi'
import { cleanImageUrl } from '@/lib/strapi'

type CarouselWorkCardProps = {
  item: WorkItem & StrapiEntity
}

const CarouselWorkCard = ({ item }: CarouselWorkCardProps) => {
  const imageUrl = cleanImageUrl(item.image?.url)

  return (
    <div className="relative w-full h-72 overflow-hidden rounded-lg shadow-sm bg-white flex-shrink-0 select-none">
      <div className="relative w-full aspect-[3/1] overflow-hidden flex items-center justify-center p-2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.image?.alternativeText || item.title}
            width={400}
            height={200}
            className="max-w-full max-h-full object-contain select-none pointer-events-none"
            sizes="400px"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-center text-base font-semibold leading-tight line-clamp-2">
          {item.title}
        </h3>
      </div>
    </div>
  )
}

export default CarouselWorkCard
