import React from 'react'
import { CaseStudy, StrapiEntity } from '@/types/strapi'
import Image from 'next/image'
import Link from 'next/link'

type AmandaTranslationCaseStudyCardProps = {
  caseStudy: CaseStudy & StrapiEntity
  locale?: string
}

/**
 * Carte de projet spécialisée pour les cas d'étude de traduction (Amanda)
 * Affiche des informations spécifiques : langues, volume, délais
 */
export const AmandaTranslationCaseStudyCard = ({ 
  caseStudy, 
  locale = 'fr' 
}: AmandaTranslationCaseStudyCardProps) => {
  const { 
    title, 
    identifier, 
    client_display,
    client_is_anonymous,
    summary, 
    cover_image,
    source_language,
    target_language,
    volume,
    volume_unit,
    turnaround_days,
    domains,
    content_types,
    featured
  } = caseStudy

  // Icône selon le type de contenu
  const getContentTypeIcon = (contentType?: string) => {
    if (!contentType) return '📄'
    const lower = contentType.toLowerCase()
    if (lower.includes('web')) return '🌐'
    if (lower.includes('app')) return '📱'
    if (lower.includes('document') || lower.includes('contrat')) return '📃'
    if (lower.includes('marketing') || lower.includes('brochure')) return '📰'
    if (lower.includes('sous-titre') || lower.includes('video')) return '🎬'
    return '📄'
  }

  return (
    <Link 
      href={`/${locale}/portfolio/${identifier}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image de couverture avec overlay de langues */}
      <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        {cover_image?.url ? (
          <>
            <Image
              src={cover_image.url}
              alt={cover_image.alternativeText || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {getContentTypeIcon(content_types?.[0]?.name)}
          </div>
        )}
        
        {/* Badge Featured */}
        {featured && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>Projet vedette</span>
          </div>
        )}

        {/* Langues en overlay */}
        {source_language && target_language && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-blue-600">{source_language.toUpperCase()}</span>
              <span className="text-gray-400">→</span>
              <span className="text-purple-600">{target_language.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Client */}
        {client_display && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            {client_is_anonymous && <span>🔒</span>}
            <p className="font-medium">{client_display}</p>
          </div>
        )}

        {/* Titre */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Résumé */}
        {summary && (
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
            {summary}
          </p>
        )}

        {/* Métriques de traduction */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          {volume && volume_unit && (
            <div className="flex items-center gap-1 text-gray-700">
              <span className="font-semibold">{volume.toLocaleString()}</span>
              <span className="text-gray-500">
                {volume_unit === 'words' && 'mots'}
                {volume_unit === 'pages' && 'pages'}
                {volume_unit === 'minutes' && 'min'}
                {volume_unit === 'hours' && 'h'}
              </span>
            </div>
          )}
          
          {turnaround_days && (
            <div className="flex items-center gap-1 text-gray-700">
              <span>⏱️</span>
              <span className="font-semibold">{turnaround_days}</span>
              <span className="text-gray-500">
                {turnaround_days === 1 ? 'jour' : 'jours'}
              </span>
            </div>
          )}
        </div>

        {/* Taxonomies */}
        <div className="flex flex-wrap gap-2">
          {domains?.slice(0, 2).map((domain) => (
            <span
              key={domain.id}
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200"
            >
              {domain.name}
            </span>
          ))}
          {content_types?.slice(0, 2).map((ct) => (
            <span
              key={ct.id}
              className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200"
            >
              {ct.name}
            </span>
          ))}
          {(domains && domains.length > 2) || (content_types && content_types.length > 2) ? (
            <span className="text-xs text-gray-500 px-2 py-1">+{' '}
              {((domains?.length || 0) > 2 ? (domains?.length || 0) - 2 : 0) + 
               ((content_types?.length || 0) > 2 ? (content_types?.length || 0) - 2 : 0)}
            </span>
          ) : null}
        </div>
      </div>

      {/* Footer avec CTA */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Voir le projet</span>
          <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}
