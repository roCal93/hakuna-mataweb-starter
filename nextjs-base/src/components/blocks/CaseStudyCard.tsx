import React from 'react'
import { CaseStudy, StrapiEntity } from '@/types/strapi'
import Image from 'next/image'
import Link from 'next/link'

type CaseStudyCardProps = {
  caseStudy: CaseStudy & StrapiEntity
  locale?: string
}

export const CaseStudyCard = ({ caseStudy, locale = 'fr' }: CaseStudyCardProps) => {
  const { 
    title, 
    identifier, 
    client_display, 
    summary, 
    cover_image,
    domains,
    content_types,
    featured
  } = caseStudy

  return (
    <Link 
      href={`/${locale}/portfolio/${identifier}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Image de couverture */}
      {cover_image?.url && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <Image
            src={cover_image.url}
            alt={cover_image.alternativeText || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ Featured
            </div>
          )}
        </div>
      )}

      {/* Contenu */}
      <div className="p-6">
        {/* Client (si affiché) */}
        {client_display && (
          <p className="text-sm text-gray-500 mb-2">{client_display}</p>
        )}

        {/* Titre */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Résumé */}
        {summary && (
          <p className="text-gray-600 mb-4 line-clamp-3">{summary}</p>
        )}

        {/* Taxonomies */}
        <div className="flex flex-wrap gap-2">
          {domains?.map((domain) => (
            <span
              key={domain.id}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {domain.name}
            </span>
          ))}
          {content_types?.map((ct) => (
            <span
              key={ct.id}
              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
            >
              {ct.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
