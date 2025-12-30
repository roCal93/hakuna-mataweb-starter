import React from 'react'
import Image from 'next/image'
import { cleanImageUrl } from '@/lib/strapi'
import { StrapiMedia } from '@/types/strapi'

type SectionGenericProps = {
  title?: string
  content: string
  image?: StrapiMedia | string
  reverse?: boolean
  priority?: boolean
}

export const SectionGeneric = ({ title, content, image, reverse = false, priority = false }: SectionGenericProps) => {
  let imageSrc: string | undefined
  let imageData: StrapiMedia | undefined

  if (typeof image === 'string') {
    imageSrc = cleanImageUrl(image)
  } else if (image && typeof image === 'object') {
    imageData = image
    // Utiliser l'image originale - l'utilisateur gère l'optimisation à l'upload
    imageSrc = cleanImageUrl(image.url)
  }

  // Pour les images depuis Strapi, utiliser l'URL absolue
  const finalImageSrc = imageSrc && imageSrc.startsWith('/') 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageSrc}` 
    : imageSrc

  return (
    <section className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center my-8`}>
      {finalImageSrc && (
        <Image 
          src={finalImageSrc} 
          alt={imageData?.alternativeText || title || 'Image'} 
          width={imageData?.width || 800} 
          height={imageData?.height || 600} 
          className="w-full md:w-1/2 h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          unoptimized={true}
        />
      )}
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-2">{title || 'Titre'}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </section>
  )
}
