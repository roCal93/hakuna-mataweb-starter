import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WorkItem, StrapiEntity } from '@/types/strapi'
import { cleanImageUrl } from '@/lib/strapi'

type WorkCardProps = {
  item: WorkItem & StrapiEntity
  layout?: 'grid' | 'masonry' | 'list'
}

export const WorkCard = ({ item, layout = 'grid' }: WorkCardProps) => {
  const imageUrl = cleanImageUrl(item.image?.url)

  // List layout
  if (layout === 'list') {
    return (
      <div className="group flex gap-6 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
        {/* Image */}
        <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.image?.alternativeText || item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="192px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {item.featured && (
            <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
              ★
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-bold group-hover:text-gray-600 transition-colors">
              {item.title}
            </h3>
            {item.itemType && (
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                {item.itemType}
              </span>
            )}
          </div>

          {item.shortDescription && (
            <p className="text-gray-600 mb-4">
              {item.shortDescription}
            </p>
          )}

          {/* Categories tags */}
          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: category.color ? `${category.color}20` : '#f3f4f6',
                    color: category.color || '#6b7280',
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {item.client && <span>Client: {item.client}</span>}
            {item.year && <span>Année: {item.year}</span>}
          </div>

          {/* Custom fields display */}
          {item.customFields && typeof item.customFields === 'object' && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(item.customFields).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-gray-700">{key}: </span>
                  <span className="text-gray-600">{String(value)}</span>
                </div>
              ))}
            </div>
          )}

          {item.link && (
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Voir plus
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Grid/Masonry layout
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.image?.alternativeText || item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}

        {/* Item type badge */}
        {item.itemType && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            {item.itemType}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
          {item.title}
        </h3>
        
        {item.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.shortDescription}
          </p>
        )}

        {/* Categories tags */}
        {item.categories && item.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.categories.map((category) => (
              <span
                key={category.id}
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: category.color ? `${category.color}20` : '#f3f4f6',
                  color: category.color || '#6b7280',
                }}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          {item.client && <span>{item.client}</span>}
          {item.year && <span>{item.year}</span>}
        </div>

        {/* Technologies */}
        {item.technologies && typeof item.technologies === 'object' && (
          <div className="flex flex-wrap gap-1 mb-4">
            {Object.values(item.technologies).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {String(tech)}
              </span>
            ))}
          </div>
        )}

        {/* Custom fields display */}
        {item.customFields && typeof item.customFields === 'object' && Object.keys(item.customFields).length > 0 && (
          <div className="border-t pt-3 mb-4 space-y-1">
            {Object.entries(item.customFields).slice(0, 3).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="font-medium text-gray-700">{key}: </span>
                <span className="text-gray-600">{String(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Link */}
        {item.link && (
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Voir plus
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
