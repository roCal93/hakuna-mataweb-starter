import React from 'react'
import Image from 'next/image'
import { cleanImageUrl } from '@/lib/strapi'
import { StrapiMedia, StrapiBlock, Card, StrapiEntity } from '@/types/strapi'
import { Card as CardComponent } from '@/components/sections/Card'

type SectionGenericProps = {
  title?: string
  content: StrapiBlock[]
  image?: StrapiMedia | string
  reverse?: boolean
  priority?: boolean
  cards?: (Card & StrapiEntity)[]
}

export const SectionGeneric = ({ title, content, image, reverse = false, priority = false, cards }: SectionGenericProps) => {
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

  // Fonction pour rendre les blocs Strapi
  const renderBlocks = (blocks: StrapiBlock[]) => {
    return blocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} className="text-gray-700 mb-4">
              {block.children?.map((child, childIndex) => {
                if (child.type === 'text') {
                  return <span key={childIndex}>{child.text}</span>
                }
                // Gérer d'autres types d'enfants si nécessaire (bold, italic, etc.)
                return null
              })}
            </p>
          )
        case 'heading':
          const level = block.level || 2
          const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements
          return (
            <HeadingTag key={index} className="text-gray-700 mb-4">
              {block.children?.map((child, childIndex) => {
                if (child.type === 'text') {
                  return <span key={childIndex}>{child.text}</span>
                }
                return null
              })}
            </HeadingTag>
          )
        // Ajouter d'autres types de blocs si nécessaire
        default:
          return null
      }
    })
  }

  return (
    <section className="py-12">
      {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
      
      {cards && cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <CardComponent
              key={card.id}
              title={card.title}
              description={card.description ? card.description.map(block => 
                block.children?.map(child => child.text || '').join('') || ''
              ).join('\n') : ''}
              image={card.image?.url}
            />
          ))}
        </div>
      ) : (
        <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center my-8`}>
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
            {renderBlocks(content)}
          </div>
        </div>
      )}
    </section>
  )
}
